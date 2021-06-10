import React from "react"
import {PrimaryButton} from 'components/common/Button'
import { useRouter } from 'next/router'
import Link from "next/link";

const ProfileMenuVisitorMode = ({data}) => {
    const router = useRouter()
    if (data?.User?.UserProfiles?.length < 1) {
        return (
            <div className="px-5 py-2 flex flex-wrap items-center justify-between ">
                <p className="text-sm">Your profile is empty! Add user profile for others to view.</p>
                <PrimaryButton type="button" onClick={() => router.push('/profile/edit-user-profile')}>Add User Profile</PrimaryButton>
            </div>
        )
    } 
    return (
        <div className="flex px-5 space-x-6">
            <Link href="/profile/visitor-mode/">
                <a className={router.pathname === "/profile/visitor-mode" ? "border-b-4 border-primary-blue text-primary-blue font-bold py-4 " : "py-4"}>
                    User Profile
                </a>
            </Link>
            {data?.User?.CompanyProfiles?.length > 0 ?
            <Link href="/profile/visitor-mode/company-profile">
                <a className={router.pathname === "/profile/visitor-mode/company-profile" ? "border-b-4 border-primary-blue text-primary-blue font-bold py-4 " : "py-4"}>
                    Company Profile
                </a>
            </Link>
            :
            <></>
            }
            {data?.User?.MentorProfiles?.length > 0 ?
            <Link href="/profile/visitor-mode/mentor-profile">
                <a className={router.pathname === "/profile/visitor-mode/mentor-profile" ? "border-b-4 border-primary-blue text-primary-blue font-bold py-4 " : "py-4"}>
                    Mentor Profile
                </a>
            </Link>
            :
            <></>
            }
            {data?.User?.InvestorProfiles?.length > 0 ?
            <Link href="/profile/visitor-mode/investor-profile">
                <a className={router.pathname === "/profile/visitor-mode/investor-profile" ? "border-b-4 border-primary-blue text-primary-blue font-bold py-4 " : "py-4"}>
                    Investor Profile
                </a>
            </Link>
            :
            <></>
            }
        </div>
    )
}

export default ProfileMenuVisitorMode

