import React, {useState} from "react"
import {EyeOutlined, EyeInvisibleOutlined, PlusOutlined, CloseOutlined} from '@ant-design/icons'
import {Controller} from "react-hook-form";
import AsyncSelect from 'react-select/async';
import Select from "react-select";
import {useTheme} from 'next-themes'

export const TextInput = ({register, errors, inputName, placeholder, type, validation, labelClassName, labelText}) => {
    
    return (
        <div>
            <label htmlFor={inputName} className={labelClassName}>{labelText}</label>
            <input
                id={inputName}
                aria-label={labelText}
                aria-invalid={errors[inputName] ? "true" : "false"}
                {...register(inputName, validation)}
                className="border border-gray-5 mt-1 block py-2 px-2 w-full rounded text-sm"
                aria-placeholder={inputName}
                placeholder={placeholder}
                type={type}
            />
            {errors[inputName] && (
                <span role="alert" className="absolute -bottom-4 text-xs text-red-500">{errors[inputName].message}</span>
            )}
        </div>
    )
}

export const TextInputInline = ({register, errors, inputName, placeholder, type, validation, labelClassName, labelText, fieldName = null, fieldGroup = null, index = null, ...props}) => {
    
    return (
        <div className="flex items-center space-x-1">
            <label htmlFor={inputName} className={`${labelClassName} w-1/3`}>{labelText}</label>
            <div className="w-full">
                <input
                    id={inputName}
                    aria-label={labelText}
                    aria-invalid={errors[inputName] ? "true" : "false"}
                    {...register(inputName, validation)}
                    className="border border-gray-5 py-2 px-2 w-full block rounded text-sm"
                    aria-placeholder={inputName}
                    placeholder={placeholder}
                    type={type}
                    {...props}
                />
                {errors[inputName] && (
                <span role="alert" className="absolute mt-1 text-xs text-red-500">{errors[inputName].message}</span>
                )}
                {errors?.[fieldGroup]?.[index]?.[fieldName]?.message && (
                <span role="alert" className="absolute mt-1 text-xs text-red-500">{errors?.[fieldGroup]?.[index]?.[fieldName]?.message}</span>
                )}
            </div>
        </div>
    )
}

