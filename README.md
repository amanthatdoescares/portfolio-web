# Aman's Portfolio Website

A modern, interactive portfolio website built with the MERN Stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- Modern UI/UX with dark-themed design
- Responsive layout for all devices
- Full MERN Stack implementation
- Dark/Light theme toggle
- Smooth Framer Motion animations
- Contact form with email integration
- Project showcase with details
- Skills display with categories

## 📁 Project Structure

```
portfolio-web/
├── config/db.js              # MongoDB connection
├── models/                   # Database schemas
│   ├── Contact.js
│   └── Project.js
├── routes/                   # API routes
│   ├── config.js
│   ├── contact.js
│   └── projects.js
├── client/                   # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── server.js                 # Express server
├── package.json              # Root dependencies
└── .env.example              # Environment template
```

## 🛠️ Tech Stack

### Frontend

- React + React Router
- Framer Motion (animations)
- Lucide React (icons)
- Axios (HTTP client)

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Nodemailer (email)

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio-web

# Install dependencies
npm install
cd client && npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB
mongod

# Run development server
npm run dev
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)

- Build command: npm run build
- Output: client/build
- Add environment variables

### Backend (Heroku/Railway)

- Start command: npm start
- Add MongoDB Atlas URI
- Configure environment variables

## 📱 Pages

- **Home** - Hero, Skills, Projects, About, CTA
- **Projects** - All projects with filtering
- **Contact** - Contact form and social links
- **Graphic Design** - Design portfolio section

## 🎨 Customization

Edit `client/src/pages/Home.js` to update:

- Your name and title
- Social links
- Skills
- Projects

## 📄 API Endpoints

- GET /api/config - Site configuration
- GET /api/projects - Projects list
- POST /api/contact - Contact form

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📝 License

MIT License

## 👨‍💻 Author

Aman - Student Software Developer & Graphic Designer

- GitHub: @amanthatdoescares
- LinkedIn: Aman Maurya
