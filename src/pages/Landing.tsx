import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Landing() {
  const nav = useNavigate()
  useEffect(() => {
    // allow scroll to enter as well
    const onWheel = () => nav('/home')
    window.addEventListener('wheel', onWheel, { once: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [nav])

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <img src="/amalfi.jpg" alt="Amalfi Coast" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <div className="uppercase tracking-[0.25em] text-sm opacity-90 mb-4">BILLY • BOBBY</div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="heading text-5xl md:text-7xl font-bold">
          THE ADVENTURES OF BILLY AND BOBBY
        </motion.h1>
        <p className="mt-4 max-w-xl opacity-90">A three-month ramble across Europe</p>
        <button onClick={() => nav('/home')} className="btn mt-8">Enter</button>
      </div>
    </div>
  )
}
