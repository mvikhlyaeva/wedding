import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Тима Акимов — Точно да
// Положи MP3 в public/music/tima-akimov-tochno-da.mp3
const AUDIO_SRC = '/music/tima-akimov-tochno-da.mp3'
const TRACK_TITLE = 'Тима Акимов — Точно да'

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    // Пробуем включить автоматически
    const tryPlay = async () => {
      try {
        await audio.play()
        setPlaying(true)
      } catch (_) {
        // Браузер заблокировал autoplay — ждём первого клика
        setNeedsInteraction(true)
      }
    }
    tryPlay()

    // Если autoplay заблокирован — стартуем при первом клике/тапе по странице
    const handleFirstInteraction = async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play()
          setPlaying(true)
          setNeedsInteraction(false)
        } catch (_) {}
      }
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
    window.addEventListener('click', handleFirstInteraction)
    window.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      audio.pause()
      audioRef.current = null
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-50 flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full bg-[#2c2c2c]/85 backdrop-blur-md border border-white/10 hover:border-[#e8d5b0]/50 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-colors duration-300 group"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      title={TRACK_TITLE}
      aria-label={playing ? 'Выключить музыку' : 'Включить музыку'}
    >
      {/* Icon */}
      <span className="relative w-7 h-7 flex items-center justify-center rounded-full bg-[#e8d5b0]/15 group-hover:bg-[#e8d5b0]/25 transition-colors duration-300">
        <AnimatePresence mode="wait" initial={false}>
          {playing ? (
            /* Animated bars */
            <motion.span
              key="bars"
              className="flex items-end gap-[2px] h-3.5"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.span
                  key={i}
                  className="w-[2.5px] rounded-full bg-[#e8d5b0]"
                  animate={{ height: ['30%', '100%', '30%'] }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </motion.span>
          ) : (
            /* Muted icon */
            <motion.svg
              key="muted"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#e8d5b0"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </motion.svg>
          )}
        </AnimatePresence>
      </span>

      {/* Label */}
      <span className="font-sans text-[11px] tracking-[0.15em] uppercase whitespace-nowrap">
        {playing ? 'Музыка' : needsInteraction ? 'Включить' : 'Без звука'}
      </span>
    </motion.button>
  )
}
