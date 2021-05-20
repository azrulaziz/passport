import React from "react"
import {UserOutlined, SettingOutlined, BuildOutlined} from '@ant-design/icons'
import {SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem} from "./SideMenuItem"
import SidebarFooterMenu from "./SidebarFooterMenu"

const Sidebar: React.FC = () => {
    
    return (
        <aside className="fixed hidden lg:block lg:w-56 bg-white dark:bg-gray-10 h-screen overflow-y-auto">
            <div className="relative h-full py-2">
                <div className="z-0 h-20">{/* empty div to offset sidebar from main header */}</div> 

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
    )
}

export default Sidebar