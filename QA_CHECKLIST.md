# QA Checklist: Express File Packager

Use this checklist for release validation of PDF export, entitlement handling, and cross-browser behavior.

## Test Metadata

- Date:
- Tester:
- Build/Commit:
- Environment: macOS + Adobe Express Add-on
- Browsers tested: Safari / Chrome / Edge / Firefox

## 1. Issue 4: Premium Entitlement Flow (Free User)

- Test account type: Free
- Test document contains Premium content: Yes / No
- Action: Click Download Print-Ready PDF

### Expected

- Upgrade dialog/CTA is shown.
- No generic dead-end error is shown in panel.
- User has a clear next step (upgrade flow).

### Results

- Upgrade dialog/CTA shown: Pass / Fail
- Generic dead-end error shown: Pass / Fail (Pass = not shown)
- Entitlement error appears without UX guidance: Pass / Fail (Pass = no)
- Notes:
- Screenshot/video evidence:

## 2. Issue 5: Safari PDF Download Behavior

- Browser: Safari version
- Action: Click Download Print-Ready PDF

### Expected

- Download completes successfully.
- Delivered package contains both files:
  - print-ready PDF
  - instructions.txt

### Results

- Download completed: Pass / Fail
- Package contains PDF: Pass / Fail
- Package contains instructions.txt: Pass / Fail
- Only one expected file present: Pass / Fail (Pass = no)
- Popup blocker setting during test: On / Off
- Notes:
- Screenshot/video evidence:

## 3. Cross-Browser Consistency

### Chrome

- Package contains PDF + instructions.txt: Pass / Fail
- Notes:

### Edge

- Package contains PDF + instructions.txt: Pass / Fail
- Notes:

### Firefox

- Package contains PDF + instructions.txt: Pass / Fail
- Notes:

## 4. Content Validation

- PDF opens correctly and expected pages are present: Pass / Fail
- instructions.txt exists and contains printer guidance: Pass / Fail
- Filenames/content are correct and not truncated: Pass / Fail
- Notes:

## 5. Final Sign-Off

- Issue 4 overall: Pass / Fail
- Issue 5 overall: Pass / Fail
- Regressions observed in other actions (Images / Fonts / Export All): Yes / No
- Ready for release sign-off: Yes / No
- Follow-up actions:

## Optional Notes for Printer Handoff

- Confirm final trim size:
- Confirm bleed amount and units:
- Confirm color mode / ICC profile requirement:
- Confirm effective resolution target (minimum PPI):
