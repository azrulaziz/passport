import {useForm, Controller, useFieldArray} from "react-hook-form";
import React, {useState, useEffect, forwardRef} from 'react'
import FormContentPanel from './FormContentPanel';
import { TextInput, TextInputInline, TextArea, InputCheckbox, InputRadio, AsyncMultiSelectionInput } from 'components/common/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DownOutlined, CloseOutlined} from '@ant-design/icons'
import Select from "react-select";
import useList from 'lib/useList'
import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useRouter} from 'next/router'
import ProfileFormSidePanel from "./ProfileFormSidePanel";
import {buildArrayValueForReactSelect, buildObjectValueForReactSelect, getArrayOfValueFromReactSelect, getStringValueFromReactSelect} from 'lib/utils'
import {endpoint} from 'config'
import useCompletionStatus from 'lib/useCompletionStatus'

interface Props {
    data: any
}

type SelectObj = {
    value: string
    label: string
}

type FoundingMember = {
    name: string
    email: string
    title: string
    linkedin: string
    isFounder: boolean
}

interface FormValues {
    companyName?: string
    linkedinProfile?: string
    companyLogo?: string
    companyFounded?: string
    companyWebsite?: string
    sectors?: SelectObj[]
    stage?: SelectObj
    businessModel?: string
    describeCompany?: string
    describeBusinessModel?: string
    marketChannel?: string
    useCase?: string
    whyRightTiming?: string
    foundingMember: FoundingMember[]
    outsideFunding?: string
    fundraisingTarget?: string
    optionalLink?: string,
    companyLocation?: string,
    incorporatedLocation?: string
}

const sectorsOptions = [
    {value: "Biotech", label: "Biotech"},
    {value: "Impact", label: "Impact"},
    {value: "e-Commerce", label: "e-Commerce"},
]

const stageList = [
    { value: "seed", label: "Seed" },
    { value: "Pre-seed", label: "Pre-seed" },
    { value: "series A", label: "Series A" }
]

const model = ["Saas", "On-demand", "Mobile App", "Marketplace", "Content", "e-Commerce", "Other", "Cloud (Usage-based)"]

const YearInput = forwardRef(
    // @ts-ignore
    ({ value, onClick, onChange}, ref) => (
        <div className="flex relative w-3/5" onClick={onClick}>
            <input className="border py-2 px-2 w-full rounded text-sm" id="companyFounded" value={value} onChange={onChange} placeholder="Year" />
            <DownOutlined className="absolute right-3 top-3 cursor-pointer text-xs" />
        </div>
    ),
);

