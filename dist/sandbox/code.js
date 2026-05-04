import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, CreateRenditionFormat } from "express-document-sdk";

// Get the document sandbox runtime.
const { runtime } = addOnSandboxSdk.instance;

function buildFontLabel(font) {
    const family = font && font.family ? font.family : "UnknownFamily";
    const style = font && font.style ? font.style : "Regular";
    const postscript = font && font.postscriptName ? ` [${font.postscriptName}]` : "";
    return `${family} ${style}${postscript}`.trim();
}

async function getDocumentFontReport() {
    const documentRoot = editor.documentRoot;
    const pages = Array.from((documentRoot && documentRoot.pages) || []);
    const currentPage = editor.context ? editor.context.currentPage : null;
    const targetPages = pages.length > 0 ? pages : (currentPage ? [currentPage] : []);
    const seenTextContentIds = new Set();
    const fonts = new Set();

    for (const page of targetPages) {
        const textContents = Array.from((page && page.allTextContent) || []);

        for (const textContent of textContents) {
            const model = textContent ? textContent.textContentModel : null;
            if (!model || !model.id || seenTextContentIds.has(model.id)) {
                continue;
            }

            seenTextContentIds.add(model.id);

            const ranges = model.characterStyleRanges || [];
            for (const range of ranges) {
                if (!range || !range.font) {
                    continue;
                }
                fonts.add(buildFontLabel(range.font));
            }
        }
    }

    return Array.from(fonts).sort((a, b) => a.localeCompare(b));
}

async function exportLayerAssets() {
    const page = editor.context ? editor.context.currentPage : null;
    const activeArtboard = page && page.artboards ? page.artboards.first : null;

    if (!activeArtboard) {
        return { assets: [], report: "No active artboard was found." };
    }

    const descendants = Array.from(activeArtboard.allDescendants || []);
    const topLevelLayers = activeArtboard.children.toArray();
    const allCandidates = [...topLevelLayers, ...descendants];
    const nonRenderableContainerTypes = new Set(["ab:Artboard", "Page", "ArtworkRoot"]);
    const mediaTypes = new Set(["MediaContainer", "LinkedAsset", "ImageRectangle", "VideoNode"]);
    const seenIds = new Set();
    const candidates = [];

    for (const node of allCandidates) {
        if (!node || !node.id || seenIds.has(node.id)) continue;
        seenIds.add(node.id);
        if (nonRenderableContainerTypes.has(node.type)) continue;
        if (mediaTypes.has(node.type)) candidates.push(node);
    }

    // Prefer higher-level container nodes over child rectangles.
    const preferred = candidates.filter(n =>
        n.type === "MediaContainer" || n.type === "LinkedAsset" || n.type === "VideoNode"
    );
    const finalCandidates = preferred.length > 0 ? preferred : candidates;

    const assets = [];
    const reportLines = [`Layer asset candidates found: ${finalCandidates.length}`];

    for (let i = 0; i < finalCandidates.length; i++) {
        const node = finalCandidates[i];
        const index = String(i + 1).padStart(2, "0");

        try {
            let renditionPromise;
            await editor.queueAsyncEdit(() => {
                renditionPromise = node.createRendition({ format: CreateRenditionFormat.png });
            });
            const rendition = await renditionPromise;
            if (rendition && rendition.blob) {
                const fileName = `asset_${index}.png`;
                assets.push({ fileName, blob: rendition.blob });
                reportLines.push(`OK (png rendition) ${node.id} ${node.type} -> ${fileName}`);
            } else {
                reportLines.push(`SKIP (no blob) ${node.id} ${node.type}`);
            }
        } catch (err) {
            const message = err && err.message ? err.message : String(err);
            reportLines.push(`FAIL ${node.id} ${node.type} -> ${message}`);
            console.warn("Layer asset export failed:", err);
        }
    }

    reportLines.push(`Total assets exported: ${assets.length}`);
    return { assets, report: reportLines.join("\n") };
}



try {
    // Expose API immediately and synchronously so runtime initialization is fast and reliable.
    runtime.exposeApi({
        exportLayerAssets,
        getDocumentFontReport
    });
} catch (error) {
    console.error("Failed to expose sandbox API:", error);
    runtime.exposeApi({
        exportLayerAssets: async () => ({
            assets: [],
            report: "Sandbox API failed to initialize."
        }),
        getDocumentFontReport: async () => []
    });
}
