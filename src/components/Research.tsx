import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from './Awards'

/* Research section — numbered cards with paper citation box */
export default function Research() {
  const { t } = useTranslation()
  const items = t('research.items', { returnObjects: true }) as Array<{
    id: string; title: string; paper?: string; authorNote?: string
    period: string; tag: string; overview: string; contribution: string
  }>

  return (
    <div style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={t('research.title')} />

        <div className="flex flex-col gap-6 mt-10">
          {items.map((item, i) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: 'var(--c-card)', border: '1.5px solid var(--c-line3)', position: 'relative' }}>

              {/* Gradient top bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--c-acc), var(--c-acc3), var(--c-acc))' }} />

              <div className="p-6 md:p-8">
                {/* Header: large number accent + tag + period */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black tabular-nums"
                      style={{ fontSize: '2.8rem', lineHeight: 1, color: 'var(--c-acc)', opacity: 0.18 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'var(--c-sub)', color: 'var(--c-acc2)' }}>
                      {item.tag}
                    </span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--c-sub)', color: 'var(--c-t3)' }}>
                    {item.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--c-t1)' }}>{item.title}</h3>

                {/* Paper citation box */}
                {item.paper && (
                  <div className="flex items-start gap-3 rounded-xl p-4 mb-5"
                    style={{ backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-line)' }}>
                    <span style={{ color: 'var(--c-acc)', fontSize: '2rem', lineHeight: 0.9,
                      opacity: 0.6, flexShrink: 0, fontFamily: 'Georgia, serif' }}>"</span>
                    <div>
                      <p className="text-xs italic" style={{ color: 'var(--c-t3)' }}>{item.paper}</p>
                      {item.authorNote && (
                        <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                          style={{ backgroundColor: 'rgba(196,169,122,0.12)', color: 'var(--c-acc)' }}>
                          {item.authorNote}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 2-col content blocks */}
                <div className="grid md:grid-cols-2 gap-3">
                  {['overview', 'contribution'].map(key => (
                    <div key={key} className="rounded-xl p-4"
                      style={{ backgroundColor: 'var(--c-bg)', border: '1px solid var(--c-line)' }}>
                      <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--c-acc)' }}>
                        {t(`research.${key}Label`)}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--c-t2)', lineHeight: '1.75' }}>
                        {item[key as 'overview' | 'contribution']}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
