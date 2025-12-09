<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Fantasy Forge Calculator

A Vite + React + TypeScript application for fantasy character calculations.

View your app in AI Studio: https://ai.studio/apps/drive/13CCRs_PnElvN-MBZr6EWuxTZB-oFgKcO

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set the `GEMINI_API_KEY` in `.env.local`:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

### Quick Deploy (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Set Environment Variables:**
   - In your Vercel project dashboard, go to "Settings" → "Environment Variables"
   - Add: `GEMINI_API_KEY` with your API key value
   - Redeploy if needed

### Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Tech Stack

- **Framework:** Vite
- **Library:** React 19
- **Language:** TypeScript
- **Icons:** Lucide React
- **Deployment:** Vercel
