import { PrimaryButton, PrimaryTransparentButton } from "components/common/Button";
import { TextInput } from "components/common/Input";
import React, {useState} from "react"
import { useForm, SubmitHandler, Controller} from "react-hook-form";
import {UploadOutlined} from '@ant-design/icons'
import Select from "react-select";
import Dropzone from './PhotoUpload'
import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useRouter} from 'next/router'
import {endpoint} from 'config'

interface Props {
    data: {
        User: FormValues
    }
}

interface FormValues {
    id: number,
    firstName: string,
    lastName: string,
    suffix?: string,
    preferredName?: string,
    gender?: string
    headline?: string
    linkedinUrl?: string,
    photo?: string
}

const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non binary" }
]

const UPDATE_PERSONAL_INFO = gql`
  mutation UPDATE_PERSONAL_INFO($id: ID!, $firstName: String!, $lastName: String!, $headline: String!, $linkedinUrl: String!)  {
    updateUser(id: $id, firstName: $firstName, lastName: $lastName, headline: $headline, linkedinUrl: $linkedinUrl) {
        id
        firstName
        lastName
        linkedinUrl
        headline
        preferredName
    }
  }
`;

const PersonalInfoForm: React.FC<Props> = ({data: {User}}) => {
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: {
            firstName: User.firstName,
            lastName: User.lastName,
            suffix: User.suffix,
            preferredName: User.preferredName,
            gender: User.gender,
            headline: User.headline,
            linkedinUrl: User.linkedinUrl
        }
    });

    const [uploadedPhoto, setUploadedPhoto] = useState(null)

    const queryClient = useQueryClient()
    const {mutate} = useMutation((values: FormValues) =>
        request(endpoint, UPDATE_PERSONAL_INFO, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries('personalInfoForm')
                queryClient.invalidateQueries('profile')
                router.push('/profile')
            }
        }
    );
    
    const handleSubmitPersonalInfo: SubmitHandler<FormValues> = (formData) => {
        console.log(formData)
        formData.id = 1
        mutate(formData)
    }

    const handleSetUploadedPhoto = (e) => {
        setUploadedPhoto(e)
    }

    return (
        <div className="bg-white p-6">
            <h1 className="main-title">Personal Information</h1>
            <p className="sub-title">Modify your personal information.</p>
            <hr className="my-6" />

            <form className="flex flex-wrap justify-around px-6 -mx-2" onSubmit={handleSubmit(handleSubmitPersonalInfo)}>

                <div className="w-1/3 px-1 flex justify-start">
                    <div className="w-48">

                        {uploadedPhoto ?
                        <div className="border h-48 mb-2">
                            <img src={URL.createObjectURL(uploadedPhoto)} alt="" className="h-full w-full object-cover" />
                        </div>
                        :
                        <div className="border h-48 mb-2"></div>
                        }

                        <Controller
                            name="photo"
                            control={control}
                            render={({ field: {onChange} }) => (
                                <Dropzone
                                  onChange={e => {
                                      onChange(e.target.files[0])
                                      handleSetUploadedPhoto(e.target.files[0])
                                    }
                                  }
                                />
                              )}
                        />
                        
                        <p className="italic text-xs text-gray-7 mt-2">
                            .jpg and .png files are allowed.
                            Files should be no larger than 1mb.
                        </p>
                    </div>
                </div>

                <div className="w-full sm:w-2/3 px-2">
                    <div className="flex space-x-4 mb-4">
                        <div className="w-1/2 relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="firstName"
                                    placeholder={"First Name"}
                                    type="name"
                                    validation={{
                                        required: "Please input your first name"
                                    }}
                                    labelClassName=""
                                    labelText={<span className="profile-form-label ">First Name / Given Name <span className="text-red-600">*</span></span>}
                                />
                            </div>
                            <div className="w-1/2 relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="lastName"
                                    placeholder={"Last Name"}
                                    type="name"
                                    validation={{
                                        required: "Please input your last name"
                                    }}
                                    labelClassName=""
                                    labelText={<span className="profile-form-label ">Last / Family / Surname <span className="text-red-600">*</span></span>}
                                />
                        </div>
                    </div>

                    <div className="flex space-x-4 my-6">
                        <div className="w-1/2 relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="suffix"
                                    placeholder={"Suffix"}
                                    type="name"
                                    validation={{
                                        
                                    }}
                                    labelClassName="profile-form-label"
                                    labelText="Suffix"
                                />
                            </div>
                            <div className="w-1/2 relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="preferredName"
                                    placeholder={"Preferred Name"}
                                    type="name"
                                    validation={{
                                        
                                    }}
                                    labelClassName="profile-form-label"
                                    labelText="Preferred Name (Nickname)"
                                />
                        </div>
                    </div>

                    <div className="flex space-x-4 my-6">
                            <div className="w-full relative">
                                <label htmlFor="gender" className="profile-form-label">Preferred Gender Pronoun</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    defaultValue={{value: "male", label: "Male"}}
                                    render={({ field }) => 
                                        <Select 
                                            id="gender"
                                            {...field} 
                                            className="w-1/2 pt-2"
                                            options={genderList} 
                                            placeholder="Please Select"
                                        />
                                    }
                                />
                            </div>
                            <div></div>
                    </div>

                    <div className="flex space-x-4 my-6">
                        <div className="w-full relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="headline"
                                    placeholder={"Headline"}
                                    type="name"
                                    validation={{
                                        
                                    }}
                                    labelClassName="profile-form-label"
                                    labelText="Add a headline to your profile"
                                />
                            </div>
                    </div>

                    <div className="flex space-x-4 my-6">
                        <div className="w-full relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="linkedinUrl"
                                    placeholder={"LinkedIn Profile"}
                                    type="name"
                                    validation={{
                                        
                                    }}
                                    labelClassName="profile-form-label"
                                    labelText="LinkedIn Profile"
                                />
                            </div>
                    </div>

                    <div className="flex justify-end my-6">
                        <PrimaryButton type="submit">Save Changes</PrimaryButton>
                    </div>

                </div>
            </form>
        </div>
    )
} 

export default PersonalInfoForm