import React from "react"
import {LinkedinFilled, GoogleOutlined} from '@ant-design/icons'


interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    extraStyle?: string
}

export const PrimaryButton: React.FC<Props> = ({children, extraStyle, ...props}) => {
    return (
        <button className={`bg-primary-blue border-primary-blue border capitalize text-white text-xs sm:text-sm px-4 py-2 rounded my-1 ${extraStyle}`} {...props}>
            {children}
        </button>
    )
}

export const PrimaryTransparentButton: React.FC<Props> = ({children, extraStyle, ...props}) => {
    return (
        <button className={`bg-transparent border capitalize border-primary-blue text-primary-blue text-xs sm:text-sm px-4 py-2 rounded my-1 ${extraStyle}`} {...props}>
            {children}
        </button>
    )
}

export const DarkTransparentButton: React.FC<Props> = ({children, extraStyle, ...props}) => {
    return (
        <button className={`bg-transparent border capitalize border-secondary-gray text-secondary-gray dark:border-gray-1 dark:text-gray-1 text-xs sm:text-sm px-4 py-1 rounded my-1 ${extraStyle}`} {...props}>
            {children}
        </button>
    )
}

export const LinkedinButton: React.FC<Props> = ({children, ...props}) => {
    return (
        <button 
            className="flex items-center my-1 bg-transparent capitalize border border-social-linkedin text-social-linkedin text-sm px-4 py-1 rounded"
            {...props}
        >
            <LinkedinFilled className="pr-2 text-lg  pb-1" />
            {children}
        </button>
    )
}

export const GoogleButton: React.FC<Props> = ({children, ...props}) => {
    return (
        <button 
            className="flex items-center my-1 bg-transparent capitalize border border-social-google text-social-google text-sm px-4 py-1 rounded"
            {...props}
        >
            <GoogleOutlined className="pr-2 text-lg pb-1" />
            {children}
        </button>
    )
}