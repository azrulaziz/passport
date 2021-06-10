import React from "react"
import {MenuOutlined, CloseOutlined} from '@ant-design/icons'
import {Sidebar} from 'components/ds/Sidebar'
import {MenuItemSelection, SubMenuItem, MenuItem} from 'components/ds/NavigationMenu'
import {useHeaderTitle} from 'store/useHeaderTitle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useTheme} from 'next-themes'
import { useRouter } from "next/router";
import {RiDashboard3Line, RiSettingsFill, RiUserFill} from 'react-icons/ri'
import {useSidebar} from 'store/useSidebar'
import Link from "next/link";

const MobileSidebar: React.FC = () => {
    const mobileSubmenu = useHeaderTitle(state => state.mobileSubmenu)
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)

    const router = useRouter();
    const {theme, setTheme} = useTheme()

    const isRolesSubMenuOpen = useSidebar(state => state.isRolesSubMenuOpen)
    const setIsRolesSubMenuOpen = useSidebar(state => state.setIsRolesSubMenuOpen)
    
    const handleClickAway = () => {
        setMobileSubmenu(false)
    }
    
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
        {mobileSubmenu ?
            <div className="">
                <CloseOutlined className="fixed block lg:hidden top-6 left-5 text-white cursor-pointer z-50" onClick={() => setMobileSubmenu(false)} />
                <Sidebar 
                    isOpen={true} 
                    setIsOpen={() => {}} 
                    extraClassname="lg:!hidden !block !md:w-56" 
                    theme={theme} 
                    setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    hideOnMobile={true}
                >
                    <div className="pb-2 ">
                        <img src="/submenulogo.png" alt="Passport logo"  />
                    </div> 
                    {/* <hr /> */}
                    <>
                        <Link href="/profile">
                            <MenuItem 
                                href="/profile" 
                                title="User Profile" 
                                active={router.pathname.split("?")[0].startsWith("/profile")} 
                                /*// @ts-ignore */ 
                                onClick={() => setMobileSubmenu(false)}
                            >
                                    
                                <RiUserFill />
                            </MenuItem>
                        </Link>
                        <Link href="/account-settings">
                            <MenuItem 
                            href="/account-settings" 
                            title="Account Settings" 
                            active={router.pathname.split("?")[0].startsWith("/account-settings")} 
                            /*// @ts-ignore */ 
                            onClick={() => setMobileSubmenu(false)}
                        >
                                <RiSettingsFill />
                            </MenuItem>
                        </Link>
                        <MenuItemSelection title="User Roles & Permission" icon={<RiDashboard3Line />} isSubMenuOpen={isRolesSubMenuOpen} setIsSubMenuOpen={() => setIsRolesSubMenuOpen(!isRolesSubMenuOpen)} pathname={router.pathname}>
                            <Link href="/roles-permissions">
                                <SubMenuItem 
                                    href="/roles-permissions" 
                                    title="Roles & Permissions" 
                                    active={router.pathname.split("?")[0].startsWith("/roles-permissions") }
                                    /*// @ts-ignore */  
                                    onClick={() => setMobileSubmenu(false)} 
                                />
                            </Link>
                            <Link href="/user-groups">
                                <SubMenuItem 
                                    href="user-groups" 
                                    title="User Groups" 
                                    active={router.pathname.split("?")[0].startsWith("/user-groups") } 
                                    /*// @ts-ignore */ 
                                    onClick={() => setMobileSubmenu(false)} 
                                />
                            </Link>
                            <Link href="/user-list">
                                <SubMenuItem 
                                    href="user-list" 
                                    title="User List" 
                                    active={router.pathname.split("?")[0].startsWith("/user-list") } 
                                    /*// @ts-ignore */ 
                                    onClick={() => setMobileSubmenu(false)} 
                                />
                            </Link>
                        </MenuItemSelection>
                    </>
                </Sidebar>
            </div>
            :
            <div className="">
                <MenuOutlined className="fixed top-6 left-5 block lg:hidden text-white cursor-pointer " onClick={() => setMobileSubmenu(true)} />
            </div>
        } 
        </ClickAwayListener>
    )
}

export default MobileSidebar