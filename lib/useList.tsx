import {useState} from 'react'

function useList(defaultList) {
    const [list, setList] = useState(defaultList);

    function handleAddValue(val) {
        if (list.some(each => each.value === val.value)) {
            return null
        } else {
            setList([...list, val])
        }
    }

    const handleRemoveValue = (val) => {
        const updatedList = list.filter(each => {
            return each.value !== val
        })
        setList(updatedList)
    }

    return {
        list,
        setList,
        handleAddValue,
        handleRemoveValue
    }
}

export default useList