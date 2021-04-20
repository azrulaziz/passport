import React from "react"
import Header from "components/common/Header"
import Meta from 'components/common/Meta'

interface Props {
    children: React.ReactNode
}

const AccessLayout: React.FC<Props> = ({children}) => {
    return (
        <div className="bg-primary-gray h-screen">
            <Meta />
            <Header />
            <div className="pt-20">
                {children}
            </div>
        </div>
    )
}

export default AccessLayout