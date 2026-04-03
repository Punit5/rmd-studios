import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-[#1C1A18] border-t border-white/8 py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="font-serif italic text-white text-lg">RMD Studios</span>
                <div className="flex items-center gap-8 text-white/40 text-xs tracking-[0.2em] uppercase">
                    <Link href="https://instagram.com/rmd.studios" target="_blank" className="hover:text-[#C4A882] transition-colors duration-200">
                        @rmd.studios
                    </Link>
                    <Link href="https://facebook.com/rmdstudiosvancouverhmua" target="_blank" className="hover:text-[#C4A882] transition-colors duration-200">
                        Facebook
                    </Link>
                    <span className="text-white/20">West Abbotsford, B.C.</span>
                </div>
            </div>
        </footer>
    )
}
