import React from "react"
import SignInForm from "./SignInForm"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const SignIn: React.FC = () => {
    const { t } = useTranslation('signin')
    const router = useRouter()

    const handleRouteToCreateAccount = ():void => {
        router.push('/create-account')
    }
    
    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full sm:w-2/3 flex flex-wrap bg-white shadow-xl">
                
                <div className="w-full lg:w-3/5 py-8">
                    <div className="px-10">
                        <h1 className="main-heading">{t('main-header')}</h1>
                        <p 
                            className="text-secondary-gray underline text-sm cursor-pointer inline-block"
                            onClick={() => handleRouteToCreateAccount()}
                        >
                            {t('subheader')}
                        </p>
                    </div>
                    <hr className="my-8 mx-6" />
                    <div className="px-10">
                        <SignInForm />
                    </div>
                </div>
                <div className="w-full lg:w-2/5">
                    <img 
                        src="/signinimage.png" 
                        alt="500 startups team" 
                        className="h-full w-full object-fit"
                    />
                </div>
            </div>
        </div>
    )
}

export default SignIn