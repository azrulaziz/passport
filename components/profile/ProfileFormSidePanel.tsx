import ProfileSectionNav from './ProfileSectionNav'
import {NavSectionScroll} from './ProfileSectionNavMobile'
import ProfileCompletion from './ProfileCompletion';
import { PrimaryButton } from 'components/common/Button'

interface Props {
    sections: string[]
    completionPercentage: number
}

const ProfileFormSidePanel: React.FC<Props> = ({sections, completionPercentage}) => {

    return (
        <div className="edit-profile-side">
            <div className="lg:p-6 py-1 md:sticky md:top-20">
                <div className="hidden md:block justify-between items-end">
                    <ProfileCompletion completionPercentage={completionPercentage} />
                    <PrimaryButton type="submit" extraStyle="block md:hidden">Save Profile</PrimaryButton>
                </div>
                <ProfileSectionNav sections={sections} />
                <NavSectionScroll sections={sections}/>
                <PrimaryButton type="submit" extraStyle="hidden md:block">Save Profile</PrimaryButton>
            </div>
            <div className="fixed bottom-0 right-0 pb-2 pt-1 bg-primary-gray dark:bg-primary-black w-full md:hidden px-4 ">
                <div className="flex justify-between items-end">
                    <ProfileCompletion completionPercentage={completionPercentage} />
                    <PrimaryButton type="submit" extraStyle="md:hidden py-1">Save Profile</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default ProfileFormSidePanel

// style={{maxHeight: 'calc(100vh - 5rem)'}}