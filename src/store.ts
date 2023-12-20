import { getViews, serviceGetMedia } from 'utility/services'

import { create } from 'zustand'

export enum MEDIA_SECTIONS {
    STORIES="stories",
    HYPNO="hypno"
}

export interface ChampMedia {
    id: number,
    created_at: string,
    filename: string,
    title: string,
    description: string,
    size: number,
    mime: string,
    section: MEDIA_SECTIONS
    url: string
}

export interface Store {
    disclaimerAccepted: boolean
    media: ChampMedia[]
    views: number
    reloadMedia: () => void
    setDisclaimerAccepted: (value?: boolean) => void
    getViews: () => Promise<void>
}

export const mediaSectionsArray = Object.values(MEDIA_SECTIONS).filter(v => isNaN(Number(v)))

export const useChampStore = create<Store>((set, get) => ({
  disclaimerAccepted: false,
  media: [],
  views: 0,
  setDisclaimerAccepted: (value: boolean = true) => set({ disclaimerAccepted: value }),
  reloadMedia: async () => {
    const media = await serviceGetMedia()
    if (media) {
        set((state) => ({ media: [...media] }))
    }
  },
  getViews: async () => {
    const currentViews = get().views
    console.log('CURRENT VIEWS', currentViews)
    if (!currentViews) {
      const counts = await getViews()
      console.log('COUNTS', counts)
      if (counts) {
        set((state) => ({ views: counts }))
      }
    }
  } 
}))

export const useDislaimerAccepted = ():[boolean, Store['setDisclaimerAccepted']] => useChampStore((store) => [store.disclaimerAccepted, store.setDisclaimerAccepted])
export const useMedia = () => useChampStore((store) => store.media)
export const useReloadMedia = () => useChampStore((store) => store.reloadMedia)
export const useMediaBySection = (section: MEDIA_SECTIONS) => useMedia().filter(m => m.section === section)
export const useViews = () => useChampStore((store) => store.views)
export const useGetViews = () => useChampStore((store) => store.getViews)