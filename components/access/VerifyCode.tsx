import React from "react"
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm, SubmitHandler} from "react-hook-form";
import { PrimaryButton } from "components/common/Button";

interface FormValues {
    codeInput: string
}

const VerifyCode: React.FC = () => {
    const { t } = useTranslation('verify-account')
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleCodeVerification: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data)
        
        // after submit successful, route to user profile
        router.push('/profile')
    }

    const handleRequestCode = () => {
        // http call again to request for new verification code
        
    }
    
    return (
        <div className="flex items-center justify-center py-16">
            <div className="w-full sm:w-2/3 bg-white shadow-xl py-6">
                <div className="px-10 py-2">
                    <h1 className="main-heading">{t('main-header')} {router.query.name}</h1>
                    <p className="text-secondary-gray text-sm inline-block">{t('subheader')}</p>
                </div>
                <hr className="mx-6 my-4" />
                <form className="px-10 py-2" onSubmit={handleSubmit(handleCodeVerification)}>
                    <label htmlFor="codeInput" className="text-gray-10 text-sm inline-block pb-2">Verify your account using the code sent to your email.</label>
                    <input
                        id="codeInput"
                        aria-invalid={errors.codeInput ? "true" : "false"}
                        {...register("codeInput")}
                        className="border border-gray-5 block py-2 px-2 w-full md:w-4/5 rounded text-sm"
                        type="text"
                    />
                    {errors.codeInput && (
                        <span role="alert" className="absolute -bottom-4 text-xs text-red-500">{errors.codeInput.message}</span>
                    )}

                    <div className="mt-6 flex flex-wrap justify-between items-center">
                        <div>
                            <p 
                                className="underline text-gray-10 text-sm inline-block"
                                onClick={() => handleRequestCode()}
                            >
                                    Didn’t receive the code? Resend now
                            </p>
                        </div>
                        <PrimaryButton type="submit">
                            Submit
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyCode