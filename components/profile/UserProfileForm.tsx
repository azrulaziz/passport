import { PrimaryButton } from 'components/common/Button'
import React, {useEffect} from 'react'
import FormContentPanel from './FormContentPanel'
import { useForm, Controller} from "react-hook-form";
import AsyncSelect from 'react-select/async';
import {CloseOutlined, PlusOutlined} from '@ant-design/icons'
import ProfileSectionNav from './ProfileSectionNav'
import ProfileCompletion from './ProfileCompletion';
import useList from 'lib/useList'
import useCompletionStatus from 'lib/useCompletionStatus'

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
const existingSkills = [
    {value: "Programming", label: "Programming"},
]
const existingTools = []

const UserProfileForm: React.FC = () => {
    const { register, control, handleSubmit, formState: { errors }, watch } = useForm<FormValues>({
        defaultValues: {
            summary: "",
            skills: [],
            tools: [],
            interest: []
        }
    });
    const watchAllFields = watch();

    const skills = useList(existingSkills)
    const tools = useList(existingTools)
    const interest = useList([])
    
    const userProfile = useCompletionStatus({
        summary: watchAllFields.summary,
        skills: skills.list.length,
        tools: tools.list.length,
        interest: interest.list.length
    })
    
    useEffect(() => {
        userProfile.checkCompletionStatus()
    })
    
    const promiseOptions = (fn) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(fn);
        }, 1000);
    });

    const handleUpdateUserProfile = (data: FormValues) => {
        // data mutation here
        console.log(data)
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateUserProfile)}>
            <div className="edit-profile-main">
                <FormContentPanel id="summary" title="Summary" subtitle="Start by introducing yourself.">
                    <>
                        <label htmlFor="summaryInput" className="profile-form-label">Write a short summary about yourself. This can include your goals and aspirations, your past achievments, or what you’ve been working on.</label>
                        <textarea
                            id="summaryInput"
                            aria-label="summary"
                            {...register("summary")}
                            className="mt-2 border border-gray-5 block py-2 h-16 px-2 w-full rounded text-sm"
                            aria-placeholder="Write your summary here..."
                            placeholder="Write your summary here..."
                            defaultValue="dsdsdsd"
                        >
                        </textarea>
                    </>
                </FormContentPanel>
                <FormContentPanel id="skills" title="Skills" subtitle="Let others know what you’re good at.">
                    <>
                        <label htmlFor="skillsInput" className="profile-form-label">Choose the industry knowledge skills that apply to you.</label>
                        <Controller
                            name="skills"
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    inputId="skillsInput"
                                    aria-label="skills"
                                    {...field} 
                                    className="w-full pt-2"
                                    loadOptions={(e) => promiseOptions(skillsOptions.filter(i =>
                                        i.label.toLowerCase().includes(e.toLowerCase())
                                    ))}
                                    placeholder="Type in some skills"
                                    onChange={(value) => skills.handleAddValue(value)}
                                />
                            }
                        />
                        <p className="text-right text-xs text-gray-7">Press enter to add</p>
                        <div className="my-2 space-x-1">
                            {skills.list.map(skill => {
                                return (
                                    <div key={skill.label} className="bg-gray-2 border-2 border-gray-5 inline-block rounded py-1 px-2">
                                        <p className="text-xs text-gray-10 flex items-center">
                                            {skill.value} 
                                            <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => skills.handleRemoveValue(skill.value)} />
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="my-4 ">
                            <p className="pb-1 text-xs text-gray-7">Popular</p>
                            <div className="space-x-2">
                                {skillsOptions.map(skill => {
                                    return (
                                        <div key={skill.label} className=" border-2 border-dashed border-gray-5 inline-block rounded py-1 px-2 cursor-pointer"  onClick={() => skills.handleAddValue(skill)}>
                                            <p className="text-xs text-gray-7 flex items-center">
                                                <PlusOutlined className="pr-1 text-gray-7" />
                                                {skill.value} 
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                    <hr className="my-8"/>
                    <>
                        <label htmlFor="tools" className="profile-form-label">Add to the list with some relevant tools and technologies you are proficient in.</label>
                        <Controller
                            name="tools"
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    inputId="tools"
                                    aria-label="tools"
                                    {...field} 
                                    className="w-full pt-2"
                                    loadOptions={(e) => promiseOptions(toolsOptions.filter(i =>
                                        i.label.toLowerCase().includes(e.toLowerCase())
                                    ))}
                                    placeholder="Type in some tools & technologies..."
                                    onChange={(value) => tools.handleAddValue(value)}
                                />
                            }
                        />
                        <p className="text-right text-xs text-gray-7">Press enter to add</p>
                        <div className="my-2 space-x-1">
                            {tools.list.map(tool => {
                                return (
                                    <div key={tool.label} className="bg-gray-2 border-2 border-gray-5 inline-block rounded py-1 px-2">
                                        <p className="text-xs text-gray-10 flex items-center">
                                            {tool.value} 
                                            <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => tools.handleRemoveValue(tool.value)} />
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="my-4 ">
                            <p className="pb-1 text-xs text-gray-7">Popular</p>
                            <div className="space-x-2">
                                {toolsOptions.map(tool => {
                                    return (
                                        <div key={tool.label} className=" border-2 border-dashed border-gray-5 inline-block rounded py-1 px-2 cursor-pointer" onClick={() => tools.handleAddValue(tool)}>
                                            <p className="text-xs text-gray-7 flex items-center">
                                                <PlusOutlined className="pr-1 text-gray-7"  />
                                                {tool.value} 
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                </FormContentPanel>
                <FormContentPanel id="interest" title="Interest" subtitle="Let others know what you’re interested in.">
                    <>
                        <label htmlFor="interestInput" className="profile-form-label">Add to the list with topics that interest you.</label>
                        <Controller
                            name="interest"
                            control={control}
                            render={({ field }) => 
                                <AsyncSelect 
                                    inputId="interestInput"
                                    aria-label="interest"
                                    {...field} 
                                    className="w-full pt-2"
                                    loadOptions={(e) => promiseOptions(interestOptions.filter(i =>
                                        i.label.toLowerCase().includes(e.toLowerCase())
                                    ))}
                                    placeholder="Type in your topic..."
                                    onChange={(value) => interest.handleAddValue(value)}
                                />
                            }
                        />
                        <p className="text-right text-xs text-gray-7">Press enter to add</p>
                        <div className="my-2 space-x-2">
                            {interest.list.map(topic => {
                                return (
                                    <div key={topic.label} className="bg-gray-2 border-2 border-gray-5 inline-block rounded py-1 px-2">
                                        <p className="text-xs text-gray-10 flex items-center">
                                            {topic.value} 
                                            <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => interest.handleRemoveValue(topic.value)} />
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="my-4 ">
                            <p className="pb-1 text-xs text-gray-7">Popular</p>
                            <div className="space-x-2">
                                {interestOptions.map(topic => {
                                    return (
                                        <div key={topic.label} className=" border-2 border-dashed border-gray-5 inline-block rounded py-1 px-2 cursor-pointer" onClick={() => interest.handleAddValue(topic)}>
                                            <p className="text-xs text-gray-7 flex items-center">
                                                <PlusOutlined className="pr-1 text-gray-7"  />
                                                {topic.value} 
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </>
                </FormContentPanel>
            </div>
            <div className="edit-profile-side">
                <div className="p-6 sticky top-20">
                    <ProfileCompletion completionPercentage={userProfile.completionPercentage} />
                    <ProfileSectionNav sections={["summary", "skills", "interest"]} />
                    <PrimaryButton type="submit">Save Profile</PrimaryButton>
                </div>
            </div>
        </form>
    )
}

export default UserProfileForm