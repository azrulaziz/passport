import {EditOutlined} from '@ant-design/icons'

const SettingsSection = ({sectionName, sectionDescription, children}) => {
    return (    
        <div className="flex items-start lg:items-center space-x-3">
            <div className="w-2/5">
                <p className="text-gray-9 mb-1">{sectionName}</p>
                <p className="text-xs text-gray-7 italic">
                    {sectionDescription}
                </p>
            </div>
            <div className="w-3/5 flex flex-wrap justify-end space-y-3 md:space-y-0">
                <div className="w-full md:w-3/4">
                    {children}
                </div>
                <div className="w-full md:w-1/4 justify-end flex">
                    <div>
                        <EditOutlined className="text-gray-9 text-sm cursor-pointer border rounded border-gray-9 px-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsSection