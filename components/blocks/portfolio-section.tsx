'use client'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { useInView } from 'motion/react'

const images = [
    { src: '/work_images/image6.jpeg', aspect: 'tall', col: 'col-span-1 row-span-2' },
    { src: '/work_images/image1-0001.jpeg', aspect: 'wide', col: 'col-span-2' },
    { src: '/work_images/image3.jpeg', aspect: 'square', col: 'col-span-1' },
    { src: '/work_images/image6 (1).jpeg', aspect: 'square', col: 'col-span-1' },
    { src: '/work_images/image1-0001.jpeg', aspect: 'square', col: 'col-span-1' },
    { src: '/work_images/image3.jpeg', aspect: 'wide', col: 'col-span-2' },
]

const aspectMap: Record<string, string> = {
    tall: 'aspect-[3/4]',
    wide: 'aspect-[16/9]',
    square: 'aspect-square',
}

export function PortfolioSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="portfolio" className="bg-[#1C1A18] py-24 lg:py-36">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="flex items-end justify-between mb-16"
                >
                    <div>
                        <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-4">Selected Work</p>
                        <h2 className="font-serif text-5xl lg:text-6xl text-white">Portfolio</h2>
                    </div>
                    <p className="hidden md:block text-white/40 text-sm font-sans max-w-xs text-right leading-relaxed">
                        Each image is a story — of a morning, a feeling, a woman stepping into her most beautiful self.
                    </p>
                </motion.div>

                <div className="grid grid-cols-3 gap-3 lg:gap-4">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.8, delay: i * 0.08, ease: 'easeOut' }}
                            className={`${img.col} overflow-hidden group`}
                        >
                            <div className={`${aspectMap[img.aspect]} w-full overflow-hidden`}>
                                <img
                                    src={img.src}
                                    alt=""
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