export const TextInputInlineWithIcon = ({register, errors, inputName, type, validation, labelClassName, labelText, fieldName = null, fieldGroup = null, index = null, ...props}) => {
    
    return (
        <div className="flex items-center space-x-1">
            <label htmlFor={inputName} className={`${labelClassName} w-1/3`}>{labelText}</label>
            <div className="flex relative w-full">
                <span className="absolute left-2 transform py-1 text-gray-5 cursor-pointer text-lg">$</span> 
                <div className="w-full">
                    <input
                        id={inputName}
                        aria-label={labelText}
                        aria-invalid={errors[inputName] ? "true" : "false"}
                        {...register(inputName, validation)}
                        className="border border-gray-5 pl-5 py-2 px-2 w-full block rounded text-sm"
                        aria-placeholder={inputName}
                        type={type}
                        {...props}
                    />
                    {errors[inputName] && (
                    <span role="alert" className="absolute mt-1 text-xs text-red-500">{errors[inputName].message}</span>
                    )}
                    {errors?.[fieldGroup]?.[index]?.[fieldName]?.message && (
                    <span role="alert" className="absolute mt-1 text-xs text-red-500">{errors?.[fieldGroup]?.[index]?.[fieldName]?.message}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export const InputCheckbox = ({register, errors, inputName, validation, labelClassName, labelText, defaultChecked, ...props}) => {
    return (
        <div>
            <input
                id={labelText}
                type="checkbox"
                aria-label={labelText}
                defaultChecked={defaultChecked}
                aria-invalid={errors[inputName] ? "true" : "false"}
                {...register(inputName, validation)}
                className="checked:bg-blue-600 checked:border-transparent w-5 h-5 transform translate-y-1"
                {...props}
                />
            <label htmlFor={labelText} className={`${labelClassName} `}>{labelText}</label>
        </div>
    )
}

export const InputRadio = ({register, inputName, groupLabelText, labelClassName, radioList}) => {
    return (
        <div>
            <label className={`${labelClassName}`}>{groupLabelText}</label>
            {radioList.map(each => {
                return (
                    <div key={each}>
                        <input name={inputName} 
                            id={each} 
                            aria-label={groupLabelText}
                            {...register(inputName)} 
                            type="radio" 
                            value={each} 
                            className=""
                        />
                        <label htmlFor={each} className={`${labelClassName} pl-2 capitalize`}>{each}</label>
                    </div>
                )
            })}
        </div>
    )
}

export const TextArea = ({id, register, errors, inputName, placeholder, validation, labelClassName, labelText, ...props}) => {
    
    return (
        <div>
            <label htmlFor={id} className={`${labelClassName}`}>{labelText}</label>
            <textarea
                id={id}
                aria-label={labelText}
                {...register(inputName, validation)}
                className="mt-2 border border-gray-5 block py-2 h-16 px-2 w-full rounded text-sm"
                aria-placeholder={placeholder}
                placeholder={placeholder}
                {...props}
            >
            </textarea>
            {props.wordcount ? <p className="text-right text-xs text-gray-7">{props.wordcount}</p>: null}
        </div>
    )
}

type passwordShowOption = true | false

export const PasswordInput = ({register, errors, inputName, placeholder, validation}) => {
    const [showPassword, setShowPassword] = useState(false)
    
    const handleSetShowPassword = (option: passwordShowOption):void => {
        setShowPassword(option)
    }

    return (
        <>
            <label htmlFor={inputName} className="hidden">Password</label>
            <div className="flex relative">
                <input
                    id={inputName}
                    aria-label="Password"
                    aria-invalid={errors[inputName] ? "true" : "false"}
                    {...register(inputName, validation)}
                    className="flex border border-gray-5 py-2 px-2 w-full rounded text-sm "
                    aria-placeholder={placeholder}
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                />
                {showPassword ?
                    <EyeInvisibleOutlined className="absolute right-5 top-3 cursor-pointer" onClick={() => handleSetShowPassword(false)} />
                    :
                    <EyeOutlined className="absolute right-5 top-3 cursor-pointer" onClick={() => handleSetShowPassword(true)}/>
                }
            </div>
            {errors[inputName] &&  (
                <span role="alert" className="absolute -bottom-4 text-xs text-red-500">{errors[inputName].message}</span>
            )}
        </>
    )
}

export const SelectInput = ({inputName, labelText, labelClassName, control, optionsArray, placeholder, parentClassName = '', inputStyle = null}) => {
    const {theme, setTheme} = useTheme()
    return (
        <div className={parentClassName}>
            <label htmlFor={inputName} className={`${labelClassName}`}>{labelText}</label>
            <div className="w-full">
                <Controller
                    name={inputName}
                    control={control}
                    render={({ field }) => 
                        <Select 
                            inputId={inputName}
                            {...field} 
                            aria-label={labelText}
                            className={`${inputStyle} w-40 text-sm`}
                            options={optionsArray} 
                            placeholder={placeholder}
                            classNamePrefix="react-select"
                            styles={{
                                control: styles => ({ 
                                    ...styles, 
                                    backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
                                    transition: 'none',
                                }),
                                menu: styles => ({ 
                                    ...styles, 
                                    backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
                                }),
                                input: styles => ({
                                    ...styles,
                                    color: `${theme === 'dark' ? '#fff' : '#3B3B3Bf' }`
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
        </div>
    )
}

export const AsyncMultiSelectionInput = ({inputName, id = inputName, control, labelText, labelClassName, optionsArray, listHook, subLabel, placeholder}) => {
    const {theme, setTheme} = useTheme()
    const promiseOptions = (fn) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(fn);
        }, 1000);
    });

    return (
        <div>
            <label htmlFor={id} className={`${labelClassName}`}>{labelText}</label>
            {subLabel ? <p className="profile-form-label text-gray-7 pb-0">{subLabel}</p> : <></>}
            <Controller
                name={inputName}
                control={control}
                render={({ field }) => 
                    <AsyncSelect 
                        inputId={id}
                        aria-label={labelText}
                        {...field} 
                        className="w-full pt-2 text-white text-sm"
                        loadOptions={(e) => promiseOptions(optionsArray.filter(i =>
                            i.label.toLowerCase().includes(e.toLowerCase())
                        ))}
                        placeholder={placeholder}
                        onChange={(value) => listHook.handleAddValue(value)}
                        classNamePrefix="react-select"
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
                            input: styles => ({
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
            <p className="text-right text-xs text-gray-7">Press enter to add</p>
            <div className="my-2 space-x-1">
                {listHook.list.map(each => {
                    return (
                        <div key={each.label} className="bg-gray-2 dark:bg-gray-8 border-2 border-gray-5 inline-block rounded py-1 px-2">
                            <p className="text-xs flex items-center">
                                {each.value} 
                                <CloseOutlined className="pl-1 text-gray-7 cursor-pointer" onClick={() => listHook.handleRemoveValue(each)} />
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="my-4 ">
                <p className="pb-1 text-xs text-gray-7">Popular</p>
                <div className="space-x-2">
                    {optionsArray.map(each => {
                        if (listHook.list.some(selected => selected.value === each.value)) {
                            return null
                        }
                        return (
                            <div key={each.label} className=" border-2 border-dashed border-gray-5 dark:border-gray-8 inline-block rounded py-1 px-2 cursor-pointer" onClick={() => listHook.handleAddValue(each)}>
                                <p className="text-xs text-gray-7 flex items-center">
                                    <PlusOutlined className="pr-1 text-gray-7"  />
                                    {each.value} 
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export const AsyncMultiSelectInsideInput = ({inputName, id = inputName, control, labelText, labelClassName, optionsArray, placeholder, rules = null, ...props}) => {
    const {theme, setTheme} = useTheme()
    const promiseOptions = (fn) =>
        new Promise(resolve => {
            setTimeout(() => {
            resolve(fn);
        }, 1000);
    });

    return (
        <div className="flex items-center space-x-1">
            <label htmlFor={id} className={`${labelClassName} w-1/3`}>{labelText}</label>
            <div className="w-full">
                <Controller
                    name={inputName}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState: {error} }) => 
                    <div>
                        <AsyncSelect 
                            inputId={id}
                            aria-label={labelText}
                            {...field} 
                            className="w-full text-sm"
                            loadOptions={(e) => promiseOptions(optionsArray.filter(i =>
                                i.label.toLowerCase().includes(e.toLowerCase())
                            ))}
                            {...props}
                            placeholder={placeholder}
                            isMulti
                            classNamePrefix="react-select"
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
                                input: styles => ({
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
                        {error && (
                            <span role="alert" className="absolute py-1 text-xs text-red-500">{error.message}</span>
                        )}
                    </div>
                    }
                    />
            </div>
        </div>
    )
}
