import React, { FC } from 'react';
import classNames from 'classnames'
import {RiArrowDownSLine, RiArrowRightSLine} from 'react-icons/ri'

export interface MenuItemProps {
    children?: React.ReactNode
    title?: string
    active: boolean
    extraClassname?: string
    href: string
}

type Ref = HTMLAnchorElement;

export const MenuItem: FC<MenuItemProps> = React.forwardRef<Ref, MenuItemProps>(({ children, title, active, extraClassname, href, ...props}, ref) => {
    const activeClasses = `text-grey-3 bg-blue-3 border-r-4 border-blue-1`
    const defaultClasses = `bg-grey-8 text-grey-5 hover:bg-blue-6 `

    const classes = `
        cursor-pointer
        py-4 px-4 text-sm
        flex items-start space-x-2 
        ${active ? activeClasses : defaultClasses}
        ${extraClassname}
    `

    return (
        <a className={classNames(classes)} href={href} ref={ref} {...props} >
            <span className="transform translate-y-1">
                {children}
            </span>
            <span>{title}</span>
        </a>
    )
});

export const SubMenuItem: FC<MenuItemProps> = React.forwardRef<Ref, MenuItemProps>(({ children, title, active, extraClassname, href, ...props}, ref) => {
    const activeClasses = `text-grey-3 bg-blue-3 border-r-4 border-blue-1`
    const defaultClasses = `bg-grey-8 text-grey-5 hover:bg-blue-6 `

    const classes = `
        !z-50
        cursor-pointer
        py-4 pl-8 text-sm
        flex items-center space-x-2 
        ${active ? activeClasses : defaultClasses}
        ${extraClassname}
    `

    return (
        <a className={classNames(classes)}  href={href} ref={ref} {...props}>
            <span className=" ">
                {children}
            </span>
            <span>{title}</span>
        </a>
    )
});


export interface MenuItemSelectionProps {
    children: React.ReactNode
    title: string
    extraClassName?: string
    icon: React.ReactNode
    isSubMenuOpen: boolean
    setIsSubMenuOpen: () => void
    pathname: string
}

export const MenuItemSelection: FC<MenuItemSelectionProps> = ({
    children, 
    title, 
    extraClassName, 
    icon, 
    isSubMenuOpen,
    setIsSubMenuOpen,
    pathname,
    ...props
    }) => {

    const classes = `
        bg-grey-8 text-grey-5
        cursor-pointer
        py-4 px-4 text-sm
        flex items-start justify-between space-x-2 
        
        ${extraClassName}
    `

    return (
        <div>
            <div {...props} className={classNames(classes)} onClick={() => setIsSubMenuOpen()}>
                <div className="flex items-start space-x-2">
                    <span className="transform translate-y-1">
                        {icon}
                    </span>
                    <span>{title}</span>
                </div>
                <div className="transform translate-y-1">
                    {isSubMenuOpen ?
                        <RiArrowDownSLine className=""/>
                        :
                        <RiArrowRightSLine className=""/>
                    }
                </div>
            </div>
            <div>

            {isSubMenuOpen ? 
                <div>
                    {children}
                </div> 
                : 
                <div>
                        
                </div>
            }
            </div>
        </div>
    )
} 


export const CollapsedMenuItem: FC<MenuItemProps> = React.forwardRef<Ref, MenuItemProps>(({ children, active, extraClassname, href, ...props}, ref) => {
    
    const activeClasses = `text-grey-3 bg-blue-3 border-r-4 border-blue-1`
    const defaultClasses = `bg-grey-8 text-grey-5 hover:bg-blue-6`

    const classes = `
        cursor-pointer
        py-4 px-4 text-sm
        flex items-center justify-center 
        ${extraClassname}
        ${active ? activeClasses : defaultClasses}
    `

    return (
        <a className={classNames(classes)} {...props} href={href} ref={ref}>
            <span className="">
                {children}
            </span>
        </a>
    )
});

export interface CollapsedMenuItemSelection {
    active: boolean
    extraClassname?: string
    icon: React.ReactNode
    children: React.ReactNode
}


export const CollapsedMenuItemSelection: FC<CollapsedMenuItemSelection> = ({ icon, extraClassname, active}) => {

    const activeClasses = `text-grey-3 bg-blue-3 border-r-4 border-blue-1`
    const defaultClasses = `bg-grey-8 text-grey-5 hover:bg-blue-6`

    const classes = `
    
        cursor-pointer
        py-4 px-4 text-sm
        flex items-center justify-center 
        ${extraClassname}
        ${active ? activeClasses : defaultClasses}
    `

    

    return (
        <div className={classNames(classes)} >
            {icon}
        </div>
    )
}



// CollapsedMenuItem
// CollapsedMenuItemSelection
// CollapsedSubMenuItem