import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SectionHeader } from './Awards'

export default function Contact() {
  const { t } = useTranslation()
  return (
    <div style={{ minHeight: '100vh', padding: '80px 0', backgroundColor: 'var(--c-bg)' }}>
      <div className="max-w-2xl mx-auto px-6 text-center">
        <SectionHeader title={t('contact.title')} />
        <p className="mt-4 text-sm" style={{ color: 'var(--c-t3)' }}>{t('contact.subtitle')}</p>
        <div className="flex justify-center gap-4 mt-8">
          {/* GitHub / email / WeChat links */}
        </div>
      </div>
    </div>
  )
}
