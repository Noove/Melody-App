import { create } from "zustand";

type TPlaybackState = {
  humanTime: string;
  setHumanTime: () => void;
};

const usePlaybackState = create<TPlaybackState>()((set) => ({
  humanTime: "00:00.00",
  setHumanTime: () => set((state) => ({ humanTime: state.humanTime })),
}));

export default usePlaybackState;
