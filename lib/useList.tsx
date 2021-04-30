import {useState} from 'react'

function useList(defaultList, limit = null) {
    const [list, setList] = useState(defaultList);

    function handleAddValue(val) {
        if (limit && list.length === limit) {
            return null
        }
        if (typeof val !== 'string' && list.some(each => each.value === val.value)) {
            return null
        } else if (typeof val === 'string' && list.some(each => each === val)) {
            return null
        } else {
            setList([...list, val])
        }
    }

    const handleRemoveValue = (val) => {
        console.log(typeof val)
        const updatedList = list.filter(each => {
            if (typeof val === 'object') {
                return each.value !== val.value
            } else if (typeof val === 'string') {
                return each !== val
            }
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