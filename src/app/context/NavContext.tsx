import React, { createContext, useContext, useState } from 'react';

type NavContextType = {
  isNavVisible: boolean;
  setNavVisible: (visible: boolean) => void;
};

const NavContext = createContext<NavContextType | undefined>(undefined);

export function NavProvider({ children }: { children: React.ReactNode }) {
  const [isNavVisible, setNavVisible] = useState(false);

  return (
    <NavContext.Provider value={{ isNavVisible, setNavVisible }}>
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (context === undefined) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
}
