import { useState, useCallback, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { PageCtx, SECTION_IDS } from './context/PageContext'
import NavBar      from './components/NavBar'
import Hero        from './components/Hero'
import Awards      from './components/Awards'
import Competition from './components/Competition'
import Research    from './components/Research'
import Internship  from './components/Internship'
import Projects    from './components/Projects'
import Contact     from './components/Contact'

/* ── Section registry ───────────────────────────────────────── */
const SECTIONS = [
  { id: 'home',        Component: Hero        },
  { id: 'awards',      Component: Awards      },
  { id: 'competition', Component: Competition },
  { id: 'research',    Component: Research    },
  { id: 'internship',  Component: Internship  },
  { id: 'projects',    Component: Projects    },
  { id: 'contact',     Component: Contact     },
]

/* ── Page transition variants ───────────────────────────────── */
const variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 36 : -36, filter: 'blur(4px)', scale: 0.985 }),
  center: { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 },
  exit:  (dir: number) => ({ opacity: 0, y: dir > 0 ? -24 : 24, filter: 'blur(3px)', scale: 0.99 }),
}

/* ── Neural network canvas (background layer) ───────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Animated nodes connected by proximity lines
  // Node count: 38, connection opacity: 0.22, node opacity: 0.5
  // See full implementation in private repo
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, opacity: 0.9 }} />
}

/* ── Aurora gradient mesh (slow-drifting glow) ──────────────── */
function Aurora() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0, overflow: 'hidden' }}>
      <div className="absolute rounded-full blur-3xl"
        style={{ top: '-20%', left: '-15%', width: '70%', height: '80%',
          background: 'radial-gradient(circle, var(--c-acc2) 0%, transparent 70%)', opacity: 0.07,
          animation: 'aurora-drift-1 25s ease-in-out infinite' }} />
      <div className="absolute rounded-full blur-3xl"
        style={{ bottom: '-20%', right: '-15%', width: '70%', height: '80%',
          background: 'radial-gradient(circle, var(--c-acc2) 0%, transparent 70%)', opacity: 0.06,
          animation: 'aurora-drift-2 28s ease-in-out infinite' }} />
    </div>
  )
}

function AppInner() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [direction,  setDirection]  = useState(1)

  const goTo = useCallback((target: number | string) => {
    const newIdx = typeof target === 'string' ? SECTION_IDS.indexOf(target) : target
    if (newIdx < 0 || newIdx >= SECTIONS.length || newIdx === currentIdx) return
    setDirection(newIdx > currentIdx ? 1 : -1)
    setCurrentIdx(newIdx)
  }, [currentIdx])

  const { Component } = SECTIONS[currentIdx]
  const progress = (currentIdx / (SECTIONS.length - 1)) * 100

  return (
    <PageCtx.Provider value={{ currentIdx, direction, goTo }}>
      <div style={{ height: '100vh', overflow: 'hidden', position: 'relative', backgroundColor: 'var(--c-bg)' }}>
        <Aurora />
        <NeuralCanvas />
        <div className="scroll-progress" style={{ width: `${progress}%`, transition: 'width 0.5s ease' }} />
        <NavBar />
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={currentIdx} custom={direction} variants={variants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
            <Component />
          </motion.div>
        </AnimatePresence>
      </div>
    </PageCtx.Provider>
  )
}

export default function App() {
  return <ThemeProvider><AppInner /></ThemeProvider>
}
