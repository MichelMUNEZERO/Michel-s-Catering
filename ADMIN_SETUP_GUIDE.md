# 🚀 Michel's Catering - Admin Dashboard Setup Guide

## ✨ What Has Been Created

I've built a complete **Admin Dashboard** system with **MongoDB integration** for your Michel's Catering website. Here's what you now have:

### 📦 Backend (Server)

- ✅ Express.js API server
- ✅ MongoDB database with 3 collections (Users, Reviews, Gallery)
- ✅ JWT authentication system
- ✅ Protected API routes with role-based access
- ✅ File upload functionality for images
- ✅ RESTful API endpoints for all operations

### 🎨 Frontend (React)

- ✅ Modern Admin Dashboard with 3 main sections
- ✅ Overview page with statistics and analytics
- ✅ Gallery Management (upload, edit, delete images)
- ✅ Reviews Management (approve, reject, delete reviews)
- ✅ Updated authentication system
- ✅ API service layer for backend communication

---

## 📋 Step-by-Step Setup Instructions

### **STEP 1: Install MongoDB**

#### Option A: Local MongoDB (Recommended for Development)

**Windows:**

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. MongoDB will install as a Windows Service and start automatically
4. Verify installation:

```powershell
mongod --version
```

**Mac:**

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**

```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option B: MongoDB Atlas (Cloud - Free Tier Available)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs during development)
6. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

---

### **STEP 2: Install Backend Dependencies**

Open PowerShell/Terminal and navigate to the server directory:

```powershell
cd "C:\Users\miche\Desktop\Kamuta Ltd\Michel-s-Catering\server"
npm install
```

This will install:

- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv
- cors
- multer

---

### **STEP 3: Configure Environment Variables**

1. In the `server` folder, create a `.env` file (copy from `.env.example`):

```powershell
cd server
copy .env.example .env
```

2. Edit the `.env` file with your actual values:

```env
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/michels-catering

# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/michels-catering?retryWrites=true&w=majority

# Generate a strong secret key (use any random string)
JWT_SECRET=your-super-secret-jwt-key-CHANGE-THIS-NOW

# Server configuration
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

**⚠️ IMPORTANT:** Change the `JWT_SECRET` to a random, secure string!

---

### **STEP 4: Create Admin User**

Run the seed script to create your first admin account:

```powershell
cd server
npm run seed
```

You'll see:

```
✅ Admin user created successfully!
📧 Username: admin
🔑 Password: KamutaAdmin2025!
```

**⚠️ IMPORTANT:** Change this password after your first login!

---

### **STEP 5: Start the Backend Server**

```powershell
cd server
npm run dev
```

You should see:

```
✅ MongoDB Connected: localhost:27017
📦 Database: michels-catering
🚀 Server running on port 5000
📍 API endpoint: http://localhost:5000/api
🏥 Health check: http://localhost:5000/api/health
```

**Leave this terminal running!**

---

### **STEP 6: Update Frontend Files**

The new admin dashboard files have been created with `.new` extension. You need to replace the old files:

#### Windows PowerShell:

```powershell
cd "C:\Users\miche\Desktop\Kamuta Ltd\Michel-s-Catering\src"

# Backup old files
copy pages\AdminDashboard.jsx pages\AdminDashboard.old.jsx
copy styles\AdminDashboard.css styles\AdminDashboard.old.css

# Replace with new files
move pages\AdminDashboard.new.jsx pages\AdminDashboard.jsx -Force
move styles\AdminDashboard.new.css styles\AdminDashboard.css -Force
```

---

### **STEP 7: Start the Frontend**

Open a **NEW terminal window** and run:

```powershell
cd "C:\Users\miche\Desktop\Kamuta Ltd\Michel-s-Catering"
npm run dev
```

Your website will start on `http://localhost:5173`

---

### **STEP 8: Test the Admin Dashboard**

1. Open your browser and go to: `http://localhost:5173/admin/login`
2. Login with:
   - **Username:** `admin`
   - **Password:** `KamutaAdmin2025!`
3. You should see the new Admin Dashboard!

---

