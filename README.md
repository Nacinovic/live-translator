---
# 🌍 Real-time language translation 
Live Translator is a full-stack monorepo project that enables real-time translation. The app is split into a frontend built with React and a backend built with Node.js and TypeScript.

---

# 📁 Project Structure

live-translator

├── live-translator-frontend/  (React frontend)  
├── live-translator-backend/   (Node.js/Express backend)  
├── package.json               (Monorepo root for tooling/scripts)  
├── .gitignore  
└── README.md

---


# 🛠️ Prerequisites:
- Node.js (v22 or later)
- npm
- MongoDB account
- OpenAI API Key


---

# 🚀 Running the Project

## Install Dependencies:
From root folder run:

```
npm run install-all
```


## Start Backend and Frontend
To start both the frontend and backend concurrently in one terminal run from root folder:
```
npm run start
```

---

# ⚙️ Environment Variables Setup

Before running the project, you need to configure environment variables.

1. Review the `.env.example` files located in both the `live-translator-backend` and `live-translator-frontend` folders. These files contain all required variables with example values.

2. Copy each `.env.example` to `.env` in the respective folder:

```bash
cp live-translator-backend/.env.example live-translator-backend/.env
cp live-translator-frontend/.env.example live-translator-frontend/.env

