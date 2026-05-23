import { motion } from 'framer-motion'

const events = [
  { time: '15:00', label: 'Сбор гостей', icon: 'bouquet' },
  { time: '16:00', label: 'Свадебная церемония', icon: 'rings' },
  { time: '17:00', label: 'Начало банкета', icon: 'coupes' },
  { time: '21:30', label: 'Вынос торта', icon: 'cake' },
  { time: '22:00', label: 'Танцы', icon: 'note' },
  { time: '23:00', label: 'Окончание', icon: 'moon' },
]

const Flourish = () => (
  <svg
    width="280"
    height="18"
    viewBox="0 0 280 18"
    fill="none"
    className="mx-auto block"
    aria-hidden
  >
    <line x1="0" y1="9" x2="124" y2="9" stroke="#9c8e78" strokeWidth="0.9" />
    <line x1="156" y1="9" x2="280" y2="9" stroke="#9c8e78" strokeWidth="0.9" />
    <ellipse
      cx="140" cy="9"
      rx="7" ry="4.5"
      transform="rotate(-18 140 9)"
      stroke="#9c8e78"
      strokeWidth="0.9"
      fill="none"
    />
  </svg>
)

export default function Schedule() {
  return (
    <section className="bg-[#f9f4e8] pt-8 md:pt-12 pb-16 md:pb-24 px-6 overflow-hidden">
      <div className="w-fit max-w-full mx-auto">

        {/* Header */}
        <motion.div
          className="mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[2.4rem] md:text-[3rem] font-light leading-tight text-[#243329] text-center">
            Программа дня
          </h2>
        </motion.div>

        {/* Top flourish */}
        <motion.div
          className="text-[#9c8e78] mb-7 md:mb-9"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish />
        </motion.div>

        {/* Events grid — содержимое прижато слева, линия в col 2 */}
        <div
          className="relative grid items-center gap-x-6 md:gap-x-10 gap-y-6 md:gap-y-8"
          style={{ gridTemplateColumns: 'auto auto auto' }}
        >
          {/* Vertical line — explicit placement в col 2, span всех 6 строк */}
          <motion.div
            className="w-px bg-gradient-to-b from-transparent via-[#9c8e78]/55 to-transparent justify-self-center self-stretch origin-top pointer-events-none"
            style={{ gridColumn: 2, gridRow: '1 / span 6' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          {events.map((event, i) => (
            <Row key={event.time} event={event} index={i} />
          ))}
        </div>

        {/* Bottom flourish */}
        <motion.div
          className="text-[#9c8e78] mt-7 md:mt-9"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Flourish />
        </motion.div>
      </div>
    </section>
  )
}

function Row({ event, index }) {
  const baseDelay = 0.5 + index * 0.13
  const rowNum = index + 1

  return (
    <>
      {/* Time */}
      <motion.span
        className="font-serif italic text-[17px] md:text-[20px] tracking-[0.04em] text-[#9c8e78] text-right"
        style={{ gridColumn: 1, gridRow: rowNum }}
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.85, delay: baseDelay, ease: [0.22, 1, 0.36, 1] }}
      >
        {event.time}
      </motion.span>

      {/* Event icon — на «островке» чтобы перебить линию позади */}
      <motion.span
        className="relative flex items-center justify-center bg-[#f9f4e8] px-2 z-10"
        style={{ gridColumn: 2, gridRow: rowNum }}
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: 1,
          delay: baseDelay + 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src={`/icons/event-${event.icon}.png`}
          alt=""
          className="w-12 h-12 md:w-14 md:h-14 object-contain"
          style={{ opacity: 0.9 }}
        />
      </motion.span>

      {/* Label */}
      <motion.span
        className="font-serif text-[1.15rem] md:text-[1.35rem] text-[#243329] font-light leading-snug"
        style={{ gridColumn: 3, gridRow: rowNum }}
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{
          duration: 0.85,
          delay: baseDelay + 0.18,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {event.label}
      </motion.span>
    </>
  )
}