const CompanyProfileForm = ({profileData}) => {
    const router = useRouter()
    
    const {register, control, formState: { errors }, watch , handleSubmit} = useForm<FormValues>({
        defaultValues: {
            companyName: profileData[0]?.companyName ? profileData[0].companyName : "",
            linkedinProfile: profileData[0]?.linkedinProfile ? profileData[0].linkedinProfile : "",
            companyLogo: profileData[0]?.companyLogo ? profileData[0].companyLogo : "",
            companyFounded: profileData[0]?.companyFounded ? profileData[0].companyFounded : "",
            companyWebsite: profileData[0]?.companyWebsite ? profileData[0].companyWebsite : "",
            sectors: [],
            stage: profileData[0]?.stage ? buildObjectValueForReactSelect(profileData[0].stage) : {},
            businessModel: profileData[0]?.businessModel ? profileData[0].businessModel : "",
            describeCompany: profileData[0]?.describeCompany ? profileData[0].describeCompany : "",
            describeBusinessModel: profileData[0]?.describeBusinessModel ? profileData[0].describeBusinessModel : "",
            marketChannel: profileData[0]?.marketChannel ? profileData[0].marketChannel : "",
            useCase: profileData[0]?.useCase ? profileData[0].useCase : "",
            whyRightTiming: profileData[0]?.whyRightTiming ? profileData[0].whyRightTiming : "",
            foundingMember: profileData[0]?.foundingMemberList?.length > 0 ? profileData[0]?.foundingMemberList : [{name: "", email: "", title: "", linkedin: "", isFounder: false}],
            outsideFunding: profileData[0]?.outsideFunding ? profileData[0].outsideFunding : "",
            fundraisingTarget: profileData[0]?.fundraisingTarget ? profileData[0].fundraisingTarget : "",
            optionalLink: profileData[0]?.optionalLink ? profileData[0].optionalLink : "",
            companyLocation: profileData[0]?.companyLocation ? profileData[0].companyLocation : "",
            incorporatedLocation: profileData[0]?.incorporatedLocation ? profileData[0].incorporatedLocation : "",
        }
    });
    const watchAllFields = watch();
    
    const sectors = useList(profileData[0]?.sectors?.length > 0 ? buildArrayValueForReactSelect(profileData[0].sectors) : [], 3)

    const checkFieldArrayCompletion = (arr): boolean => {
        for (let i in arr[0]) {
            if (arr[0][i]) {
                return true
            }
            return false
        }
    }

    const companyProfile = useCompletionStatus({
        companyName: watchAllFields.companyName,
        linkedinProfile: watchAllFields.linkedinProfile,
        companyFounded: watchAllFields.companyFounded,
        companyWebsite: watchAllFields.companyWebsite,
        sectors: sectors.list.length,
        stage: watchAllFields.stage.value,
        businessModel: watchAllFields.businessModel,
        describeCompany: watchAllFields.describeCompany,
        describeBusinessModel: watchAllFields.describeBusinessModel,
        marketChannel: watchAllFields.marketChannel,
        useCase: watchAllFields.useCase,
        whyRightTiming: watchAllFields.whyRightTiming,
        foundingMember: checkFieldArrayCompletion(watchAllFields.foundingMember),
        outsideFunding: watchAllFields.outsideFunding,
        fundraisingTarget: watchAllFields.fundraisingTarget,
        optionalLink: watchAllFields.optionalLink,
        companyLocation: watchAllFields.companyLocation,
        incorporatedLocation: watchAllFields.incorporatedLocation
    })

    const {fields, append, remove} = useFieldArray({
          control,
          name: "foundingMember"
    });

    const handleAddTeamMember = (): void => {
        append({name: "", email: "", title: "", linkedin: "", isFounder: false})
    }

    const queryClient = useQueryClient()
    const {mutate: updateProfile} = useMutation((values: FormValues) =>
        request(endpoint, UPDATE_COMPANY_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('companyProfile')
                router.push('/profile/company-profile')
            }
        }
    );

    const {mutate: createProfile} = useMutation((values: FormValues) =>
        request(endpoint, CREATE_COMPANY_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('companyProfile')
                router.push('/profile/company-profile')
            }
        }
    );

    const handleUpdateCompanyProfile = (data: FormValues) => {
        // mutation here
        const updateProfileData = {
            id: profileData[0]?.id || null,
            companyName: data.companyName,
            linkedinProfile: data.linkedinProfile,
            companyFounded: data.companyFounded,
            companyWebsite: data.companyWebsite,
            companyLogo: "",
            sectors: getArrayOfValueFromReactSelect(sectors.list),
            stage: getStringValueFromReactSelect(data.stage) || "",
            businessModel: data.businessModel,
            describeCompany: data.describeCompany,
            describeBusinessModel: data.describeBusinessModel,
            marketChannel: data.marketChannel,
            useCase: data.useCase,
            whyRightTiming: data.whyRightTiming,
            foundingMember: data.foundingMember,
            outsideFunding: data.outsideFunding,
            fundraisingTarget: data.fundraisingTarget,
            optionalLink: data.optionalLink,
            companyLocation: data.companyLocation,
            incorporatedLocation: data.incorporatedLocation,
            user_id: 1
        }

        if (profileData.length < 1) {
            createProfile(updateProfileData)
        } else {
            updateProfile(updateProfileData)
        }
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateCompanyProfile)}>
            <div className="edit-profile-main">
                <FormContentPanel id="introduction" title="Introduction" subtitle="Start by introducing your company">
                    <div className="space-y-6">
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="companyName"
                            placeholder="Company Co LLC"
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Company name:"
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="linkedinProfile"
                            placeholder="https://www.linkedin.com/in/companyco/"
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="LinkedIn Profile:"
                        />
                    </div>
                    <hr className="my-8"/>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-1">
                            <label htmlFor="companyFounded" className="profile-form-label w-1/3">Company Founded:</label>
                            <div className="w-full">
                                <Controller
                                    name="companyFounded"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: {onChange} }) => 
                                        <DatePicker
                                            selected={watchAllFields.companyFounded ? new Date(watchAllFields.companyFounded) : null}
                                            onChange={date => {
                                                // setYearFounded(date)
                                                onChange(date)
                                            }}
                                            showYearPicker
                                            dateFormat="yyyy"
                                            placeholderText="Year"
                                            className=""
                                            customInput={<YearInput />}
                                        />
                                    }
                                />

                            </div>
                        </div>
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="companyWebsite"
                            placeholder="https://www.company.co/"
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Company Website:"
                        />
                        <AsyncMultiSelectionInput 
                            inputName="sectors"
                            labelClassName="profile-form-label"
                            labelText="What sectors are your business in?"
                            control={control}
                            optionsArray={sectorsOptions}
                            listHook={sectors}
                            subLabel="Choose up to 3 sectors"
                            placeholder="Type in your sector..."
                        />
                        <div className="">
                            <label htmlFor="stage" className="profile-form-label">What is the current stage of your company?</label>
                            <Controller
                                name="stage"
                                control={control}
                                render={({ field }) => 
                                    <Select 
                                        inputId="stage"
                                        {...field} 
                                        className="w-40 pt-2"
                                        options={stageList} 
                                        placeholder="Please Select"
                                    />
                                }
                            />
                        </div>
                        <InputRadio 
                            register={register}
                            inputName="businessModel"
                            groupLabelText="What business model category best matches your company?"
                            labelClassName="profile-form-label"
                            radioList={model}
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="founding team" title="Founding Team" subtitle="Introduce your founding team">
                    <div className="space-y-6">
                        <div className="space-y-6">
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-6">
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`foundingMember.${index}.name`}
                                            placeholder="John"
                                            type="name"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Name:"
                                            defaultValue={field.name}
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`foundingMember.${index}.email`}
                                            placeholder="John@email.com"
                                            type="email"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Email Address:"
                                            defaultValue={field.email}
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`foundingMember.${index}.title`}
                                            placeholder="CEO"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Title / Role:"
                                            defaultValue={field.title}
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`foundingMember.${index}.linkedin`}
                                            placeholder="https://www.linkedin.com/in/user/"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="LinkedIn Profile:"
                                            defaultValue={field.linkedin}
                                        />
                                        <div className="flex items-center space-x-1">
                                            <div className="w-1/3">
                                                {/* empty div for styling purposes */}
                                            </div>
                                            <div className="w-full">
                                                <InputCheckbox 
                                                    register={register}
                                                    errors={errors}
                                                    inputName={`foundingMember.${index}.isFounder`}
                                                    validation={{}}
                                                    labelClassName="profile-form-label pb-2 px-1 align-middle text-xs"
                                                    labelText="This person is a founder"
                                                    defaultChecked={field.isFounder}
                                                />
                                            </div>
                                        </div>
                                        {index === 0 ? 
                                        <></> 
                                        : 
                                        <div className="flex justify-end">
                                            <button className="border flex items-center text-red-400 text-xs border-red-400 px-1 rounded" onClick={() => remove(index)}><CloseOutlined /> Remove</button> 
                                        </div>
                                        }
                                        {index === fields.length - 1 ? <></> : <hr className="my-6"/> }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button className="border border-gray-5 border-dashed text-gray-7 py-2 px-4 text-sm" type="button" onClick={() => handleAddTeamMember()}>+ Add another team member</button>
                        </div>
                        <hr className="my-6"/> 
                        <TextInput
                            register={register}
                            errors={errors}
                            inputName="companyLocation"
                            placeholder="Type your locations here"
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Where is your company physically headquartered?"
                        />
                        <TextInput
                            register={register}
                            errors={errors}
                            inputName="incorporatedLocation"
                            placeholder="Type location here"
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Where is your company incorporated?"
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="the business" title="The Business" subtitle="What does your company do?">
                    <div className="space-y-6">
                        <TextInput
                            register={register}
                            errors={errors}
                            inputName="describeCompany"
                            placeholder="500 Startups is a seed fund & a network of startup programs."
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Describe what your company does in no more than 3 sentences. Give us your best elevator pitch:"
                        />
                        <TextArea 
                            id="describeBusinessModel"
                            register={register}
                            errors={errors}
                            inputName="describeBusinessModel"
                            placeholder=""
                            validation={{
                            }}
                            labelClassName="profile-form-label"
                            labelText="Describe your business model. How does (or will) your company make money, even if it is not making any today?"
                            maxLength="150"
                            wordcount="150 words or fewer"
                        />
                        <TextArea 
                            id="marketChannel"
                            register={register}
                            errors={errors}
                            inputName="marketChannel"
                            placeholder=""
                            validation={{
                            }}
                            labelClassName="profile-form-label"
                            labelText="What are your go-to-market channels right now? Tell us how they have been fueling your customer or revenue growth."
                            maxLength="150"
                            wordcount="150 words or fewer"
                        />
                        <TextArea 
                            id="useCase"
                            register={register}
                            errors={errors}
                            inputName="useCase"
                            placeholder=""
                            validation={{
                            }}
                            labelClassName="profile-form-label"
                            labelText="What problem or use case does your company address, and how do your potential target customers get by today in the absence of your product/service?"
                            maxLength="150"
                            wordcount="150 words or fewer"
                        />
                        <TextArea 
                            id="whyRightTiming"
                            register={register}
                            errors={errors}
                            inputName="whyRightTiming"
                            placeholder=""
                            validation={{
                            }}
                            labelClassName="profile-form-label"
                            labelText="Why is now the right timing for your company?"
                            maxLength="150"
                            wordcount="150 words or fewer"
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="fundraising" title="Fundraising" subtitle="Let us know your fundraising history and goals.">
                    <div className="space-y-6">
                        <InputRadio 
                            register={register}
                            inputName="outsideFunding"
                            groupLabelText="Have you already raised any outside funding?"
                            labelClassName="profile-form-label"
                            radioList={["yes", "no"]}
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="fundraisingTarget"
                            placeholder="$"
                            type="text"
                            validation={{
                                pattern: {
                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                    message: "Entered value is invalid. (Example: 100,000)"
                                }
                            }}
                            labelClassName="profile-form-label"
                            labelText="Fundraising Target:"
                        />
                        
                    </div>
                </FormContentPanel>
                <FormContentPanel id="supplementary files" title="Supplementary Files" subtitle="This is an optional section. Include an attachment or link only if you think it would be beneficial to help others understand what your company offers. You can add a team video, pitch deck, product demonstration video, etc.">
                    <div className="space-y-6">
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="optionalLink"
                            placeholder="https://"
                            type="text"
                            validation={{
                            }}
                            labelClassName="profile-form-label"
                            labelText="Add a link:"
                        />
                    </div>
                </FormContentPanel>
            </div>
            <ProfileFormSidePanel 
                completionPercentage={companyProfile.completionPercentage}
                sections={['introduction', 'founding team', 'the business', 'fundraising', 'supplementary files']} 
            />
        </form>
    )
}

