import { useEffect, useState } from "react"
import _ from 'lodash'

const useSectionCompletion = (profile) => {

    const checkSectionsCompletion = () => {
        let incompleteSection = []
        for (let i in profile[0]) {
            if (typeof profile[0][i] === 'string') {
                profile[0][i] ? null : incompleteSection.push(_.startCase(i))
            } else if (typeof profile[0][i] === "object" && Array.isArray(profile[0][i])) {
                profile[0][i].length > 0 ? null : incompleteSection.push(_.startCase(i))
            } 
        }
        return incompleteSection
    }
    const [incompleteSection, setIncompleteSection] = useState(() => checkSectionsCompletion())

    useEffect(() => {
        setIncompleteSection(checkSectionsCompletion())
    }, [profile])


    return {
        incompleteSection
    }
}

export default useSectionCompletion