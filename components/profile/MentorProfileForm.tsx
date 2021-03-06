import {useForm, Controller} from "react-hook-form";
import React from 'react'
import FormContentPanel from './FormContentPanel';
import { TextInput, TextInputInline, InputRadio, AsyncMultiSelectionInput, SelectInput } from 'components/common/Input';
import Select from "react-select";
import useList from 'lib/useList'
import useCompletionStatus from 'lib/useCompletionStatus'
import ProfileFormSidePanel from "./ProfileFormSidePanel";
import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useRouter} from 'next/router'
import {buildArrayValueForReactSelect, buildObjectValueForReactSelect, getArrayOfValueFromReactSelect, getStringValueFromReactSelect} from 'lib/utils'
import {endpoint} from 'config'

type SelectObj = {
    value: string
    label: string
}

interface FormValues {
    summary: string
    region: SelectObj
    languages: string
    remote: string
    familiarSector: SelectObj[]
    mentoringSector: SelectObj[]
}

const regionList = [
    { value: "USA", label: "USA" },
    { value: "Europe", label: "Europe" },
    { value: "Asia", label: "Asia" }
]

const sectorsOptions = [
    {value: "Biotech", label: "Biotech"},
    {value: "Impact", label: "Impact"},
    {value: "e-Commerce", label: "e-Commerce"},
]

const MentorProfileForm = ({profileData}) => {
    const router = useRouter()
    const {register, control, formState: { errors }, watch , handleSubmit} = useForm<FormValues>({
        defaultValues: {
            summary: profileData[0]?.summary ? profileData[0].summary : "",
            region: profileData[0]?.region ? buildObjectValueForReactSelect(profileData[0].region) : null,
            languages: profileData[0]?.languages ? profileData[0].languages : "",
            remote: profileData[0]?.remote ? profileData[0].remote : "",
            familiarSector: [],
            mentoringSector: []
        }
    });
    const watchAllFields = watch();

    const familiarSector = useList(profileData[0]?.familiarSector?.length > 0 ? buildArrayValueForReactSelect(profileData[0].familiarSector) : [], 1)
    const mentoringSector = useList(profileData[0]?.mentoringSector?.length > 0 ? buildArrayValueForReactSelect(profileData[0].mentoringSector) : [], 10)
    
    const mentorProfile = useCompletionStatus({
        summary: watchAllFields.summary,
        region: watchAllFields.region ? watchAllFields.region.value: watchAllFields.region,
        languages: watchAllFields.languages,
        remote: watchAllFields.remote,
        familiarSector: familiarSector.list.length,
        mentoringSector: mentoringSector.list.length,
    })

    const queryClient = useQueryClient()
    const {mutate: updateProfile} = useMutation((values: FormValues) =>
        request(endpoint, UPDATE_MENTOR_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('mentorProfile')
                router.push('/profile/mentor-profile')
            }
        }
    );

    const {mutate: createProfile} = useMutation((values: FormValues) =>
        request(endpoint, CREATE_MENTOR_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('mentorProfile')
                router.push('/profile/mentor-profile')
            }
        }
    );

    const handleUpdateMentorProfile = (data: FormValues) => {
        const updateProfileData = {
            id: profileData[0]?.id || null,
            summary: data.summary,
            region: getStringValueFromReactSelect(data.region),
            languages: data.languages,
            remote: data.remote,
            familiarSector: getArrayOfValueFromReactSelect(familiarSector.list),
            mentoringSector: getArrayOfValueFromReactSelect(mentoringSector.list),
            user_id: 1
        }

        if (profileData.length < 1) {
            createProfile(updateProfileData)
        } else {
            updateProfile(updateProfileData)
        }
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateMentorProfile)}>
            <div className="edit-profile-main">
                <FormContentPanel id="introduction" title="Introduction" subtitle="Let us know where you are located and what languages you???re comfortable conversing in.">
                    <div className="space-y-6">
                        <TextInput
                            register={register}
                            errors={errors}
                            inputName="summary"
                            placeholder="I want to pay it forward and help startups."
                            type="name"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Write a short summary on your mentorship goals."
                        />
                    </div>
                    <hr className="my-8"/>
                    <div className="space-y-6">
                        <SelectInput 
                            parentClassName="flex items-center"
                            inputName="region"
                            labelClassName="profile-form-label w-1/3"
                            labelText="Region:"
                            control={control}
                            placeholder="Please Select"
                            optionsArray={regionList}
                            inputStyle="w-40"
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="languages"
                            placeholder="English, German"
                            type="text"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Languages:"
                        />
                        <InputRadio 
                            register={register}
                            inputName="remote"
                            groupLabelText="Remote team?"
                            labelClassName="profile-form-label"
                            radioList={["yes", "no"]}
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="expertise" title="Expertise" subtitle="Narrow down on the topics you???re able to mentor in.">
                    <div className="space-y-6">
                        <AsyncMultiSelectionInput 
                            inputName="familiarSector"
                            labelClassName="profile-form-label"
                            labelText="Choose the industry that you???re most familiar with."
                            control={control}
                            optionsArray={sectorsOptions}
                            listHook={familiarSector}
                            subLabel="Choose only 1 sector."
                            placeholder="Type in your sector..."
                        />
                        <AsyncMultiSelectionInput 
                            inputName="mentoringSector"
                            labelClassName="profile-form-label"
                            labelText="Choose the industry sectors that you???re interested in mentoring."
                            control={control}
                            optionsArray={sectorsOptions}
                            listHook={mentoringSector}
                            subLabel="Choose up to 10 sectors."
                            placeholder="Type in your sector..."
                        />
                    </div>
                </FormContentPanel>
            </div>
            <ProfileFormSidePanel 
                completionPercentage={mentorProfile.completionPercentage}
                sections={['introduction', 'expertise']} 
            />
        </form>
    )
}

export default MentorProfileForm

const CREATE_MENTOR_PROFILE = gql`
  mutation CREATE_MENTOR_PROFILE(
        
        $summary: String!,
        $region: String!, 
        $languages: String!, 
        $remote: String!, 
        $familiarSector: [String]!,
        $mentoringSector: [String]!,
        $user_id: ID!
    )  {
    createMentorProfile (
        summary: $summary,
        region: $region, 
        languages: $languages, 
        remote: $remote, 
        familiarSector: $familiarSector,
        mentoringSector: $mentoringSector,
        user_id: $user_id
    ) {
        id
    }
  }
`;

const UPDATE_MENTOR_PROFILE = gql`
  mutation UPDATE_MENTOR_PROFILE(
        $id: ID!, 
        $summary: String!,
        $region: String!, 
        $languages: String!, 
        $remote: String!, 
        $familiarSector: [String]!,
        $mentoringSector: [String]!,
        $user_id: ID!
    )  {
    updateMentorProfile (
        id: $id, 
        summary: $summary,
        region: $region, 
        languages: $languages, 
        remote: $remote, 
        familiarSector: $familiarSector,
        mentoringSector: $mentoringSector,
        user_id: $user_id
    ) {
        id,
    }
  }
`;