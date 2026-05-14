import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from './Awards'

/* Internship / work experience timeline */
export default function Internship() {
  const { t } = useTranslation()
  const items = t('internship.items', { returnObjects: true }) as Array<{
    company: string; role: string; period: string; tags: string[]; bullets: string[]
  }>

  return (
    <div style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader title={t('internship.title')} />
        <div className="flex flex-col gap-5 mt-10">
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-6"
              style={{ backgroundColor: 'var(--c-card)', border: '1.5px solid var(--c-line3)' }}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold" style={{ color: 'var(--c-t1)' }}>{item.company}</h3>
                  <p className="text-sm" style={{ color: 'var(--c-acc)' }}>{item.role}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full"
                  style={{ backgroundColor: 'var(--c-sub)', color: 'var(--c-t3)' }}>
                  {item.period}
                </span>
              </div>
              <ul className="text-sm space-y-1.5" style={{ color: 'var(--c-t2)' }}>
                {item.bullets.map((b, j) => <li key={j}>· {b}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
