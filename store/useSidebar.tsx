import create, {SetState} from 'zustand'

type SidebarStore = {
    isOpen: boolean
    isRolesSubMenuOpen: boolean
    setIsOpen: (value: boolean) => void
    setIsRolesSubMenuOpen: (value: boolean) => void
  };

export const useSidebar = create((set: SetState<SidebarStore>) => ({
    isOpen: true,
    setIsOpen: (isOpen) => {
        set({ isOpen: isOpen })
    },
    isRolesSubMenuOpen: false,
    setIsRolesSubMenuOpen: (isRolesSubMenuOpen) => {
        set({ isRolesSubMenuOpen: isRolesSubMenuOpen })
    },
}))

