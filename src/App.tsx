import { Outlet, Link } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
        <div className="container flex items-center justify-between h-14">
          <Link to="/home" className="font-display text-xl">Billy & Bobby</Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/home">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-10 text-sm">
        <div className="container flex items-center justify-between">
          <p>© {new Date().getFullYear()} Billy & Bobby</p>
          <nav className="hidden md:flex gap-6">
            <Link to="/home">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