export default CompanyProfileForm


const CREATE_COMPANY_PROFILE = gql`
  mutation CREATE_COMPANY_PROFILE(
        $companyName: String!,
        $linkedinProfile: String!, 
        $companyFounded: String!, 
        $companyWebsite: String!, 
        $companyLogo: String!,
        $sectors: [String]!,
        $stage: String!,
        $businessModel: String!, 
        $describeCompany: String!, 
        $describeBusinessModel: String!, 
        $marketChannel: String!, 
        $useCase: String!, 
        $whyRightTiming: String!, 
        $foundingMember: JSON!, 
        $outsideFunding: String!, 
        $fundraisingTarget: String!, 
        $optionalLink: String!,
        $companyLocation: String!, 
        $incorporatedLocation: String!,  
        $user_id: ID!
    )  {
    createCompanyProfile (
        companyName: $companyName,
        linkedinProfile: $linkedinProfile, 
        companyFounded: $companyFounded, 
        companyWebsite: $companyWebsite, 
        companyLogo: $companyLogo,
        sectors: $sectors,
        stage: $stage,
        businessModel: $businessModel, 
        describeCompany: $describeCompany, 
        describeBusinessModel: $describeBusinessModel, 
        marketChannel: $marketChannel, 
        useCase: $useCase, 
        whyRightTiming: $whyRightTiming, 
        foundingMember: $foundingMember, 
        outsideFunding: $outsideFunding, 
        fundraisingTarget: $fundraisingTarget, 
        optionalLink: $optionalLink,
        companyLocation: $companyLocation, 
        incorporatedLocation: $incorporatedLocation,  
        user_id: $user_id
    ) {
        id
    }
  }
`;

