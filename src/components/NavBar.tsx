import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { PageCtx } from '../context/PageContext'
import { useTheme } from '../context/ThemeContext'

const NAV_ITEMS = [
  { key: 'home',        href: '#home'        },
  { key: 'awards',      href: '#awards'      },
  { key: 'competition', href: '#competition' },
  { key: 'research',    href: '#research'    },
  { key: 'internship',  href: '#internship'  },
  { key: 'projects',    href: '#projects'    },
  { key: 'contact',     href: '#contact'     },
]

export default function NavBar() {
  const { currentIdx, goTo } = useContext(PageCtx)
  const { toggle } = useTheme()
  const { t, i18n } = useTranslation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-12"
      style={{ backgroundColor: 'var(--c-nav)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--c-line)' }}>
      <span className="font-bold text-sm" style={{ color: 'var(--c-t1)' }}>
        {/* Site owner name */}
      </span>
      <div className="flex items-center gap-1">
        {NAV_ITEMS.map((item, i) => {
          const isActive = currentIdx === i
          return (
            <a key={item.key} href={item.href}
              onClick={e => { e.preventDefault(); goTo(item.key) }}
              className="relative px-3 py-1 text-xs transition-colors duration-200"
              style={{
                color: isActive ? 'var(--c-t1)' : 'var(--c-t3)',
                borderRadius: '6px',
                backgroundColor: isActive ? 'var(--c-sub)' : 'transparent',
              }}>
              {t(`nav.${item.key}`)}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{ width: '70%', height: '1px', backgroundColor: 'var(--c-acc)', opacity: 0.7 }} />
              )}
            </a>
          )
        })}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggle} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--c-t3)' }}>
          {/* theme toggle icon */}
        </button>
        <button onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
          className="text-xs px-2 py-1 rounded" style={{ color: 'var(--c-t3)' }}>
          {i18n.language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  )
}
