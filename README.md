# 💃 Eilat Dance Center — Fullstack Next.js Website & Custom CMS

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?style=flat&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

The official repository containing the source code for the fully functional website of the **[Eilat Dance Center](https://eilatdance.com)** dance studio. 

> ⚠️ **Official Permission:** The author of eilatdance.com has given explicit and official consent to publish this source code in the public domain under the **MIT** license. Anyone is completely free to study, modify, copy, and use this code as a foundation (template) for their own commercial or personal projects.

---

## 🌟 About the Project & Why You'll Love It

This repository isn't just another synthetic "tutorial" or an empty starter template. It's a **real, production-tested business product**. The project represents a complete, out-of-the-box solution for service-based businesses (dance studios, fitness centers, language schools, yoga studios, etc.).

**Benefits of using this code as a reference or template:**

🚀 **Custom Built-in CMS:** No need to pay for external Headless CMS platforms (like Sanity or Contentful) or mess around with heavy WordPress setups. The project includes an incredibly fast and user-friendly admin panel (built with `shadcn/ui`) that interacts directly with a MySQL database. It has everything you need: schedule management, a visual blog editor (powered by `BlockNote`), a media manager with automatic WebP thumbnail generation, and a reviews manager.

🌍 **Advanced Multi-language Support (i18n) Out-of-the-Box:** This project perfectly solves the pain of creating multilingual websites on the Next.js App Router (it features EN, RU, and HE with full RTL support). Translations are stored in the database, and a custom scanner script automatically finds new phrases in the codebase and adds them to the admin panel for translation. The routing automatically handles language prefixes in URLs and remembers user preferences via cookies.

🔍 **Ultimate SEO & Performance:** The site generates dynamic `Schema.org` (JSON-LD) metadata for Local Businesses, Events (for the schedule), and Blog articles. Combined with Next.js 15+ Server-Side Rendering (SSR/RSC) and the brand new Tailwind CSS v4, the site achieves top scores in Google Lighthouse.

---

## 🛠 Tech Stack

* **Framework:** Next.js (App Router, Server Components, Server Actions)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **UI Components:** Radix UI / shadcn/ui
* **Database:** MySQL (`mysql2` driver, connection pool)
* **Authentication:** Custom JWT auth (`jose` library, `bcrypt`)
* **Text Editor:** BlockNote (Notion-like rich text editor)
* **Image Processing:** ImageMagick (via shell commands for perfect resizing and WebP conversion)
* **Sliders:** Embla Carousel

---

## 📋 Key Features

### Public Facing (Website)
* **Dynamic Schedule:** A smart, day-by-day calendar with automatic switching between "This Week" and "Next Week".
* **Blog:** A fully-featured blog with pagination, categories, a "Featured Article" highlight, and a "Related Articles" section.
* **Dance Styles & Teachers:** Beautiful cards featuring gradients, difficulty level tags, and detailed descriptions.
* **Contacts & Map Integration:** Dynamic output of settings data (phone numbers, social links, iframe maps).
* **Payment Instructions:** Built-in UI to accept payments via local payment systems (e.g., Bit) with WhatsApp confirmation message generation.

### Admin Dashboard
* **Authentication:** Protected routes via Middleware with a role-based model (Admin / Instructor).
* **Blog Management:** Article creation using a visual block editor, SEO tag configuration, and status management (Draft/Published).
* **Media Manager:** Image uploading with automatic generation of multiple preview sizes to optimize network traffic.
* **Schedule Management:** Add classes to the grid using style presets (to avoid manual data entry) and assign instructors.
* **Translation System:** A unique table interface for translating all static website phrases (buttons, headers, UI text) directly from the browser without editing a single line of code.
* **Global Settings:** Edit phone numbers, addresses, social media links, and inject analytics scripts (Google Analytics/Pixel).

---

## 🚀 Quick Start (Installation)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/eilat-dance-center.git
cd eilat-dance-center
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup
1. Create an empty MySQL database.
2. Import the DB structure from the `eilatdance_db.sql.txt` file (located in the root or `database/` folder).
3. *(Optional)* Install **ImageMagick** on your server/local machine if you want the automatic WebP thumbnail generation to work during image uploads.

### 4. Environment Variables
Create a `.env.local` file in the root directory and fill it out like this:
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=eilatdance
DB_PORT=3306

# Security
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars
ADMIN_SECRET_KEY=secret_key_to_register_first_admin

# Cron Jobs (Optional)
CRON_SECRET=secret_key_for_cron_jobs
```

### 5. Create the First Admin
To create the first admin user, send a POST request to `/api/auth/register` (e.g., using Postman):
```json
{
  "email": "admin@example.com",
  "password": "securepassword",
  "name": "Admin Name",
  "secretKey": "secret_key_to_register_first_admin" 
}
```

### 6. Run the Project
```bash
npm run dev
```
The website will be available at `http://localhost:3000`, and the admin panel at `http://localhost:3000/login` (which redirects to `/admin` after a successful login).

---

## 📝 Automatic Translation Scanning

If you add new phrases to the code using the `t('some.new.phrase')` function, you don't need to add them to the database manually. 
1. Go to Admin Panel -> Translations.
2. Click the **"Scan Source"** button.
3. The script will scan the project files, find the new keys, and automatically add them to the database so you can translate them right through the UI.

---

## 📄 License

This project is licensed under the **MIT** License. 

You have the full right to use this code for commercial purposes, modify it, distribute it, and use it as a template for your own projects without any restrictions. 

*Special thanks to the Eilat Dance Center for failing to pay the developers, thereby supporting the Open Source community! The author officially considers this project to be their own property; having received no payment for the work, they retain the full right to dispose of the code at their sole discretion.
