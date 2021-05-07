import React from "react"
import Header from "../common/Header"
import Meta from '../common/Meta'
import Sidebar from "../common/Sidebar"
import MobileSidebar from "../common/MobileSidebar"

interface Props {
    children: React.ReactNode
}

const RoleLayout: React.FC<Props> = ({children}) => {
    
    return (
        <div className="">
            <Meta />
            <Header />
            <div className="flex">
                <nav>
                    <Sidebar /> 
                    <MobileSidebar />
                </nav>
                <div className="lg:ml-56 p-4 pt-0 w-full mt-16 md:mt-22 overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default RoleLayout