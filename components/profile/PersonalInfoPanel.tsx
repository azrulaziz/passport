import React from "react"
import { useTranslation } from 'next-i18next'
import { PrimaryButton } from "components/common/Button"
import ProfileMenu from "./ProfileMenu"
import { useRouter } from 'next/router'

type User = {
    firstName: string,
    lastName: string,
    suffix?: string,
    preferredName?: string,
    gender?: string,
    headline?: string,
    linkedinUrl?: string,
    photo?: string,
    UserProfiles: []
}

interface Props {
    data: {
        User: User
    }
}

const PersonalInfoPanel: React.FC<Props> = ({data}) => {
    // const { t } = useTranslation('signup')
    const router = useRouter()

    const handleRouteToPersonalInfoForm = ():void => {
        router.push('/profile/edit-personal-information')
    }

    const renderNameInitial = ():string => {
        if (data?.User?.firstName) {
            return data.User.firstName.split('')[0]
        }
        return 'A'
    }

    return (
        <div className="bg-white mt-10">
            <div className="px-5 py-6 pb-8 md:pb-14 sm:flex md:block lg:flex flex-wrap sm:justify-between ">
                <div className="flex relative space-x-6 w-full md:w-full xl:w-2/3">
                    <div className="mr-40">
                        <div className="absolute w-40 h-40 -top-14 md:-top-20 mt-4 bg-yellow-300 rounded-lg flex justify-center items-center">
                            <p className="text-white text-5xl font-black">{renderNameInitial()}</p>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="main-title">{data?.User?.firstName} {data?.User?.lastName}</h1>
                        <p className="sub-title">{data?.User?.headline}</p>
                        {data?.User?.linkedinUrl ?
                        <a className="underline text-sm text-primary-blue" href={data.User.linkedinUrl}>LinkedIn Profile</a>
                            :
                        <></>
                        }
                    </div>
                </div>

                <div className="mt-28 md:mt-20 xl:mt-0  md:text-left xl:text-right w-full xl:w-1/3">
                    <p className="text-sm text-gray-6">Last update: Jan 29, 2021</p>
                    <button className="bg-primary-blue text-white text-xs sm:text-sm px-4 py-1 rounded my-1" onClick={handleRouteToPersonalInfoForm}>
                        Edit personal info
                    </button>
                </div>
            </div>
            <hr className="" />
            {/* If user profile has been added, show tabs/profiles navigation instead */}
            <div className=" ">
                <ProfileMenu data={data} />
            </div>
        </div>
    )
}

export default PersonalInfoPanel