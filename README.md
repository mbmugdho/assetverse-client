<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6366f1,100:8b5cf6&height=180&section=header&text=AssetVerse&fontSize=50&fontColor=ffffff&animation=fadeIn&desc=Corporate%20Asset%20Management%20System%20(Full-Stack)&descSize=18&descAlignY=70" />
</p>

<h1 align="center">AssetVerse — Corporate Asset Management System (Full-Stack)</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.1-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Firebase-12.6.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/DaisyUI-5.5.8-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white"/>
</p>

---

## 🔗 Live Links

<p align="center">
  <a href="https://assetverse-client-five.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Site-Visit%20Now-brightgreen?style=for-the-badge"/>
  </a>
  <a href="https://github.com/mbmugdho/assetverse-client" target="_blank">
    <img src="https://img.shields.io/badge/💻%20Client%20Repo-GitHub-blue?style=for-the-badge"/>
  </a>
  <a href="https://github.com/mbmugdho/assetverse-server" target="_blank">
    <img src="https://img.shields.io/badge/🖥️%20Server%20Repo-GitHub-orange?style=for-the-badge"/>
  </a>
</p>

| Link Type | URL |
|-----------|-----|
| 🌐 **Live Site** | [https://assetverse-client-five.vercel.app](https://assetverse-client-five.vercel.app) |
| 💻 **Client Repo** | [GitHub Link](https://github.com/mbmugdho/assetverse-client) |
| 🖥️ **Server Repo** | [GitHub Link](https://github.com/mbmugdho/assetverse-server) |

---

## 📋 Project Overview

**AssetVerse** is a comprehensive **B2B HR & Asset Management Platform** designed to help companies efficiently manage their physical assets and track which employee has which equipment.

### 🎯 What It Solves:

| Problem | Solution |
|---------|----------|
| Lost track of company equipment | Centralized asset inventory |
| Manual asset assignment | Digital request & approval workflow |
| No visibility on asset usage | Real-time tracking & analytics |
| Multiple spreadsheets | Single unified dashboard |

> 💡 **Perfect for:** Startups, SMBs, and enterprises managing laptops, phones, office equipment, and other company assets.

---

## 🛠️ Technologies Used

<div align="center">

### Frontend Stack
<p>
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,firebase" alt="Frontend"/>
</p>

### Additional Tools
<p>
  <img src="https://skillicons.dev/icons?i=vercel,github,vscode" alt="Tools"/>
</p>

</div>

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.1 | UI component library |
| Vite | 5.x | Fast build tool & dev server |
| React Router DOM | 7.10.1 | Client-side routing |
| TanStack Query | 5.90.12 | Server state management |
| Firebase | 12.6.0 | Authentication |
| Axios | 1.13.2 | HTTP requests |
| Tailwind CSS | 3.x | Utility-first styling |
| DaisyUI | 5.5.8 | Pre-built components |
| Framer Motion | 12.23.25 | Animations |
| Recharts | 3.5.1 | Data visualization |
| Stripe | - | Payment processing |

---

## ✨ Core Features

### 👥 User Roles

| Role | Capabilities |
|------|--------------|
| **HR Manager** | Manage assets, approve requests, view analytics, upgrade packages |
| **Employee** | Request assets, view assigned items, return equipment |

### 🔐 Authentication & Security

- ✅ Firebase Authentication (Email/Password, Google)
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Auto-affiliation system

### 📦 Asset Management

- ✅ Add, edit, delete company assets
- ✅ Categorize assets (Laptop, Phone, Equipment, etc.)
- ✅ Track asset status (Available, Assigned, Maintenance)
- ✅ Asset search & filtering

### 📝 Request & Approval Workflow

- ✅ Employees can request available assets
- ✅ HR receives request notifications
- ✅ Approve or reject with comments
- ✅ Auto-update inventory on approval

### 📊 HR Analytics Dashboard

- ✅ Total assets overview
- ✅ Assets by category chart
- ✅ Request statistics
- ✅ Employee asset distribution
- ✅ Monthly trends with Recharts

### 💳 Subscription & Packages

- ✅ Stripe-powered package upgrades
- ✅ Multiple pricing tiers
- ✅ Increase employee limits
- ✅ Secure payment processing

### 🎨 UI/UX Features

- ✅ Fully responsive design
- ✅ Dark/Light mode support
- ✅ Smooth animations with Framer Motion
- ✅ Print asset reports
- ✅ SweetAlert2 notifications

---

## 📦 Dependencies

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.90.12",
    "axios": "^1.13.2",
    "daisyui": "^5.5.8",
    "firebase": "^12.6.0",
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.556.0",
    "react": "^19.2.1",
    "react-dom": "^19.2.1",
    "react-fast-marquee": "^1.6.5",
    "react-icons": "^5.5.0",
    "react-router-dom": "^7.10.1",
    "react-to-print": "^3.2.0",
    "recharts": "^3.5.1",
    "styled-components": "^6.1.19",
    "sweetalert2": "^11.26.4",
    "swiper": "^12.0.3"
  }
}
