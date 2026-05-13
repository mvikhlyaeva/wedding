import { motion } from 'framer-motion'

const photos = [
  {
    src: '/IMG_8074.jpg',
    grid: 'col-span-7 md:col-span-4 md:col-start-1',
    delay: 0,
  },
  {
    src: '/IMG_6554.jpg',
    grid: 'col-span-10 col-start-3 md:col-span-5 md:col-start-7 md:mt-24 lg:mt-32',
    delay: 0.15,
  },
  {
    src: '/IMG_6364.jpg',
    grid: 'col-span-8 col-start-2 md:col-span-4 md:col-start-3 md:mt-12 lg:mt-16',
    delay: 0.3,
  },
]

export default function Memories() {
  return (
    <section className="bg-[#f5f0e8] py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-6 gap-y-10 md:gap-y-14">
          {photos.map((photo) => (
            <motion.div
              key={photo.src}
              className={photo.grid}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 1.1,
                delay: photo.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden">
                <img
                  src={photo.src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {photo.caption && (
                <div className="flex items-center justify-center gap-3 md:gap-4 mt-5 md:mt-6 text-[#a08368]">
                  <span className="block w-6 md:w-8 h-px bg-current/60" />
                  <p
                    className="font-serif italic font-light leading-none whitespace-nowrap"
                    style={{
                      fontSize: 'clamp(1rem, 2.4vw, 1.35rem)',
                      fontVariationSettings: '"opsz" 144, "SOFT" 100',
                    }}
                  >
                    {photo.caption}
                  </p>
                  <span className="block w-6 md:w-8 h-px bg-current/60" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
