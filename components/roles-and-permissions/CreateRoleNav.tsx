import {useState} from 'react'
import { useRouter } from 'next/router'


const NavItem = ({selected, name}) => {
    // const router = useRouter()
    return (
        <a className={`${selected === name ? "border-b-4  border-primary-blue text-primary-blue" : ""}`}>
            {name}
        </a>
    )
}

const CreateRoleNav = ({sections, selectedModule, setSelectedModule}) => {

    const RenderMenu = () => {
        let menu = sections.map(each => {
            return (
                <div key={each.module} className=" cursor-pointer capitalize  text-base mb-4" onClick={() => setSelectedModule(each.module)}>
                    <NavItem selected={selectedModule} name={each.module} />
                </div>
            )
        })
        return menu  
    }

    return (
        <div>
            <RenderMenu />
        </div>
    )
    
}

export default CreateRoleNav