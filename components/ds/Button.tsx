import classNames from 'classnames';
import React, { FC, HTMLAttributes, ReactChild} from 'react';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactChild
    handleClick: () => void
    extraClassname?: string
    disabled?: boolean
    size?: string
    icon?: React.ReactNode
    type: 'submit' | 'button'
}

const sharedDefaultClassname = `flex items-center text-sm px-4 py-1 border capitalize focus:outline-none`
const sharedSmallClassname = `flex items-center text-xs px-4 py-1 border capitalize focus:outline-none`

const sharedClassnames = (size: string) => {
     if (size === 'small') {
        return sharedSmallClassname
    } else {
        return sharedDefaultClassname
    }
}

export const PrimaryButton: FC<ButtonProps> = ({ children, type = 'button', handleClick, extraClassname, size = 'default', icon, disabled, ...props }) => {

    const classes = `
        rounded-2xl
        text-blue-6 
        bg-ocean-1 border-ocean-1 
        hover:bg-ocean-3 hover:border-ocean-3
        active:bg-ocean-5 active:border-ocean-5
        disabled:bg-grey-3 disabled:border-grey-3 disabled:text-grey-5
        ${sharedClassnames(size)} ${extraClassname}
    `
    return (
        <button
            className={classNames(classes)}
            onClick={() => handleClick()}
            {...props}
            disabled={disabled}
            type={type}
        >
            {icon ? <span className="text-lg">{icon}</span> : <></>}
            {children ?<span className="pl-1">{children}</span>: <span className="pl-0">{children}</span>}
        </button>
    )
};

export const SecondaryButton: FC<ButtonProps> = ({ children, handleClick, extraClassname, size = 'default', icon, disabled, ...props}) => {

    const classes = `
        rounded-2xl
        border-blue-1 
        text-blue-1 
        bg-transparent
        hover:border-blue-2
        active:border-blue-3
        disabled:bg-grey-2 disabled:border-grey-4 disabled:text-grey-5
        ${sharedClassnames(size)} ${extraClassname}
    `
    return (
        <button
            className={classNames(classes)}
            onClick={() => handleClick()}
            {...props}
            disabled={disabled}
        >
            {icon ? <span className="text-lg">{icon}</span> : <></>}
            {children ?<span className="pl-1">{children}</span>: <span className="pl-0">{children}</span>}
        </button>
    )
};

export const DashedButton: FC<ButtonProps> = ({ children, handleClick, extraClassname, size = 'default', icon, disabled, ...props }) => {

    const classes = `
        border-dashed
        border-blue-1 
        text-blue-1 
        bg-transparent
        hover:border-blue-2
        active:border-blue-3
        disabled:border-grey-4 disabled:text-grey-4
        ${sharedClassnames(size)} ${extraClassname}
    `

    return (
        <button
            className={classNames(classes)}
            onClick={() => handleClick()}
            {...props}
            disabled={disabled}
        >
            {icon ? <span className="text-lg">{icon}</span> : <></>}
            {children ?<span className="pl-1">{children}</span>: <span className="pl-0">{children}</span>}
        </button>
    )
};

export const ActionButton: FC<ButtonProps> = ({ children, handleClick, extraClassname, size = 'default', icon, disabled, ...props }) => {

    const classes = `
        rounded-2xl
        border-red-5
        text-grey-1 
        bg-red-5
        hover:border-red-6 hover:bg-red-6
        active:border-grey-8 active:bg-grey-8
        disabled:bg-grey-3 disabled:border-grey-3 disabled:text-grey-5
        ${sharedClassnames(size)} ${extraClassname}
    `

    return (
        <button
            className={classNames(classes)}
            onClick={() => handleClick()}
            {...props}
            disabled={disabled}
        >
            {icon ? <span className="text-lg">{icon}</span> : <></>}
            {children ?<span className="pl-1">{children}</span>: <span className="pl-0">{children}</span>}
        </button>
    )
};

export const MinorButton: FC<ButtonProps> = ({ children, handleClick, extraClassname, size = 'default', icon, disabled, ...props }) => {

    const classes = `
        border-blue-1
        text-grey-1 
        bg-blue-1
        hover:border-blue-2 hover:bg-blue-2
        active:border-blue-3 active:bg-blue-3
        disabled:bg-grey-3 disabled:border-grey-3 disabled:text-grey-5
        ${sharedClassnames(size)} ${extraClassname}
    `

    return (
        <button
            className={classNames(classes)}
            onClick={() => handleClick()}
            {...props}
            disabled={disabled}
        >
            {icon ? <span className="text-lg">{icon}</span> : <></>}
            {children ?<span className="pl-1">{children}</span>: <span className="pl-0">{children}</span>}
        </button>
    )
};