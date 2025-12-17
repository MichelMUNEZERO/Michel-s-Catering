# Michel's Catering - Server API

Backend API server for Michel's Catering Admin Dashboard with MongoDB integration.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string and JWT secret:

```env
MONGODB_URI=mongodb://localhost:27017/michels-catering
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**

```bash
mongod
```

**Mac/Linux:**

```bash
sudo systemctl start mongodb
```

Or use **MongoDB Atlas** (cloud) - just update the `MONGODB_URI` in `.env`.

### 4. Seed Admin User

Create the initial admin account:

```bash
npm run seed
```

Default credentials:

- **Username:** `admin`
- **Password:** `KamutaAdmin2025!`

⚠️ **IMPORTANT:** Change these credentials after first login!

### 5. Start Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify token
- `POST /api/auth/logout` - Logout

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/dashboard/activity` - Get recent activity

### Gallery Management

- `GET /api/gallery` - Get all gallery items
- `GET /api/gallery/:id` - Get single item
- `POST /api/gallery` - Upload new image (admin only)
- `PUT /api/gallery/:id` - Update gallery item (admin only)
- `DELETE /api/gallery/:id` - Delete gallery item (admin only)

### Reviews Management

- `GET /api/reviews` - Get approved reviews (public)
- `GET /api/reviews/admin/all` - Get all reviews (admin only)
- `POST /api/reviews` - Submit new review (public)
- `PUT /api/reviews/:id/approve` - Approve review (admin only)
- `PUT /api/reviews/:id/reject` - Reject review (admin only)
- `DELETE /api/reviews/:id` - Delete review (admin only)

## 🔐 MongoDB Collections

### Users Collection

```javascript
{
  username: String,
  password: String (hashed),
  role: String (admin/superadmin),
  email: String,
  createdAt: Date,
  lastLogin: Date
}
```

### Reviews Collection

```javascript
{
  customerName: String,
  rating: Number (1-5),
  comment: String,
  email: String,
  status: String (pending/approved/rejected),
  approvedBy: ObjectId (ref: User),
  approvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery Collection

```javascript
{
  title: String,
  description: String,
  imageUrl: String,
  category: String (event/food/service/team/other),
  uploadedBy: ObjectId (ref: User),
  isActive: Boolean,
  displayOrder: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **Role-based Access Control** - Admin-only routes protected
- **Input Validation** - Request validation on all endpoints
- **CORS Protection** - Configured for frontend origin

## 📦 Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **dotenv** - Environment variables

## 🔧 Troubleshooting

**MongoDB Connection Error:**

- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas, check network access and credentials

**JWT Token Error:**

- Ensure JWT_SECRET is set in .env
- Check token expiration (24h default)

**File Upload Error:**

- Verify public/Photo/Gallery Photos directory exists
- Check file size limits (5MB default)
- Ensure image format is supported (jpg, png, gif, webp)
