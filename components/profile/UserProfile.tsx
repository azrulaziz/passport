import {AlignLeftOutlined, ExperimentOutlined, BlockOutlined} from '@ant-design/icons'
import useSectionCompletion from 'lib/useSectionCompletion'
import SectionCompletion from './SectionCompletion'
import SectionPanel from './SectionPanel'

const UserProfile = ({profile, visitorMode = null}) => {
    
    if (profile && profile.length < 1) {
        return (
            <></>
        )
    }
    const userProfile = useSectionCompletion(profile)

    return (
        <div className="space-y-4">
            {visitorMode ?
            <></>
            :
            <SectionCompletion profileName="user" section={userProfile.incompleteSection} editProfileLink="/profile/edit-user-profile" visitorModeLink="/profile/visitor-mode" />
            }
            {profile[0]?.summary ?
            <SectionPanel panelTitle="Summary" icon={<AlignLeftOutlined />}>
                <p className="text-sm ">{profile[0]?.summary}</p>
            </SectionPanel>
            :
            <></>
            }
            {profile[0]?.skills.length > 0 ||  profile[0]?.tools.length > 0 ?
            <SectionPanel panelTitle="Skills" icon={<ExperimentOutlined />} >
                <Skills skills={profile[0]?.skills} />
                <Tools tools={profile[0]?.tools} />
            </SectionPanel>
            :
            <></>
            }
            {profile[0]?.interest.length > 0 ?
            <SectionPanel panelTitle="Interests" icon={<BlockOutlined />}>
                <Interests interest={profile[0]?.interest} />
            </SectionPanel>
            :
            <></>
            }
        </div>
    )
}

export default UserProfile

const Skills = ({skills}) => {
    if (!skills || skills?.length < 1) return <></>
    
    return (
        <div className="space-y-1">
            <p className="text-sm font-semibold">Industry Knowledge</p>
            <div className="flex flex-wrap items-start">
                {skills.map(each => {
                    return (
                        <p className="my-2 text-sm w-1/2 self-start align-center" key={each}>{each}</p>
                    )
                })}
            </div>
        </div>
    )
}

const Interests = ({interest}) => {
    if (!interest || interest?.length < 1) return <></>
    
    return (
        <div className="space-y-1">
            <div className="flex flex-wrap items-start">
                {interest.map(each => {
                    return (
                        <p className="my-2 text-sm w-1/2 self-start align-center" key={each}>{each}</p>
                    )
                })}
            </div>
        </div>
    )
}

const Tools = ({tools}) => {
    if (!tools || tools?.length < 1) return <></>
    
    return (
        <div className="space-y-1">
            <p className="text-sm font-semibold">Tools & Technology</p>
            <div className="flex flex-wrap items-start">
                {tools.map(each => {
                    return (
                        <p className="my-2 text-sm w-1/2 self-start align-center" key={each}>{each}</p>
                    )
                })}
            </div>
        </div>
    )
}