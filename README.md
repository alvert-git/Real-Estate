# Real Estate Application

A full-stack, responsive real estate platform where users can browse properties, mark favorites, and agents can manage listings with image uploads.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **State Management**: Zustand
- **Animations**: GSAP (GreenSock Animation Platform)
- **Styling**: Tailwind CSS 4 (Vanilla CSS variables)
- **Icons**: Lucide React
- **Routing**: React Router Dom 7
- **API Client**: Axios
- **Notifications**: React Hot Toast

### Backend
- **Environment**: Node.js with Express
- **Language**: TypeScript (using `tsx` for development)
- **Database**: MySQL (using `mysql2` pool)
- **Authentication**: JSON Web Token (JWT) & Bcryptjs
- **Media Storage**: Cloudinary (via Multer)
- **Logging**: Winston logger

---

## ⚡ Used Indexing

To ensure high performance as the property database grows, the following indexing strategies are implemented:

1. **Database Indexing**: 
   - **Primary Keys**: Efficient lookups for properties, users, and favorites.
   - **Foreign Key Indexing**: Optimized joins between `properties` and `property_images`, as well as `favorites`.
   - **Specific Columns**: Indexing on columns like `city`, `price`, and `agent_id` to speed up filtering and fetching specific listings.
2. **Search Optimization**: 
   - Backend queries utilize `LIKE` search to provide filtered results for property titles and locations.

---

## 🔄 Website Flow

### Public Access
- **Home**: Landing page with featured properties and smooth GSAP animations.
- **FAQ**: Answers to common real estate questions.
- **Authentication**: Users can sign up or log in as either a **User** or an **Agent**.

### User Role (Protected)
- **Properties**: Access to the full searchable list of active properties.
- **Favorites**: Ability to "like" a property and save it to a personal favorites list for later viewing.

### Agent Role (Protected)
- **Dashboard**: View and manage all listings created by the agent.
- **Add Property**: A guided form to add new properties with multiple image uploads (processed via Cloudinary).
- **Soft Deletion**: Agents can archive/remove their listings without losing historical data integrity.

---

## ⚙️ How to Run

### Prerequisites
- Node.js (v18 or higher)
- MySQL Server
- Cloudinary Account (for image hosting)

### 1. Database Setup
1. Create a MySQL database named `real_estate`.
2. Ensure you have tables for `users`, `properties`, `property_images`, and `favorites`.

### 2. Backend Configuration
1. Navigate to the `Backend` directory: `cd Backend`
2. Install dependencies: `npm install`
3. Create a `.env` file (see below).
4. Start the server: `npm run dev`

### 3. Frontend Configuration
1. Navigate to the `Frontend` directory: `cd Frontend`
2. Install dependencies: `npm install`
3. Create a `.env` file (see below).
4. Start the development server: `npm run dev`

---

## 🔑 .env Configuration

### Backend (`Backend/.env`)
```env
PORT = 9000
NODE_ENV = development
DATABASE_URL = mysql://[user]:[password]@localhost:3306/real_estate
JWT_SECRET = [your_secret_key]
JWT_EXPIRES_IN = 1d
VITE_FRONTEND_URL = http://localhost:5173

# Cloudinary Config (Required for uploads)
CLOUDINARY_CLOUD_NAME = [your_cloud_name]
CLOUDINARY_API_KEY = [your_api_key]
CLOUDINARY_API_SECRET = [your_api_secret]
```

### Frontend (`Frontend/.env`)
```env
VITE_BACKEND_URL = http://localhost:9000
```
