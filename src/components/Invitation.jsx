import { motion } from 'framer-motion'
import { getGuest } from '../guests'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Invitation() {
  const guest = getGuest()
  return (
    <section className="relative bg-[#f5f0e8] pt-24 md:pt-40 pb-12 md:pb-20 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {guest && (
            <p
              className="font-serif italic font-light text-[#a08368] leading-tight mb-8 md:mb-12"
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)' }}
            >
              {guest.greeting},
            </p>
          )}

          <blockquote
            className="font-serif font-light text-[#243329] leading-[1.15]"
            style={{
              fontSize: 'clamp(1.7rem, 4.8vw, 3.2rem)',
              letterSpacing: '-0.01em',
            }}
          >
            В этот день мы хотим разделить нашу{' '}
            <em className="italic text-[#a08368]">радость</em> с теми, кто
            важен для нас
          </blockquote>

        </motion.div>
      </div>
    </section>
  )
}
