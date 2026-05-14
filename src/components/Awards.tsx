import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

/* Reusable UI primitives — re-exported and used by other sections */
export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-2">
      <h2 className="text-3xl font-black flex items-center gap-3" style={{ color: 'var(--c-t1)' }}>
        <span style={{ width: 4, height: 32, backgroundColor: 'var(--c-acc)', borderRadius: 2, display: 'inline-block' }} />
        {title}
      </h2>
      {subtitle && <p className="text-sm mt-2 ml-7" style={{ color: 'var(--c-t3)' }}>{subtitle}</p>}
    </div>
  )
}

export function SectionDots({ style }: { style?: React.CSSProperties }) {
  return (
    <div className="absolute pointer-events-none" style={style}>
      {[0, 1, 2].map(row => (
        <div key={row} className="flex gap-1.5 mb-1.5">
          {[0, 1, 2].map(col => (
            <div key={col} className="rounded-full"
              style={{ width: 3, height: 3, backgroundColor: 'var(--c-line2)' }} />
          ))}
        </div>
      ))}
    </div>
  )
}

/* National-level award — shimmer highlight card */
function NationalAwardCard({ item }: { item: { title: string; org: string; year: string } }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: '0 16px 48px rgba(0,0,0,0.15)' }}
      className="rounded-2xl overflow-hidden relative"
      style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', border: '1px solid rgba(196,169,122,0.35)' }}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
        backgroundSize: '200% 100%', animation: 'card-shimmer 4s ease-in-out infinite',
      }} />
      <div className="p-5">
        <span style={{ fontSize: '2rem' }}>🏆</span>
        <p className="font-bold mt-2" style={{ color: 'rgba(196,169,122,0.95)' }}>{item.title}</p>
        <p className="text-xs mt-1" style={{ color: 'rgba(196,169,122,0.55)' }}>{item.org} · {item.year}</p>
      </div>
    </motion.div>
  )
}

export default function Awards() {
  const { t } = useTranslation()
  const items = t('awards.items', { returnObjects: true }) as Array<{
    title: string; org: string; year: string; highlight?: boolean
  }>

  const national = items.filter(i => i.highlight)
  const regular  = items.filter(i => !i.highlight)

  return (
    <div style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg2)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={t('awards.title')} />

        {/* National awards — 2-col shimmer cards */}
        {national.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mt-8 mb-4">
            {national.map(item => <NationalAwardCard key={item.title} item={item} />)}
          </div>
        )}

        {/* Regular awards — 3-col grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {regular.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-xl p-4"
              style={{ backgroundColor: 'var(--c-card)', border: '1px solid var(--c-line2)' }}>
              <p className="font-semibold text-sm" style={{ color: 'var(--c-t1)' }}>{item.title}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--c-t3)' }}>{item.org} · {item.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
