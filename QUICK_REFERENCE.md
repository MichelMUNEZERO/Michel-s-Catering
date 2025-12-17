# 🎯 Quick Reference - Admin Dashboard Commands

## 🚀 Starting the Application

### Start Backend Server

```powershell
cd server
npm run dev
```

Server runs on: http://localhost:5000

### Start Frontend

```powershell
npm run dev
```

Website runs on: http://localhost:5173

## 🔐 Default Admin Credentials

**URL:** http://localhost:5173/admin/login

**Username:** admin
**Password:** KamutaAdmin2025!

⚠️ **Change these after first login!**

## 📦 MongoDB Commands

### Check if MongoDB is running

```powershell
mongod --version
```

### Start MongoDB (Windows)

MongoDB should start automatically as a service

### Connect to MongoDB Shell

```powershell
mongosh
```

### View databases

```javascript
show dbs
```

### Use your database

```javascript
use michels-catering
```

### View collections

```javascript
show collections
```

### View all users

```javascript
db.users.find().pretty();
```

### View all reviews

```javascript
db.reviews.find().pretty();
```

### View all gallery items

```javascript
db.galleries.find().pretty();
```

## 🛠️ Useful NPM Commands

### Backend (run from server folder)

- `npm run dev` - Start server with auto-reload
- `npm start` - Start server (production)
- `npm run seed` - Create admin user

### Frontend (run from root)

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔄 Reset Admin Password

If you forget your admin password, run this in MongoDB shell:

```javascript
use michels-catering
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync('NewPassword123!', salt)
db.users.updateOne(
  { username: 'admin' },
  { $set: { password: hash } }
)
```

## 🐛 Common Issues & Solutions

### Port 5000 already in use

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB connection error

1. Check if MongoDB service is running
2. Verify MONGODB_URI in server\.env
3. For Atlas, check IP whitelist

### JWT token error

1. Make sure JWT_SECRET is set in server\.env
2. Clear browser localStorage
3. Login again

### CORS error

1. Verify backend is running on port 5000
2. Check CLIENT_URL in server\.env
3. Check VITE_API_URL in .env

## 📊 MongoDB Data Examples

### Create a review manually

```javascript
db.reviews.insertOne({
  customerName: "John Doe",
  rating: 5,
  comment: "Excellent service!",
  email: "john@example.com",
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

### Approve all pending reviews

```javascript
db.reviews.updateMany({ status: "pending" }, { $set: { status: "approved" } });
```

### Delete all rejected reviews

```javascript
db.reviews.deleteMany({ status: "rejected" });
```

## 🔐 Create Additional Admin User

Run in MongoDB shell:

```javascript
db.users.insertOne({
  username: "newadmin",
  password: "$2a$10$hashed_password_here", // Use bcrypt to hash
  role: "admin",
  email: "newadmin@kamutaltd.com",
  createdAt: new Date(),
});
```

Or use the seed script and modify `server/scripts/seedAdmin.js`

## 📝 Environment Variables

### Backend (.env in server folder)

```env
MONGODB_URI=mongodb://localhost:27017/michels-catering
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Frontend (.env in root folder)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 File Locations

- **Backend Code:** `server/`
- **API Routes:** `server/routes/`
- **MongoDB Models:** `server/models/`
- **Frontend Code:** `src/`
- **Admin Dashboard:** `src/pages/AdminDashboard.jsx`
- **Auth Context:** `src/contexts/AuthContext.jsx`
- **API Service:** `src/services/api.js`

## 📞 API Endpoints

### Authentication

- POST `/api/auth/login`
- GET `/api/auth/verify`
- POST `/api/auth/logout`

### Dashboard

- GET `/api/dashboard/stats`
- GET `/api/dashboard/activity`

### Gallery

- GET `/api/gallery`
- POST `/api/gallery` (admin)
- PUT `/api/gallery/:id` (admin)
- DELETE `/api/gallery/:id` (admin)

### Reviews

- GET `/api/reviews` (public approved)
- GET `/api/reviews/admin/all` (admin)
- POST `/api/reviews` (public)
- PUT `/api/reviews/:id/approve` (admin)
- PUT `/api/reviews/:id/reject` (admin)
- DELETE `/api/reviews/:id` (admin)

## 🎯 Testing the API

Use these commands to test endpoints:

```powershell
# Health check
curl http://localhost:5000/api/health

# Login
curl -X POST http://localhost:5000/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"KamutaAdmin2025!"}'

# Get dashboard stats (replace YOUR_TOKEN)
curl http://localhost:5000/api/dashboard/stats `
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

For complete setup instructions, see **ADMIN_SETUP_GUIDE.md**
