import { motion } from 'framer-motion'
import { useRef } from 'react'

const photos = [
  { src: '/IMG_6554.webp', delay: 0 },
  { src: '/IMG_8074.webp', delay: 0.1 },
  { src: '/IMG_6364.webp', delay: 0.2 },
]

export default function Memories() {
  const trackRef = useRef(null)

  return (
    <section className="bg-[#f9f4e8] py-6 md:py-10 overflow-hidden">
      <motion.div
        className="flex gap-4 px-6 md:px-12 lg:px-20 overflow-x-auto scroll-smooth"
        ref={trackRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            className="flex-shrink-0 w-[72vw] sm:w-[52vw] md:w-[36vw] lg:w-[28vw]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 1,
              delay: photo.delay,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm">
              <img
                src={photo.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        ))}

        {/* right padding spacer */}
        <div className="flex-shrink-0 w-6 md:w-12 lg:w-20" />
      </motion.div>

      <style>{`.memories-scroll::-webkit-scrollbar { display: none; }`}</style>
    </section>
  )
}
