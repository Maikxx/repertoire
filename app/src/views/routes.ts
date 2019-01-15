export const routes = {
    index: '/',
    cover: {
        index: '/cover',
        login: '/cover/login',
        signUp: '/cover/signup',
    },
    app: {
        index: '/app',
        dashboard: {
            index: '/app/dashboard',
            register: '/app/dashboard/register',
            addCreator: {
                index: '/app/dashboard/add-creator',
                detail: (id: string | number = ':id') => `/app/dashboard/add-creator/${id}`,
            },
            addPublisher: {
                index: '/app/dashboard/add-publisher',
                detail: (id: string | number = ':id') => `/app/dashboard/add-publisher/${id}`,
            },
        },
    },
}
