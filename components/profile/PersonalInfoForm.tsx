import { PrimaryButton, PrimaryTransparentButton } from "components/common/Button";
import { TextInput } from "components/common/Input";
import React, {useState} from "react"
import { useForm, SubmitHandler, Controller} from "react-hook-form";
import {UploadOutlined} from '@ant-design/icons'
import Select from "react-select";
import Dropzone from './PhotoUpload'

interface FormValues {
    firstName: string,
    lastName: string,
    suffix?: string,
    preferredName?: string,
    gender?: string
    headline?: boolean
    linkedinUrl?: boolean,
    photo?: string
}

const genderList = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non binary" }
]

const PersonalInfoForm: React.FC = () => {

    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [uploadedPhoto, setUploadedPhoto] = useState(null)

    const handleSubmitPersonalInfo: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data)
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
                                    labelText={<p className="profile-form-label ">First Name / Given Name <span className="text-red-600">*</span></p>}
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
                                    labelText={<p className="profile-form-label ">Last / Family / Surname <span className="text-red-600">*</span></p>}
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
                                    labelClassName=""
                                    labelText={<p className="profile-form-label">Suffix</p>}
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
                                    labelClassName=""
                                    labelText={<p className="profile-form-label">Preferred Name (Nickname)</p>}
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
                                    labelClassName=""
                                    labelText={<p className="profile-form-label">Add a headline to your profile</p>}
                                />
                            </div>
                    </div>

                    <div className="flex space-x-4 my-6">
                        <div className="w-full relative">
                                <TextInput
                                    register={register}
                                    errors={errors}
                                    inputName="linkedin"
                                    placeholder={"LinkedIn Profile"}
                                    type="name"
                                    validation={{
                                        
                                    }}
                                    labelClassName=""
                                    labelText={<p className="profile-form-label">LinkedIn Profile</p>}
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