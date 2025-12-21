# ☑️ Admin Dashboard Setup Checklist

Use this checklist to ensure your admin dashboard is properly set up and working.

---

## 📋 Pre-Setup Checklist

- [ ] Node.js is installed (v14 or higher)
- [ ] npm is available
- [ ] MongoDB is installed (local) OR MongoDB Atlas account created (cloud)
- [ ] Git is installed (optional, for version control)
- [ ] Code editor is ready (VS Code recommended)

---

## 🔧 Installation Checklist

### Backend Setup

- [ ] Navigated to server directory (`cd server`)
- [ ] Ran `npm install`
- [ ] All dependencies installed successfully
- [ ] Created `.env` file from `.env.example`
- [ ] Updated `MONGODB_URI` in `.env`
- [ ] Updated `JWT_SECRET` in `.env` (use a random string)
- [ ] Verified PORT is set to 5000
- [ ] Verified CLIENT_URL is set to http://localhost:5173

### Frontend Setup

- [ ] Created `.env` file in root directory
- [ ] Added `VITE_API_URL=http://localhost:5000/api`
- [ ] Replaced old AdminDashboard.jsx with new version
- [ ] Replaced old AdminDashboard.css with new version
- [ ] Verified AuthContext.jsx is updated

---

## 🗄️ MongoDB Setup Checklist

### Local MongoDB

- [ ] MongoDB service is running
- [ ] Can connect to MongoDB (`mongosh`)
- [ ] Database `michels-catering` is accessible

### MongoDB Atlas (Cloud)

- [ ] Created MongoDB Atlas account
- [ ] Created a cluster
- [ ] Created database user with password
- [ ] Whitelisted IP address (or 0.0.0.0/0 for development)
- [ ] Copied connection string to `.env`
- [ ] Updated connection string with actual username/password

---

## 👤 Admin User Setup

- [ ] Navigated to server directory
- [ ] Ran `npm run seed`
- [ ] Saw success message: "Admin user created successfully"
- [ ] Noted default credentials:
  - Username: `admin`
  - Password: `$2a$10$...`
- [ ] Plan to change password after first login

---

## 🚀 Server Startup Checklist

### Backend Server

