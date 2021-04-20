import React from "react"
import Header from "./Header"
import Meta from './Meta'
import Sidebar from "./Sidebar"

interface Props {
    children: React.ReactNode
}

const Layout: React.FC<Props> = ({children}) => {
    return (
        <div className="">
            <Meta />
            <Header />
            <div className="md:flex ">
                <nav>
                    <Sidebar />
                </nav>
                <div className="md:ml-56 p-4 pt-0 w-full mt-22">
                    {children}
                </div>

            </div>
        </div>
    )
}

export default Layout