import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export enum ETheme {
  dark = "dark",
  light = "light",
  dim = "dim"
}

type TAppStoreState = {
  theme: ETheme;
};

export type TAppStoreActions = {
  setTheme: (theme: ETheme) => void;
};

export type TAppStore = TAppStoreState & TAppStoreActions;

const initialValue: Omit<TAppStore, "setTheme"> = {
  theme: ETheme.light
};

const useAppStore = create(
  subscribeWithSelector<TAppStore>((set) => ({
    ...initialValue,
    setTheme: (theme) => set({ theme })
  }))
);

export default useAppStore;
