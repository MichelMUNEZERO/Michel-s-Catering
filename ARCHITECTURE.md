# 📐 Michel's Catering - System Architecture

## 🏗️ Overall Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT SIDE                              │
│                    (React + Vite - Port 5173)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Public     │  │    Admin     │  │    Admin     │          │
│  │   Website    │  │    Login     │  │  Dashboard   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│         │                  │                  │                  │
│         └──────────────────┴──────────────────┘                  │
│                            │                                     │
│                   ┌────────▼────────┐                           │
│                   │   AuthContext   │                           │
│                   │   API Service   │                           │
│                   └────────┬────────┘                           │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    HTTP/REST API
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                         SERVER SIDE                            │
│                   (Express.js - Port 5000)                     │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │    Auth      │  │   Gallery    │  │   Reviews    │        │
│  │   Routes     │  │   Routes     │  │   Routes     │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                  │                  │                 │
│         └──────────────────┴──────────────────┘                 │
│                            │                                    │
│                   ┌────────▼────────┐                          │
│                   │   Middleware    │                          │
│                   │  (JWT, CORS)    │                          │
│                   └────────┬────────┘                          │
└────────────────────────────┼─────────────────────────────────┘
                             │
                        Mongoose ODM
                             │
┌────────────────────────────▼─────────────────────────────────┐
│                      DATABASE LAYER                           │
│                   (MongoDB - Port 27017)                      │
├───────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Users     │  │   Reviews    │  │   Gallery    │       │
│  │  Collection  │  │  Collection  │  │  Collection  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. Admin Login Flow

```
User enters credentials
        ↓
AdminLogin Component
        ↓
AuthContext.login()
        ↓
API: POST /api/auth/login
        ↓
Server validates credentials
        ↓
Generate JWT token
        ↓
Return token + user data
        ↓
Store token in localStorage
        ↓
Redirect to Dashboard
```

### 2. Gallery Upload Flow

```
Admin selects image
        ↓
AdminDashboard Component
        ↓
Form with image + metadata
        ↓
API: POST /api/gallery
   (FormData with file)
        ↓
Multer middleware
        ↓
Save file to disk
        ↓
Create Gallery document
        ↓
Save to MongoDB
        ↓
Return success + data
        ↓
Update UI
```

### 3. Review Approval Flow

```
Customer submits review
        ↓
API: POST /api/reviews
   (status: pending)
        ↓
Save to MongoDB
        ↓
Admin views in Dashboard
        ↓
Admin clicks Approve
        ↓
API: PUT /api/reviews/:id/approve
        ↓
Update status to 'approved'
        ↓
Review appears on website
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   Login     │
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Validate   │
│ Credentials │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Generate   │
│  JWT Token  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Return    │
│   Token     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Store     │
│ localStorage│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Include   │
│  in Header  │
│  (Bearer)   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Verify    │
│   Middleware│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Access    │
│   Granted   │
└─────────────┘
```

## 📁 Project Structure

```
Michel-s-Catering/
│
├── server/                         # Backend
│   ├── config/
│   │   └── database.js            # MongoDB connection
│   ├── middleware/
│   │   └── auth.js                # JWT verification
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Review.js              # Review schema
│   │   └── Gallery.js             # Gallery schema
│   ├── routes/
│   │   ├── auth.js                # Auth endpoints
│   │   ├── dashboard.js           # Dashboard stats
│   │   ├── gallery.js             # Gallery CRUD
│   │   └── reviews.js             # Reviews CRUD
│   ├── scripts/
│   │   └── seedAdmin.js           # Create admin user
│   ├── .env                       # Environment config
│   ├── package.json
│   └── server.js                  # Main server file
│
├── src/                            # Frontend
│   ├── components/                # Public components
│   │   ├── Header.jsx
│   │   ├── Gallery.jsx
│   │   ├── Reviews.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── AdminLogin.jsx         # Login page
│   │   └── AdminDashboard.jsx     # Dashboard page
│   ├── contexts/
│   │   └── AuthContext.jsx        # Auth state management
│   ├── services/
│   │   └── api.js                 # API helper functions
│   ├── styles/
│   │   ├── AdminLogin.css
│   │   └── AdminDashboard.css
│   └── App.jsx                    # Main app component
│
├── public/
│   └── Photo/
│       └── Gallery Photos/        # Uploaded images
│
├── .env                            # Frontend config
├── package.json
├── ADMIN_SETUP_GUIDE.md           # Complete setup guide
├── QUICK_REFERENCE.md             # Quick commands
└── setup-admin.ps1                # Setup script
```

