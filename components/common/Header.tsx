import React from "react"
import Logo from './Logo'


const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full bg-black z-10">
            <div className="flex">
                <div className="md:w-56 flex items-center container px-6 py-2">
                    <Logo />
                    <div className="px-2 pb-2">
                        <p className="text-base text-white font-black">Passport</p>
                    </div>
                </div>

            </div>
            
        </header>
    )
}

export default Header