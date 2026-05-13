import { useRef } from 'react'
import { motion } from 'framer-motion'

const photos = [
  { src: '/IMG_8068.jpg', aspect: 'aspect-[3/4]' },
  { src: '/IMG_6364.jpg', aspect: 'aspect-[3/4]' },
  { src: '/IMG_8074.jpg', aspect: 'aspect-[3/4]' },
  { src: '/DSCF_086.JPEG', aspect: 'aspect-[2/3]' },
]

export default function Gallery() {
  const trackRef = useRef(null)

  return (
    <section className="bg-[#f5f0e8] py-24 md:py-36 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-20 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#b8975a] block mb-4">
            Галерея
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#2c2c2c]">
            Наша история
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex gap-4 md:gap-6 overflow-x-auto px-6 md:px-12 lg:px-20 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.src}
            className={`relative flex-shrink-0 w-[280px] md:w-[360px] ${photo.aspect} overflow-hidden group cursor-pointer`}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={photo.src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Scroll hint on mobile */}
      <div className="flex items-center gap-3 px-6 md:px-12 lg:px-20 mt-6 md:hidden">
        <div className="w-8 h-px bg-[#b8975a]" />
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#5a5a5a]">
          листайте
        </span>
      </div>
    </section>
  )
}