## 🔗 API Endpoints Map

```
/api
├── /auth
│   ├── POST /login              → Login admin
│   ├── GET /verify              → Verify token
│   └── POST /logout             → Logout
│
├── /dashboard
│   ├── GET /stats               → Get statistics
│   └── GET /activity            → Get recent activity
│
├── /gallery
│   ├── GET /                    → Get all items
│   ├── GET /:id                 → Get single item
│   ├── POST /                   → Upload image (admin)
│   ├── PUT /:id                 → Update item (admin)
│   └── DELETE /:id              → Delete item (admin)
│
└── /reviews
    ├── GET /                    → Get approved reviews
    ├── GET /admin/all           → Get all reviews (admin)
    ├── GET /:id                 → Get single review
    ├── POST /                   → Submit review (public)
    ├── PUT /:id/approve         → Approve review (admin)
    ├── PUT /:id/reject          → Reject review (admin)
    └── DELETE /:id              → Delete review (admin)
```

## 🗄️ MongoDB Schema Relationships

```
┌─────────────┐
│    Users    │
│─────────────│
│ _id         │◄──────────┐
│ username    │           │
│ password    │           │
│ role        │           │
│ email       │           │
└─────────────┘           │
                          │
                     uploadedBy
                          │
┌─────────────┐           │
│   Gallery   │           │
│─────────────│           │
│ _id         │           │
│ title       │           │
│ imageUrl    │───────────┘
│ uploadedBy  │
│ category    │
│ isActive    │
└─────────────┘

┌─────────────┐
│   Reviews   │
│─────────────│
│ _id         │
│ customer    │
│ rating      │
│ comment     │
│ status      │──┐
│ approvedBy  │◄─┴─── References User._id
└─────────────┘
```

## 🚀 Request/Response Examples

### Login Request

```json
POST /api/auth/login

Request:
{
  "username": "admin",
  "password": "KamutaAdmin2025!"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "role": "admin"
  }
}
```

### Get Dashboard Stats

```json
GET /api/dashboard/stats
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "gallery": {
      "total": 30,
      "active": 28,
      "inactive": 2
    },
    "reviews": {
      "total": 45,
      "pending": 5,
      "approved": 38,
      "rejected": 2,
      "averageRating": 4.6
    }
  }
}
```

### Upload Gallery Image

```json
POST /api/gallery
Authorization: Bearer <token>
Content-Type: multipart/form-data

FormData:
- image: <file>
- title: "Wedding Event"
- description: "Beautiful setup"
- category: "event"

Response:
{
  "success": true,
  "message": "Gallery item created successfully",
  "data": {
    "_id": "...",
    "title": "Wedding Event",
    "imageUrl": "/Photo/Gallery Photos/1234567890.jpg",
    "uploadedBy": {
      "username": "admin"
    }
  }
}
```

## 🔒 Security Layers

```
1. Frontend
   ├── Route Protection (AuthContext)
   ├── Token Storage (localStorage)
   └── Conditional Rendering

2. Backend
   ├── JWT Verification (middleware)
   ├── Role-Based Access Control
   ├── Input Validation
   └── CORS Configuration

3. Database
   ├── Password Hashing (bcrypt)
   ├── Schema Validation (Mongoose)
   └── Connection Security
```

---

This architecture provides a complete, secure, and scalable admin dashboard system for your catering business!
