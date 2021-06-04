import Link from "next/link";
import { useRouter } from "next/router";
import { Collapse } from 'antd';
import 'antd/lib/collapse/style/index.css';
import {useState} from 'react'
import {useHeaderTitle} from 'store/useHeaderTitle'

interface SideMenuItemProps {
    title: string
    href: string
    children?: React.ReactNode
    isOpen?: boolean
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({title, href, children}) => {
    const router = useRouter();
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)
    return (
        <Link href={href}>
            <a onClick={() => setMobileSubmenu(false)} className={`flex items-center ${router.pathname.split("?")[0].startsWith(href) ? "active-link " : "link"}`}>
                {children}
                <span>{title}</span>
            </a>
        </Link>
    )
}

export const CollapsedSideMenuItem: React.FC<SideMenuItemProps> = ({title, href, children}) => {
    const router = useRouter();
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)
    return (
        <Link href={href}>
            <a onClick={() => setMobileSubmenu(false)} className={router.pathname.split("?")[0].startsWith(href) ? "collapsed-active-link px-10" : "collapsed-link px-10"}>
                {children}
                <span>{title}</span>
            </a>
        </Link>
    )
}

interface SideMenuItemCollapseProps {
    title: string,
    children: React.ReactNode
    icon: React.ReactNode
    isOpen: boolean
}

export const SideMenuItemCollapse: React.FC<SideMenuItemCollapseProps> = ({title, children, icon, isOpen}) => {
    const { Panel } = Collapse;
    const router = useRouter();
    const [toggle, setToggle] = useState(1)

    const handleChange = (e) => {
        e.length < 1 ? setToggle(0) : setToggle(1) 
    }

    // @ts-ignore
    if (children.props.children.some(x => x.props.href === router.pathname)) {
        return (
            <div className="dark:text-gray-1">
                <Collapse ghost bordered={false} expandIconPosition="right" activeKey={toggle} onChange={(e) => handleChange(e)}>
                    <Panel key={1} header={<HeaderItem title={title} icon={icon} />} className="px-0">
                        {children}
                    </Panel>
                </Collapse>
            </div>
        )
    }
    return (
        <div className="dark:text-gray-1">
            <Collapse ghost bordered={false} expandIconPosition="right"  onChange={(e) => handleChange(e)} >
                <Panel key={1} header={<HeaderItem title={title} icon={icon} />} className="px-0">
                    {children}
                </Panel>
            </Collapse>
        </div>
    )
}

const HeaderItem = ({title, icon}) => {
    return (
        <div className="flex items-center text-xs space-x-2 transform translate-y-1 dark:text-gray-1">
            {icon}
            <span>{title}</span>
        </div>
    )
}

interface MiniSideMenuItemWithSubMenuProps {
    children: React.ReactNode
    icon: React.ReactNode
    isOpen: boolean
}

export const MiniSideMenuItem: React.FC<SideMenuItemProps> = ({title, href, children}) => {
    const router = useRouter();
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)
    const sharedClasses = `py-3 py-4 text-xs cursor-pointer flex items-center justify-center `
    const activeClasses = `text-primary-blue bg-blue-1 border-r-2 border-blue-4`
    const defaultClasses = `text-gray-9 dark:text-gray-1 hover:bg-blue-1 `
    return (
        <Link href={href}>
            <a onClick={() => setMobileSubmenu(false)} className={`${sharedClasses} ${router.pathname.split("?")[0].startsWith(href) ? activeClasses : defaultClasses}`}>
                {children}
            </a>
        </Link>
    )
}


export const MiniSubMenuHover = ({title, href}) => {
    const router = useRouter();
    const setMobileSubmenu = useHeaderTitle(state => state.setMobileSubmenu)

    const sharedClasses = `w-48 py-4 px-4 text-xs flex cursor-pointer`
    const activeClasses = `text-primary-blue bg-blue-1 border-r-2 border-blue-4`
    const defaultClasses = `text-gray-9 dark:text-gray-1 hover:bg-blue-1`
    return (
        <Link href={href}>
            <a onClick={() => setMobileSubmenu(false)} className={`${sharedClasses} ${router.pathname.split("?")[0].startsWith(href) ? activeClasses : defaultClasses}`}>
                <span>{title}</span>
            </a>
        </Link>
    )
}

import { usePopperTooltip } from 'react-popper-tooltip';
export const MiniSideMenuItemWithHoverSubmenu: React.FC<MiniSideMenuItemWithSubMenuProps> = ({icon, children}) => {
    const router = useRouter();
    // @ts-ignore
    const active = children.props.children.some(x => router.pathname.split("?")[0].startsWith(x.props.href))
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        placement: 'right-start',
        delayHide: 200,
        delayShow: 100,
        offset: [-1, 5],
        interactive: true
    });


    const sharedClasses = `py-3 py-4 text-xs cursor-pointer flex items-center justify-center `
    const activeClasses = `text-primary-blue bg-blue-1 border-r-2 border-blue-4`
    const defaultClasses = `text-gray-9 dark:text-gray-1 hover:bg-blue-1 `
    return (
        <div className={` ${sharedClasses} ${active ? activeClasses : defaultClasses}`} ref={setTriggerRef}>
            {icon}
            {visible && (
                <div ref={setTooltipRef} {...getTooltipProps({ className: 'tooltip-container section-bg' })}>
                    {children}
                </div>
            )} 
        </div>
    )
}