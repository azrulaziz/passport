import {useState} from 'react'
import NotificationTab from './NotificationTab'
import ActivityTab from './ActivityTab'
import RequestTab from './RequestTab'
import TabMenu from './TabMenu'

const NotificationsBar = () => {
    const [selectedTab, setSelectedTab] = useState('Notifications')

    const renderTab = () => {
        if (selectedTab === 'Notifications') return <NotificationTab notificationList={notificationMock} />
        if (selectedTab === 'Activity') return <ActivityTab />
        if (selectedTab === 'Requests') return <RequestTab />
    }

    return (
        <div className="cursor-default absolute z-20 mt-2 top-10 lg:top-14 lg:mt-1 -right-20 rounded bg-white  shadow-xl  overflow-y-auto text-gray-9 pb-2" style={{minHeight: "60vh", maxHeight: "80vh", width: '300px'}}>
            <TabMenu selected={selectedTab} setSelectedTab={setSelectedTab} />
            {renderTab()}
        </div>
    )
}

export default NotificationsBar

const notificationMock = [
    {
        id: 1,
        status: 'new',
        product: '500 Applications',
        message: 'Adapty has been chosen for an individual interview. Please schedule a time for at least one (1) collaborator to attend.',
        link: 'www.link.com',
        time: '',
        read: false
    },
    {
        id: 2,
        status: 'earlier',
        product: '500 Applications',
        message: 'Adapty has been chosen for an individual interview. Please schedule a time for at least one (1) collaborator to attend.',
        link: '',
        time: '',
        read: true
    },
    {
        id: 3,
        status: 'earlier',
        product: '500 Applications',
        message: 'Adapty has been chosen for an individual interview. Please schedule a time for at least one (1) collaborator to attend.',
        link: '',
        time: '',
        read: false
    }
]