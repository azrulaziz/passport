import React from "react"
import SignUpForm from "./SignUpForm"
import { useTranslation } from 'next-i18next'

const SignUp: React.FC = () => {
    const { t } = useTranslation('signup')
    return (
        <div className="flex items-center justify-center py-10">
            <div className="w-full sm:w-2/3 flex flex-wrap bg-white shadow-xl">
                
                <div className="w-full lg:w-3/5 py-8">
                    <div className="px-10">
                        <h1 className="main-heading">{t('main-header')}</h1>
                        <p className="text-secondary-gray text-sm inline-block">{t('subheader')}</p>
                    </div>
                    <hr className="my-8 mx-6" />
                    <div className="px-10">
                        <SignUpForm />
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <img 
                        src="/signupimage.png" 
                        alt="People creating 500 passports" 
                        className="h-full w-full object-fit"
                    />
                </div>
            </div>
        </div>
    )
}

export default SignUp