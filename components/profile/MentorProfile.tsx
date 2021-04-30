import {AlignLeftOutlined, ExperimentOutlined, BlockOutlined} from '@ant-design/icons'
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

            {profile[0]?.summary || profile[0].region || profile[0].languages || profile[0].remote ?
            <SectionPanel panelTitle="Summary" icon={<AlignLeftOutlined />}>
                <Summary summary={profile[0]?.summary} />
                <Region region={profile[0].region} />
                <Languages languages={profile[0].languages} />
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

const Region = ({region}) => {
    if (!region) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm text-gray-10">Region:</p>
            <p className="w-2/3 text-sm text-gray-10">{region}</p>
        </div>
    )
}

const Languages = ({languages}) => {
    if (!languages) return <></>

    return (
        <div className="flex">
            <p className="w-1/3 text-sm text-gray-10">Languages:</p>
            <p className="w-2/3 text-sm text-gray-10">{languages}</p>
        </div>
    )
}