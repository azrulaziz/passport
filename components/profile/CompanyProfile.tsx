import {AlignLeftOutlined, ShoppingOutlined, DollarOutlined, PaperClipOutlined, TeamOutlined} from '@ant-design/icons'
import useSectionCompletion from 'lib/useSectionCompletion'
import SectionCompletion from './SectionCompletion'
import SectionPanel from './SectionPanel'
import dayjs from 'dayjs'
import InlineTagPanel from 'components/common/InlineTagPanel'

const CompanyProfile = ({profile, visitorMode = null}) => {
    
    if (profile && profile.length < 1) {
        return (
            <></>
            )
    }
    const companyProfile = useSectionCompletion(profile)

    return (
        <div className="space-y-4">
            {visitorMode ?
            <></>
            :
            <SectionCompletion profileName="company" section={companyProfile.incompleteSection} editProfileLink="/profile/edit-company-profile" visitorModeLink="/profile/visitor-mode/company-profile" />
            }
            {profile[0]?.companyName || profile[0]?.linkedinProfile || profile[0]?.companyFounded || profile[0]?.companyWebsite || profile[0].stage || profile[0].businessModel || profile[0].sectors.length > 0 ?
            <SectionPanel panelTitle="Introduction" icon={<AlignLeftOutlined />}>
                <InlineTextPanel title="Company Name" data={profile[0]?.companyName} />
                <InlineTextLink title="LinkedIn Profile" data={profile[0]?.linkedinProfile} />

                <hr className="my-8" />
                <InlineDatePanel title="Company Founded" data={profile[0]?.companyFounded} />
                <InlineTextLink title="Company Website" data={profile[0]?.companyWebsite} />
                <InlineTagPanel title="Business Sector" data={profile[0].sectors} />
                <InlineTextPanel title="Current Stage" data={profile[0]?.stage} />
                <InlineTextPanel title="Business Model" data={profile[0]?.businessModel} />
            </SectionPanel>
            :
            <></>
            }

            {/* {profile[0]?.foundingMember.length > 0 ?
            <SectionPanel panelTitle="Founding Team" icon={<TeamOutlined />}>
            </SectionPanel>
            :
            <></>
            }        */}

            {profile[0]?.describeCompany || profile[0]?.describeBusinessModel || profile[0]?.marketChannel || profile[0]?.useCase || profile[0].whyRightTiming  ?
            <SectionPanel panelTitle="The Business" icon={<ShoppingOutlined />}>
                <InlineTextPanel title="Company Summary" data={profile[0]?.describeCompany} />
                <InlineTextPanel title="Business Model" data={profile[0]?.describeBusinessModel} />
                <InlineTextPanel title="Market Channels" data={profile[0]?.marketChannel} />
                <InlineTextPanel title="Target Point" data={profile[0]?.useCase} />
                <InlineTextPanel title="Why now" data={profile[0]?.whyRightTiming} />
            </SectionPanel>
            :
            <></>
            }

            {profile[0]?.outsideFunding || profile[0]?.fundraisingTarget  ?
            <SectionPanel panelTitle="Fundraising" icon={<DollarOutlined />}>
                <InlineTextPanel title="Previous Funding" data={profile[0]?.outsideFunding} />
                <InlineTextPanel title="Fundraising Target" data={`$${profile[0]?.fundraisingTarget}`} />
            </SectionPanel>
            :
            <></>
            }

            {profile[0]?.optionalLink ?
            <SectionPanel panelTitle="Supplementary Files" icon={<PaperClipOutlined />}>
                <a className="underline text-sm text-primary-blue" href={profile[0]?.optionalLink}>{profile[0]?.optionalLink}</a>
            </SectionPanel>
            :
            <></>
            }
        </div>
    )
}

export default CompanyProfile

const InlineTextPanel = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm ">{title}:</p>
            <p className="w-2/3 text-sm capitalize">{data}</p>
        </div>
    )
}

const InlineDatePanel = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm ">{title}:</p>
            <p className="w-2/3 text-sm capitalize">{dayjs(data).format('YYYY')}</p>
        </div>
    )
}

const InlineTextLink = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm ">{title}:</p>
            <a className="underline text-sm text-primary-blue" href={data}>{data}</a>
        </div>
    )
}
