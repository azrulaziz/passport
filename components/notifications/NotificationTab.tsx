import NotificationContent from './NotificationContent'

const NotificationTab = ({notificationList}) => {
    if (notificationList.length < 1) {
        return (
            <div className="px-5 py-4 flex items-center justify-center">
                <h5 className="text-xs text-secondary-gray">No notifications yet</h5>
            </div>
        )
    }
    return (
        <div className="px-5 py-4 space-y-5 ">
            {notificationList.some(x => x.status === 'new') ?
            <>
                <h3 className="text-gray-7 text-xs">New</h3>
                {notificationList.filter(each => each.status === 'new').map(each => {
                    return (
                        <NotificationContent each={each} key={each.id}/>
                    )
                })}
            </>
            :
            <h3 className="text-gray-7 text-xs text-center">No new notification</h3>
            }
            <hr className="my-8" />
            <h3 className="text-gray-7 text-xs">Earlier</h3>
            {notificationList.filter(each => each.status === 'earlier').map(each => {
                return (
                    <NotificationContent each={each} key={each.id} />
                )
            })}
        </div>
    )
}

export default NotificationTab