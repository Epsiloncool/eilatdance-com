'use client';

import { createContext, useContext, ReactNode } from 'react';

type Settings = Record<string, string>;

const SettingsContext = createContext<Settings>({});

export function SettingsProvider({ settings, children }: { settings: Settings, children: ReactNode }) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}