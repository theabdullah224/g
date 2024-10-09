import { useEffect } from 'react';
import { create } from 'zustand';



const useStore = create((set) => ({
  isLoggedIn: false,
  isAdmin: false,
  setIsLoggedIn: (loggedIn) => set(() => ({ isLoggedIn: loggedIn })),
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
}));

export default useStore;
