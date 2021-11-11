export class userObj {
    email: string
    token: string
    username: string
    bio: string
    image: string
    isAuthenticated: boolean

    constructor() {
        [this.email, this.token, this.username, this.bio, this.image, this.isAuthenticated] = ['', '', '', '', '', false]
    }
}


export const getLocalStorageData = (): userObj => {
    let stored_data = localStorage.getItem('conduit_user');
    if (stored_data) {
        let user_obj = JSON.parse(stored_data)
        return user_obj
    }
    return {
        email: "",
        token: "",
        username: "",
        bio: "",
        image: "",
        isAuthenticated: false
    }
}

export const clearLocalstorage = (): void => {
    localStorage.setItem('conduit_user', '')
}

export const setLocalStorageData = (param: any): void => {
    let obj = { ...param, isAuthenticated: true }
    localStorage.setItem('conduit_user', JSON.stringify(obj))
}