## 🎯 Admin Dashboard Features

### **1. Overview Page**

- View total gallery items, reviews, pending approvals
- See average rating
- View recent activity

### **2. Gallery Management**

- Upload new images with title, description, and category
- View all gallery items
- Toggle visibility (show/hide images)
- Delete images
- Automatic file upload to server

### **3. Reviews Management**

- View all customer reviews
- Filter by status (All, Pending, Approved, Rejected)
- Approve or reject reviews
- Delete reviews
- See customer ratings and comments

---

## 🔐 Security Features

✅ **JWT Authentication** - Secure token-based login
✅ **Password Hashing** - bcrypt with salt rounds
✅ **Protected Routes** - Admin-only API endpoints
✅ **CORS Protection** - Frontend-backend security
✅ **Role-Based Access** - Admin privileges required
✅ **Input Validation** - All API requests validated

---

## 📚 MongoDB Collections Structure

### **Users Collection**

```javascript
{
  username: "admin",
  password: "hashed_password",
  role: "admin",
  email: "admin@kamutaltd.com",
  createdAt: Date,
  lastLogin: Date
}
```

### **Reviews Collection**

```javascript
{
  customerName: "John Doe",
  rating: 5,
  comment: "Great service!",
  email: "john@example.com",
  status: "pending", // pending | approved | rejected
  approvedBy: ObjectId,
  approvedAt: Date,
  createdAt: Date
}
```

### **Gallery Collection**

```javascript
{
  title: "Wedding Event",
  description: "Beautiful wedding catering",
  imageUrl: "/Photo/Gallery Photos/image.jpg",
  category: "event", // event | food | service | team | other
  uploadedBy: ObjectId,
  isActive: true,
  displayOrder: 0,
  createdAt: Date
}
```

---

## 🛠️ API Endpoints Reference

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Dashboard

- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/activity` - Get recent activity

### Gallery

- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Upload new image (admin only)
- `PUT /api/gallery/:id` - Update gallery item (admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (admin only)

### Reviews

- `GET /api/reviews` - Get approved reviews (public)
- `GET /api/reviews/admin/all` - Get all reviews (admin only)
- `POST /api/reviews` - Submit new review (public)
- `PUT /api/reviews/:id/approve` - Approve review (admin only)
- `PUT /api/reviews/:id/reject` - Reject review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

---

## 🐛 Troubleshooting

### Backend Won't Start

```powershell
# Check if MongoDB is running
mongod --version

# Check if port 5000 is available
netstat -ano | findstr :5000

# Check .env file exists in server folder
ls server\.env
```

### MongoDB Connection Error

- **Local:** Make sure MongoDB service is running
- **Atlas:** Check your connection string, username, password, and IP whitelist

### JWT Token Error

- Make sure `JWT_SECRET` is set in `.env`
- Clear browser localStorage and login again

### CORS Error

- Make sure backend is running on port 5000
- Check `CLIENT_URL` in server `.env`
- Verify `VITE_API_URL` in frontend `.env`

---

## 📝 Next Steps

1. ✅ Change the default admin password
2. ✅ Update the JWT_SECRET in `.env`
3. ✅ Test uploading gallery images
4. ✅ Test review approval workflow
5. ✅ Customize the MongoDB connection for production
6. ✅ Consider adding more admin users

---

## 🎨 Customization Options

### Add More Admin Users

```javascript
// Create in MongoDB or use the API
{
  username: "newadmin",
  password: "hashed_password",
  role: "admin",
  email: "newadmin@kamutaltd.com"
}
```

### Customize Upload Directory

Edit `server/routes/gallery.js`, line 7:

```javascript
destination: function (req, file, cb) {
  cb(null, path.join(__dirname, '../../public/Photo/Gallery Photos'));
}
```

---

## 📞 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check that both frontend and backend servers are running

---

## 🎉 Congratulations!

Your Admin Dashboard is now ready to use! You can:

- ✅ Upload and manage gallery images
- ✅ Approve customer reviews before they go live
- ✅ Monitor website statistics
- ✅ Manage all content securely

Happy managing! 🚀
