import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/* Competition section — CSS subgrid for equal-height row alignment */

interface CompItem {
  name: string; award: string; level: string; period: string
  overview: string; contribution: string
}

export default function Competition() {
  const { t } = useTranslation()
  const items = t('competition.items', { returnObjects: true }) as CompItem[]

  return (
    <div className="relative" style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">

        {/*
          CSS subgrid trick — each card spans 3 rows (header / overview / contribution).
          Outer grid auto-sizes rows so both cards' blocks align perfectly.

          .card {
            display: grid;
            grid-template-rows: subgrid;
            grid-row: span 3;
          }
        */}
        <div className="mt-10 grid gap-6" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.12 }}
              className="rounded-2xl overflow-hidden relative"
              style={{
                backgroundColor: 'var(--c-card)', border: '1.5px solid var(--c-line3)',
                display: 'grid', gridTemplateRows: 'subgrid', gridRow: 'span 3',
              }}>
              {/* Gradient top bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg, var(--c-acc), var(--c-acc3))', zIndex: 1 }} />

              {/* Row 1: header (emoji + badge + title) */}
              <div className="px-6 pt-7 pb-4">
                <div className="flex items-start gap-4">
                  <span style={{ fontSize: '3.2rem', lineHeight: 1 }}>🏅</span>
                  <div className="pt-1">
                    <div className="flex gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: 'rgba(196,169,122,0.14)', color: 'var(--c-acc)' }}>
                        {item.award}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: 'var(--c-sub)', color: 'var(--c-t3)' }}>
                        {item.period}
                      </span>
                    </div>
                    <h3 className="text-base font-bold" style={{ color: 'var(--c-t1)' }}>{item.name}</h3>
                  </div>
                </div>
              </div>

              {/* Row 2: overview */}
              <div className="px-6 pb-0.5">
                <div className="rounded-xl p-4 h-full" style={{ backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-line)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-acc)' }}>
                    {t('competition.overviewLabel')}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--c-t2)', lineHeight: '1.75' }}>{item.overview}</p>
                </div>
              </div>

              {/* Row 3: contribution */}
              <div className="px-6 pb-6">
                <div className="rounded-xl p-4 h-full" style={{ backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-line)' }}>
                  <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-acc)' }}>
                    {t('competition.contributionLabel')}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--c-t2)', lineHeight: '1.75' }}>{item.contribution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
