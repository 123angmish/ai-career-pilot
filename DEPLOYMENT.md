# 🚀 CareerPilot - Production Deployment Guide

CareerPilot is an Enterprise AI Career Copilot built with a **Spring Boot 3 Java Backend (MySQL/H2)** and a **React 18 + TypeScript + Vite Frontend**.

---

## 🛢️ 1. Production MySQL Database Setup

1. Create the MySQL Database:
   ```sql
   CREATE DATABASE IF NOT EXISTS careerpilot_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Execute the included DDL SQL schema script:
   - File Path: `backend/careerpilot-backend/src/main/resources/schema-mysql.sql`

---

## ☕ 2. Spring Boot Backend Deployment

### Option A: Direct Executable JAR Deployment
1. Build the production JAR:
   ```powershell
   cd backend/careerpilot-backend
   .\mvnw.cmd clean package -DskipTests
   ```
2. Run with MySQL Production Profile:
   ```powershell
   java -jar target/careerpilot-backend-0.0.1-SNAPSHOT.jar --spring.profiles.active=mysql
   ```

### Option B: Cloud Hosting (Render / Railway / AWS EC2)
Set Environment Variables:
- `SPRING_PROFILES_ACTIVE=mysql`
- `SPRING_DATASOURCE_URL=jdbc:mysql://your-db-host:3306/careerpilot_db?useSSL=false&allowPublicKeyRetrieval=true`
- `SPRING_DATASOURCE_USERNAME=your_db_user`
- `SPRING_DATASOURCE_PASSWORD=your_db_password`
- `JWT_SECRET=404E635266556A586E3272357538782F413F4428472B4B6250655368566D5971`
- `GEMINI_API_KEY=your_gemini_api_key`

---

## 🎨 3. React Frontend Deployment (Vercel / Netlify)

1. Build the production web bundle:
   ```powershell
   cd frontend
   npm run build
   ```
2. The compiled assets will be generated in `frontend/dist/`.

### Deploy to Vercel:
```powershell
npx vercel --prod
```
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

---

## 🧪 Verification Check

- **Frontend URL**: `http://localhost:5173/` or Vercel production domain
- **Backend API Base**: `http://localhost:8080/api`
- **Database Status**: `MySQL Table Schema Synced (careerpilot_db)`
