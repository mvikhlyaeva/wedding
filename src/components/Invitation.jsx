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
    <section className="relative bg-[#f9f4e8] pt-24 md:pt-40 pb-4 md:pb-6 overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {guest && (
            <p
              className="font-serif italic text-[#928266] leading-tight mb-5 md:mb-7"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400 }}
            >
              {guest.greeting}!
            </p>
          )}

          <p
            className="font-serif text-[#243329] leading-[1.85]"
            style={{
              fontSize: 'clamp(1.3rem, 2.4vw, 1.5rem)',
              fontWeight: 300,
              letterSpacing: '0',
            }}
          >
            Мы решили пожениться. Теперь официально зовём вас радоваться,
            танцевать и плакать на трогательных моментах вместе с нами.
          </p>

        </motion.div>
      </div>
    </section>
  )
}
