import classNames from 'classnames';
import React, { FC } from 'react';
import {RiSkipBackFill, RiSkipForwardFill, RiBugFill, RiLightbulbFill} from 'react-icons/ri'
import {Toggle} from './Selections'

export interface SidebarProps {
    children: React.ReactNode
    extraClassname?: string
    isOpen: boolean
    setIsOpen: () => void
    setTheme: (value: string | boolean) => void
    theme: string
    hideOnMobile?: boolean
}

export const Sidebar: FC<SidebarProps> = ({ children, extraClassname, isOpen = true, setIsOpen, theme, setTheme, hideOnMobile = false, ...props}) => {
    // hidden 
    const classes = `
        hidden
        lg:block 
        fixed top-0 
        
        bg-grey-8 h-screen
        ${extraClassname} 
        ${isOpen ? 'w-56' : 'w-16' }
        transition-width duration-200 ease-in-out
    `

    return (
        <aside className={classNames(classes)} {...props}>
            <nav className=" h-full ">
                <section className="z-0 h-16 bg-gray-10">
                    {/* empty space for logo or other stuff */}
                </section> 
                <section className=" pb-2 overflow-y-scroll" style={{height:'calc(100vh - 220px)'}}>
                    {children}
                </section>
                <SidebarFooter isOpen={isOpen} setIsOpen={setIsOpen} theme={theme} setTheme={setTheme} hideOnMobile={hideOnMobile} />
            </nav>
        </aside>
    )
};

export interface SidebarFooterProps {
    isOpen: boolean
    setIsOpen: () => void
    setTheme: (value: string | boolean) => void
    theme: string
    hideOnMobile: boolean
}

export const SidebarFooter: FC<SidebarFooterProps> = ({isOpen, setIsOpen, theme, setTheme, hideOnMobile }) => {

    const labelText = theme === "dark" ? "dark mode" : "light mode"

    return (
        <footer className="absolute bottom-0 w-full text-grey-6 dark:text-secondary-gray">
            <section className="border-t border-grey-9 dark:border-primary-black w-full py-1 text-xs px-4">
                <div className={`flex items-center my-4 ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
                    {isOpen ?
                    <label htmlFor="theme" className="capitalize text-xs pl-1">
                        {labelText}
                    </label>
                    :
                    <></>
                    }
                    <Toggle 
                        id="theme" 
                        onChange={(value) => setTheme(value)} 
                        checked={theme === 'dark' ? true : false} 
                        size="small"
                    />
                </div>
                {hideOnMobile ?
                    <></>
                    :
                    <CollapseNavigation isOpen={isOpen} setIsOpen={setIsOpen} />
                }
                <div className={`flex my-4 cursor-pointer items-center ${isOpen ? 'space-x-2' : 'space-x-0 justify-center'}`}>
                    <RiBugFill className="" />
                    {isOpen ? <p className="">Report a bug</p> : <></>}
                </div>
                <div className={`flex my-4 cursor-pointer items-center ${isOpen ? 'space-x-2' : 'space-x-0 justify-center'}`}>
                    <RiLightbulbFill className="" />
                    {isOpen ? <p>Suggest a feature</p> : <></>}
                </div>
            </section>
        </footer>
    )
}

const CollapseNavigation = ({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: () => void}) => {
    if (isOpen) {
        return (
            <div className={`flex items-center px-4 my-4 justify-between`}>
                <p className="pl-1">Collapse Navigation</p>
                <RiSkipBackFill className="text-lg cursor-pointer" onClick={() => setIsOpen()} />
            </div>
        )
    } else {
        return (
            <div className={`flex items-center my-4 justify-center`}>
                <RiSkipForwardFill className="text-lg cursor-pointer" onClick={() => setIsOpen()} />
            </div>
        )
    }
}
// export interface ThemesToggle {
//     isOpen: boolean
//     setTheme: (value: string | boolean) => void
//     theme: string
// }

// export const ThemesToggle: FC<ThemesToggle> = ({isOpen, setTheme, theme}) => {

//     const labelText = theme === "dark" ? "dark mode" : "light mode"
//     return (
//         <div className={`flex items-center my-4 ${isOpen ? 'justify-between px-4' : 'justify-center'}`}>
//             {isOpen ?
//             <label htmlFor="theme" className="capitalize text-xs pl-1">
//                 {labelText}
//             </label>
//             :
//             <></>
//             }
//             <Toggle 
//                 id="theme" 
//                 onChange={(value) => setTheme(value)} 
//                 checked={theme === 'dark' ? true : false} 
//                 size="small"
//             />
//         </div>
//     )
// }
