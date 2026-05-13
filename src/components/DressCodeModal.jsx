import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lookbook = [
  { src: '/dress-code/IMG_1964.jpg', alt: 'Палитра образов 1' },
  { src: '/dress-code/IMG_1966.jpg', alt: 'Палитра образов 2' },
  { src: '/dress-code/IMG_1970.jpg', alt: 'Палитра образов 3' },
]

export default function DressCodeModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-3 md:px-6 py-6 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-2xl max-h-full bg-[#f7f5f3] flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative flex items-start justify-between px-6 md:px-10 pt-7 md:pt-9 pb-5 border-b border-[#b8975a]/20 flex-shrink-0 bg-[#f7f5f3] z-10">
              <div>
                <span className="font-sans text-[10px] tracking-[0.35em] uppercase text-[#b8975a] block mb-2">
                  Lookbook
                </span>
                <h3 className="font-serif text-[1.6rem] md:text-[2rem] font-light text-[#2c2c2c] leading-tight">
                  Идеи <span className="italic">образов</span>
                </h3>
              </div>

              <button
                onClick={onClose}
                className="text-[#2c2c2c] hover:text-[#b8975a] transition-colors duration-300 p-1 -mt-1"
                aria-label="Закрыть"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                  <line x1="5" y1="5" x2="19" y2="19" />
                  <line x1="19" y1="5" x2="5" y2="19" />
                </svg>
              </button>
            </div>

            {/* Intro */}
            <div className="px-6 md:px-10 pt-6 md:pt-8 pb-2 flex-shrink-0">
              <p className="font-serif italic text-[1rem] md:text-[1.1rem] text-[#5a5a5a] leading-relaxed">
                Несколько композиций, в которых играет наша палитра — для вдохновения. Не обязательно повторять, главное — общее настроение.
              </p>
            </div>

            {/* Scrollable lookbook */}
            <div className="overflow-y-auto px-6 md:px-10 py-8 md:py-10 space-y-8 md:space-y-12">
              {lookbook.map((item, i) => (
                <motion.figure
                  key={item.src}
                  className="relative"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Number marker */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-serif italic text-[#b8975a] text-[1.05rem]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="block w-10 h-px bg-[#b8975a]/40" />
                    <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#b8975a]">
                      палитра
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative w-full bg-[#ede7d9] overflow-hidden">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      className="w-full h-auto block"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement
                        e.currentTarget.style.display = 'none'
                        const ph = parent.querySelector('[data-ph]')
                        if (ph) ph.style.display = 'flex'
                      }}
                    />
                    <div
                      data-ph
                      className="hidden absolute inset-0 items-center justify-center aspect-[3/4] text-[#b8975a]/50 font-sans text-[11px] tracking-[0.25em] uppercase text-center px-6"
                    >
                      lookbook-{i + 1}.jpg<br />
                      <span className="text-[10px] mt-1 opacity-70">положите в public/dress-code/</span>
                    </div>
                  </div>
                </motion.figure>
              ))}

              {/* Footer */}
              <div className="text-center pt-4">
                <span className="block w-10 h-px bg-[#b8975a]/40 mx-auto mb-5" />
                <p className="font-serif italic text-[0.95rem] md:text-[1.05rem] text-[#5a5a5a] leading-relaxed">
                  Будем благодарны за поддержку настроения вечера
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
