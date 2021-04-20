import Link from "next/link";
import { useRouter } from "next/router";
import { Collapse } from 'antd';
import 'antd/lib/collapse/style/index.css';
import {useState} from 'react'

interface SideMenuItemProps {
    title: string,
    href: string,
    children?: React.ReactNode
}

export const SideMenuItem: React.FC<SideMenuItemProps> = ({title, href, children}) => {
    const router = useRouter();
    return (
        <Link href={href}>
            <a className={router.pathname.split("?")[0].startsWith(href) ? "active-link " : "link"}>
                {children}
                <span>{title}</span>
            </a>
        </Link>
    )
}

export const CollapsedSideMenuItem: React.FC<SideMenuItemProps> = ({title, href, children}) => {
    const router = useRouter();
    return (
        <Link href={href}>
            <a className={router.pathname.split("?")[0].startsWith(href) ? "collapsed-active-link px-10" : "collapsed-link px-10"}>
                {children}
                <span>{title}</span>
            </a>
        </Link>
    )
}

interface SideMenuItemCollapseProps {
    title: string,
    children: React.ReactNode,
    icon: React.ReactNode,
}

export const SideMenuItemCollapse: React.FC<SideMenuItemCollapseProps> = ({title, children, icon}) => {
    const { Panel } = Collapse;
    const router = useRouter();
    const [toggle, setToggle] = useState(1)

    const handleChange = (e) => {
        e.length < 1 ? setToggle(0) : setToggle(1) 
    }

    // @ts-ignore
    if (children.props.children.some(x => x.props.href === router.pathname)) {
        return (
            <div className="">
                <Collapse ghost bordered={false} expandIconPosition="right" activeKey={toggle} onChange={(e) => handleChange(e)}>
                    <Panel key={1} header={<HeaderItem title={title} icon={icon} />} className="px-0">
                        {children}
                    </Panel>
                </Collapse>
            </div>
        )
    }
    return (
        <div className="">
            <Collapse ghost bordered={false} expandIconPosition="right"  onChange={(e) => handleChange(e)}>
                <Panel key={1} header={<HeaderItem title={title} icon={icon} />} className="px-0">
                    {children}
                </Panel>
            </Collapse>
        </div>
    )
}

const HeaderItem = ({title, icon}) => {
    return (
        <div className="flex items-center text-xs space-x-2 transform translate-y-1">
            {icon}
            <span>{title}</span>
        </div>
    )
}