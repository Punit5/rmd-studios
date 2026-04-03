'use client'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { useInView } from 'motion/react'

const services = [
    {
        number: '01',
        name: 'Event Makeup',
        description: "A night out, a corporate event, a new chapter — whatever the occasion, we craft a look that turns heads and feels entirely you.",
    },
    {
        number: '02',
        name: 'Wedding Makeup',
        description: "Your wedding day deserves artistry that lasts. From the first brush stroke to the final veil, I'm there — so you can simply be present.",
    },
]

function ServiceRow({ service, index }: { service: (typeof services)[0]; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
            className="relative border-t border-[#1C1A18]/10 last:border-b"
        >
            <div className="flex items-center gap-8 py-10 lg:py-12 cursor-default">
                <span className="font-serif text-[#C4A882] text-sm w-8 shrink-0">{service.number}</span>
                <h3 className="font-serif text-4xl lg:text-6xl text-[#1C1A18] flex-1">
                    {service.name}
                </h3>
                <p className="hidden md:block text-[#1C1A18]/50 text-sm max-w-xs leading-relaxed font-sans">
                    {service.description}
                </p>
            </div>

        </motion.div>
    )
}

export function ServicesSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="services" className="bg-[#FAF8F5] py-24 lg:py-36">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-16"
                >
                    <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-4">What I Offer</p>
                    <h2 className="font-serif text-5xl lg:text-6xl text-[#1C1A18]">Services</h2>
                </motion.div>

                <div>
                    {services.map((service, index) => (
                        <ServiceRow key={service.number} service={service} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    className="mt-12 border-l-2 border-[#C4A882] pl-6"
                >
                    <p className="text-[#1C1A18]/50 text-xs tracking-[0.2em] uppercase leading-relaxed">
                        All clients are required to submit a deposit of 50% in order to secure their bookings. Bookings are taken on a first come, first serve basis.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
