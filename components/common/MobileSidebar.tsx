import React from "react"
import {BugOutlined, BulbOutlined, UserOutlined, SettingOutlined, BuildOutlined, MenuOutlined, CloseOutlined} from '@ant-design/icons'
import {SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem} from "./SideMenuItem"
import {useHeaderTitle} from 'store/useHeaderTitle'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
                <aside className="fixed z-20 top-0 pt-14 lg:hidden md:w-56 bg-white h-screen overflow-y-auto ">
                    <div className="relative h-full py-2">
                        <div className="pb-2 ">
                            <img src="/submenulogo.png" alt="Passport logo" className="" />
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
                        <div className="absolute bottom-0 border-t border-gray-4 w-full py-1 text-gray-6 text-xs px-4">
                            <div className="flex space-x-2 my-4">
                                <BugOutlined  />
                                <p>Report a bug</p>
                            </div>
                            <div className="flex space-x-2 my-4">
                                <BulbOutlined />
                                <p>Suggest a feature</p>
                            </div>
                        </div>
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