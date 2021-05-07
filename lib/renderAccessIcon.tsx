import {UnlockOutlined, EyeOutlined, CheckCircleOutlined, CheckOutlined, EyeInvisibleOutlined, CloseOutlined} from '@ant-design/icons'

export const renderAccessIcon = (access) => {
    switch(access.toLowerCase()) {
        case 'all access':
            return <UnlockOutlined style={{color: "#FAAD14"}} />
        case 'limited access':
            return <CheckCircleOutlined style={{color: "#52C41A"}} />
        case 'read & write access':
            return <CheckOutlined style={{color: "#52C41A"}} />   
        case 'read only':
            return <EyeOutlined style={{color: "#13C2C2"}} />
        case 'no visibility':
            return <EyeInvisibleOutlined style={{color: "#FA541C"}} />
        case 'no access':
            return <CloseOutlined style={{color: "#F5222D"}} />
        default: 
            return ''
    }
    
 }