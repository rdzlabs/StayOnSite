# 🧪 Local Testing: StayOnSite Extension

This guide walks through how to install and run the StayOnSite Chrome extension locally for development or testing purposes.

---

## ✅ Requirements

* Node.js (v18+ recommended)
* npm (comes with Node.js)
* Google Chrome

---

## 📦 Install Dependencies

```bash
npm install
```

---

## 🔨 Build the Extension

Use Vite to build the extension:

```bash
npm run build
```

This will generate a `dist/` folder containing your production-ready extension.

---

## 🧩 Load Extension in Chrome

1. Open Chrome and navigate to:

   ```
   chrome://extensions
   ```
2. Enable **Developer mode** (top right corner).
3. Click **Load unpacked**.
4. Select the `dist/` folder.

---

## 🚀 Test

* Click the extension icon from the toolbar to open the popup.
* Ensure permissions and UI behave as expected.
* Check `chrome://extensions` > "Inspect views" to open devtools for the extension.

---

## 🛠 Notes

* Any code changes require re-running `npm run build` and refreshing the extension in `chrome://extensions`.
* If Vite config or manifest paths are changed, update this file accordingly.

---

For issues, contact: [rdzlabs.co@gmail.com](mailto:rdzlabs.co@gmail.com)
