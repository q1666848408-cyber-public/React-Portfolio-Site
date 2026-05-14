import { createContext, useContext } from 'react'

export const SECTION_IDS = ['home', 'awards', 'competition', 'research', 'internship', 'projects', 'contact'] as const
export type SectionId = typeof SECTION_IDS[number]

interface PageCtxType {
  currentIdx: number
  direction: number
  goTo: (target: number | string) => void
}

export const PageCtx = createContext<PageCtxType>({ currentIdx: 0, direction: 1, goTo: () => {} })
export const usePage = () => useContext(PageCtx)
