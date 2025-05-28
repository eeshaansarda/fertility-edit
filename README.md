# 🧬 Fertility Edit Platform

**Live Demo**: [fertility-edit.vercel.app](https://fertility-edit.vercel.app/)  

## 📝 Overview

**Fertility Edit** is a full-stack web platform that provides real reviews and expert insights on fertility products. Built with modern technologies, it offers a seamless user experience for individuals seeking trustworthy information in the fertility space.

## 🚀 Features

- 🛍️ **Curated Product Listings**: Explore a wide range of fertility products with detailed information.
- 🧑‍⚕️ **Expert Reviews**: Read reviews and insights from fertility experts to make informed decisions.
- 📱 **Responsive Design**: Optimized for all devices to ensure accessibility and usability.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Shadcn/UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Deployment**: Vercel

## 🧰 Getting Started

### Prerequisites

- Node.js (v18 or later)
- PostgreSQL database

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/eeshaansarda/fertility-edit.git
   cd fertility-edit
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL=your_postgresql_database_url
   ```

4. **Set up the database**:

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

*Empowering individuals with reliable information on fertility products.*