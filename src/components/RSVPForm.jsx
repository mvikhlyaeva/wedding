import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getGuest } from '../guests'
import { supabase } from '../supabase'

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdouKEx0FjOQpStE692i9YgI8E4edHqfNJsZ-CwOlDsjgDQKQ/formResponse'
const FIELD_IDS = {
  name: 'entry.176411499',
  attending: 'entry.1274058350',
  drinks: 'entry.1780015604',
  comment: 'entry.901733153',
}

const DRINK_OPTIONS = [
  'Шампанское',
  'Белое вино',
  'Красное вино',
  'Виски',
  'Коньяк',
  'Водка',
  'Джин',
  'Не пью алкоголь',
]

export default function RSVPForm() {
  const guest = getGuest()
  const [form, setForm] = useState({
    name: guest?.name || '',
    attending: '',
    drinks: [],
    comment: '',
  })
  const STORAGE_KEY = `rsvp-submitted${guest?.code ? `-${guest.code}` : ''}`
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Проверяем состояние «уже отправил»: сначала Supabase (кросс-устройство), потом localStorage
  useEffect(() => {
    async function checkSubmitted() {
      // Быстрая проверка локально
      if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === '1') {
        setSubmitted(true)
        return
      }
      // Проверка в Supabase (если есть код гостя)
      if (guest?.code) {
        const { data } = await supabase
          .from('submissions')
          .select('guest_code')
          .eq('guest_code', guest.code)
          .maybeSingle()
        if (data) {
          setSubmitted(true)
          // Кэшируем локально для будущих быстрых проверок
          try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* приватный режим */ }
        }
      }
    }
    checkSubmitted()
  }, [guest?.code, STORAGE_KEY])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const toggleDrink = (drink) => {
    setForm((prev) => ({
      ...prev,
      drinks: prev.drinks.includes(drink)
        ? prev.drinks.filter((d) => d !== drink)
        : [...prev.drinks, drink],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Google Forms multi-checkbox: повторяем тот же entry-id для каждого выбранного значения
    const body = new URLSearchParams()
    body.append(FIELD_IDS.name, form.name)
    body.append(FIELD_IDS.attending, form.attending)
    body.append(FIELD_IDS.comment, form.comment)
    form.drinks.forEach((d) => body.append(FIELD_IDS.drinks, d))

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
    } catch {
      // no-cors: ответ всегда opaque, ошибки сети игнорируем
    }

    setLoading(false)
    setSubmitted(true)

    // Сохраняем в Supabase (кросс-устройство)
    if (guest?.code) {
      try {
        await supabase
          .from('submissions')
          .upsert({ guest_code: guest.code }, { onConflict: 'guest_code' })
      } catch {
        // не блокируем UI при сетевой ошибке
      }
    }

    // Локальный кэш
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // приватный режим — игнорируем
    }
  }

  const inputClass =
    'w-full bg-transparent border-b border-[#243329]/20 py-3 font-sans text-[15px] text-[#243329] placeholder:text-[#243329]/30 outline-none focus:border-[#9c8e78] transition-colors duration-300'

  return (
    <section className="bg-[#f9f4e8] py-24 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#243329]">
            {guest ? 'Будете ли с нами?' : 'Будете ли вы с нами?'}
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-16"
            >
              <img
                src="/icons/wreath.png"
                alt=""
                className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-6 opacity-90"
              />
              <p className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light italic text-[#243329] mb-4">
                Спасибо!
              </p>
              <p className="font-sans text-[14px] text-[#5a635a] tracking-wide">
                Ваш ответ получен. Мы будем рады видеть вас 27 июня.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              {/* Name — статика для опознанных гостей, иначе input */}
              {guest ? (
                <div>
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a635a] block mb-3">
                    Имя
                  </label>
                  <p className="font-serif italic text-[1.3rem] md:text-[1.5rem] text-[#9c8e78] font-light leading-none">
                    {guest.name}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a635a] block mb-3">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Имя и фамилия"
                    className={inputClass}
                  />
                </div>
              )}

              {/* Attending */}
              <div>
                <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a635a] block mb-4">
                  Присутствие
                </label>
                <div className="flex gap-6">
                  {[{ value: 'yes', label: 'Да, буду' }, { value: 'no', label: 'К сожалению, нет' }].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative w-4 h-4 border border-[#9c8e78] flex-shrink-0">
                        <input
                          type="radio"
                          name="attending"
                          value={opt.value}
                          checked={form.attending === opt.value}
                          onChange={handleChange}
                          required
                          className="sr-only"
                        />
                        {form.attending === opt.value && (
                          <div className="absolute inset-[3px] bg-[#9c8e78]" />
                        )}
                      </div>
                      <span className="font-sans text-[14px] text-[#243329]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Drink preferences — multi-select */}
              {form.attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                >
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a635a] block mb-4">
                    Что будете пить?
                  </label>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    {DRINK_OPTIONS.map((drink) => {
                      const checked = form.drinks.includes(drink)
                      return (
                        <label key={drink} className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative w-4 h-4 border border-[#9c8e78] flex-shrink-0">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDrink(drink)}
                              className="sr-only"
                            />
                            {checked && (
                              <div className="absolute inset-[3px] bg-[#9c8e78]" />
                            )}
                          </div>
                          <span className="font-sans text-[14px] text-[#243329] leading-tight">{drink}</span>
                        </label>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* Comment */}
              <div>
                <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a635a] block mb-3">
                  Комментарий
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Пожелания, аллергии, особые пожелания..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="border border-[#243329] text-[#243329] font-sans text-[12px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#243329] hover:text-[#f9f4e8] transition-all duration-300 disabled:opacity-40"
              >
                {loading ? 'Отправляем...' : 'Подтвердить'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
