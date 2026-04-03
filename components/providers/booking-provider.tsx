'use client'
import { createContext, useContext, useState } from 'react'

const BookingContext = createContext<{
    isOpen: boolean
    open: () => void
    close: () => void
}>({
    isOpen: false,
    open: () => {},
    close: () => {},
})

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <BookingContext.Provider value={{
            isOpen,
            open: () => setIsOpen(true),
            close: () => setIsOpen(false),
        }}>
            {children}
        </BookingContext.Provider>
    )
}

export const useBooking = () => useContext(BookingContext)
