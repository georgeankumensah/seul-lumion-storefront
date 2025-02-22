// store/userStore.ts
import {create} from 'zustand';

interface UserStore {
  user: any;
  setuser: (user: any) => void;
  clearuser: () => void;
}

 const useUserStore = create<UserStore>((set) => ({
  user: null,
  setuser: (user) => set({ user: user }),
  clearuser: () => set({ user: null }),
}));


export default useUserStore;