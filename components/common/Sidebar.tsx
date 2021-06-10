import React, {useState, useEffect} from "react"
import { BuildOutlined } from '@ant-design/icons'
import { CollapsedMenuItemWithHover} from "./SideMenuItem"
import {Sidebar} from 'components/ds/Sidebar'
import {MenuItemSelection, SubMenuItem, MenuItem, CollapsedMenuItem} from 'components/ds/NavigationMenu'
import {useTheme} from 'next-themes'
import { useRouter } from "next/router";
import {RiDashboard3Line, RiSettingsFill, RiUserFill} from 'react-icons/ri'
import {useSidebar} from 'store/useSidebar'
import Link from "next/link";

const SidebarMenu = ({ isOpen, setIsOpen }) => {
    const router = useRouter();
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    const isRolesSubMenuOpen = useSidebar(state => state.isRolesSubMenuOpen)
    const setIsRolesSubMenuOpen = useSidebar(state => state.setIsRolesSubMenuOpen)

    useEffect(() => {
        setMounted(true)

    }, [])
    if (!mounted) return <></>

    return (
        <Sidebar 
            isOpen={isOpen} 
            setIsOpen={() => setIsOpen(isOpen ? false : true)} 
            extraClassname="" 
            theme={theme} 
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <>
                {isOpen ?
                    <>
                        <Link href="/profile">
                            <MenuItem href="/profile" title="User Profile" active={router.pathname.split("?")[0].startsWith("/profile")} extraClassname="" >
                                <RiUserFill />
                            </MenuItem>
                        </Link>
                        <Link href="/account-settings">
                            <MenuItem href="/account-settings" title="Account Settings" active={router.pathname.split("?")[0].startsWith("/account-settings")}>
                                <RiSettingsFill />
                            </MenuItem>
                        </Link>
                        <MenuItemSelection title="User Roles & Permission" icon={<RiDashboard3Line />} isSubMenuOpen={isRolesSubMenuOpen} setIsSubMenuOpen={() => setIsRolesSubMenuOpen(!isRolesSubMenuOpen)} pathname={router.pathname}>
                            <Link href="/roles-permissions">
                                <SubMenuItem href="/roles-permissions" title="Roles & Permissions" active={router.pathname.split("?")[0].startsWith("/roles-permissions") } />
                            </Link>
                            <Link href="/user-groups">
                                <SubMenuItem href="user-groups" title="User Groups" active={router.pathname.split("?")[0].startsWith("/user-groups") } />
                            </Link>
                            <Link href="/user-list">
                                <SubMenuItem href="user-list" title="User List" active={router.pathname.split("?")[0].startsWith("/user-list") } />
                            </Link>
                        </MenuItemSelection>
                        
                    </>
                    :
                    <>
                        <Link href="/profile">
                            <CollapsedMenuItem href="/profile" title="User Profile" active={router.pathname.split("?")[0].startsWith("/profile")} extraClassname="" >
                                <RiUserFill />
                            </CollapsedMenuItem>
                        </Link>
                        <Link href="/account-settings">
                            <CollapsedMenuItem href="/account-settings" title="Account Settings" active={router.pathname.split("?")[0].startsWith("/account-settings")}>
                                <RiSettingsFill />
                            </CollapsedMenuItem>
                        </Link>
                        <CollapsedMenuItemWithHover icon={<BuildOutlined />} >
                            <Link href="/roles-permissions">
                                <SubMenuItem extraClassname="relative !z-50" href="/roles-permissions" title="Roles & Permissions" active={router.pathname.split("?")[0].startsWith("/roles-permissions") } />
                            </Link>
                            <Link href="/user-groups">
                                <SubMenuItem href="/user-groups" title="Users Groups" active={router.pathname.split("?")[0].startsWith("/user-groups") } />
                            </Link>
                            <Link href="/user-list">
                                <SubMenuItem href="/user-list" title="User List" active={router.pathname.split("?")[0].startsWith("/user-list") } />
                            </Link>
                        </CollapsedMenuItemWithHover>
                    </>
                }
            </>
        </Sidebar>
    )
}

export default SidebarMenu
