import React, {useState, forwardRef} from "react"
import {EyeOutlined, EyeInvisibleOutlined, DownOutlined} from '@ant-design/icons'

type passwordShowOption = true | false

export const TextInput = ({register, errors, inputName, placeholder, type, validation, labelClassName, labelText}) => {
    
    return (
        <>
            <label htmlFor={inputName} className={labelClassName}>{labelText}</label>
            <input
                id={inputName}
                aria-invalid={errors[inputName] ? "true" : "false"}
                {...register(inputName, validation)}
                className="border border-gray-5 block py-2 px-2 w-full rounded text-sm"
                aria-placeholder={inputName}
                placeholder={placeholder}
                type={type}
            />
            {errors[inputName] && (
                <span role="alert" className="absolute -bottom-4 text-xs text-red-500">{errors[inputName].message}</span>
            )}
        </>
    )
}

export const TextInputInline = ({register, errors, inputName, placeholder, type, validation, labelClassName, labelText}) => {
    
    return (
        <div className="flex items-center space-x-1">
            <label htmlFor={inputName} className={`${labelClassName} w-1/3`}>{labelText}</label>
            <input
                id={inputName}
                aria-invalid={errors[inputName] ? "true" : "false"}
                {...register(inputName, validation)}
                className="border border-gray-5  py-2 px-2 w-2/3 rounded text-sm"
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
