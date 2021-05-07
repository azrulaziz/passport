import React, { useState } from "react"
import Logo from './Logo'
import {NotificationOutlined, UserOutlined, AppstoreFilled} from '@ant-design/icons'
import {useHeaderTitle} from 'store/useHeaderTitle'
import NotificationsBar from "../notifications/NotificationsBar"
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const Header: React.FC = () => {
    const [notificationTabOpen, setNotificationTabOpen] = useState(false)
    const title = useHeaderTitle(state => state.header)

    const handleClickAway = () => {
        setNotificationTabOpen(false)
    }

    const handleSetNotificationTab = () => {
        setNotificationTabOpen(state => !state)
    }

    return (
        <header className="fixed top-0 w-full bg-black z-50">
            <div className="flex items-center h-14 lg:h-20 ">
                <div className=" hidden lg:flex items-center container px-6 py-2 lg:w-56">
                    <Logo />
                    <div className="px-2">
                        <p className="text-base text-white font-black">Passport</p>
                    </div>
                </div>
                <div className="flex lg:hidden items-end container px-6 mt-1 w-10">
                    {/* empty div for styling purpose */}
                </div>
                <div className=" w-full flex items-center justify-between ml-12 mr-4 text-white ">
                    <p className="text-white">{title}</p>
                    <div className="flex space-x-4 text-lg items-center pb-1">
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="cursor-pointer relative">
                                <div className="relative" onClick={() => handleSetNotificationTab()}>
                                    <NotificationOutlined />
                                    {/* <div className="absolute top-2 -right-1">
                                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#fc1043"}}></div>
                                    </div> */}
                                </div>
                                {notificationTabOpen ? <NotificationsBar /> : <></>}
                            </div>
                        </ClickAwayListener>
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