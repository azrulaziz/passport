import React, {useState} from "react"
import {PrimaryButton, LinkedinButton, GoogleButton} from 'components/common/Button'
import { useForm, SubmitHandler} from "react-hook-form";
import { TextInput, PasswordInput, InputCheckbox } from "components/common/Input";

interface FormValues {
    email: string,
    password: string,
    rememberme?: boolean
}

const SignInForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const handleSubmitLoginForm: SubmitHandler<FormValues> = (data: FormValues) => {
        // TODO: handle api call here
        console.log(data)
    }

    return (
        <form className="" onSubmit={handleSubmit(handleSubmitLoginForm)}>
            <div className="my-4 relative">
                <TextInput
                    register={register}
                    errors={errors}
                    inputName="email"
                    placeholder="Email"
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
                    placeholder="Password"
                    validation={{ 
                        required: "You must specify a password",
                        minLength: {
                            value: 8,
                            message: "Password must have at least 8 characters"
                        }
                    }}
                />
            </div>

            <div className="flex items-center justify-between">
                <div className="">
                    <InputCheckbox 
                        register={register}
                        errors={errors}
                        inputName="rememberme"
                        validation={{}}
                        labelClassName="px-1 text-xs text-gray-10 align-middle pb-1"
                        labelText="Remember Me"
                        defaultChecked={false}
                    />
                </div>
                <div className="text-right text-gray-8 text-xs italic">
                    <div>
                        <p className="cursor-pointer inline-block underline">Forgot my password</p>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-between mt-8">
                <div>
                    <LinkedinButton type="button">
                        Sign in using Linkedin
                    </LinkedinButton>
                    <GoogleButton type="button">
                        Sign in using Google
                    </GoogleButton>
                </div>
                <div>
                    <PrimaryButton type="submit">
                        Sign In
                    </PrimaryButton>
                </div>
            </div>
        </form>
    )
}

export default SignInForm