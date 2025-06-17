# 🎯 PickBetter – Smart Product Recommendation Platform

**PickBetter** is an intelligent product recommendation platform where users can post their product-related queries and receive helpful suggestions from others. Built with a secure and interactive interface, it promotes community-driven decision-making by allowing users to recommend alternatives with reasoning and images.

🔗 **Live Site URL:** [PickBetter Live Demo](https://marziul-pickbetter.web.app/)  


---

## 🚀 Key Features

- 🔐 **Secure Firebase Authentication:** Users can register and log in securely with email/password using Firebase Authentication.
- 💬 **Post Product Queries:** Authenticated users can post their product concerns or questions for others to respond.
- 💡 **Community Recommendations:** Other users can add recommendations for a posted query with reasons, images, and product names.
- 📈 **Real-Time Recommendation Counter:** Query cards show the number of recommendations received, updated live.
- 🛡️ **JWT-based Protected API Access:** Backend routes are secured using Firebase ID Tokens, ensuring only valid users access the data.
- 🎨 **Modern & Responsive UI:** Built with Tailwind CSS and React for a clean, mobile-friendly interface.
- 🗂️ **MongoDB Integration:** All data is stored in MongoDB Atlas, including queries and recommendations.
- 🔍 **User-Based Data Filtering:** Users can view only their queries and recommendations, with strict access control.

---

## 🛠 Tech Stack

### 🔧 Frontend
- **React** – JavaScript library for building UI
- **React Router** – For page navigation
- **Tailwind CSS** – Utility-first CSS framework
- **Firebase Auth** – For secure authentication
- **Firebase SDK** – To fetch secure ID tokens

### ⚙️ Backend
- **Express.js** – Web framework for Node.js
- **Firebase Admin SDK** – To verify ID tokens securely
- **MongoDB Atlas** – Cloud-based database
- **CORS** – For handling cross-origin requests
- **dotenv** – For managing environment variables

---

## 📦 NPM Packages Used

```bash
# Backend
npm install express cors dotenv mongodb firebase-admin

# Frontend
npm install react react-dom react-router firebase
