import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

interface ProjectItem {
  name: string; description: string; tags: string[]
  url: string; siteUrl?: string; featured?: boolean
}

/* Metric chips hardcoded per project for visual richness */
const FEATURED_METRICS: Record<string, string[]> = {
  // 'Project-Name': ['Metric 1', 'Metric 2', 'Metric 3', 'Metric 4'],
}

/* Tag → color map (gold-accent design language) */
const TAG_TEXT: Record<string, string> = {
  'Claude Code': '#9B7E51', Python: '#3B82F6', TypeScript: '#3178C6',
  'Multi-Agent': '#10B981', TikTok: '#A855F7', Automation: '#9B7E51',
  'Next.js': '#64748B', React: '#61DAFB', Vite: '#646CFF',
  'Tailwind CSS': '#06B6D4', 'Framer Motion': '#FF0080',
  // ... extend as needed
}

function TagBadge({ tag, alpha }: { tag: string; alpha: string }) {
  const color = TAG_TEXT[tag] ?? '#78716C'
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ backgroundColor: `${color}${alpha}`, color, border: `1px solid ${color}30` }}>
      {tag}
    </span>
  )
}

/* Large featured card with gradient top bar + metric chips */
function FeaturedCard({ item, index, alpha }: { item: ProjectItem; index: number; alpha: string }) {
  const metrics = FEATURED_METRICS[item.name] ?? []
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: '0 24px 64px rgba(0,0,0,0.13)' }}
      className="group rounded-2xl overflow-hidden relative"
      style={{ backgroundColor: 'var(--c-card)', border: '1.5px solid var(--c-line3)' }}>

      {/* Gradient top bar */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--c-acc), var(--c-acc3), var(--c-acc))' }} />

      {/* Left accent bar on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: 'var(--c-acc)' }} />

      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--c-t1)' }}>{item.name}</h3>
          {metrics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metrics.map(m => (
                <span key={m} className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: 'rgba(196,169,122,0.12)', color: 'var(--c-acc)', border: '1px solid rgba(196,169,122,0.3)' }}>
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-t2)' }}>{item.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags.map(tag => <TagBadge key={tag} tag={tag} alpha={alpha} />)}
        </div>
        <a href={item.url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
          style={{ backgroundColor: 'var(--c-sub)', color: 'var(--c-t2)', border: '1px solid var(--c-line2)' }}>
          {t('projects.viewCode')}
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const items = t('projects.items', { returnObjects: true }) as ProjectItem[]
  const featured = items.slice(0, 6)  // first 6 → large cards
  const rest = items.slice(6)          // remaining → compact grid

  return (
    <div className="relative" style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mt-10 flex flex-col gap-5">
          {featured.map((item, i) => <FeaturedCard key={item.name} item={item} index={i} alpha="14" />)}
        </div>
        {rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {/* Compact ProjectCard components for remaining items */}
          </div>
        )}
      </div>
    </div>
  )
}
