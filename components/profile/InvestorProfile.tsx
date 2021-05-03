import {AlignLeftOutlined, ShoppingOutlined, DollarOutlined, PaperClipOutlined, TeamOutlined} from '@ant-design/icons'
import useSectionCompletion from 'lib/useSectionCompletion'
import SectionCompletion from './SectionCompletion'
import SectionPanel from './SectionPanel'
import dayjs from 'dayjs'

const InvestorProfile = ({profile}) => {
    
    if (profile && profile.length < 1) {
        return (
            <></>
            )
    }
    const investorProfile = useSectionCompletion(profile)

    return (
        <div className="space-y-4">
            <SectionCompletion profileName="investor" section={investorProfile.incompleteSection} editProfileLink="/profile/edit-investor-profile" />

            {profile[0]?.title || profile[0]?.role ?
            <SectionPanel panelTitle="Introduction" icon={<AlignLeftOutlined />}>
                <InlineTextPanel title="Investor Title" data={profile[0]?.title} />
                <InlineTextLink title="Current Title / Role" data={profile[0]?.role} />

            </SectionPanel>
            :
            <></>
            }

        </div>
    )
}

export default InvestorProfile

const InlineTextPanel = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm text-gray-10">{title}:</p>
            <p className="w-2/3 text-sm text-gray-10 capitalize">{data}</p>
        </div>
    )
}

const InlineTextLink = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm text-gray-10">{title}:</p>
            <a className="underline text-sm text-primary-blue" href={data}>{data}</a>
        </div>
    )
}

const InlineTagPanel = ({title, data}) => {
    if (data.length < 1) return <></>
    return (
        <div className="flex items-center">
            <p className="w-1/3 text-sm text-gray-10">{title}:</p>
            <div className="w-2/3 space-x-1">
            {data.map(each => {
                return (
                    <p key={each} className="px-2 py-1 inline-block text-gray-9 text-xs bg-gray-2 border border-gray-5 rounded-sm">
                        {each}
                    </p>
                )
            })}

            </div>
        </div>
    )
}
