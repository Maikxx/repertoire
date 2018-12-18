export const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb: any) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    signout(cb: any) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    },
}
