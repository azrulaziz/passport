import {AlignLeftOutlined, ApartmentOutlined, BlockOutlined} from '@ant-design/icons'
import useSectionCompletion from 'lib/useSectionCompletion'
import SectionCompletion from './SectionCompletion'
import SectionPanel from './SectionPanel'

const MentorProfile = ({profile}) => {
    
    if (profile && profile.length < 1) {
        return (
            <></>
            )
    }
    const mentorProfile = useSectionCompletion(profile)

    return (
        <div className="space-y-4">
            <SectionCompletion profileName="mentorship" section={mentorProfile.incompleteSection} editProfileLink="/profile/edit-mentor-profile" />

            {profile[0]?.summary || profile[0]?.region || profile[0]?.languages || profile[0]?.remote ?
            <SectionPanel panelTitle="Summary" icon={<AlignLeftOutlined />}>
                <Summary summary={profile[0]?.summary} />
                <InlineTextPanel title="Region" data={profile[0].region} />
                <InlineTextPanel title="Languages" data={profile[0].languages} />
                <InlineTextPanel title="Remote Team" data={profile[0].remote} />
            </SectionPanel>
            :
            <></>
            }

            {profile[0]?.familiarSector.length > 0 ||  profile[0]?.mentoringSector.length > 0 ?
            <SectionPanel panelTitle="Expertise" icon={<ApartmentOutlined />}>
                <InlineTagPanel title="Primary Expertise" data={profile[0].familiarSector} />
                <InlineTagPanel title="Industry Expertise" data={profile[0].mentoringSector} />
            </SectionPanel>
            :
            <></>
            }
        </div>
    )
}

export default MentorProfile

const Summary = ({summary}) => {
    if (!summary) return <></>
    
    return (
        <div>
            <p className="text-sm text-gray-10">{summary}</p>
            <hr className="my-4" />
        </div>
    )
}

const InlineTextPanel = ({title, data}) => {
    if (!data) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm text-gray-10">{title}:</p>
            <p className="w-2/3 text-sm text-gray-10">{data}</p>
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