import React, {useState, useEffect} from "react"
import { UserOutlined, SettingOutlined, BuildOutlined } from '@ant-design/icons'
import { SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem, MiniSideMenuItem, MiniSideMenuItemWithHoverSubmenu, MiniSubMenuHover } from "./SideMenuItem"
import {Sidebar} from 'design-systems'
import ThemesToggle from './ThemesToggle'
import {useTheme} from 'next-themes'

const SidebarMenu = ({ isOpen, setIsOpen }) => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    // useEffect(() => setMounted(true), [])

    // if (!mounted) return <></>

    return (
        <Sidebar 
            isOpen={isOpen} 
            setIsOpen={() => setIsOpen(isOpen ? false : true)} 
            extraClassname="bg-white dark:bg-gray-10" 
            theme={theme} 
            setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <>
                    {isOpen ?
                    <div >
                        <SideMenuItem href="/profile" title="User Profile" isOpen={isOpen}>
                            <UserOutlined />
                        </SideMenuItem>
                        <SideMenuItem href="/account-settings" title="Account Settings" isOpen={isOpen}>
                            <SettingOutlined />
                        </SideMenuItem>
                        <SideMenuItemCollapse title="User Roles & Permissions" icon={<BuildOutlined />} isOpen={isOpen}>
                            <>
                                <CollapsedSideMenuItem href="/roles-permissions" title="Roles & Permissions"/>
                                <CollapsedSideMenuItem href="/user-groups" title="User Groups" />
                                <CollapsedSideMenuItem href="/user-list" title="User List" />
                            </>
                        </SideMenuItemCollapse>
                    </div>
                    :
                    <div>
                        <MiniSideMenuItem href="/profile" title="User Profile" isOpen={isOpen}>
                            <UserOutlined />
                        </MiniSideMenuItem>
                        <MiniSideMenuItem href="/account-settings" title="Account Settings" isOpen={isOpen}>
                            <SettingOutlined />
                        </MiniSideMenuItem>
                        <MiniSideMenuItemWithHoverSubmenu icon={<BuildOutlined />} isOpen={isOpen}>
                            <div>
                                <MiniSubMenuHover href="/roles-permissions" title="Roles & Permissions"/>
                                <MiniSubMenuHover href="/user-groups" title="User Groups" />
                                <MiniSubMenuHover href="/user-list" title="User List" />
                            </div>
                        </MiniSideMenuItemWithHoverSubmenu>
                        
                    </div>
                    }
            </>
        </Sidebar>
    )
}

export default SidebarMenu
