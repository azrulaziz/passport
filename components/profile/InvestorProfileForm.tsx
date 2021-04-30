import {useForm, Controller, useFieldArray, useWatch} from "react-hook-form";
import React, {useState, forwardRef} from 'react'
import FormContentPanel from './FormContentPanel';
import { TextInput, TextInputInline, InputRadio, AsyncMultiSelectionInput, AsyncMultiSelectInsideInput, SelectInput, InputCheckbox } from 'components/common/Input';
import Select from "react-select";
import useList from 'lib/useList'
import ProfileFormSidePanel from "./ProfileFormSidePanel";
import {DownOutlined, CloseOutlined} from '@ant-design/icons'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PrimaryButton } from "components/common/Button";
import MediaCard from "./MediaCard";

type SelectObj = {
    value: string
    label: string
}

type PreviousInvestment = {
    company: string
    fundingRound: string
    date: string
    roundSize: string
    totalRaised: string
}

type EducationObj = {
    school: string
    degree: string
    field: string
}

type ExperienceObj = {
    company: string
    position: string
    startDate: string
    endDate: string
}

interface FormValues {
    title: string,
    role: string,
    minInvestment: string,
    sweetSpot: string,
    maxInvestment: string,
    sectorsOfInterest: SelectObj[]
    investmentHistory: PreviousInvestment[],
    investmentStage: SelectObj[],
    countriesOfInvestment: SelectObj[]
    leadInvestor: SelectObj[]
    investingAttributes: string[]
    education: EducationObj[]
    experience: ExperienceObj[]
    mediaLink: string
}

const sectorsOptions = [
    {value: "Biotech", label: "Biotech"},
    {value: "Impact", label: "Impact"},
    {value: "e-Commerce", label: "e-Commerce"},
]

const countriesOptions = [
    {value: "USA", label: "USA"},
    {value: "UK", label: "UK"},
    {value: "Singapore", label: "Singapore"},
]

const leadInvestorOptions = [
    {value: "I sometimes lead", label: "I sometimes lead"},
    {value: "I am a lead investor", label: "I am a lead investor"},
    {value: "Not a lead investor", label: "Not a lead investor"},
]

const investingAttributesOptions = [
    "I am/was a founder",
    "I am a diverse investor",
    "I am a female investor",
    "I invest in diverse founders",
    "I invest in female founders"
]

const educationHistoryList = []
const experienceHistoryList = []
const investmentHistoryList = []

