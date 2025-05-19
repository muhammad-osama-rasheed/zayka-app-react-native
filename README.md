# 🍽️ Zayka – A Full-Stack Food Ordering App

**Zayka** is a full-featured food ordering application built using the **MERN stack** (MongoDB, Express.js, React Native, Node.js). The app offers a smooth user experience with authentication, product listing, cart, order tracking, favorites, reviews, and much more.

---

## 🛠️ Tech Stack

### Frontend (React Native)

- React Native `v0.79.2`
- Redux Toolkit
- Redux Persist
- React Navigation (Stack, Drawer, Bottom Tabs)
- React Native Toast
- React Native Vector Icons
- Lottie Animations
- Async Storage
- Ratings & Reviews
- Animatable, Modal, and UI Enhancements

## 🔧 Used Libraries & Tools

- React Native: Mobile app framework (v0.79.2)
- React Navigation: Stack, Drawer, Bottom Tabs navigations
- Redux Toolkit & React Redux: State management
- Redux Persist: Redux state persistence
- React Native Vector Icons: Icons for UI elements
- Lottie React Native: Animations
- React Native Toast Message: Toast notifications
- Async Storage: Local device storage
- React Native Modal: Popup modals
- React Native Animatable: UI animations
- React Native Ratings: Star rating components

## 🧭 Navigation

The app uses various navigation patterns to enhance user experience:

- **React Navigation Stack**  
  For navigating between screens with built-in headers and back navigation.

- **React Navigation Bottom Tabs**  
  Standard bottom tab navigation for main app sections.

- **React Navigation Drawer**  
  Side drawer menu for quick access to different parts of the app.

- **Custom Bottom Tab Navigator**  
  A fully custom-built bottom tab navigation component tailored to the app’s unique design and functionality.

### Backend (Node.js + Express + MongoDB)

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- OTP (One-Time Password) via Email
- REST APIs for:
  - Authentication
  - Products
  - Orders
  - Reviews
  - Favorites
  - User Profiles

---

## 📱 Features

### 👤 Authentication

- Signup / Login
- OTP Verification
- Forgot Password / Change Password
- JWT-based Authorization
- Secure API Routes

### 🍔 Product & Category Management

- View all food items
- See product by category
- Search food by name
- Product details with image, price, and description

### ⭐ Favorites & Reviews

- Add to Favorites
- View Favorite Items
- Submit Product Review
- View All Reviews

### 🛒 Cart & Checkout

- Add to Cart
- Cart with Quantity Handling
- Checkout Process
- Order Tracking System

### 📦 Orders

- My Orders History
- Live Order Tracking Status

### ⚙️ Profile & Settings

- View & Update Profile
- Secure User Data
- Logout Option

---

## 📂 Folder Structure

```bash
zayka/
├── App.js
├── package.json
├── src/
│   ├── assets/          # Images and icons
│   ├── components/      # Reusable components (Cards, Buttons, etc.)
│   ├── context/         # Context API setup
│   ├── navigation/      # Stack, Drawer, and Tab Navigators
│   ├── redux/           # Redux Toolkit Store, Slices
│   ├── screens/         # All UI screens (auth, Home, ProductDetails, etc.)
│   ├── utils/           # toast, fonts, color, animations, data
│   └── ...
```

> ⚠️ **Note**: The backend is located in a separate folder/repository.

---

## 🚀 Getting Started

### Frontend

```bash
# Clone the project
git clone https://github.com/muhammad-osama-rasheed/zayka-app-react-native

# Install dependencies
cd zayka-app-react-native
npm install

# Run the app (Android)
npx react-native run-android
```

Make sure Android emulator or device is connected.

---

### Backend

```bash
# Clone backend project
git clone https://github.com/muhammad-osama-rasheed/zayka-Backend-NodeJs

# Install dependencies
cd zayka-Backend-NodeJs
npm install

# Start server
npm run dev
```

> Configure your MongoDB URI and JWT Secret in `.env` file inside `zayka-backend`.

---

## 🔒 Environment Variables

Create a `.env` file in your backend root:

```env
MONGODB_URL=your_mongodb_connection_string
PORT=your_server_port
JWT_SECRET=your_jwt_secret
RESET_PASSWORD_JWT_SECRET=your_password_reset_jwt_secret
EMAIL=your_email_address
PASSWORD=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 📸 Screenshots (Optional)

_Add screenshots or a demo video here._

---

## 🙋‍♂️ Author

**Muhammad Osama**
[LinkedIn](www.linkedin.com/in/osama-rasheed-346780289) • [GitHub](https://github.com/muhammad-osama-rasheed)

---
