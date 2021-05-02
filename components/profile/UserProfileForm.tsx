import React from 'react'
import FormContentPanel from './FormContentPanel'
import {useForm} from "react-hook-form";
import useList from 'lib/useList'
import useCompletionStatus from 'lib/useCompletionStatus'
import { TextArea, AsyncMultiSelectionInput } from 'components/common/Input';
import ProfileFormSidePanel from './ProfileFormSidePanel';
import {useMutation, useQueryClient} from "react-query";
import { request, gql } from "graphql-request";
import {useRouter} from 'next/router'
import {buildArrayValueForReactSelect, getArrayOfValueFromReactSelect} from 'lib/utils'
import {endpoint} from 'config'

type SelectObj = {
    value: string
    label: string
}

interface FormValues {
    summary?: string,
    skills?: SelectObj[],
    tools?: string[],
    interest?: string[]
}

const UserProfileForm = ({profileData}) => {
    
    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: {
            summary: profileData[0]?.summary ? profileData[0].summary : "",
            skills: [],
            tools: [],
            interest: []
        }
    });
    const watchAllFields = watch();

    const skills = useList(profileData[0]?.skills?.length > 0 ? buildArrayValueForReactSelect(profileData[0].skills) : [])
    const tools = useList(profileData[0]?.tools?.length > 0 ? buildArrayValueForReactSelect(profileData[0].tools) : [])
    const interest = useList(profileData[0]?.interest?.length > 0 ? buildArrayValueForReactSelect(profileData[0].interest) : [])

    const userProfile = useCompletionStatus({
        summary: watchAllFields.summary,
        skills: skills.list.length,
        tools: tools.list.length,
        interest: interest.list.length
    })

    const queryClient = useQueryClient()
    const {mutate: updateProfile} = useMutation((values: FormValues) =>
        request(endpoint, UPDATE_USER_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('userProfile')
                router.push('/profile')
            }
        }
    );

    const {mutate: createProfile} = useMutation((values: FormValues) =>
        request(endpoint, CREATE_USER_PROFILE, values), {
            onError: (error) => {
                console.log(error)
            },
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries('profile')
                queryClient.invalidateQueries('userProfile')
                router.push('/profile')
            }
        }
    );

    const handleUpdateUserProfile = (data: FormValues) => {
        if (profileData.length < 1) {
            const createUserProfileData = {
                summary: data.summary,
                skills: getArrayOfValueFromReactSelect(skills.list),
                tools: getArrayOfValueFromReactSelect(tools.list),
                interest: getArrayOfValueFromReactSelect(interest.list),
                user_id: 1
            }
            createProfile(createUserProfileData)
        } else {
            const updateUserProfileData = {
                id: profileData[0].id,
                summary: data.summary,
                skills: getArrayOfValueFromReactSelect(skills.list),
                tools: getArrayOfValueFromReactSelect(tools.list),
                interest: getArrayOfValueFromReactSelect(interest.list),
                user_id: 1
            }
            updateProfile(updateUserProfileData)
        }
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateUserProfile)}>
            <div className="edit-profile-main ">
                <FormContentPanel id="summary" title="Summary" subtitle="Start by introducing yourself.">
                    <TextArea 
                        id="summaryInput"
                        register={register}
                        errors={errors}
                        inputName="summary"
                        placeholder="Write your summary here..."
                        validation={{}}
                        labelClassName="profile-form-label"
                        labelText="Write a short summary about yourself. This can include your goals and aspirations, your past achievments, or what you’ve been working on."
                    />
                </FormContentPanel>
                <FormContentPanel id="skills" title="Skills" subtitle="Let others know what you’re good at.">
                    <AsyncMultiSelectionInput 
                        id="skillsInput"
                        inputName="skills"
                        labelClassName="profile-form-label"
                        labelText="Choose the industry knowledge skills that apply to you."
                        control={control}
                        optionsArray={skillsOptions}
                        listHook={skills}
                        subLabel=""
                        placeholder="Type in some skills"
                    />
                    <hr className="my-8"/>
                    <AsyncMultiSelectionInput 
                        inputName="tools"
                        labelClassName="profile-form-label"
                        labelText="Add to the list with some relevant tools and technologies you are proficient in."
                        control={control}
                        optionsArray={toolsOptions}
                        listHook={tools}
                        subLabel=""
                        placeholder="Type in some tools"
                    />
                    
                </FormContentPanel>
                <FormContentPanel id="interest" title="Interest" subtitle="Let others know what you’re interested in.">
                    <AsyncMultiSelectionInput 
                        id="interestInput"
                        inputName="interest"
                        labelClassName="profile-form-label"
                        labelText="Add to the list with topics that interest you."
                        control={control}
                        optionsArray={interestOptions}
                        listHook={interest}
                        subLabel=""
                        placeholder="Type in your topic..."
                    />
                </FormContentPanel>
            </div>
            <ProfileFormSidePanel 
                completionPercentage={userProfile.completionPercentage}
                sections={["summary", "skills", "interest"]}
            />
        </form>
    )
}

export default UserProfileForm

const skillsOptions = [
    {value: "Marketing", label: "Marketing"},
    {value: "Product", label: "Product"},
    {value: "Promotion", label: "Promotion"},
]
const toolsOptions = [
    {value: "Tools1", label: "Tools1"},
    {value: "Tools2", label: "Tools2"},
    {value: "Tools3", label: "Tools3"},
]
const interestOptions = [
    {value: "Topic1", label: "Topic1"},
    {value: "Topic2", label: "Topic2"},
    {value: "Topic3", label: "Topic3"},
]

const CREATE_USER_PROFILE = gql`
  mutation CREATE_USER_PROFILE($summary: String!, $skills: [String]!, $tools: [String]!, $interest: [String]!, $user_id: ID!)  {
    createUserProfile (summary: $summary, skills: $skills, tools: $tools, interest: $interest, user_id: $user_id) {
        
        summary,
        skills,
        tools,
        interest,
        user_id
    }
  }
`;

const UPDATE_USER_PROFILE = gql`
  mutation UPDATE_USER_PROFILE($id: ID!, $summary: String!, $skills: [String]!, $tools: [String]!, $interest: [String]!, $user_id: ID!)  {
    updateUserProfile (id: $id, summary: $summary, skills: $skills, tools: $tools, interest: $interest, user_id: $user_id) {
        id,
        summary,
        skills,
        tools,
        interest,
        user_id
    }
  }
`;