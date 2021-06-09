import {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'
// import Switch from "react-switch"
// import {ThemesToggle as Toggle} from 'design-systems'

const ThemesToggle = ({isOpen}) => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) return <></>
    return (
        <></>
        // <Toggle 
        //     isOpen={isOpen}
        //     theme={theme}
        //     setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        // />
    )
}

export default ThemesToggle