import {EllipsisOutlined} from '@ant-design/icons'

const NotificationContent = ({each}) => {
    return (
        <div key={each} className="flex items-start">
            <div className="cursor-pointer">
                <h5 className="text-xs text-secondary-gray pb-1">{each.product}</h5>
                <p className="text-sm">{each.message}</p>
                {each.link ? 
                    <a className="text-primary-blue underline text-xs">{each.link}</a>
                    :
                    <></>
                }
                <p className="text-gray-6 text-xxs">2 hours ago</p>
            </div>
            <div className="w-10 flex flex-col justify-end">
                <EllipsisOutlined className="cursor-pointer"/>
                {each.read ?
                    <></>
                    :
                    <div className="flex justify-end mt-1">
                        <div className="w-2 h-2 rounded-full  " style={{backgroundColor: "#FAAD14"}}></div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NotificationContent