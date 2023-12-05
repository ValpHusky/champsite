import { serviceGetMedia } from 'utility/services'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
    reloadMedia: () => void
    setDisclaimerAccepted: (value?: boolean) => void
}

export const mediaSectionsArray = Object.values(MEDIA_SECTIONS).filter(v => isNaN(Number(v)))

export const useChampStore = create<Store>((set) => ({
  disclaimerAccepted: false,
  media: [],
  setDisclaimerAccepted: (value: boolean = true) => set({ disclaimerAccepted: value }),
  reloadMedia: async () => {
    const media = await serviceGetMedia()
    if (media) {
        set((state) => ({ media: [...media] }))
    }
  }
}))

export const useDislaimerAccepted = ():[boolean, Store['setDisclaimerAccepted']] => useChampStore((store) => [store.disclaimerAccepted, store.setDisclaimerAccepted])
export const useMedia = () => useChampStore((store) => store.media)
export const useReloadMedia = () => useChampStore((store) => store.reloadMedia)
export const useMediaBySection = (section: MEDIA_SECTIONS) => useMedia().filter(m => m.section === section)