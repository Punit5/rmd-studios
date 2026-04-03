'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'

const testimonials = [
    {
        quote: "Sofia made me feel like the most beautiful version of myself. I wasn't wearing a look — I was wearing confidence.",
        client: "Isabelle R.",
        occasion: "Married, September 2024",
    },
    {
        quote: "I cried when I saw myself in the mirror. Not from stress — from joy. That's what she does.",
        client: "Priya M.",
        occasion: "Married, March 2024",
    },
    {
        quote: "Eight hours from first touch to last dance, and my look never moved. More than a makeup artist — she's an artist.",
        client: "Charlotte D.",
        occasion: "Married, June 2023",
    },
]

export function TestimonialsSection() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const current = testimonials[index]

    return (
        <section className="bg-[#FAF8F5] py-24 lg:py-36 border-t border-[#1C1A18]/8">
            <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">
                <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-16">In Their Words</p>

                <div className="relative min-h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <p className="font-serif italic text-2xl lg:text-3xl xl:text-4xl text-[#1C1A18] leading-relaxed mb-10 max-w-3xl">
                                &ldquo;{current.quote}&rdquo;
                            </p>
                            <div>
                                <p className="text-[#1C1A18] text-xs tracking-[0.25em] uppercase font-medium">
                                    {current.client}
                                </p>
                                <p className="text-[#1C1A18]/40 text-xs tracking-widest uppercase mt-1">
                                    {current.occasion}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mt-16">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`w-6 h-px transition-all duration-300 ${
                                i === index ? 'bg-[#C4A882]' : 'bg-[#1C1A18]/20'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
