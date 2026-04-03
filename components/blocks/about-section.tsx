'use client'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

const name = "Ria Minhas".split("")

const textVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            delay: i * 0.18,
            ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
    }),
}

export function AboutSection() {
    const sectionRef = useRef(null)
    const quoteLineRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-10%' })
    const quoteLineInView = useInView(quoteLineRef, { once: true, margin: '-10%' })

    return (
        <motion.section
            id="about"
            ref={sectionRef}
            initial={{ backgroundColor: '#FAF8F5' }}
            animate={{ backgroundColor: inView ? '#2D1F18' : '#FAF8F5' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="py-24 lg:py-36 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left — photo with curtain reveal + Ken Burns */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                        {/* Ken Burns zoom */}
                        <motion.img
                            src="/artist_image/image5.jpeg"
                            alt="Ria Minhas — RMD Studios"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.1 }}
                            animate={{ scale: inView ? 1.0 : 1.1 }}
                            transition={{ duration: 14, ease: 'easeOut' }}
                        />
                        {/* Curtain — slides up to reveal */}
                        <motion.div
                            className="absolute inset-0 bg-[#2D1F18] origin-top"
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: inView ? 0 : 1 }}
                            transition={{ duration: 1.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] }}
                            style={{ transformOrigin: 'top' }}
                        />
                    </div>

                    {/* Right — staggered text */}
                    <div className="flex flex-col justify-center">

                        <motion.p
                            custom={0}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={textVariants}
                            className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-8"
                        >
                            The Artist
                        </motion.p>

                        {/* Character-by-character name reveal */}
                        <h2 className="font-serif text-4xl lg:text-5xl text-white mb-8 leading-snug flex flex-wrap">
                            {name.map((char, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                                    animate={inView
                                        ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                                        : { opacity: 0, y: 20, filter: 'blur(4px)' }
                                    }
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.4 + i * 0.06,
                                        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                                    }}
                                    className={char === ' ' ? 'mr-3' : ''}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h2>

                        <motion.p
                            custom={3}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={textVariants}
                            className="text-white/50 text-base leading-relaxed font-sans mb-5"
                        >
                            Based in West Abbotsford, B.C., Ria is a professional freelance hair and makeup artist specializing in diverse events — from intimate bridal mornings to high-energy editorial shoots.
                        </motion.p>

                        <motion.p
                            custom={4}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={textVariants}
                            className="text-white/50 text-base leading-relaxed font-sans mb-12"
                        >
                            Detail oriented and skin focused, Ria believes the perfect skin prep is the foundation of a flawless makeup look. Every service is 100% customized to you — your face, your day, your story.
                        </motion.p>

                        {/* Quote with animated border line */}
                        <motion.div
                            custom={5}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            variants={textVariants}
                            className="relative pl-6"
                            ref={quoteLineRef}
                        >
                            {/* Animated left border */}
                            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-white/10 overflow-hidden">
                                <motion.div
                                    className="w-full bg-[#C4A882]"
                                    initial={{ scaleY: 0 }}
                                    animate={quoteLineInView ? { scaleY: 1 } : { scaleY: 0 }}
                                    style={{ height: '100%', transformOrigin: 'top' }}
                                    transition={{ duration: 2, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                                />
                            </div>

                            <p className="font-serif italic text-xl lg:text-2xl text-white leading-relaxed">
                                "Everyone has their own authentic look. At RMD we believe in making sure your unique beauty shines."
                            </p>
                            <cite className="text-[#C4A882] text-xs tracking-[0.25em] uppercase not-italic mt-4 block">
                                — Ria Minhas
                            </cite>
                        </motion.div>

                    </div>
                </div>
            </div>
        </motion.section>
    )
}
