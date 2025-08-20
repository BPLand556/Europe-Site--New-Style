# 🚀 Deployment Checklist

## Pre-Deployment

- [ ] ✅ Supabase project created and configured
- [ ] ✅ Database tables created (run SQL from README)
- [ ] ✅ Storage bucket `trip-media` created and set to Public
- [ ] ✅ Environment variables configured
- [ ] ✅ App builds successfully (`npm run build`)

## Vercel Deployment

1. **Push to GitHub:**
   ```bash
   git init
   git add -A
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variables:
     ```
     VITE_SUPABASE_URL=https://ksobplvnjnamjkzmxecw.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
     ```
   - Deploy!

3. **Configure Supabase:**
   - Go to Authentication → URL Configuration
   - Set Site URL to your Vercel domain
   - Add redirect URLs if needed

## Post-Deployment

- [ ] ✅ Site loads without errors
- [ ] ✅ Landing page displays correctly
- [ ] ✅ Navigation works between pages
- [ ] ✅ Admin login works (magic link)
- [ ] ✅ Can create posts and upload images
- [ ] ✅ Posts display correctly on blog and home
- [ ] ✅ Gallery shows uploaded images

## Troubleshooting

- **Build errors**: Check Node.js version (18+ required)
- **Supabase connection**: Verify environment variables
- **Image uploads**: Ensure Storage bucket is public
- **Authentication**: Check Supabase URL configuration

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

**Your Billy & Bobby Travel Site is ready to go! 🌍✈️**
