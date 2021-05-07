import React, {useState} from "react"
import {EyeOutlined, EyeInvisibleOutlined, PlusOutlined, CloseOutlined} from '@ant-design/icons'
import {Controller} from "react-hook-form";
import AsyncSelect from 'react-select/async';
import Select from "react-select";

export const TextInput = ({register, errors, inputName, placeholder, type, validation, labelClassName, labelText}) => {
    
    return (
        <div>
            <label htmlFor={inputName} className={labelClassName}>{labelText}</label>
            <input
                id={inputName}
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

export const InputCheckbox = ({register, errors, inputName, validation, labelClassName, labelText, defaultChecked, ...props}) => {
    return (
        <div>
            <input
                id={labelText}
                type="checkbox"
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
                        <input name={inputName} {...register(inputName)} id={each} type="radio" value={each} className=""/>
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

export const SelectInput = ({inputName, labelText, labelClassName, control, optionsArray, placeholder, inputStyle = null}) => {
    return (
        <div className="">
            <label htmlFor={inputName} className={`${labelClassName}`}>{labelText}</label>
            <div className="w-full">
                <Controller
                    name={inputName}
                    control={control}
                    render={({ field }) => 
                        <Select 
                            inputId={inputName}
                            {...field} 
                            className={`${inputStyle} w-40 `}
                            options={optionsArray} 
                            placeholder={placeholder}
                        />
                    }
                />
            </div>
        </div>
    )
}

export const AsyncMultiSelectionInput = ({inputName, id = inputName, control, labelText, labelClassName, optionsArray, listHook, subLabel, placeholder}) => {

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
                        className="w-full pt-2"
                        loadOptions={(e) => promiseOptions(optionsArray.filter(i =>
                            i.label.toLowerCase().includes(e.toLowerCase())
                        ))}
                        placeholder={placeholder}
                        onChange={(value) => listHook.handleAddValue(value)}
                    />
                }
            />
            <p className="text-right text-xs text-gray-7">Press enter to add</p>
            <div className="my-2 space-x-1">
                {listHook.list.map(each => {
                    return (
                        <div key={each.label} className="bg-gray-2 border-2 border-gray-5 inline-block rounded py-1 px-2">
                            <p className="text-xs text-gray-10 flex items-center">
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
                        return (
                            <div key={each.label} className=" border-2 border-dashed border-gray-5 inline-block rounded py-1 px-2 cursor-pointer" onClick={() => listHook.handleAddValue(each)}>
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

export const AsyncMultiSelectInsideInput = ({inputName, id = inputName, control, labelText, labelClassName, optionsArray, placeholder}) => {

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
                    render={({ field }) => 
                        <AsyncSelect 
                            inputId={id}
                            aria-label={labelText}
                            {...field} 
                            className="w-full"
                            loadOptions={(e) => promiseOptions(optionsArray.filter(i =>
                                i.label.toLowerCase().includes(e.toLowerCase())
                            ))}
                            placeholder={placeholder}
                            isMulti
                        />
                    }
                />
            </div>
        </div>
    )
}