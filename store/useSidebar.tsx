import create, {SetState} from 'zustand'

type SidebarStore = {
    isOpen: boolean
    setIsOpen: (value: boolean) => void
  };

export const useSidebar = create((set: SetState<SidebarStore>) => ({
    isOpen: true,
    setIsOpen: (isOpen) => {
        set({ isOpen: isOpen })
    }
}))

