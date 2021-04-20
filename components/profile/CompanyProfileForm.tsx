import ProfileSectionNav from './ProfileSectionNav'
import ProfileCompletion from './ProfileCompletion';
import { PrimaryButton } from 'components/common/Button'
import {useForm, Controller} from "react-hook-form";
import React, {useState, useEffect, forwardRef} from 'react'
import FormContentPanel from './FormContentPanel';
import { TextInputInline } from 'components/common/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {DownOutlined, PlusOutlined, CloseOutlined} from '@ant-design/icons'
import AsyncSelect from 'react-select/async';
import useList from 'lib/useList'
import Select from "react-select";

type SelectObj = {
    value: string
    label: string
}

interface FormValues {
    companyName?: string
    linkedinProfile?: string
    companyLogo?: string
    companyFounded?: string
    companyWebsite?: string
    sectors?: SelectObj[],
    stage?: SelectObj,
    businessModel?: string
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

const CompanyProfileForm: React.FC = () => {
    const [startDate, setStartDate] = useState();
    const {register, control, formState: { errors }, watch , handleSubmit} = useForm<FormValues>({
        defaultValues: {
            sectors: [],
            stage: {}
        }
    });

    const sectors = useList([])

    const promiseOptions = (fn) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(fn);
        }, 1000);
    });

    const handleUpdateCompanyProfile = (data: FormValues) => {
        // mutation here
        console.log(data)
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
                            <Controller
                                name="companyFounded"
                                control={control}
                                defaultValue=""
                                render={({ field: {onChange} }) => 
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => {
                                            setStartDate(date)
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
                        <div>
                            <label htmlFor="sectors" className="profile-form-label">What sectors are your business in?</label>
                            <p className="profile-form-label text-gray-7 pb-0">Choose up to 3 sectors</p>
                            <Controller
                                name="sectors"
                                control={control}
                                render={({ field }) => 
                                    <AsyncSelect 
                                        inputId="sectors"
                                        aria-label="sectors"
                                        {...field} 
                                        className="w-full pt-2"
                                        loadOptions={(e) => promiseOptions(sectorsOptions.filter(i =>
                                            i.label.toLowerCase().includes(e.toLowerCase())
                                        ))}
                                        placeholder="Type in your sectors"
                                        onChange={(value) => sectors.handleAddValue(value)}
                                    />
                                }
                            />
                            <p className="text-right text-xs text-gray-7">Press enter to add</p>
                            <div className="my-2 space-x-1">
                                {sectors.list.map(tool => {
                                    return (
                                        <div key={tool.label} className="bg-gray-2 border-2 border-gray-5 inline-block rounded py-1 px-2">
                                            <p className="text-xs text-gray-10 flex items-center">
                                                {tool.value} 
                                                <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => sectors.handleRemoveValue(tool.value)} />
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="my-4 ">
                                <p className="pb-1 text-xs text-gray-7">Popular</p>
                                <div className="space-x-2">
                                    {sectorsOptions.map(tool => {
                                        return (
                                            <div key={tool.label} className=" border-2 border-dashed border-gray-5 inline-block rounded py-1 px-2 cursor-pointer" onClick={() => sectors.handleAddValue(tool)}>
                                                <p className="text-xs text-gray-7 flex items-center">
                                                    <PlusOutlined className="pr-1 text-gray-7"  />
                                                    {tool.value} 
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
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
                        <div className="">
                            <label className="profile-form-label">What business model category best matches your company?</label>
                            {model.map(each => (
                                <div key={each}>
                                    <input name="businessModel" {...register('businessModel')} id={each} type="radio" value={each} className=""/>
                                    <label htmlFor={each} className="profile-form-label pl-2">{each}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </FormContentPanel>

                <FormContentPanel id="founding team" title="Founding Team" subtitle="Introduce your founding team">
                    <div className="h-72"></div>
                    <div className="h-72"></div>
                </FormContentPanel>

                <FormContentPanel id="the business" title="The Business" subtitle="What does your company do?">
                    <div className="h-72"></div>
                    <div className="h-72"></div>
                </FormContentPanel>

                <FormContentPanel id="fundraising" title="Fundraising" subtitle="Let us know your fundraising history and goals.">
                    <div className="h-72"></div>
                    <div className="h-72"></div>
                </FormContentPanel>

                <FormContentPanel id="supplementary files" title="Supplementary Files" subtitle="This is an optional section. Include an attachment or link only if you think it would be beneficial to help others understand what your company offers. You can add a team video, pitch deck, product demonstration video, etc.">
                    <div className="h-72"></div>
                    <div className="h-72"></div>
                </FormContentPanel>
            </div>
            <div className="edit-profile-side">
                <div className="p-6 sticky top-20">
                    <ProfileCompletion completionPercentage={0} />
                    <ProfileSectionNav sections={['introduction', 'founding team', 'the business', 'fundraising', 'supplementary files']} />
                    <PrimaryButton type="submit">Save Profile</PrimaryButton>
                </div>
            </div>
        </form>
    )
}

export default CompanyProfileForm

