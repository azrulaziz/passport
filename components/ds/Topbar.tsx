import classNames from 'classnames';
import React, { FC } from 'react';
import {RiGridFill, RiNotification2Fill, RiUser2Fill} from 'react-icons/ri'

export interface HeaderProps {
    title: string
    isOpen: boolean
    extraClassname?: string
}

export const TopBar: FC<HeaderProps> = ({ title, isOpen = true, extraClassname, ...props}) => {

    const classes = `top-0 sticky z-40 bg-blue-6 transition-margin duration-200 ease-in-out ${isOpen ? 'lg:ml-56' : 'lg:ml-16'} ${extraClassname}`

    return (
        <header className={classNames(classes)} {...props}>
            <section className="w-full sticky top-0 z-50 h-16 lg:pr-4 overflow-x-auto flex items-center justify-between pl-12 mr-4 text-white">
                
                    <p className="capitalize text-xl text-grey-2 ">{title}</p>

                    <nav className="flex space-x-4 text-xl items-center pr-8">
                        <div className="cursor-pointer relative">
                            <div className="relative" >
                                <RiNotification2Fill />
                                {/* <div className="absolute top-2 -right-1">
                                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: "#fc1043"}}></div>
                                </div> */}
                            </div>
                            {/* {notificationTabOpen ? <NotificationsBar /> : <></>} */}
                        </div>
                        <div className="cursor-pointer">
                            <RiGridFill />
                        </div>
                        <div className="">
                            <RiUser2Fill />
                        </div>
                    </nav>
            </section>
        </header>
    )
};