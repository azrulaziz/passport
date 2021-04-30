import React from "react"

interface Props {
    personalInfo: React.ReactNode
    main: React.ReactNode
    side: React.ReactNode
}

const ProfileLayout: React.FC<Props> = ({personalInfo, main, side}) => {
    return (
        <div className="flex flex-wrap -mx-2">
            <div className="p-2 w-full lg:w-9/12  ">
                <div className="">
                    {personalInfo}
                    <div className="my-4">
                        {main}
                    </div>
                </div>
            </div>
            <div className="p-2 w-full lg:w-3/12 ">
                <div className="">
                    {side}
                </div>
            </div>
        </div>
    )
}

export default ProfileLayout