import {BugOutlined, BulbOutlined} from '@ant-design/icons'
import {RiSkipBackFill} from 'react-icons/ri'
import ThemesToggle from "./ThemesToggle"

const SidebarFooterMenu = ({isOpen, setIsOpen}) => {

    return (
        <div className="absolute bottom-0 w-full text-gray-6 dark:text-secondary-gray">
            <div className="border-t border-gray-4 dark:border-primary-black w-full py-1 text-xs px-4">
                <ThemesToggle />
                <div className="flex items-center justify-between px-4 my-4">
                    {isOpen ? <p className="pl-1">Collapse Navigation</p> : <></>}
                    <RiSkipBackFill className="text-lg cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                </div>
                <div className="flex space-x-2 my-4 cursor-pointer items-center">
                    <BugOutlined className="" />
                    {isOpen ? <p className="">Report a bug</p> : <></>}
                </div>
                <div className="flex space-x-2 my-4 cursor-pointer items-center">
                    <BulbOutlined className="" />
                    {isOpen ? <p>Suggest a feature</p> : <></>}
                </div>
            </div>
        </div>
    )
}

export default SidebarFooterMenu