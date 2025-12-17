\# 🚀 Quick Setup Instructions

## You need to configure MongoDB before running the seed command!

### Option A: Local MongoDB (Recommended for Development)

1. **Check if MongoDB is installed:**

   ```bash
   mongod --version
   ```

2. **If NOT installed, download and install:**

   - Windows: https://www.mongodb.com/try/download/community
   - Choose "Complete" installation
   - MongoDB will run as a Windows Service automatically

3. **Verify MongoDB is running:**

   ```bash
   sc query MongoDB
   ```

   Should show "RUNNING"

4. **Once MongoDB is running, create admin user:**
   ```bash
   npm run seed
   ```

### Option B: MongoDB Atlas (Cloud - Free Tier)

1. **Go to:** https://www.mongodb.com/cloud/atlas
2. **Create free account** and cluster
3. **Create database user** (username + password)
4. **Whitelist your IP** (or use 0.0.0.0/0 for development)
5. **Get connection string** (looks like: `mongodb+srv://...`)
6. **Update server/.env:**
   ```env
   MONGODB_URI=mongodb+srv://michelmunezero25_db_user:<db_password>@kamuta.xpg665e.mongodb.net/
   ```
7. **Create admin user:**
   ```bash
   npm run seed
   ```

## After MongoDB is configured:

```bash
# Create admin user
npm run seed

# Start server
npm run dev
```

Default admin credentials will be:

- Username: `admin`
- Password: `KamutaAdmin2025!`

For complete instructions, see: ADMIN_SETUP_GUIDE.md
