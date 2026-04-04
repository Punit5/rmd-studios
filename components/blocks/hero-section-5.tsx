'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useScroll, motion } from 'motion/react'
import { ButtonColorful } from '@/components/ui/button-colorful'
import { useBooking } from '@/components/providers/booking-provider'

export function HeroSection() {
    const { open } = useBooking()

    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden">
                <section className="relative min-h-screen flex items-center">
                    <div className="absolute inset-0 overflow-hidden">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="size-full object-cover opacity-80"
                            src="/hero-bg.mp4"
                        />
                        <div className="absolute inset-0 bg-[#1C1A18]/30" />
                    </div>

                    <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-40">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="max-w-2xl"
                        >
                            <p className="text-[#C4A882] text-sm tracking-[0.3em] uppercase mb-6 font-sans">
                                Hair & Makeup Artistry
                            </p>
                            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-8">
                                Artistry At<br />
                                <em>It's Finest</em>
                            </h1>
                            <p className="text-white/70 text-lg font-sans font-light max-w-md leading-relaxed mb-12">
                                100% customized artistry for your most important moments. Serving Vancouver, Langley, Surrey & Abbotsford.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <ButtonColorful
                                    label="Book a Consultation"
                                    onClick={open}
                                    className="h-12 px-8 text-sm tracking-widest uppercase"
                                />
                                <Link
                                    href="#portfolio"
                                    className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white text-sm tracking-widest uppercase font-medium hover:border-white/80 transition-colors duration-300"
                                >
                                    View Work
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent mx-auto"
                        />
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()
    const { open } = useBooking()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.04)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className={cn(
                    'group fixed z-20 w-full transition-all duration-500',
                    scrolled ? 'bg-[#1C1A18]/90 backdrop-blur-md' : 'bg-gradient-to-b from-black/50 to-transparent'
                )}>
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className={cn(
                        'relative flex items-center justify-between transition-all duration-300',
                        scrolled ? 'py-4' : 'py-7'
                    )}>
                        <Link href="/" className="font-serif text-white text-xl italic tracking-wide">
                            RMD Studios
                        </Link>

                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="relative z-20 block cursor-pointer lg:hidden text-white">
                            {menuState ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>

                        <ul className="hidden lg:flex gap-10 text-xs tracking-[0.2em] uppercase">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="text-white/70 hover:text-white transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <ButtonColorful
                            label="Book Now"
                            onClick={open}
                            className="hidden lg:inline-flex text-xs tracking-widest uppercase"
                        />
                    </div>

                    {/* Mobile menu */}
                    <div className={cn(
                        'lg:hidden overflow-hidden transition-all duration-300',
                        menuState ? 'max-h-72 pb-6' : 'max-h-0'
                    )}>
                        <ul className="flex flex-col gap-5 pt-2 bg-[#1C1A18]/95 backdrop-blur-md -mx-6 px-6 pb-6 rounded-b-xl">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuState(false)}
                                        className="text-white/90 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => { open(); setMenuState(false) }}
                                    className="text-[#C4A882] text-xs tracking-[0.2em] uppercase">
                                    Book Now
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
