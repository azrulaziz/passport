import {AlignLeftOutlined, ShoppingOutlined, DollarOutlined, PaperClipOutlined, TeamOutlined} from '@ant-design/icons'
import useSectionCompletion from 'lib/useSectionCompletion'
import SectionCompletion from './SectionCompletion'
import SectionPanel from './SectionPanel'
import dayjs from 'dayjs'

const InvestorProfile = ({profile, visitorMode = null}) => {
    
    if (profile && profile.length < 1) {
        return (
            <></>
            )
    }
    const investorProfile = useSectionCompletion(profile)

    return (
        <div className="space-y-4">
            {visitorMode ?
            <></>
            :
            <SectionCompletion profileName="investor" section={investorProfile.incompleteSection} editProfileLink="/profile/edit-investor-profile" visitorModeLink="/profile/visitor-mode/investor-profile" />
            }
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
            <p className="w-1/3 text-sm">{title}:</p>
            <p className="w-2/3 text-sm capitalize">{data}</p>
        </div>
    )
}

const InlineTextLink = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm">{title}:</p>
            <a className="underline text-sm text-primary-blue" href={data}>{data}</a>
        </div>
    )
}