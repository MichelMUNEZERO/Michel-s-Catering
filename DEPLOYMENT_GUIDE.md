# Deployment Guide - MongoDB Atlas + Render

## Step 1: Setup MongoDB Atlas (FREE)

1. **Create MongoDB Atlas Account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up for free

2. **Create a Free Cluster**
   - Choose "Create a Deployment"
   - Select "M0 Free" tier
   - Choose a cloud provider (AWS recommended)
   - Select a region close to you (e.g., Frankfurt for Europe)
   - Click "Create Deployment"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `kamutaadmin`
   - Password: (Click "Autogenerate Secure Password" and SAVE IT!)
   - Database User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
   ```
   mongodb+srv://kamutaadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your actual password
   - Add database name before the `?`: `/kamuta-catering?retryWrites=true&w=majority`

## Step 2: Deploy Backend to Render (FREE)

1. **Create Render Account**
   - Go to: https://render.com/
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `Michel-s-Catering`
   - Click "Connect"

3. **Configure Web Service**
   - **Name**: `kamuta-backend` (or any name you like)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable" for each:

   | Key | Value |
   |-----|-------|
   | `MONGODB_URI` | (paste your MongoDB Atlas connection string) |
   | `JWT_SECRET` | (generate a random string or use: `KamutaSecretKey2025!@#`) |
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `FRONTEND_URL` | `https://kamutaltd.vercel.app` |

5. **Deploy**
   - Click "Create Web Service"
   - Wait 2-5 minutes for deployment
   - Once done, you'll get a URL like: `https://kamuta-backend.onrender.com`

## Step 3: Update Frontend to Use Deployed Backend

After deployment completes, I'll update your frontend API URL to point to the Render backend.

## Important Notes

⚠️ **Render Free Tier Limitation**: 
- The free tier spins down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds to wake up
- This is normal for free tier

💾 **Save These URLs**:
- Backend URL: `https://your-app-name.onrender.com`
- Frontend URL: `https://kamutaltd.vercel.app`
- MongoDB Connection String (keep it secret!)

## Testing After Deployment

1. Test backend health: `https://your-backend-url.onrender.com/api/health`
2. Try login: `https://kamutaltd.vercel.app/admin/login`

---

**Are you ready to start? Let me know when you:**
1. Have created the MongoDB Atlas cluster and got the connection string
2. Have deployed to Render and got the backend URL

Then I'll update the frontend to connect to your deployed backend!