const InvestorProfileForm: React.FC = () => {
    const {register, control, formState: { errors }, watch, setError, handleSubmit} = useForm<FormValues>({
        defaultValues: {
            title: "",
            role: "",
            minInvestment: "",
            sweetSpot: "",
            maxInvestment: "",
            sectorsOfInterest: [],
            investmentHistory: investmentHistoryList.length > 0 ? investmentHistoryList : [{
                company: "",
                fundingRound: "",
                date: "",
                roundSize: "",
                totalRaised: ""
            }],
            investmentStage: [],
            countriesOfInvestment: [],
            leadInvestor: [],
            investingAttributes: [],
            education: educationHistoryList.length > 0 ? educationHistoryList : [{
                school: "",
                degree: "",
                field: ""
            }],
            experience: experienceHistoryList.length > 0 ? experienceHistoryList : [{
                company: "",
                position: "",
                startDate: "",
                endDate: ""
            }], 
            mediaLink: ""
        }
    });
    
    const watchInvestingAttributesValue = watch('investingAttributes')
    const watchMediaLink = watch('mediaLink')

    const sectorsOfInterest = useList([], 10)
    const mediaLinks = useList([])
    
    const {
        fields: investmentHistoryFields, 
        append: investmentHistoryAppend, 
        remove: investmentHistoryRemove
    } = useFieldArray({control, name: "investmentHistory"});

    const {
        fields: educationFields, 
        append: educationAppend, 
        remove: educationRemove
    } = useFieldArray({control, name: "education"});

    const {
        fields: experienceFields, 
        append: experienceAppend, 
        remove: experienceRemove
    } = useFieldArray({control, name: "experience"});

    const handleAddInvestHistory = (): void => {
        investmentHistoryAppend({
            company: "",
            fundingRound: "",
            date: "",
            roundSize: "",
            totalRaised: ""
        })
    }

    const handleAddEducationHistory = (): void => {
        educationAppend({
            school: "",
            degree: "",
            field: "",
        })
    }

    const handleAddExperienceHistory = (): void => {
        experienceAppend({
            company: "",
            position: "",
            startDate: "",
            endDate: ""
        })
    }

    const handleAddMediaLink = (): void => {
        if (/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(watchMediaLink)) {
            mediaLinks.handleAddValue(watchMediaLink)
            setError("mediaLink", {})
        } else {
            setError("mediaLink", {
                shouldFocus: true,
                type: "string",
                message: "Please insert a valid link"
            });
        }
    }

    const handleRemoveMediaLink = (each) => {
        mediaLinks.handleRemoveValue(each)
    }

    const handleUpdateInvestorProfile = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form className="edit-profile-form" onSubmit={handleSubmit(handleUpdateInvestorProfile)}>
            <div className="edit-profile-main">
                <FormContentPanel id="introduction" title="Introduction" subtitle="Let us know your current status.">
                    <div className="space-y-6">
                        <InputRadio 
                            register={register}
                            inputName="title"
                            groupLabelText="What title would you like to be displayed on your investing profile?"
                            labelClassName="profile-form-label"
                            radioList={["VC", "Scout", "Angel", "Investor"]}
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="role"
                            placeholder="Former CEO, Founder"
                            type="text"
                            validation={{}}
                            labelClassName="profile-form-label"
                            labelText="Current Title / Role:"
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="investing info" title="Investing Info" subtitle="How much are you willing to spend, and your investing traits.">
                    <div className="space-y-6">
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="minInvestment"
                            placeholder="$"
                            type="text"
                            validation={{
                                pattern: {
                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                    message: "Entered value is invalid. (Example: 100,000)"
                                }
                            }}
                            labelClassName="profile-form-label"
                            labelText="Minimum Investment:"
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="sweetSpot"
                            placeholder="$"
                            type="text"
                            validation={{
                                pattern: {
                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                    message: "Entered value is invalid. (Example: 100,000)"
                                }
                            }}
                            labelClassName="profile-form-label"
                            labelText="Sweet Spot:"
                        />
                        <TextInputInline
                            register={register}
                            errors={errors}
                            inputName="maxInvestment"
                            placeholder="$"
                            type="text"
                            validation={{
                                pattern: {
                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                    message: "Entered value is invalid. (Example: 100,000)"
                                }
                            }}
                            labelClassName="profile-form-label"
                            labelText="Maximum Investment:"
                        />
                        <AsyncMultiSelectInsideInput 
                            inputName="investmentStage"
                            labelClassName="profile-form-label"
                            labelText="Investment Stage(s):"
                            control={control}
                            optionsArray={sectorsOptions}
                            placeholder="Type your stages here..."
                        />
                        <AsyncMultiSelectInsideInput 
                            inputName="countriesOfInvestment"
                            labelClassName="profile-form-label"
                            labelText="Countries of Investments:"
                            control={control}
                            optionsArray={countriesOptions}
                            placeholder="Type your locations here..."
                        />
                        <SelectInput 
                            inputName="leadInvestor"
                            labelClassName="profile-form-label"
                            labelText="Do you consider yourself a lead investor?"
                            control={control}
                            placeholder="Please Select"
                            optionsArray={leadInvestorOptions}
                            inputStyle="pt-2 w-full md:w-1/3"
                        />
                        <div className="space-y-0.5">
                            <p className="profile-form-label">What are your investing attributes?</p>
                            {investingAttributesOptions.map(each => {
                                return (
                                    <div key={each}>
                                        <InputCheckbox 
                                            register={register}
                                            errors={errors}
                                            inputName="investingAttributes"
                                            validation={{}}
                                            labelText={each}
                                            value={each}
                                            labelClassName="profile-form-label align-middle pb-1 px-1"
                                            defaultChecked={watchInvestingAttributesValue.some(x => x === each)}
                                        />
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                </FormContentPanel>
                <FormContentPanel id="sectors of interest" title="Sectors of Interest" subtitle="Where would you like to spend your investment?">
                    <div className="space-y-6">
                        <AsyncMultiSelectionInput 
                            inputName="familiarSector"
                            labelClassName="profile-form-label"
                            labelText="Choose the industry sectors that interest you. These will be the sector-specific lists you appear on."
                            control={control}
                            optionsArray={sectorsOptions}
                            listHook={sectorsOfInterest}
                            subLabel="Choose up to 10 sectors."
                            placeholder="Type in your sector..."
                        />
                    </div>
                </FormContentPanel>
                <FormContentPanel id="investing history" title="Investing History" subtitle="Include your previous investments here.">
                    <div className="space-y-6 ">
                        <div className="space-y-6">
                            {investmentHistoryFields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-6">
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`investmentHistory.${index}.company`}
                                            placeholder="Company Co"
                                            type="name"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Company:"
                                            defaultValue={field.company}
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`investmentHistory.${index}.fundingRound`}
                                            placeholder="Pre-seed"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Funding Round:"
                                            defaultValue={field.fundingRound}
                                        />

                                        <DateInput 
                                            labelText="Date:"
                                            labelClassName="profile-form-label w-1/3"
                                            inputName={`investmentHistory.${index}.date`}
                                            control={control}
                                            defaultValue={field.date}
                                            placeholderText="MM/YYYY"
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            index={index}
                                            inputGroup="investmentHistory"
                                            fieldName="date"
                                        />

                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`investmentHistory.${index}.roundSize`}
                                            placeholder="$"
                                            type="text"
                                            validation={{
                                                pattern: {
                                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                                    message: "Entered value is invalid. (Example: 100,000)"
                                                }
                                            }}
                                            labelClassName="profile-form-label"
                                            labelText="Round Size:"
                                            defaultValue={field.roundSize}
                                            index={index}
                                            fieldGroup="investmentHistory"
                                            fieldName="roundSize"
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`investmentHistory.${index}.totalRaised`}
                                            placeholder="$"
                                            type="text"
                                            validation={{
                                                pattern: {
                                                    value: /^[-+]?[0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?$/,
                                                    message: "Entered value is invalid. (Example: 100,000)"
                                                }
                                            }}
                                            labelClassName="profile-form-label"
                                            labelText="Total Raised:"
                                            defaultValue={field.totalRaised}
                                            index={index}
                                            fieldGroup="investmentHistory"
                                            fieldName="totalRaised"
                                        />
                                        {index === 0 ? 
                                        <></> 
                                        : 
                                        <div className="flex justify-end">
                                            <button className="border flex items-center text-red-400 text-xs border-red-400 px-1 rounded" onClick={() => investmentHistoryRemove(index)}><CloseOutlined /> Remove</button> 
                                        </div>
                                        }
                                        {index === investmentHistoryFields.length - 1 ? <></> : <hr className="my-6"/> }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button className="border border-gray-5 border-dashed text-gray-7 py-2 px-4 text-sm" type="button" onClick={() => handleAddInvestHistory()}>+ Add another investment</button>
                        </div>
                    </div>
                </FormContentPanel>
                <FormContentPanel id="in the news" title="In the News" subtitle="Add media you’d like featured on your profile.">
                    <div className="space-y-6 ">
                        <div className="flex items-center space-x-1">
                            <label htmlFor="mediaLink" className={`profile-form-label w-1/3`}>Add a link:</label>
                            <div className="relative w-full flex flex-wrap md:flex-nowrap items-center md:space-x-1">
                                <input
                                    id="mediaLink"
                                    aria-invalid={errors["mediaLink"] ? "true" : "false"}
                                    {...register("mediaLink", {})}
                                    className="border border-gray-5 py-2 px-2 block rounded text-sm w-full md:w-3/4"
                                    aria-placeholder="mediaLink"
                                    placeholder="https://"
                                    type="text"
                                />
                                <PrimaryButton type="button" extraStyle="w-full md:w-1/4" onClick={() => handleAddMediaLink()}>Add media</PrimaryButton>
                                {errors.mediaLink && (
                                <span role="alert" className="absolute -bottom-4 mt-1 text-xs text-red-500">{errors.mediaLink.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="border border-dashed border-gray-5 bg-gray-1 p-2 flex flex-wrap ">
                            {mediaLinks.list.map(each => {
                                return (
                                    <div key={each} className="w-full md:w-1/2 p-2">
                                        <MediaCard link={each} handleRemoveLink={handleRemoveMediaLink} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </FormContentPanel>
                <FormContentPanel id="experience & education" title="Experience & Education" subtitle="Include your education history and any previous experience here.">
                    <div className="space-y-6">
                        <div className="space-y-6">
                            {educationFields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-6">
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`education.${index}.school`}
                                            placeholder="Enter school here"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="School:"
                                            defaultValue={field.school}
                                        />

                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`education.${index}.degree`}
                                            placeholder="Enter degree here"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Degree:"
                                            defaultValue={field.degree}
                                        />
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`education.${index}.field`}
                                            placeholder="Technology"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Field of Study:"
                                            defaultValue={field.field}
                                        />
                                        {index === 0 ? 
                                        <></> 
                                        : 
                                        <div className="flex justify-end">
                                            <button className="border flex items-center text-red-400 text-xs border-red-400 px-1 rounded" onClick={() => educationRemove(index)}><CloseOutlined /> Remove</button> 
                                        </div>
                                        }
                                        {index === educationFields.length - 1 ? <></> : <hr className="my-6 mx-8"/> }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button className="border border-gray-5 border-dashed text-gray-7 py-2 px-4 text-sm" type="button" onClick={() => handleAddEducationHistory()}>+ Add education</button>
                        </div>
                        <hr className="my-8"/>
                        <div className="space-y-6">
                            {experienceFields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-6">
                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`experience.${index}.company`}
                                            placeholder="Enter company here"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Company:"
                                            defaultValue={field.company}
                                        />

                                        <TextInputInline
                                            register={register}
                                            errors={errors}
                                            inputName={`experience.${index}.position`}
                                            placeholder="Enter position here"
                                            type="text"
                                            validation={{}}
                                            labelClassName="profile-form-label"
                                            labelText="Position:"
                                            defaultValue={field.position}
                                        />
                                        <DateInput 
                                            labelText="Start Date:"
                                            labelClassName="profile-form-label w-1/3"
                                            inputName={`experience.${index}.startDate`}
                                            control={control}
                                            defaultValue={field.startDate}
                                            placeholderText="MM/YYYY"
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            index={index}
                                            inputGroup="experience"
                                            fieldName="startDate"
                                        />
                                        <DateInput 
                                            labelText="End Date:"
                                            labelClassName="profile-form-label w-1/3"
                                            inputName={`experience.${index}.endDate`}
                                            control={control}
                                            defaultValue={field.endDate}
                                            placeholderText="MM/YYYY"
                                            dateFormat="MM/yyyy"
                                            showMonthYearPicker
                                            index={index}
                                            inputGroup="experience"
                                            fieldName="endDate"
                                        />

                                        {index === 0 ? 
                                        <></> 
                                        : 
                                        <div className="flex justify-end">
                                            <button className="border flex items-center text-red-400 text-xs border-red-400 px-1 rounded" onClick={() => experienceRemove(index)}><CloseOutlined /> Remove</button> 
                                        </div>
                                        }
                                        {index === experienceFields.length - 1 ? <></> : <hr className="my-6 mx-8"/> }
                                    </div>
                                )
                            })}
                        </div>
                        <div className="flex justify-end">
                            <button className="border border-gray-5 border-dashed text-gray-7 py-2 px-4 text-sm" type="button" onClick={() => handleAddExperienceHistory()}>+ Add experience</button>
                        </div>
                        
                    </div>
                </FormContentPanel>
            </div>
            <ProfileFormSidePanel
                completionPercentage={0}
                sections={['introduction', 'investing info', 'sectors of interest', 'investing history', 'in the news', 'experience & education']} 
            />
        </form>
    )
}

export default InvestorProfileForm

const CustomDatePickerInput = forwardRef(
    // @ts-ignore
    ({ value, onClick, onChange}, ref) => (
        <div className="flex relative w-3/5" onClick={onClick}>
            <input className="border py-2 px-2 w-full rounded text-sm" value={value} onChange={onChange} placeholder="MM/YYYY" />
            <DownOutlined className="absolute right-3 top-3 cursor-pointer text-xs" />
        </div>
    ),
);

const DateInput = ({labelClassName, labelText, inputName, control, defaultValue, placeholderText, dateFormat, index, inputGroup, fieldName, ...props }) => {
    const value = useWatch({
        name: inputGroup,
        control
    });

    return (
        <div className="flex items-center space-x-1">
            <label htmlFor={inputName} className={`${labelClassName}`}>{labelText}</label>
            <div className="w-full">
                <Controller
                    name={inputName}
                    control={control}
                    // defaultValue={defaultValue}
                    render={({ field }) => 
                        <DatePicker
                            id={inputName}
                            selected={value[index][fieldName] ? value[index][fieldName] : null}
                            {...field}
                            {...props}
                            dateFormat={dateFormat}
                            placeholderText={placeholderText}
                            customInput={<CustomDatePickerInput />}
                            // className="border"
                        />
                    }
                />

            </div>
        </div>
    )
}