- [ ] Opened terminal/PowerShell
- [ ] Navigated to server directory
- [ ] Ran `npm run dev`
- [ ] Saw "✅ MongoDB Connected"
- [ ] Saw "🚀 Server running on port 5000"
- [ ] No error messages in console
- [ ] Server is running (don't close this terminal)

### Frontend Server

- [ ] Opened NEW terminal/PowerShell
- [ ] Navigated to project root
- [ ] Ran `npm run dev`
- [ ] Saw "Local: http://localhost:5173"
- [ ] No error messages in console
- [ ] Website is accessible in browser

---

## 🧪 Testing Checklist

### Login Test

- [ ] Opened http://localhost:5173/admin/login
- [ ] Login page loads correctly
- [ ] Entered username: `admin`
- [ ] Entered password: `$2a$10$...`
- [ ] Clicked Login button
- [ ] Redirected to admin dashboard
- [ ] No error messages

### Overview Tab Test

- [ ] Overview tab is active by default
- [ ] Statistics cards are displayed
- [ ] Numbers are showing (may be 0 if no data yet)
- [ ] No error messages in browser console
- [ ] Recent activity section loads (may be empty)

### Gallery Management Test

- [ ] Clicked "Gallery Management" in sidebar
- [ ] Gallery section loads
- [ ] Clicked "Upload New Image" button
- [ ] Modal opens correctly
- [ ] Selected an image file
- [ ] Image preview shows
- [ ] Entered title (e.g., "Test Image")
- [ ] Entered description (optional)
- [ ] Selected category
- [ ] Clicked Upload button
- [ ] Saw success message
- [ ] New image appears in gallery grid
- [ ] Can toggle visibility (show/hide)
- [ ] Can delete test image

### Reviews Management Test

- [ ] Clicked "Reviews Management" in sidebar
- [ ] Reviews section loads
- [ ] Filter buttons work (All, Pending, Approved, Rejected)
- [ ] If no reviews yet, shows "No reviews found"
- [ ] Note: To test fully, need to submit a review from public site

### Navigation Test

- [ ] All sidebar items are clickable
- [ ] Switching between tabs works smoothly
- [ ] "View Website" button works
- [ ] Logout button works
- [ ] After logout, redirected to login page
- [ ] Cannot access dashboard without logging in

---

## 🔍 API Testing Checklist

### Health Check

- [ ] Opened http://localhost:5000/api/health in browser
- [ ] Saw: `{"success": true, "message": "Server is running"}`

### Authentication Endpoint

- [ ] Can test login via Postman/curl (optional)
- [ ] POST to http://localhost:5000/api/auth/login works
- [ ] Returns JWT token

### Protected Endpoints

- [ ] Dashboard stats endpoint requires authentication
- [ ] Gallery upload requires authentication
- [ ] Reviews approve/reject require authentication

---

## 🎨 UI/UX Verification

- [ ] Dashboard looks professional
- [ ] Colors are consistent (purple gradient theme)
- [ ] Icons are displaying (Font Awesome)
- [ ] Buttons have hover effects
- [ ] Modals open and close correctly
- [ ] Animations are smooth
- [ ] Alert messages appear and disappear
- [ ] Layout is responsive (try resizing window)
- [ ] Mobile view works (if applicable)

---

## 🔒 Security Verification

- [ ] Cannot access /admin/dashboard without logging in
- [ ] Token is stored in localStorage
- [ ] Token is sent with API requests
- [ ] Invalid token redirects to login
- [ ] Password is not visible in network requests
- [ ] JWT_SECRET is not exposed in frontend
- [ ] .env files are in .gitignore

---

## 📱 Integration Testing

### Public Website Integration

- [ ] Public website still works (http://localhost:5173)
- [ ] Gallery component can be updated to use MongoDB data
- [ ] Reviews component can be updated to fetch from API
- [ ] No conflicts between public and admin routes

### Data Flow Test

- [ ] Upload image in admin → Image saved to MongoDB
- [ ] Submit review (public) → Review appears in admin (pending)
- [ ] Approve review in admin → Review visible on public site
- [ ] Hide gallery item → Item not visible on public site

---

## 📊 MongoDB Data Verification

- [ ] Opened MongoDB shell or Compass
- [ ] Connected to `michels-catering` database
- [ ] Verified collections exist:
  - [ ] users
  - [ ] reviews
  - [ ] galleries
- [ ] Users collection has admin user
- [ ] Gallery collection has uploaded images (if any)
- [ ] Reviews collection has reviews (if any)

---

## 📚 Documentation Review

- [ ] Read ADMIN_SETUP_GUIDE.md
- [ ] Understood QUICK_REFERENCE.md
- [ ] Reviewed ARCHITECTURE.md
- [ ] Checked IMPLEMENTATION_SUMMARY.md
- [ ] Know where to find help

---

## 🔧 Troubleshooting Performed

If you encountered issues, mark what you tried:

- [ ] Checked both servers are running
- [ ] Verified .env files are correct
- [ ] Confirmed MongoDB is running
- [ ] Cleared browser localStorage
- [ ] Checked browser console for errors
- [ ] Checked server terminal for errors
- [ ] Verified port 5000 is not in use by another app
- [ ] Verified port 5173 is not in use by another app
- [ ] Restarted servers
- [ ] Reinstalled dependencies (`npm install`)

---

## ✨ Optional Enhancements

For the future (optional):

- [ ] Change admin password
- [ ] Create additional admin users
- [ ] Customize color scheme
- [ ] Add more categories for gallery
- [ ] Integrate reviews API with public website
- [ ] Integrate gallery API with public website
- [ ] Set up production deployment
- [ ] Configure MongoDB Atlas for production
- [ ] Set up environment-specific configs
- [ ] Add email notifications for new reviews
- [ ] Add image compression/optimization
- [ ] Add pagination for large datasets
- [ ] Add search functionality

---

## 🎉 Final Verification

- [ ] ✅ Backend server runs without errors
- [ ] ✅ Frontend server runs without errors
- [ ] ✅ Can login to admin dashboard
- [ ] ✅ Can view dashboard statistics
- [ ] ✅ Can upload and manage gallery images
- [ ] ✅ Can view and manage reviews
- [ ] ✅ All navigation works
- [ ] ✅ Logout works correctly
- [ ] ✅ System is ready for use

---

## 📝 Notes Section

Use this space to note any issues, customizations, or reminders:

```
Date: _______________

Issues encountered:
_________________________________
_________________________________
_________________________________

Solutions applied:
_________________________________
_________________________________
_________________________________

Customizations made:
_________________________________
_________________________________
_________________________________

MongoDB URI: (keep private!)
_________________________________

Admin credentials: (change default!)
Username: _________________
Password: _________________

Production deployment date:
_________________________________

```

---

## ✅ Sign-Off

Once everything is checked and working:

- [ ] All critical items completed
- [ ] System tested thoroughly
- [ ] Documentation reviewed
- [ ] Ready for production use

**Completed by:** **\*\***\_\_\_**\*\***
**Date:** **\*\***\_\_\_**\*\***
**Signature:** **\*\***\_\_\_**\*\***

---

## 🆘 Quick Help

**If you're stuck, check:**

1. **ADMIN_SETUP_GUIDE.md** - Step-by-step setup
2. **QUICK_REFERENCE.md** - Common commands
3. **ARCHITECTURE.md** - System overview
4. **Browser Console** - Frontend errors (F12)
5. **Server Terminal** - Backend errors

**Common Issues:**

- MongoDB not running → Start MongoDB service
- Port already in use → Kill process or change port
- JWT error → Check JWT_SECRET in .env
- CORS error → Verify CLIENT_URL and VITE_API_URL

---

**Remember:** This is a powerful admin system. Keep your credentials secure! 🔐

Good luck! 🚀
