import React from "react"
import {UserOutlined, SettingOutlined, BuildOutlined, MenuOutlined, CloseOutlined} from '@ant-design/icons'
import {SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem} from "./SideMenuItem"
import {useHeaderTitle} from 'store/useHeaderTitle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import SidebarFooterMenu from "./SidebarFooterMenu";

const MobileSidebar: React.FC = () => {
    const mobileSubmenu = useHeaderTitle(state => state.mobileSubmenu)
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)
    
    const handleClickAway = () => {
        setMobileSubmenu(false)
    }
    
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
        {mobileSubmenu ?
            <div className="">
                <CloseOutlined className="fixed block lg:hidden top-5 left-5 text-white cursor-pointer z-50" onClick={() => setMobileSubmenu(false)} />
                <aside className="fixed z-20 top-0 pt-14 lg:hidden md:w-56 bg-white dark:bg-gray-10 h-screen overflow-y-auto ">
                    <div className="relative h-full py-2">
                        <div className="pb-2 ">
                            <img src="/submenulogo.png" alt="Passport logo"  />
                        </div> 
                        <hr />
                        <>
                            <SideMenuItem href="/profile" title="User Profile">
                                <UserOutlined />
                            </SideMenuItem>
                            <SideMenuItem href="/account-settings" title="Account Settings">
                                <SettingOutlined />
                            </SideMenuItem>
                            <SideMenuItemCollapse title="User Roles & Permissions" icon={<BuildOutlined />}>
                                <>
                                    <CollapsedSideMenuItem href="/roles-permissions" title="Roles & Permissions"/>
                                    <CollapsedSideMenuItem href="/user-groups" title="User Groups" />
                                    <CollapsedSideMenuItem href="/user-list" title="User List" />
                                </>
                            </SideMenuItemCollapse>
                        </>
                        <SidebarFooterMenu />
                    </div>
                </aside>
            </div>
            :
            <div className="">
                <MenuOutlined className="fixed top-5 left-5 block lg:hidden text-white cursor-pointer z-50" onClick={() => setMobileSubmenu(true)} />
            </div>
        }
        </ClickAwayListener>
    )
}

export default MobileSidebar