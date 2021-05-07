import React from "react"
import {BugOutlined, BulbOutlined, UserOutlined, SettingOutlined, BuildOutlined} from '@ant-design/icons'
import {SideMenuItem, SideMenuItemCollapse, CollapsedSideMenuItem} from "./SideMenuItem"

const Sidebar: React.FC = () => {
    
    return (
        <aside className="fixed hidden lg:block lg:w-56 bg-white h-screen overflow-y-auto">
            <div className="relative border h-full py-2">
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

                <div className="absolute bottom-0 border-t border-gray-4 w-full py-1 text-gray-6 text-xs px-4">
                    <div className="flex space-x-2 my-4 cursor-pointer">
                        <BugOutlined  />
                        <p>Report a bug</p>
                    </div>
                    <div className="flex space-x-2 my-4 cursor-pointer">
                        <BulbOutlined />
                        <p>Suggest a feature</p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar