export const routes = {
    index: '/',
    cover: {
        index: '/cover',
        login: '/cover/login',
        signUp: '/cover/signup',
    },
    app: {
        index: '/app',
        inbox: {
            index: '/app/inbox',
            detail: (id: string | number = ':id') => `/app/inbox/${id}`,
        },
    },
}
