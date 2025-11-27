# 📰 **FeedsHub**

A full-stack MERN application using **React (frontend)** and **Node.js + TypeScript (backend)** with **Clean Architecture**.  
FeedsHub allows users to explore articles, personalize their content feed, and manage their own articles with a smooth and modern UI.

---

## ✅ **Features**

* 👤 User signup with **category preferences**
* 🔐 Login using **email or phone**
* 📰 Personalized article feed based on interests
* ✍️ Create / ✏️ edit / ❌ delete your articles
* 👍 Like / 👎 dislike / 🚫 block articles
* 🧱 Clean, modular, and scalable backend architecture
* 🎨 Modern and responsive React UI

---

## 🚀 **Setup Instructions**

### 🔧 Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```
---

### 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:5000
```
---

## 📡 **API Endpoints**

### 🔐 Authentication

| Method |Endpoint	                     | Description              |
| ------ | ----------------------------- | ------------------------ |
| POST	 | /api/users/register	         | Register user            |
| POST	 | /api/users/                   | login	Login user        | 
| PUT	   | /api/users/update	           | Update user profile      |
| PUT	   | /api/users/change-password	   | Change password          |

---

### 📰 Articles

| Method |	Endpoint	                   | Description               |
| ------ | ----------------------------- | ------------------------- |
| POST	 | /api/articles	               | Create article            | 
| GET	   | /api/articles	               | Get all articles          | 
| GET	   | /api/articles/feed	           | Personalized article feed |
| PUT	   | /api/articles/:id	           | Edit article              |
| DELETE | /api/articles/:id	           | Delete article            | 
| POST	 | /api/articles/:id/like	       | Like article              | 
| POST	 | /api/articles/:id/dislike	   | Dislike article           |
| POST	 | /api/articles/:id/block	     | Block article             |

## 📁 **Project Architecture**

```
server/
  src/
    domain/
    application/
    infrastructure/
    presentation/

client/
  src/
```