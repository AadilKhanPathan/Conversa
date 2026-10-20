<div align="center">

# Conversa

### Real-time conversations, made simple.

A full-stack chat application built with **Next.js, Node.js, Express, MongoDB, and Socket.IO**.

<!-- Add a screenshot here, for example:
![Conversa preview](./docs/conversa-preview.png)
-->

</div>

---

## ✨ Overview

**Conversa** is a real-time messaging web application designed to make one-to-one communication feel fast and intuitive. It combines a responsive Next.js interface with a Node.js/Express backend, MongoDB for persistent data, and Socket.IO for real-time communication.

This project was built to practice full-stack development, API integration, authentication, database operations, and real-time event handling.

<h2>Demo</h2>
<a href="https://conversa-gge6.onrender.com">
  <img src="https://img.shields.io/badge/LIVE_DEMO-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</a>

<img width="1347" height="647" alt="image" src="https://github.com/user-attachments/assets/3d86d389-f6b3-45bb-9d52-9d3166cfa8ae" />


## 🚀 Features

- **Real-time messaging** powered by Socket.IO
- **User authentication** with protected backend routes
- **Contacts list** for opening conversations
- **Online status** to see which users are connected
- **Seen-message handling** for conversation updates
- **Image sharing** using Cloudinary
- **REST APIs** for authentication, contacts, and message history
- **Responsive interface** built with Next.js and Tailwind CSS

> Update this list if any feature is still in progress or behaves differently in the deployed version.

## 🧰 Tech Stack

| Area | Technologies |
|---|---|
| Frontend | Next.js, React, Tailwind CSS |
| Backend | Node.js, Express.js |
| Real-time communication | Socket.IO |
| Database | MongoDB |
| Image uploads | Cloudinary |
| Authentication | JWT-based authentication and cookies |
| Deployment | Render |

## 🏗️ Architecture

```text
Conversa
├── Frontend — Next.js / React
│   ├── Authentication UI
│   ├── Contacts and chat interface
│   └── Socket.IO client
│
└── Backend — Node.js / Express
    ├── Authentication routes
    ├── Message and contact APIs
    ├── Socket.IO server
    ├── MongoDB
    └── Cloudinary image uploads
```

The frontend communicates with the backend through REST APIs. Socket.IO handles real-time events, while MongoDB stores application data.

## 📸 Screenshots

Add screenshots of your actual application here. Suggested shots:

- Login / sign-up screen
- Desktop conversation view
- Mobile chat layout
- Online status and message-seen state

Store images in a `docs/` folder and embed them like this:

```md
![Conversation screen](./docs/chat-screen.png)
```

## 🔧 Getting Started

### Prerequisites

- Node.js
- pnpm (if your project uses pnpm)
- A MongoDB database
- A Cloudinary account for image uploads

### 1. Clone the repository

```bash
git clone https://github.com/AadilKhanPathan/Conversa.git
cd Conversa
```

The frontend and backend may be in separate directories or repositories. Follow the directory layout in your local project.

### 2. Install dependencies

Run this in each application directory:

```bash
pnpm install
```

If a directory uses npm instead, run `npm install` there.

### 3. Configure environment variables

Create a `.env` file in the **backend** directory. Add the variable names expected by your backend code:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env.local` file in the **frontend** directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

**Important:** These are example variable names based on the project setup. Check your source code and deployment settings for the exact names. Never commit real secrets or API credentials to GitHub.

### 4. Start the backend

From the backend directory, run the development script defined in its `package.json`, for example:

```bash
pnpm dev
```

### 5. Start the frontend

From the frontend directory, run:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> If your `package.json` uses a different script name, use the script defined in that file.

## 🔐 Environment & Deployment Notes

- Configure the production frontend URL in the backend CORS settings.
- Allow credentialed requests if authentication uses cookies.
- Set the production API and Socket.IO URLs in the frontend environment.
- Use HTTPS for deployed frontend and backend services.
- Keep secrets in your hosting provider's environment-variable settings.
- Ensure cookie options (such as `secure` and `sameSite`) match your production deployment.

## 🗺️ Roadmap

Potential improvements for future iterations:

- [ ] Add message search
- [ ] Add conversation timestamps and richer delivery states
- [ ] Add profile editing
- [ ] Improve accessibility and keyboard navigation
- [ ] Add automated tests for authentication and messaging

## 👨‍💻 Author

**Aadil Khan**

- GitHub: [@AadilKhanPathan](https://github.com/AadilKhanPathan)
- LinkedIn: Add your LinkedIn profile URL

## 📄 License

Choose a license before publishing this project for reuse. For example, add an MIT `LICENSE` file if you want to distribute it under the MIT License.
