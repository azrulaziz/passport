import React from "react"
import Meta from 'components/common/Meta'
import Logo from 'components/common/Logo'
interface Props {
    children: React.ReactNode
}

const AccessLayout: React.FC<Props> = ({children}) => {
    return (
        <div className="bg-primary-gray h-screen">
            <Meta />
            <AccessHeader />
            <div className="pt-20">
                {children}
            </div>
        </div>
    )
}

export default AccessLayout

const AccessHeader = () => (
    <header className="fixed top-0 w-full bg-black z-10">
        <div className="flex items-center">
            <div className="md:w-56 flex items-center container px-6 py-2">
                <Logo />
                <div className="px-2 pb-2">
                    <p className="text-base text-white font-black">Passport</p>
                </div>
            </div>
        </div>
    </header>
)