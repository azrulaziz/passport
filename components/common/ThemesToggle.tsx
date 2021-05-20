import {useState, useEffect} from 'react'
import {useTheme} from 'next-themes'
import Switch from "react-switch"

const ThemesToggle = () => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => setMounted(true), [])

  if (!mounted) return null
    return (
        <div className="flex items-center space-x-2 py-4 px-4">
            <Switch 
                id="theme" 
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} 
                checked={theme === 'dark' ? true : false} 
                uncheckedIcon={false} 
                checkedIcon={false} 
                className=""
                height={17}
                handleDiameter={15}
                onColor="#505050"
                onHandleColor="#1B1B1B"
                width={35}
            />
            <label htmlFor="theme" className="text-xs">Dark mode</label>
        </div>
    )
}

export default ThemesToggle