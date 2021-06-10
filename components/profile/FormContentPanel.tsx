import { PrimaryButton } from 'components/common/Button'
import React from 'react'

interface Props {
    title: string,
    subtitle: string,
    children: React.ReactNode,
    id: string
}

const FormContentPanel: React.FC<Props> = ({title, subtitle, children, id}) => {
    return (
        <div className="bg-white dark:bg-gray-10 p-6 pb-10" id={id}>
            <h1 className="main-title">{title}</h1>
            <p className="sub-title">{subtitle}</p>
            <hr className="my-6" />
            <div className="px-4 sm:px-6">
                {children}
            </div>
        </div>
    )
}

export default FormContentPanel