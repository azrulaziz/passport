import {useRouter} from 'next/router'
import { PrimaryButton, PrimaryTransparentButton } from "components/common/Button"

const SectionCompletion = ({section, editProfileLink, profileName}) => {
    const router = useRouter()

    return (
        <div>
            {section.length > 0 ? 
            <div className="bg-white px-5 py-6 flex flex-wrap justify-between items-center space-y-2">
                <div className="text-sm text-gray-10">
                    <p>Your {profileName} profile has incomplete sections:</p>
                    {section.map(each => {
                        return (
                            <p key={each} className="text-gray-8 capitalize">{each}</p>
                        )
                    })}
                </div>
                <div className="space-x-2 justify-end text-right">
                    <PrimaryTransparentButton type="button">View profile as visitor</PrimaryTransparentButton>
                    <PrimaryButton type="button" onClick={() => router.push(editProfileLink)}>Edit Profile</PrimaryButton>
                </div>
            </div>
            :
            <div className="bg-white px-5 py-6 flex flex-wrap justify-between items-center">
                <div className="text-sm text-gray-10">
                    <p>Your {profileName} profile is complete</p>
                </div>
                <div className="space-x-2 justify-end text-right">
                    <PrimaryTransparentButton type="button">View profile as visitor</PrimaryTransparentButton>
                    <PrimaryButton type="button" onClick={() => router.push(editProfileLink)}>Edit Profile</PrimaryButton>
                </div>
            </div>
            }
        </div>
    )
}

export default SectionCompletion