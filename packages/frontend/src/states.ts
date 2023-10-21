import { SECTIONS } from '../constants';
import { create } from 'zustand';

export const useSectionStore = create<{
  section: string;
  setSection: (_section: string) => void;
}>((set) => ({
  section: SECTIONS[0],
  setSection: (section) => set({ section })
}));
