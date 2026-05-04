# PDF Export Guide for Print

Use this guide when delivering PDF exports from Express File Packager to a print vendor.

## Core Rule

Always check with your printer for color mode and effective resolution before approving files for production.

## What This Add-on Exports

- Print-ready PDF output with bleed and PDF page boxes configured.
- Optional assets package can also include fonts report and PNG assets.

## PDF Preflight Checklist

1. Confirm trim size with the printer.
2. Confirm bleed amount and units (mm or inches).
3. Confirm whether the printer expects RGB, CMYK, or ICC-managed files.
4. Confirm whether trim marks are required from you or added by their prepress workflow.
5. Confirm required PDF standard (for example, PDF/X if requested).
6. Verify all raster content meets effective resolution targets.
7. Review fonts report and verify no missing or substituted fonts.
8. Request and approve a proof for color-critical jobs.

## Effective Resolution (PPI)

Use this formula for placed raster images:

$$
\text{effective PPI} = \frac{\text{pixel dimension}}{\text{printed size in inches}}
$$

Examples:
- 3000 px image at 10 in print size = 300 PPI.
- 2400 px image at 12 in print size = 200 PPI.

Guidance:
- 300 PPI is a common target for high-quality print.
- 150 PPI may be acceptable for large-format work viewed from distance.
- Use the lower value between width-based and height-based PPI as the true effective resolution.

## Color Mode Guidance

- Adobe Express exports are generally RGB-first unless converted downstream.
- If your printer requires CMYK, confirm where conversion happens:
  - your own prepress app,
  - the printer RIP,
  - or an agreed color-managed workflow.
- Ask the printer for target ICC profile and rendering intent for brand-critical color work.
- For spot/brand colors, request a calibrated proof before production.

## Recommended Vendor Questions

- What final color mode should I supply?
- Which ICC profile should I use?
- Do you need PDF/X?
- Should I include trim marks, or will you add them?
- What minimum effective PPI do you require?
- Do you have a max total ink limit requirement for CMYK workflows?

## Submission Notes

- Include a production note with trim size, bleed amount, and intended stock.
- Keep source assets and exported package together for quick revisions.
- If in doubt, send one test file first and validate output before full run.

## Issue 4: Premium Content Entitlement (Free User)

If a Free Adobe Express user clicks Download print-ready PDF on content that includes Premium assets, the add-on should not fail with a generic error.

Expected behavior:

- The add-on detects premium entitlement restrictions.
- The Adobe Premium upgrade flow is triggered with a clear CTA.
- The user sees an actionable warning in-panel, not a dead-end error.

QA steps:

1. Use a Free Adobe Express account.
2. Open a document that contains Premium content.
3. Click Download print-ready PDF.
4. Confirm the Premium/Upgrade prompt appears.
5. Confirm the panel does not show a generic failure with no next step.

Implementation notes:

- Entitlement checks should run before PDF export attempts when possible.
- Export calls should catch entitlement errors (for example USER_NOT_ENTITLED_TO_PREMIUM_CONTENT) and route users to upgrade flow.
- Generic error handling should be bypassed for known entitlement cases.
