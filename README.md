# INSIZE Email Template Platform & HTML Generator

A simple, responsive, single-page platform designed to allow email editors and marketers to visually customize email campaigns, manage multiple embedded destination links across every section, and generate 100% production-ready, cross-client HTML email code.

---

## 🚀 Why This Solves the "Multiple Links" Problem

Email marketers frequently struggle when an email design is created as a single banner or improperly sliced graphic, because:
- A single image can only point to **one** destination link.
- Clicking different parts (the logo, the video demo, bullet points, social icons) is impossible without slicing into distinct HTML email table segments.

This platform replicates the exact **INSIZE** design layout into discrete, individually linkable sections:
1. **Header Logo**: Directs to the company website (e.g., `https://www.insize.com`).
2. **Body Text**: Editable copy supporting inline links.
3. **Product Showcase Banner**: Directs to a YouTube video demo or product catalog page.
4. **Key Features Banner**: Full-width corporate green card with individual specs and section link.
5. **Social Media Icons**: 3 separate icons for Instagram, LinkedIn, and YouTube, each with its own independent profile URL.
6. **Footer Bar**: Company copyright and website link.

---

## 🛠️ Features

- **Inline Visual Editing**: Click directly on any text to edit copy in real time.
- **Click-to-Edit Images & Links**: Click on the logo, product image, or social icons to change image URLs, destination links, and alt texts.
- **Central Link Manager & Auditor**: View and edit all 7 destination links in one consolidated dashboard, with direct "Test ↗" buttons.
- **Visual Link Highlighter (`👁️ Highlight Links`)**: Highlights every clickable zone with luminous borders and destination URL tags.
- **Responsive Preview Switcher**: Toggle between Desktop (600px container) and Mobile (380px device frame).
- **Bulletproof HTML Email Code Generation**: Generates clean, table-based, inline-styled HTML tested for Outlook, Gmail, Apple Mail, and Yahoo Mail.
- **Copy & Download**: 1-click clipboard copy and `.html` file export.
- **Netlify-Ready**: Pure static architecture with zero build steps or complex dependencies.

---

## 🌐 How to Deploy to Netlify

### Option 1: Netlify Drag & Drop (Easiest)
1. Go to [app.netlify.com](https://app.netlify.com).
2. Log in and navigate to the **Sites** tab.
3. Drag and drop this entire folder (`Email template`) directly onto the Netlify deploy zone.
4. Your site will be live on a secure HTTPS URL in seconds!

### Option 2: Netlify CLI
Run the following in the terminal:
```bash
npx netlify deploy --prod
```

### Option 3: Git Repository
1. Push this folder to GitHub/GitLab.
2. In Netlify, click **Add new site** > **Import an existing project**.
3. Select your repository. The included `netlify.toml` will handle configuration automatically.

---

## 💻 Local Preview
To test or use the platform locally:
```bash
python -m http.server 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## 📁 File Structure
```
Email template/
├── index.html           # Main single-page application & editor UI
├── netlify.toml         # Netlify build and cache headers configuration
├── css/
│   └── style.css        # Modern SaaS UI styling & email template styles
├── js/
│   ├── app.js           # Core state management, inline editing & modals
│   ├── emailGenerator.js# Table-based HTML email compiler with inline styles
│   └── defaultData.js   # Preloaded template content matching the INSIZE design
├── assets/              # Sliced and vector assets (logo, microscope, social icons)
└── README.md            # Documentation
```
