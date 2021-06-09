import React from "react"
import Header from "./Header"
import Meta from './Meta'
import MobileSidebar from "./MobileSidebar"
import {TopBar} from 'components/ds/Topbar'
import {useSidebar} from 'store/useSidebar'
import SidebarMenu from "../common/Sidebar"
import {useHeaderTitle} from 'store/useHeaderTitle'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {

    const title = useHeaderTitle(state => state.header)
    
    const isOpen = useSidebar(state => state.isOpen)
    const setIsOpen = useSidebar(state => state.setIsOpen)
    
    return (
        <div className="">
            <Meta />
            <TopBar title={title} isOpen={isOpen} extraClassname="!z-40" />
                <nav className="relative z-40">
                    <SidebarMenu isOpen={isOpen} setIsOpen={setIsOpen}  /> 
                    <MobileSidebar />
                </nav>
            <div className="flex">
                <div className={`${isOpen ? 'lg:ml-56' : 'lg:ml-16'}  w-full p-4 pt-10 transition-margin duration-200 ease-in-out`}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout