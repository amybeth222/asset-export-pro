# Express File Packager

Express File Packager is an Adobe Express add-on that exports document pages into a single ZIP package.

It supports multiple export formats including transparent PNG, PDF, and layer assets. Includes optional `fonts.txt` and print-ready instructions so collaborators can quickly see which fonts are being used and how to prepare files for print delivery and handoff workflows.

## Features

- **Export PNG Images**: Transparent PNG per page with automatic background removal support
- **Export PDF Document**: Print-ready PDF with optional 3mm bleed for print production
- **Export Layer Assets**: Extract individual layer elements as PNG files
- **Export Font List**: Generate `fonts.txt` with used typography for vendor handoff
- **Create Package**: Bundle all assets into one ZIP (PNG + PDF + layer assets + fonts + print instructions)
- Transparent PNG support: Preserves transparency when page background is removed
- 3mm bleed option for print: Optional bleed configuration in PDF exports
- Bundle all exported assets into one ZIP file
- Print-ready instructions included (`PRINT_README.txt`)
- Clear progress and status feedback in the panel UI
- Document size and page count metadata in print packages

## Built With

- Adobe Express Add-on SDK
- Document Sandbox Runtime
- JavaScript (ES modules)
- HTML + CSS
- JSZip

## Project Structure

```
add-on/
	src/
		index.html              # Panel UI with export workflow buttons
		manifest.json           # Add-on manifest and entrypoint config
		sandbox/
			code.js               # Sandbox API: font extraction and layer asset export
```

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm
- Adobe Express Add-on Developer setup

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

### Run

```bash
npm run start
```

## How To Use

1. Open the add-on panel in Adobe Express.
2. Choose an export action:
   - **Export PNG Images** — Single transparent PNG per page
   - **Export PDF Document** — Print-ready PDF with optional bleed
   - **Export Layer Assets** — Individual layer elements as PNG
   - **Export Font List (fonts.txt)** — Typography used in the document
   - **Create Package** — All of the above combined into one ZIP
3. (Optional) Check **Add 3mm bleed (for print)** for print-ready PDF with bleed.
4. Download the generated ZIP file.

## Detailed Feature Guide

### Transparent PNG Images

When exporting PNG images, the add-on automatically creates transparent PNGs for each page. If your page background has been removed, the transparency is preserved.

- Each page exports as `{document_name}_{page_title}.png`
- Supports multiple pages
- Background removal automatically yields true transparency

### Layer Assets Export

Extract individual layers from your document as separate PNG files. Useful for:
- Component libraries
- Icon sets
- Design system delivery

Layer assets are placed in a `layer_assets/` folder within the package.

### Print-Ready PDF Export

The PDF export includes:
- Full-resolution rendering from Adobe Express
- Optional 3mm bleed applied to all sides
- PDF page boxes configured (MediaBox, BleedBox, CropBox, TrimBox)
- Print checklist and document metadata

**Bleed Option:**  
Check "Add 3mm bleed (for print)" before exporting to apply industry-standard 3mm bleed to all sides. Confirm bleed amount with your printer before production.

### Font List

The `fonts.txt` file in the package lists all fonts used in the document.

Useful for:

- production handoff
- print/vendor communication
- keeping a simple record of typography choices in each package

### Create Package (Combined Export)

The **Create Package** action bundles everything:
- Transparent PNG per page
- Print-ready PDF (with or without bleed)
- All layer assets in a `layer_assets/` subfolder
- `fonts.txt` with used typography
- `PRINT_README.txt` with document specs and print checklist

Perfect for complete handoff workflows.

## Print Preflight: Effective Resolution and Color Mode

Before sending exported files to a printer, verify image clarity and color expectations.

For a PDF-specific handoff guide, see [README_PDF.md](README_PDF.md).

### Effective Resolution (PPI)

- Ask your printer for their minimum effective resolution target.
- Common targets are 300 PPI for most print work and 150 PPI for large-format viewing distances.
- Use this formula for placed images:

$$\text{effective PPI} = \frac{\text{image pixel dimension}}{\text{printed size in inches}}$$

- Example: an image that is 3000 px wide printed at 10 in wide has 300 PPI.
- Check both width and height and use the lower resulting PPI as the true effective resolution.
- If effective PPI is too low, reduce print size or replace the asset with a higher-resolution source.

## Version History

### v1.0.3 (May 2026)
- Added layer asset extraction in Create Package
- Restored separate layer asset export button
- Transparent PNG support with proper background handling
- Improved UI labels matching legacy package naming

### v1.0.2 (Prior)
- Print-ready PDF with bleed support
- Font list export
- Multi-page PNG export

## License

This add-on is provided for use within Adobe Express.

### Color Mode and Printer Alignment

- Confirm whether your printer expects RGB files, CMYK files, or a specific ICC profile workflow.
- Adobe Express exports are typically RGB-based assets unless converted downstream.
- For color-critical jobs, ask for the printer's required profile and proofing process before final export.
- If CMYK is required, confirm where conversion should happen:
- in your prepress app,
- at the print provider RIP,
- or in a managed PDF workflow agreed with the vendor.
- Request a contract proof or calibrated sample for brand-critical colors.

### PDF Output Notes for Print

- This add-on can export print-ready PDF settings with bleed and page boxes.
- Bleed is configured in millimeters in the export options.
- Confirm with your printer whether they also require visible trim marks from their own prepress workflow.
- If your printer requires specific PDF standards (for example PDF/X), validate and convert in your prepress tool before final submission.

### Printer Handoff Checklist

- Final trim size confirmed with printer
- Bleed requirement confirmed (amount and units)
- Safe area respected for text and logos
- Effective resolution checked for all raster assets
- Color workflow confirmed (RGB, CMYK, ICC profile)
- Fonts report reviewed for substitution risk
- Final PDF proof approved before production

## Permissions and Notes

- Export depends on Adobe Express document export permissions.
- If export is restricted for the current document, the add-on shows a warning and skips package creation.

## Support

If you need help with this add-on:

- Open an issue in this repository with steps to reproduce and screenshots.
- Include your browser, operating system, and whether the issue occurs in Adobe Express web or desktop.

Repository issues URL (use this as Help URL in Adobe listing):

`https://github.com/amybeth222/Asset-Export-Pro/issues`

## Privacy Policy

Asset Export Pro processes exports locally through Adobe Express APIs. The add-on does not operate its own backend service and does not intentionally collect personal data for storage outside Adobe Express.

Data handling summary:

- Document assets are processed only to generate requested export files.
- Exported files are downloaded to the user's device.
- No separate account system is used by this add-on.

Privacy policy URL (use this section link in Adobe listing):

`https://github.com/amybeth222/Asset-Export-Pro#privacy-policy`

## Help URL (For Listing)

If you publish this on GitHub, use your repository URL as the Help URL, for example:

`https://github.com/amybest222/express-file-packager`

## License

Add your preferred license here (for example: MIT).