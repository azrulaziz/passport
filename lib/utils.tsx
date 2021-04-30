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

export const getArrayOfValueFromReactSelect = (arr) => {
    let newArray = arr.map(each => each.value)
    return newArray
}

export const getStringValueFromReactSelect = (obj) => {
    return obj.value
}