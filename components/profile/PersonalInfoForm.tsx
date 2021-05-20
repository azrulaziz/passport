import React, {useState, useEffect} from "react"
import {useRouter} from 'next/router'
import { useForm, SubmitHandler, Controller} from "react-hook-form";
import {useTheme} from 'next-themes'
import {UploadOutlined} from '@ant-design/icons'
import Select from "react-select";

import {buildObjectValueForGenderSelect, getStringValueFromReactSelect} from 'lib/utils'
import { PrimaryButton } from "components/common/Button";
import { TextInput } from "components/common/Input";
import Dropzone from './PhotoUpload'

import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {endpoint} from 'config'

interface Props {
    data: {
        User: FormValues
    }
}

type SelectObj = {
    value: string
    label: string
}

interface FormValues {
    id: number,
    firstName: string,
    lastName: string,
    suffix?: string,
    preferredName?: string,
    gender?: SelectObj,
    otherPronouns?: string
    headline?: string
    linkedinUrl?: string,
    photo?: string
}

const genderList = [
    { value: "he/him/his", label: "he/him/his" },
    { value: "she/her/hers", label: "she/her/hers" },
    { value: "they/them/theirs", label: "they/them/theirs"},
    { value: "ze/hir/hirs", label: "ze/hir/hirs"},
    { value: "others", label: "let me specify"},
]

const PersonalInfoForm: React.FC<Props> = ({data: {User}}) => {
    const router = useRouter()
    const {theme, setTheme} = useTheme()
    const { register, control, handleSubmit, setValue, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: {
            firstName: User.firstName,
            lastName: User.lastName,
            suffix: User.suffix,
            preferredName: User.preferredName,
            gender: User.gender ? buildObjectValueForGenderSelect(User.gender) : null,
            otherPronouns: User.otherPronouns,
            headline: User.headline,
            linkedinUrl: User.linkedinUrl
        }
    });
    const watchGenderPronouns = watch('gender')
    const [uploadedPhoto, setUploadedPhoto] = useState(null)
    const [specifyGender, setSpecifyGender] = useState(false)

    useEffect(() => {
        if (watchGenderPronouns && watchGenderPronouns.value === 'others') {
            setSpecifyGender(true)
        } else {
            setSpecifyGender(false)
            setValue('otherPronouns', "")
        }
    }, [watchGenderPronouns])
    
    const queryClient = useQueryClient()
    const {mutate} = useMutation((values: FormValues) =>
        request(endpoint, UPDATE_PERSONAL_INFO, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries('personalInfoForm')
                queryClient.invalidateQueries('profile')
                router.push('/profile')
            }
        }
    );

    const handleGenderData = (gender, otherPronouns) => {
        if (gender && gender.value === 'others' && !otherPronouns) {
            return ""
        } else {
            return getStringValueFromReactSelect(gender)
        }
    }
    
    const handleSubmitPersonalInfo = (data: FormValues) => {
        
        const updatePersonalInfo = {
            id: 1,
            firstName: data.firstName,
            lastName: data.lastName,
            suffix: data.suffix,
            preferredName: data.preferredName,
            gender: handleGenderData(data.gender, data.otherPronouns),
            otherPronouns: data.otherPronouns,
            headline: data.headline,
            linkedinUrl: data.linkedinUrl,
            photo: "",
        }
        // console.log(updatePersonalInfo)
        mutate(updatePersonalInfo)
    }

    const handleSetUploadedPhoto = (e) => {
        setUploadedPhoto(e)
    }

    return (
        <div className="section-bg p-6">
            <h1 className="main-title">Personal Information</h1>
            <p className="sub-title">Modify your personal information.</p>
            <hr className="my-6" />

            <form className="flex flex-wrap justify-around px-6 -mx-2" onSubmit={handleSubmit(handleSubmitPersonalInfo)}>

                <div className="md:w-1/3 px-1 flex justify-start mb-4">
                    <div className="w-48">

                        {uploadedPhoto ?
                        <div className="border h-48 w-48 mb-2">
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
                            Only .jpg and .png files are allowed.
                            Files should be no larger than 1mb.
                        </p>
                    </div>
                </div>

                <div className="w-full sm:w-2/3 px-2">
                    <div className="flex flex-wrap space-y-4 xl:space-y-0 xl:flex-nowrap xl:space-x-4 mb-4">
                        <div className="w-full xl:w-1/2 relative">
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
                            <div className="w-full xl:w-1/2 relative">
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

                    <div className="flex flex-wrap xl:flex-nowrap space-y-4 xl:space-y-0 xl:space-x-4 my-6">
                        <div className="w-full xl:w-1/2 relative">
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
                            <div className="w-full xl:w-1/2 relative">
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
                                <label htmlFor="gender" className="profile-form-label">Preferred Gender Pronouns</label>
                                <Controller
                                    name="gender"
                                    control={control}
                                    render={({ field }) => 
                                        <Select 
                                            id="gender"
                                            {...field} 
                                            className="w-1/2 pt-2 text-sm capitalize"
                                            classNamePrefix="react-select"
                                            options={genderList} 
                                            placeholder="Please Select"
                                            styles={{
                                                control: styles => ({ 
                                                    ...styles, 
                                                    backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
                                                    transition: 'none'
                                                }),
                                                menu: styles => ({ 
                                                    ...styles, 
                                                    backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
                                                }),
                                                singleValue: styles => ({
                                                    ...styles,
                                                    color: `${theme === 'dark' ? '#fff' : '#3B3B3Bf' }`
                                                }),
                                                option: base => ({
                                                    ...base,
                                                    "&:hover": {
                                                      backgroundColor: 'lightgray'
                                                    }
                                                })
                                            }}
                                        />
                                    }
                                />
                            </div>
                            <div></div>
                    </div>
                    {
                        specifyGender ?
                        <TextInput
                            register={register}
                            errors={errors}
                            inputName="otherPronouns"
                            placeholder="Preferred pronouns"
                            type="name"
                            validation={{
                                
                            }}
                            labelClassName=""
                            labelText={<span className="profile-form-label">Specify your preferred pronouns</span>}
                        />
                        :
                        <></>
                    }

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


const UPDATE_PERSONAL_INFO = gql`
  mutation UPDATE_PERSONAL_INFO(
        $id: ID!, 
        $firstName: String!, 
        $lastName: String!, 
        $gender: String!,
        $otherPronouns: String!,
        $headline: String!, 
        $linkedinUrl: String!
    )  {
    updateUser(
        id: $id, 
        firstName: $firstName, 
        lastName: $lastName, 
        gender: $gender,
        otherPronouns: $otherPronouns
        headline: $headline, 
        linkedinUrl: $linkedinUrl
    ) {
        id
        firstName
        lastName
        gender
        otherPronouns
        linkedinUrl
        headline
        preferredName
    }
  }
`;
