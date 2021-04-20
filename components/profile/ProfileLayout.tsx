import React from "react"

interface Props {
    main: React.ReactNode,
    side: React.ReactNode
}

const ProfileLayout: React.FC<Props> = ({main, side}) => {
    return (
        <div className="flex flex-wrap -mx-2">
            <div className="p-2 w-full lg:w-9/12  ">
                <div className="">
                    {main}
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