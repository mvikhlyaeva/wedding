import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getGuest } from '../guests'

// После создания Google Forms — заменить этот URL и entry ID'ы
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/REPLACE_WITH_YOUR_FORM_ID/formResponse'
const FIELD_IDS = {
  name: 'entry.000000001',
  attending: 'entry.000000002',
  guests: 'entry.000000003',
  comment: 'entry.000000004',
}

export default function RSVPForm() {
  const guest = getGuest()
  const [form, setForm] = useState({
    name: guest?.name || '',
    attending: '',
    guests: '1',
    comment: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const body = new URLSearchParams({
      [FIELD_IDS.name]: form.name,
      [FIELD_IDS.attending]: form.attending,
      [FIELD_IDS.guests]: form.guests,
      [FIELD_IDS.comment]: form.comment,
    })

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      })
    } catch (_) {
      // no-cors: ответ всегда opaque, ошибки сети игнорируем
    }

    setLoading(false)
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-transparent border-b border-[#2c2c2c]/20 py-3 font-sans text-[15px] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 outline-none focus:border-[#b8975a] transition-colors duration-300'

  return (
    <section className="bg-[#f5f0e8] py-24 md:py-36 px-6 md:px-12 lg:px-20">
      <div className="max-w-2xl mx-auto">

        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-[#b8975a] block mb-4">
            Подтверждение
          </span>
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-[#2c2c2c]">
            {guest ? <>Будете ли <span className="italic">с нами</span>?</> : 'Будете ли вы с нами?'}
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
              <div className="font-serif text-[4rem] text-[#b8975a] mb-6">✦</div>
              <p className="font-serif text-[clamp(1.5rem,3vw,2.2rem)] font-light italic text-[#2c2c2c] mb-4">
                Спасибо!
              </p>
              <p className="font-sans text-[14px] text-[#5a5a5a] tracking-wide">
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
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a5a5a] block mb-3">
                    Имя
                  </label>
                  <p className="font-serif italic text-[1.3rem] md:text-[1.5rem] text-[#b8975a] font-light leading-none">
                    {guest.name}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a5a5a] block mb-3">
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
                <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a5a5a] block mb-4">
                  Присутствие
                </label>
                <div className="flex gap-6">
                  {[{ value: 'yes', label: 'Да, буду' }, { value: 'no', label: 'К сожалению, нет' }].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative w-4 h-4 border border-[#b8975a] flex-shrink-0">
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
                          <div className="absolute inset-[3px] bg-[#b8975a]" />
                        )}
                      </div>
                      <span className="font-sans text-[14px] text-[#2c2c2c]">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Guests count */}
              {form.attending === 'yes' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a5a5a] block mb-3">
                    Количество гостей
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    min="1"
                    max="10"
                    className={inputClass}
                  />
                </motion.div>
              )}

              {/* Comment */}
              <div>
                <label className="font-sans text-[11px] tracking-[0.25em] uppercase text-[#5a5a5a] block mb-3">
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
                className="border border-[#2c2c2c] text-[#2c2c2c] font-sans text-[12px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#2c2c2c] hover:text-[#f5f0e8] transition-all duration-300 disabled:opacity-40"
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
