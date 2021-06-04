import React, {useState} from "react"
import Header from "../common/Header"
import Meta from '../common/Meta'
import SidebarMenu from "../common/Sidebar"
import MobileSidebar from "../common/MobileSidebar"
import {TopBar} from 'design-systems'
import {useSidebar} from 'store/useSidebar'

interface Props {
    children: React.ReactNode
}

const RoleLayout: React.FC<Props> = ({children}) => {

    const isOpen = useSidebar(state => state.isOpen)
    const setIsOpen = useSidebar(state => state.setIsOpen)
    
    return (
        <div className="">
            <Meta />
            <TopBar title="Dashboard" isOpen={isOpen}  />
                <nav>
                    <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen}  /> 
                    <MobileSidebar />
                </nav>
            <div className="flex">
                <div className={`${isOpen ? 'lg:ml-56' : 'lg:ml-16'}  w-full overflow-x-hidden p-4 pt-10 transition-margin duration-200 ease-in-out`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default RoleLayout