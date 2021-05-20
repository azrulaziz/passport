export const buildArrayValueForReactSelect = (arr) => {
    let newArray = arr.map(each => {
        return {
            value: each,
            label: each
        }
    })
    return newArray
}

export const buildObjectValueForReactSelect = (value) => {
    return {
        value: value,
        label: value
    }
}

export const buildObjectValueForGenderSelect = (value) => {
    if (value === 'others') {
        return {
            value: value,
            label: 'Let Me Specify'
        }
    } else {
        return {
            value: value,
            label: value
        }
    }
}

export const getArrayOfValueFromReactSelect = (arr) => {
    let newArray = arr.map(each => each.value)
    return newArray
}

export const getStringValueFromReactSelect = (obj) => {
    if (!obj) {
        return ""
    }
    return obj.value
}

export const checkFieldArrayCompletion = (arr): boolean => {
    for (let i in arr[0]) {
        if (arr[0][i]) {
            return true
        }
        return false
    }
}