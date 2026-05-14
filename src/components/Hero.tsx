import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/* Hero section — landing page with education timeline + stat cards */
export default function Hero() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center" style={{ padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">

        {/* Left: intro text */}
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm mb-3" style={{ color: 'var(--c-acc)' }}>{t('hero.greeting')}</p>
          <h1 className="text-5xl font-black mb-4" style={{ color: 'var(--c-t1)' }}>{t('hero.name')}</h1>
          <p className="text-base mb-2" style={{ color: 'var(--c-t2)' }}>{t('hero.title')}</p>
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--c-t3)' }}>{t('hero.bio')}</p>
          {/* CTA buttons */}
        </motion.div>

        {/* Right: education cards + stat grid */}
        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>

          {/* Education timeline items */}
          {/* Each item: university icon box + name + degree + period */}

          {/* Stats 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 mt-6">
            {/* GPA card */}
            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--c-t1)', color: 'var(--c-bg)' }}>
              <p className="text-xs uppercase tracking-widest mb-1">GPA</p>
              <p className="text-2xl font-black">{t('hero.gpa')}</p>
            </div>
            {/* Rank card */}
            <div className="rounded-xl p-4 text-center" style={{ backgroundColor: 'var(--c-card)', border: '1px solid var(--c-line)' }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--c-t3)' }}>{t('hero.rankLabel')}</p>
              <p className="text-2xl font-black" style={{ color: 'var(--c-t1)' }}>{t('hero.rank')}</p>
            </div>
            {/* CET-4 / CET-6 cards */}
          </div>

          {/* Tech stack tag cloud */}
        </motion.div>
      </div>
    </div>
  )
}
