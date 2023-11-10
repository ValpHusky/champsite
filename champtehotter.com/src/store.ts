import { serviceGetMedia } from 'utility/services'
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
    media: ChampMedia[]
    reloadMedia: () => void
}

export const mediaSectionsArray = Object.values(MEDIA_SECTIONS).filter(v => isNaN(Number(v)))

export const useChampStore = create<Store>((set) => ({
  media: [],
  reloadMedia: async () => {
    const media = await serviceGetMedia()
    if (media) {
        set((state) => ({ media: [...media] }))
    }
  }
}))

export const useMedia = () => useChampStore((store) => store.media)
export const useReloadMedia = () => useChampStore((store) => store.reloadMedia)

export const useMediaBySection = (section: MEDIA_SECTIONS) => useMedia().filter(m => m.section === section)