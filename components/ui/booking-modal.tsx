'use client'
import { useBooking } from '@/components/providers/booking-provider'
import { AnimatePresence, motion } from 'motion/react'
import { X, ArrowLeft, Flower, Sparkles, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error'

const STEPS = 3

const eventTypes = [
    {
        id: 'Wedding Makeup',
        icon: Flower,
        title: 'Wedding Makeup',
        description: "Your most important day deserves artistry that lasts.",
    },
    {
        id: 'Event Makeup',
        icon: Sparkles,
        title: 'Event Makeup',
        description: "A night out, a gala, a moment worth remembering.",
    },
]

const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 40 : -40,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    },
    exit: (dir: number) => ({
        x: dir > 0 ? -40 : 40,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
    }),
}

export function BookingModal() {
    const { isOpen, close } = useBooking()
    const [step, setStep] = useState(1)
    const [dir, setDir] = useState(1)
    const [status, setStatus] = useState<SubmitStatus>('idle')
    const [form, setForm] = useState({
        eventType: '',
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        message: '',
    })

    const goTo = (next: number) => {
        setDir(next > step ? 1 : -1)
        setStep(next)
    }

    const handleClose = () => {
        close()
        setTimeout(() => { setStep(1); setDir(1); setStatus('idle') }, 400)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async () => {
        setStatus('loading')
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            if (!res.ok) throw new Error()
            setStatus('success')
        } catch {
            setStatus('error')
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-[#1C1A18]/80 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                        className="fixed inset-x-0 bottom-0 lg:inset-0 lg:flex lg:items-center lg:justify-center z-50 pointer-events-none"
                    >
                        <div className="pointer-events-auto w-full lg:max-w-xl bg-[#2D1F18] overflow-hidden relative">

                            {/* ── Background illustration ── */}
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src="/booking-illustration.png"
                                    alt=""
                                    fill
                                    className="object-cover object-top"
                                    priority
                                />
                                <div className="absolute inset-0 bg-[#2D1F18]/85" />
                            </div>

                            {/* ── Form content ── */}
                            <div className="relative z-10">
                            <AnimatePresence mode="wait">
                            {status === 'success' ? (

                                /* ── Success screen ── */
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -24 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    className="flex flex-col items-center justify-center text-center px-10 py-16 min-h-[480px]"
                                >
                                    <motion.div
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                                    >
                                        <CheckCircle className="size-14 text-[#C4A882] mb-8 mx-auto" strokeWidth={1.2} />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                    >
                                        <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase mb-4">Request Received</p>
                                        <h2 className="font-serif text-3xl text-white mb-4">
                                            Thank you, {form.name.split(' ')[0]}
                                        </h2>
                                        <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto mb-10">
                                            Ria will review your request and be in touch within 24–48 hours.
                                        </p>
                                        <div className="w-12 h-px bg-[#C4A882]/40 mx-auto mb-10" />
                                        <button
                                            onClick={handleClose}
                                            className="text-white/40 hover:text-white text-xs tracking-[0.25em] uppercase transition-colors duration-200"
                                        >
                                            Close
                                        </button>
                                    </motion.div>
                                </motion.div>

                            ) : (
                            <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>

                            {/* Progress bar */}
                            <div className="h-px bg-white/10 w-full">
                                <motion.div
                                    className="h-full bg-[#C4A882]"
                                    animate={{ width: `${(step / STEPS) * 100}%` }}
                                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                                />
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between px-8 pt-7 pb-2">
                                <div className="flex items-center gap-4">
                                    {step > 1 && (
                                        <button
                                            onClick={() => goTo(step - 1)}
                                            className="text-white/40 hover:text-white transition-colors"
                                        >
                                            <ArrowLeft className="size-4" />
                                        </button>
                                    )}
                                    <div>
                                        <p className="text-[#C4A882] text-xs tracking-[0.3em] uppercase">
                                            Step {step} of {STEPS}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
                                    <X className="size-4" />
                                </button>
                            </div>

                            {/* Steps */}
                            <div className="overflow-hidden px-8 pb-8 pt-4 min-h-[380px] flex flex-col">
                                <AnimatePresence mode="wait" custom={dir}>
                                    {step === 1 && (
                                        <motion.div
                                            key="step1"
                                            custom={dir}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="flex flex-col flex-1"
                                        >
                                            <h2 className="font-serif text-3xl text-white mb-2">
                                                What's the occasion?
                                            </h2>
                                            <p className="text-white/40 text-sm mb-8">Select the type of event you're booking for.</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                                                {eventTypes.map((type) => {
                                                    const Icon = type.icon
                                                    const selected = form.eventType === type.id
                                                    return (
                                                        <button
                                                            key={type.id}
                                                            onClick={() => {
                                                                setForm(prev => ({ ...prev, eventType: type.id }))
                                                                setTimeout(() => goTo(2), 200)
                                                            }}
                                                            className={`
                                                                group relative text-left p-6 border transition-all duration-300 flex flex-col gap-4
                                                                ${selected
                                                                    ? 'border-[#C4A882] bg-[#C4A882]/10'
                                                                    : 'border-white/10 hover:border-[#C4A882]/50 hover:bg-white/5'
                                                                }
                                                            `}
                                                        >
                                                            <Icon className={`size-6 transition-colors duration-300 ${selected ? 'text-[#C4A882]' : 'text-white/30 group-hover:text-[#C4A882]/60'}`} />
                                                            <div>
                                                                <p className="text-white font-serif text-xl mb-1">{type.title}</p>
                                                                <p className="text-white/40 text-xs leading-relaxed">{type.description}</p>
                                                            </div>
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div
                                            key="step2"
                                            custom={dir}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="flex flex-col flex-1"
                                        >
                                            <h2 className="font-serif text-3xl text-white mb-2">Tell me about you</h2>
                                            <p className="text-white/40 text-sm mb-10">So I can reach you and plan accordingly.</p>

                                            <div className="flex flex-col gap-8 flex-1">
                                                {/* Name + Email */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                    <UnderlineInput label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                                                    <UnderlineInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                                                </div>
                                                {/* Phone + Date */}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                                    <UnderlineInput label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-0000" />
                                                    <UnderlineInput label="Event Date" name="eventDate" type="date" value={form.eventDate} onChange={handleChange} />
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => goTo(3)}
                                                disabled={!form.name || !form.email}
                                                className="mt-10 w-full py-4 bg-[#C4A882] text-[#1C1A18] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#b8976d] transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Continue
                                            </button>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div
                                            key="step3"
                                            custom={dir}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            className="flex flex-col flex-1"
                                        >
                                            <h2 className="font-serif text-3xl text-white mb-2">Your vision</h2>
                                            <p className="text-white/40 text-sm mb-10">Tell me anything that will help me create the perfect look for you.</p>

                                            <div className="flex flex-col flex-1">
                                                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-3">Message</label>
                                                <textarea
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    placeholder="Party size, location, inspiration, skin concerns..."
                                                    className="w-full bg-transparent border-b border-white/20 text-white placeholder:text-white/20 py-3 text-sm focus:outline-none focus:border-[#C4A882] transition-colors duration-300 resize-none"
                                                />
                                            </div>

                                            <p className="text-white/20 text-xs leading-relaxed border-l border-[#C4A882]/40 pl-3 mt-8 mb-6">
                                                A 50% deposit is required to secure your booking. First come, first serve basis.
                                            </p>

                                            <button
                                                type="button"
                                                onClick={handleSubmit}
                                                disabled={status === 'loading'}
                                                className="w-full py-4 bg-[#C4A882] text-[#1C1A18] text-xs tracking-[0.3em] uppercase font-medium hover:bg-[#b8976d] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                {status === 'loading' ? 'Sending...' : status === 'error' ? 'Failed — Try Again' : 'Send Request'}
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            </motion.div>
                            )}
                            </AnimatePresence>
                            </div>{/* end form content */}

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

function UnderlineInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
}: {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    type?: string
}) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-white/40 text-xs tracking-[0.2em] uppercase">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="bg-transparent border-b border-white/20 text-white placeholder:text-white/20 py-2.5 text-sm focus:outline-none focus:border-[#C4A882] transition-colors duration-300 [color-scheme:dark] w-full"
            />
        </div>
    )
}
