import Switch from "react-switch"
import React, { FC } from 'react';

export interface ToggleProps  {
    size?: string
    onChange: (value: string | boolean) => void
    id: string
    checked: boolean
    disabled?: boolean
}

export const Toggle: FC<ToggleProps> = ({ id, onChange, checked, disabled = false, size = "default" }) => {

    if (size === 'small') {
        return (
            <Switch 
                id={id} 
                onChange={onChange} 
                checked={checked} 
                disabled={disabled}
                uncheckedIcon={false} 
                checkedIcon={false} 
                className=""
                width={28}
                height={16}
                // handleDiameter={15}
                offColor="#cbcbcb"
                offHandleColor="#fff"
                onColor="#2B819E"
                onHandleColor="#fff"
            />
        )

    } else {
        return (
            <Switch 
                id={id} 
                onChange={onChange} 
                checked={checked} 
                disabled={disabled}
                uncheckedIcon={false} 
                checkedIcon={false} 
                className=""
                width={44}
                height={22}
                // handleDiameter={15}
                offColor="#cbcbcb"
                offHandleColor="#fff"
                onColor="#2B819E"
                onHandleColor="#fff"
            />
        )
    }

};