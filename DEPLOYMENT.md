# Portfolio Website - Deployment Guide

## Important: GitHub Pages is NOT suitable for MERN Stack Apps!

Your portfolio is a MERN Stack application (MongoDB, Express, React, Node.js), NOT a static Jekyll site. GitHub Pages tries to process it with Jekyll, causing errors.

## Recommended Deployment Strategy

Deploy frontend (React) and backend (Node.js) separately:

### FRONTEND (React) - Deploy to Vercel (Recommended)

1. Push to GitHub first (using setup-ssh.sh)
2. Go to Vercel: https://vercel.com
3. Import Repository: Connect your GitHub account and select the portfolio-web repository
4. Configure Settings:
   - Framework Preset: Create React App
   - Build Command: npm run build
   - Output Directory: client/build
   - Install Command: npm install && cd client && npm install
5. Add Environment Variables in Vercel Dashboard:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
6. Deploy: Vercel will automatically build and deploy

### Alternative Frontend: Netlify

- Base directory: client
- Build command: npm run build
- Publish directory: build

---

### BACKEND (Node.js + Express + MongoDB) - Deploy to Railway

1. Go to Railway: https://railway.app
2. Create Account and connect GitHub
3. New Project - Deploy from GitHub repo - Select portfolio-web
4. Add MongoDB: Click "Add Plugin" - select MongoDB
5. Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   MONGODB_URI= (auto-generated from Railway MongoDB)
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=https://your-vercel-frontend.vercel.app
   ```
6. Deploy: Railway will build and start the server

### Alternative Backend: Render

- Create Web Service from GitHub
- Build Command: npm install
- Start Command: npm start
- Add MongoDB Atlas (free tier) for database

---

## Complete Setup Instructions

### Step 1: Push to GitHub (with SSH)

```bash
chmod +x setup-ssh.sh
./setup-ssh.sh

The script will:
1. Create/check SSH key
2. Guide you to add it to GitHub
3. Initialize Git repository
4. Push to GitHub
```

### Step 2: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your portfolio-web repository
5. Configure as shown above
6. Deploy!

### Step 3: Deploy Backend to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your portfolio-web repository
6. Add MongoDB plugin
7. Add environment variables
8. Deploy!

### Step 4: Update Frontend API URL

After backend is deployed, update:
client/src/context/ApiContext.js

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://your-backend-url.railway.app";
```

Redeploy frontend to Vercel.

---

## Alternative: Deploy Everything Together (Render)

If you prefer simpler deployment:

1. Backend: Deploy to Render with MongoDB Atlas
2. Frontend: Build React app and serve from Express

This is already configured in server.js (serves static files in production).

```bash
cd client && npm run build

Deploy to Render/Railway/Heroku
The server will serve both API and frontend
```

---

## Environment Variables Reference

### Backend (.env file)

```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env in Vercel)

```
REACT_APP_API_URL=https://your-backend.railway.app
```

---

## Your Portfolio URLs

After deployment:

- Frontend: https://portfolio-web.vercel.app
- Backend API: https://portfolio-web-api.railway.app
- GitHub: https://github.com/amanthatdoescares/portfolio-web

---

## Development (Local)

```bash
npm install
cd client && npm install

mongod

npm run dev

Frontend: http://localhost:3000
Backend: http://localhost:5000
```

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas: https://www.mongodb.com/docs/atlas
- React Deployment: https://create-react-app.dev/docs/deployment
