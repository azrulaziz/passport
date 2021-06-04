import React from "react"
import {UserOutlined, SettingOutlined, BuildOutlined} from '@ant-design/icons'
import {SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem} from "./SideMenuItem"
import SidebarFooterMenu from "./SidebarFooterMenu"


const MiniSidebar = ({isOpen, setIsOpen}) => {
    
    return (
        <aside className="fixed hidden top-0 lg:block lg:w-16 bg-white dark:bg-gray-10 h-screen overflow-y-auto">
            <div className="relative h-full ">
                <div className="z-0 h-20 bg-gray-10"></div> 

                <>
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
                </>
                <SidebarFooterMenu isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </aside>
    )
}

export default MiniSidebar