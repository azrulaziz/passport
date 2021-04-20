import { PrimaryTransparentButton } from "components/common/Button"
import { useRouter } from "next/router"
import React from "react"

interface Props {
    title: string,
    buttonText: string,
    link: string
}

const AddProfileBox: React.FC<Props> = ({title, buttonText, link}) => {
    const router = useRouter()
    return (
        <div className="border-primary-blue border-l-4 bg-white">
            <div className="border-2 border-l-0">
                <div className="py-4 px-3">
                    <p className="text-gray-8 text-sm mb-2">{title}</p>
                    <PrimaryTransparentButton onClick={() => router.push(link)}>{buttonText}</PrimaryTransparentButton>
                </div>
            </div>
        </div>
    )
}

const AddProfilePanel: React.FC = () => {
    return (
        <div className="space-y-3">
            <AddProfileBox 
                title="Do you have a startup? Add your company profile to let others know." 
                buttonText="Add company profile"
                link="/profile/edit-company-profile"
            />
            <AddProfileBox 
                title="Are you interested in mentorship programs? Apply to mentoring now." 
                buttonText="Add mentor profile"
                link="/profile/edit-mentor-profile"
            />
            <AddProfileBox 
                title="Add an investor profile now to let others know you’re interested." 
                buttonText="Add investor profile"
                link="/profile/edit-investor-profile"
            />
        </div>
    )
}

export default AddProfilePanel