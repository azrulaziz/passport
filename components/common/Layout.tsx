import React from "react"
import Header from "./Header"
import Meta from './Meta'
import Sidebar from "./Sidebar"
import MobileSidebar from "./MobileSidebar"
import {TopBar} from 'design-systems'

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
    
    return (
        <div className="">
            <Meta />
            {/* <Header /> */}
            <div className="flex">
                <nav aria-label="navigation">
                    <Sidebar /> 
                    <MobileSidebar />
                </nav>
                <div className="lg:ml-56 p-4 pt-0 w-full mt-16 md:mt-22">
                    <TopBar title="" />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout