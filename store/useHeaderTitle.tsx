import create, {SetState} from 'zustand'

type HeaderStore = {
    header: string
    mobileSubmenu: boolean
    setTitle: (test: string) => void
    setMobileSubmenu: (status: boolean) => void
  };

export const useHeaderTitle = create((set: SetState<HeaderStore>) => ({
    header: "",
    mobileSubmenu: false,
    setTitle: (test) => {
        set({ header: test })
    },
    setMobileSubmenu: (status) => {
        set({ mobileSubmenu: status })
    }
}))

