export interface userStruct {
    id: number | string,
    login: {
        username: string
    },
    cell: string,
    phone: string,
    email: string,
    dob: {
        date: string,
        age: number
    }
    gender: string,
    name: {
        first: string,
        last: string
    },
    location: {
        city: string,
        state: string,
        country: string
    },
    fullname: string,
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    nat: string,
    job: string,
    date: number
}