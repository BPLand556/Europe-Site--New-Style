# Billy & Bobby Travel Site

A beautiful travel blog built with React, Vite, Tailwind CSS, and Supabase for Billy and Bobby's three-month European adventure.

## ✨ Features

- **Landing Page**: Stunning Amalfi Coast hero image with animated title
- **Home Page**: Featured posts and journey overview
- **Blog**: All posts in a responsive grid layout
- **Individual Posts**: Full post content with Markdown support and image galleries
- **Gallery**: Masonry-style photo gallery
- **Admin Panel**: Magic link authentication and post creation from mobile
- **Responsive Design**: Beautiful on all devices
- **Supabase Integration**: Real-time database, authentication, and file storage

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20.19+ or 22.12+)
- A Supabase project (already configured)

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd billy-bobby
   npm install
   ```

2. **Environment Variables:**
   The `.env.local` file is already configured with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://ksobplvnjnamjkzmxecw.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:5173` (or the port shown in your terminal)

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  location_name text,
  date date,
  start_date date,
  end_date date,
  lat double precision,
  lng double precision,
  hero_image_path text,
  visibility text default 'public' check (visibility in ('public','private')),
  created_at timestamptz default now(),
  updated_at timestamptz
);

create or replace function public.set_post_owner()
returns trigger language plpgsql as $$
begin new.user_id := auth.uid(); return new; end $$;

drop trigger if exists trg_set_post_owner on public.posts;
create trigger trg_set_post_owner before insert on public.posts
for each row execute function public.set_post_owner();

alter table public.posts enable row level security;
create policy "read public posts" on public.posts for select using (visibility='public');
create policy "owner read private" on public.posts for select to authenticated using (auth.uid()=user_id);
create policy "owner insert" on public.posts for insert to authenticated with check (auth.uid()=user_id);
create policy "owner update" on public.posts for update to authenticated using (auth.uid()=user_id);
create policy "owner delete" on public.posts for delete to authenticated using (auth.uid()=user_id);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_path text not null,
  mime_type text,
  width int,
  height int,
  created_at timestamptz default now()
);

create or replace function public.set_media_owner()
returns trigger language plpgsql as $$
begin new.user_id := auth.uid(); return new; end $$;

drop trigger if exists trg_set_media_owner on public.media;
create trigger trg_set_media_owner before insert on public.media
for each row execute function public.set_media_owner();

alter table public.media enable row level security;
create policy "read media from public posts" on public.media for select using (
  exists (select 1 from public.posts p where p.id=media.post_id and (p.visibility='public' or p.user_id=auth.uid()))
);
create policy "owner insert media" on public.media for insert to authenticated with check (auth.uid()=user_id);
create policy "owner update media" on public.media for update to authenticated using (auth.uid()=user_id);
create policy "owner delete media" on public.media for delete to authenticated using (auth.uid()=user_id);
```

### Storage Setup

1. Create a bucket called `trip-media` in Supabase Storage
2. Set the bucket to **Public** (ON)
3. The app will automatically handle file uploads and URL generation

## 📱 Usage

### Landing Page
- Visit `/` to see the stunning Amalfi Coast landing page
- Click "Enter" or scroll to access the main site

### Navigation
- **Home** (`/home`): Featured posts and journey overview
- **Blog** (`/blog`): All posts in chronological order
- **Gallery** (`/gallery`): Photo gallery from all posts
- **Admin** (`/admin`): Post creation and management

### Creating Posts
1. Go to `/admin`
2. Enter your email to receive a magic link
3. Fill out the post form:
   - Title and content (Markdown supported)
   - Date and location
   - Hero image
   - Additional gallery images/videos
4. Click "Publish"

## 🎨 Customization

### Colors and Typography
- Edit `tailwind.config.cjs` to customize colors, fonts, and shadows
- The accent color is currently set to a warm sand tone (`#c8a37a`)
- Fonts: Inter (sans-serif) and Playfair Display (display)

### Styling
- Custom CSS classes are defined in `src/index.css`
- Use Tailwind utilities throughout the components
- Responsive design with mobile-first approach

## 🚀 Deployment

### Vercel (Recommended)

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
   - Import your repository
   - Set environment variables (same as `.env.local`)
   - Deploy

3. **Configure Supabase:**
   - Update Auth → URL Configuration with your Vercel domain
   - Ensure Storage bucket is public

### Other Platforms
The app can be deployed to any platform that supports Vite builds:
- Netlify
- Railway
- Render
- AWS Amplify

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure

```
src/
├── components/          # Reusable components
├── pages/              # Page components
│   ├── Landing.tsx     # Hero landing page
│   ├── Home.tsx        # Home page with featured posts
│   ├── Blog.tsx        # All posts grid
│   ├── Post.tsx        # Individual post view
│   ├── Gallery.tsx     # Photo gallery
│   └── Admin.tsx       # Post creation/admin
├── lib/
│   └── supabase.ts     # Supabase client
├── types.ts            # TypeScript types
├── App.tsx             # Main app layout
└── main.tsx            # App entry point
```

### Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 4 + PostCSS
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Markdown**: React Markdown
- **Date Handling**: date-fns

## 🔧 Troubleshooting

### Common Issues

1. **Tailwind classes not working**: Ensure PostCSS is configured correctly
2. **Build errors**: Check Node.js version (18+ required, 20+ recommended)
3. **Supabase connection**: Verify environment variables and project settings
4. **Image uploads**: Ensure Storage bucket exists and is public

### Node.js Version
If you encounter Vite compatibility issues, consider upgrading to Node.js 20+:
```bash
# Using nvm
nvm install 20
nvm use 20

# Or download from nodejs.org
```

## 📄 License

This project is private and built for Billy & Bobby's travel adventures.

---

**Happy travels! 🌍✈️**
