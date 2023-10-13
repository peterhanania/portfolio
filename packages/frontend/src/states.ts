import { create } from 'zustand';

import { SECTIONS } from '../constants';

export const useSectionStore = create<{
  section: string;
  setSection: (section: string) => void;
}>((set) => ({
  section: SECTIONS[0],
  setSection: (section) => set({ section })
}));
