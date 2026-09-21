import { create } from "zustand";

interface SystemState {
  bootComplete: boolean;
  setBootComplete: (complete: boolean) => void;

  cursorText: string;
  cursorVariant: "default" | "hover" | "view" | "open" | "explore" | "hidden";
  setCursor: (variant: "default" | "hover" | "view" | "open" | "explore" | "hidden", text?: string) => void;
  resetCursor: () => void;

  xrayActive: boolean;
  toggleXray: () => void;
  setXray: (active: boolean) => void;

  contactOpen: boolean;
  openContact: () => void;
  closeContact: () => void;

  activeSection: string;
  setActiveSection: (section: string) => void;

  selectedTechId: string | null;
  setSelectedTechId: (id: string | null) => void;

  fps: number;
  setFps: (fps: number) => void;

  scrollVelocity: number;
  setScrollVelocity: (velocity: number) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  bootComplete: false,
  setBootComplete: (bootComplete) => set({ bootComplete }),

  cursorText: "",
  cursorVariant: "default",
  setCursor: (cursorVariant, cursorText = "") => set({ cursorVariant, cursorText }),
  resetCursor: () => set({ cursorVariant: "default", cursorText: "" }),

  xrayActive: false,
  toggleXray: () => set((state) => ({ xrayActive: !state.xrayActive })),
  setXray: (xrayActive) => set({ xrayActive }),

  contactOpen: false,
  openContact: () => set({ contactOpen: true }),
  closeContact: () => set({ contactOpen: false }),

  activeSection: "SYSTEM / 001",
  setActiveSection: (activeSection) => set({ activeSection }),

  selectedTechId: null,
  setSelectedTechId: (selectedTechId) => set({ selectedTechId }),

  fps: 60,
  setFps: (fps) => set({ fps }),

  scrollVelocity: 0,
  setScrollVelocity: (scrollVelocity) => set({ scrollVelocity }),
}));
