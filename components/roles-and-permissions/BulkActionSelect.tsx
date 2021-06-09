import {useTheme} from 'next-themes'
import Select from "react-select";

const BulkActionSelect = ({optionsArray}) => {
    const {theme, setTheme} = useTheme()

    if (!theme) {
        return null
    }
  
    return (
        <Select
          options={optionsArray} 
          placeholder="Bulk Actions"
          className="text-sm"
          isSearchable={false}
          classNamePrefix="react-select"
          styles={{
            control: styles => ({ 
              ...styles, 
              backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
              transition: 'none',
              outline: 'none',
              boxShadow: 'none',
              zIndex: 0,
              border: `${theme === 'dark' ? '1px solid #ffffff' : '1px solid #d9d9d9' }`,
              "&:hover": {
                outline: 'none !important',
                boxShadow: 'none !important'
              },
              
            }),
            menu: styles => ({ 
                ...styles, 
                backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
                width: '300px',
                zIndex: 0,
            }),
            input: styles => ({
                ...styles,
                color: `${theme === 'dark' ? '#fff' : '#262626' }`
            }),
            singleValue: styles => ({
                ...styles,
                color: `${theme === 'dark' ? '#fff' : '#262626' }`
            }),
            option: base => ({
                ...base,
                "&:hover": {
                  backgroundColor: 'lightgray'
                }
            }),
            placeholder: styles => ({
                ...styles,
                color: `${theme === 'dark' ? '#ffffff !important' : '#262626 !important' }`
            }),
            dropdownIndicator: styles => ({
                ...styles,
                color: `${theme === 'dark' ? '#ffffff !important' : '#262626 !important' }`
            }),
          }}
        />
    )
}

export default BulkActionSelect



// control: styles => ({ 
// ...styles, 
// backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
// transition: 'none',
// outline: 'none',
// border: `${theme === 'dark' ? '1px solid #ffffff' : '1px solid #262626' }`,
// boxShadow: 'none',
// "&:hover": {
//   outline: 'none !important',
//   // border: 'none',
//   boxShadow: 'none'
// },
// borderRadius: "3px",

// }),
// placeholder: styles => ({
// ...styles,
// color: `${theme === 'dark' ? '#ffffff !important' : '#262626 !important' }`
// }),
// dropdownIndicator: styles => ({
// ...styles,
// color: `${theme === 'dark' ? '#ffffff !important' : '#262626 !important' }`
// }),
// menu: styles => ({ 
// ...styles,                 
// width: '300px',
// backgroundColor: `${theme === 'dark' ? '#3B3B3B' : '#fff' }`,
// }),
// singleValue: styles => ({
// ...styles,
// color: `${theme === 'dark' ? '#fff' : '#3B3B3Bf' }`
// }),
// option: base => ({
// ...base,
// "&:hover": {
//   backgroundColor: 'lightgray'
// }
// }) 