'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { ButtonColorful } from '@/components/ui/button-colorful'

export function BookingCTA() {
    return (
        <section id="booking" className="bg-[#1C1A18] py-36 lg:py-48">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="mx-auto max-w-2xl px-6 text-center"
            >
                <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-8">Available for Travel Across B.C.</p>
                <h2 className="font-serif text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-12">
                    Your day,<br />
                    <em>perfected.</em>
                </h2>
                <Link href="https://instagram.com/rmd.studios" target="_blank">
                    <ButtonColorful
                        label="Book a Consultation"
                        className="h-14 px-10 text-sm tracking-[0.2em] uppercase"
                    />
                </Link>
            </motion.div>
        </section>
    )
}
