import React, {useState} from "react"
import {PrimaryButton, LinkedinButton, GoogleButton} from 'components/common/Button'
import { useForm, SubmitHandler} from "react-hook-form";
import { TextInput, PasswordInput, InputCheckbox } from "components/common/Input";
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface FormValues {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
    termsAndConditions: boolean
    newsletter?: boolean
}

const SignUpForm: React.FC = () => {
    const { t } = useTranslation(['common', 'signup'])
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const watchPassword = watch("password");
    const handleSubmitSignupForm: SubmitHandler<FormValues> = (data: FormValues) => {
        
        // TODO: handle api call here
        console.log(data)
        router.push('/verify-account')
    }

    const handleRouteToLogin = ():void => {
        router.push('/signin')
    }

    return (
        <form className="" onSubmit={handleSubmit(handleSubmitSignupForm)}>
            <div className="flex space-x-6 my-4">
                <div className="w-1/2 relative">
                    <TextInput
                        register={register}
                        errors={errors}
                        inputName="firstName"
                        placeholder={t('firstname')}
                        type="name"
                        validation={{
                            required: "Please input your first name"
                        }}
                        labelClassName="hidden"
                        labelText="First Name"
                    />
                </div>
                <div className="w-1/2 relative">
                    <TextInput
                        register={register}
                        errors={errors}
                        inputName="lastName"
                        placeholder={t('lastname')}
                        type="name"
                        validation={{
                            required: "Please input your last name"
                        }}
                        labelClassName="hidden"
                        labelText="Last Name"
                    />
                </div>
            </div>

            <div className="my-4 relative">
                <TextInput
                    register={register}
                    errors={errors}
                    inputName="email"
                    placeholder={t('email')}
                    type="email"
                    validation={{
                        required: "Please input your email"
                    }}
                    labelClassName="hidden"
                    labelText="Email"
                />
            </div>

            <div className="my-4 relative">
                <PasswordInput 
                    inputName="password"
                    register={register} 
                    errors={errors} 
                    placeholder={t('password')}
                    validation={{ 
                        required: "You must specify a password",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    }}
                />
            </div>

            <div className="my-4 relative">
                <PasswordInput 
                    inputName="confirmPassword"
                    register={register} 
                    errors={errors} 
                    placeholder={t('signup:confirm-password')}
                    validation={{ 
                        required: "Re-enter your password", 
                        validate: value => value === watchPassword || "The passwords do not match"
                    }}
                />
            </div>

            <div className="flex items-center justify-between relative mb-1">
                <div className="">
                    <InputCheckbox 
                        register={register}
                        errors={errors}
                        inputName="termsAndConditions"
                        validation={{
                            validate: value => value === false ? "Agreeing to terms & conditions is required" : true
                        }}
                        labelClassName="px-1 text-xs text-gray-10 align-middle pb-1"
                        labelText={t('signup:terms-and-conditions')}
                        defaultChecked={false}
                    />
                    {/* <input
                        id="termsAndConditions"
                        type="checkbox"
                        defaultChecked={false}
                        aria-invalid={errors.termsAndConditions ? "true" : "false"}
                        {...register('termsAndConditions', {
                            validate: value => value === false ? "Agreeing to terms & conditions is required" : true
                        }) }
                        className="checked:bg-blue-600 checked:border-transparent w-5 h-5"
                    />
                    <label htmlFor="termsAndConditions" className="px-1 text-xs text-gray-10 align-middle pb-1">{t('signup:terms-and-conditions')}</label> */}
                </div>
                {errors.termsAndConditions &&  (
                <span role="alert" className="pl-6 absolute -bottom-2 text-xs text-red-500">{errors.termsAndConditions.message}</span>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="">
                    <InputCheckbox 
                        register={register}
                        errors={errors}
                        inputName="newsletter"
                        validation={{}}
                        labelClassName="px-1 text-xs text-gray-10 align-middle pb-1"
                        labelText={t('signup:newsletter')}
                        defaultChecked={false}
                    />
                </div>
            </div>

            <div className="flex items-end justify-between mt-6 ">
                <div>
                    <LinkedinButton type="button">
                        {t('use')} Linkedin
                    </LinkedinButton>
                    <GoogleButton type="button">
                        {t('use')} Google
                    </GoogleButton>
                </div>
                <div className="flex ">
                    <p 
                        className="text-secondary-gray text-right self-center pr-1 md:pr-2 underline text-xs cursor-pointer inline-block"
                        onClick={() => handleRouteToLogin()}
                    >
                        {t('signup:signin-instead')}
                    </p>
                    <PrimaryButton type="submit">
                        {t('signup:create-account')}
                    </PrimaryButton>
                </div>
            </div>
            
        </form>
    )
}

export default SignUpForm