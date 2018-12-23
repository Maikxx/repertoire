export const removeFalsy = (obj: Object): Object => {
    return Object
        .keys(obj)
        .filter(prop => !!obj[prop])
        .map(prop => ({
            [prop]: obj[prop],
        }))
}
