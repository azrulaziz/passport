import React from "react"
import Logo from './Logo'
import {NotificationOutlined, UserOutlined, AppstoreFilled, MenuOutlined} from '@ant-design/icons'
import {useHeaderTitle} from 'store/useHeaderTitle'

const Header: React.FC = () => {
    const title = useHeaderTitle(state => state.header)
    return (
        <header className="fixed top-0 w-full bg-black z-10">
            <div className="flex items-center h-20 ">
                <div className=" hidden md:flex items-center container px-6 py-2 md:w-56">
                    <Logo />
                    <div className="px-2">
                        <p className="text-base text-white font-black">Passport</p>
                    </div>
                </div>
                <div className="flex md:hidden items-end container px-6 mt-1 w-10">
                    <MenuOutlined className="block md:hidden text-white" />
                </div>

                <div className=" w-full flex items-center justify-between ml-12 mr-4 text-white ">
                    <p className="text-white">{title}</p>
                    <div className="flex space-x-4 text-lg items-center pb-1">
                        <div className="cursor-pointer">
                            <NotificationOutlined />
                        </div>
                        <div className="cursor-pointer">
                            <AppstoreFilled />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center transform translate-y-1 p-1  bg-gray-7 rounded-full">
                            <UserOutlined />
                        </div>
                    </div>
                </div>

            </div>
            
        </header>
    )
}

export default Header