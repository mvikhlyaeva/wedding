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
    <section className="relative bg-[#f5f0e8] py-20 md:py-36 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

          {/* Photo */}
          <motion.div
            className="relative w-full max-w-md mx-auto md:max-w-none order-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden">
              <img
                src="/IMG_8074.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="relative order-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <span className="font-sans text-[10px] md:text-[11px] tracking-[0.35em] uppercase text-[#b8975a] mb-6 md:mb-8 block">
              Приглашение
            </span>

            {guest && (
              <p className="font-serif italic text-[1.15rem] md:text-[1.4rem] text-[#b8975a] font-light mb-5 md:mb-7 leading-snug">
                {guest.greeting},
              </p>
            )}

            <blockquote className="font-serif text-[1.7rem] md:text-[2.5rem] lg:text-[3rem] leading-[1.2] text-[#2c2c2c] font-light italic">
              «В этот день мы хотим разделить нашу радость с теми, кто важен для нас»
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
