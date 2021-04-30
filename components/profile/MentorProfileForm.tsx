import {useForm, Controller} from "react-hook-form";
import React from 'react'
import FormContentPanel from './FormContentPanel';
import { TextInput, TextInputInline, InputRadio, AsyncMultiSelectionInput } from 'components/common/Input';
import Select from "react-select";
import useList from 'lib/useList'
import useCompletionStatus from 'lib/useCompletionStatus'
import ProfileFormSidePanel from "./ProfileFormSidePanel";
import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useRouter} from 'next/router'
import { v4 as uuidv4 } from 'uuid';
import {buildArrayValueForReactSelect, buildObjectValueForReactSelect, getArrayOfValueFromReactSelect, getStringValueFromReactSelect} from 'lib/utils'

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
            region: profileData[0]?.region ? buildObjectValueForReactSelect(profileData[0].region) : {},
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
        region: watchAllFields.region,
        languages: watchAllFields.languages,
        remote: watchAllFields.remote,
        familiarSector: familiarSector.list.length,
        mentoringSector: mentoringSector.list.length,
    })

    const queryClient = useQueryClient()
    const {mutate: updateProfile} = useMutation((values: FormValues) =>
        request("http://localhost:4000/graphql/", UPDATE_MENTOR_PROFILE, values), {
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
        request("http://localhost:4000/graphql/", CREATE_MENTOR_PROFILE, values), {
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
        if (profileData.length < 1) {
            const createProfileData = {
                id: uuidv4(),
                summary: data.summary,
                region: getStringValueFromReactSelect(data.region) || "",
                languages: data.languages,
                remote: data.remote,
                familiarSector: getArrayOfValueFromReactSelect(familiarSector.list),
                mentoringSector: getArrayOfValueFromReactSelect(mentoringSector.list),
                user_id: 1
            }
            createProfile(createProfileData)
        } else {
            const updateProfileData = {
                id: profileData[0].id,
                summary: data.summary,
                region: getStringValueFromReactSelect(data.region) || "",
                languages: data.languages,
                remote: data.remote,
                familiarSector: getArrayOfValueFromReactSelect(familiarSector.list),
                mentoringSector: getArrayOfValueFromReactSelect(mentoringSector.list),
                user_id: 1
            }
            updateProfile(updateProfileData)
        }
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateMentorProfile)}>
            <div className="edit-profile-main">
                <FormContentPanel id="introduction" title="Introduction" subtitle="Let us know where you are located and what languages you’re comfortable conversing in.">
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
                        <div className="flex items-center">
                            <label htmlFor="region" className="profile-form-label w-1/3">Region:</label>
                            <div className="w-full">
                                <Controller
                                    name="region"
                                    control={control}
                                    render={({ field }) => 
                                        <Select 
                                            inputId="region"
                                            {...field} 
                                            className="w-40 "
                                            options={regionList} 
                                            placeholder="Please Select"
                                        />
                                    }
                                />
                            </div>
                        </div>
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
                <FormContentPanel id="expertise" title="Expertise" subtitle="Narrow down on the topics you’re able to mentor in.">
                    <div className="space-y-6">
                        <AsyncMultiSelectionInput 
                            inputName="familiarSector"
                            labelClassName="profile-form-label"
                            labelText="Choose the industry that you’re most familiar with."
                            control={control}
                            optionsArray={sectorsOptions}
                            listHook={familiarSector}
                            subLabel="Choose only 1 sector."
                            placeholder="Type in your sector..."
                        />
                        <AsyncMultiSelectionInput 
                            inputName="mentoringSector"
                            labelClassName="profile-form-label"
                            labelText="Choose the industry sectors that you’re interested in mentoring."
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
        $id: ID!, 
        $summary: String!,
        $region: String!, 
        $languages: String!, 
        $remote: String!, 
        $familiarSector: [String]!,
        $mentoringSector: [String]!,
        $user_id: ID!
    )  {
    createMentorProfile (
        id: $id, 
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