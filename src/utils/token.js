export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
export const getTOken = () => {
    return localStorage.getItem('TOKEN')
}
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}