import ProfileSectionNav from './ProfileSectionNav'
import ProfileCompletion from './ProfileCompletion';
import { PrimaryButton } from 'components/common/Button'

interface Props {
    sections: string[]
    completionPercentage: number
}

const ProfileFormSidePanel: React.FC<Props> = ({sections, completionPercentage}) => {

    return (
        <div className="edit-profile-side">
            <div className="p-6 sticky top-20">
                <ProfileCompletion completionPercentage={completionPercentage} />
                <ProfileSectionNav sections={sections} />
                <PrimaryButton type="submit">Save Profile</PrimaryButton>
            </div>
        </div>
    )
}

export default ProfileFormSidePanel

// style={{maxHeight: 'calc(100vh - 5rem)'}}