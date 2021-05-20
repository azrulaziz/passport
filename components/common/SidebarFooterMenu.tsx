import {BugOutlined, BulbOutlined} from '@ant-design/icons'
import ThemesToggle from "./ThemesToggle"

const SidebarFooterMenu = () => {
    return (
        <div className="absolute bottom-0 w-full text-gray-6 dark:text-secondary-gray">
            <ThemesToggle />
            <div className="border-t border-gray-4 w-full py-1 text-xs px-4">
                <div className="flex space-x-2 my-4 cursor-pointer items-center">
                    <BugOutlined className="" />
                    <p className="">Report a bug</p>
                </div>
                <div className="flex space-x-2 my-4 cursor-pointer items-center">
                    <BulbOutlined />
                    <p>Suggest a feature</p>
                </div>
            </div>
        </div>
    )
}

export default SidebarFooterMenu