import {useState, useEffect} from 'react'

const useCompletionStatus = (allField) => {
    const [completionPercentage, setCompletionPercentage] = useState(0)

    const checkCompletionStatus = (): void => {
        let numberOfInput = Object.keys(allField).length
        let numberOfInputFilled = 0


        for (let i in allField) {
            let result = allField[i] ? 1 : 0
            numberOfInputFilled += result
        }

        let percentage = Math.round((numberOfInputFilled / numberOfInput) * 100)
        setCompletionPercentage(percentage)
    }

    useEffect(() => {
        checkCompletionStatus()
    }, [allField])

    return {
        completionPercentage,
        checkCompletionStatus
    }
    
}

export default useCompletionStatus