const UPDATE_COMPANY_PROFILE = gql`
  mutation UPDATE_COMPANY_PROFILE(
        $id: ID!, 
        $companyName: String!,
        $linkedinProfile: String!, 
        $companyFounded: String!, 
        $companyWebsite: String!, 
        $companyLogo: String!,
        $sectors: [String]!,
        $stage: String!,
        $businessModel: String!, 
        $describeCompany: String!, 
        $describeBusinessModel: String!, 
        $marketChannel: String!, 
        $useCase: String!, 
        $whyRightTiming: String!, 
        $foundingMember: JSON!, 
        $outsideFunding: String!, 
        $fundraisingTarget: String!, 
        $optionalLink: String!,
        $companyLocation: String!, 
        $incorporatedLocation: String!,  
        $user_id: ID!
    )  {
    updateCompanyProfile (
        id: $id, 
        companyName: $companyName,
        linkedinProfile: $linkedinProfile, 
        companyFounded: $companyFounded, 
        companyWebsite: $companyWebsite,
        companyLogo: $companyLogo, 
        sectors: $sectors,
        stage: $stage,
        businessModel: $businessModel, 
        describeCompany: $describeCompany, 
        describeBusinessModel: $describeBusinessModel, 
        marketChannel: $marketChannel, 
        useCase: $useCase, 
        whyRightTiming: $whyRightTiming, 
        foundingMember: $foundingMember, 
        outsideFunding: $outsideFunding, 
        fundraisingTarget: $fundraisingTarget, 
        optionalLink: $optionalLink,
        companyLocation: $companyLocation, 
        incorporatedLocation: $incorporatedLocation,  
        user_id: $user_id
    ) {
        id,
    }
  }
`;






















// custom fundraisingTarget input with dollar sign icon intact inside
{/* <div className="flex items-center space-x-1">
                            <label htmlFor="fundraisingTarget" className={`profile-form-label w-1/3`}>Fundraising Target</label>
                            <div className="flex relative w-2/3">
                                <p className="absolute left-2 transform -translate-y-0.5 py-2 text-gray-5 cursor-pointer">$</p> 
                                <div className="w-full">
                                    <input
                                        id="fundraisingTarget"
                                        aria-invalid={errors.fundraisingTarget ? "true" : "false"}
                                        {...register("fundraisingTarget", {
                                            
                                            pattern: {
                                                value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                                message: "Value entered is invalid"
                                            }
                                        })}
                                        className="border border-gray-5 block pl-5 py-2 px-2 w-full rounded text-sm"
                                        aria-placeholder=""
                                        placeholder=""
                                        type="text"
                                    />
                                    {errors.fundraisingTarget && (
                                        <span role="alert" className="absolute text-xs text-red-500">{errors.fundraisingTarget.message}</span>
                                    )}
                                </div>
                            </div>
                        </div> */}