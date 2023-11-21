import { Injectable } from "@angular/core";
import { userStruct } from "../models/user.model";
import { UsersDTO } from "../dto/users.dto";


@Injectable({
    providedIn: "root"
})

export class UserService {
    user: userStruct = {
        id: 1,
        login: {
            username: "@cristianmoreno"
        },
        cell: "387 445 0711",
        phone: "(387) 445 0711",
        email: "cristianmorenoweb@gmail.com",
        dob: {
            date: "0000-00-00T15:13:16.688Z",
            age: 27
        },
        gender: "male",
        name: {
            first: "Cristian",
            last: "Moreno",
        },
        fullname: "Cristian Moreno",
        location: {
            city: "-",
            state: "Salta",
            country: "Argentina"
        },
        picture: {
            medium: "https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg",
            large: "https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg",
            thumbnail: "https://i.blogs.es/e32e91/trucos-enfocar-fotografia-paisaje-01/1366_2000.jpg"
        },
        nat: "AR",
        job: "Software Developer",
        date: Date.now()
    };

    constructor(private usersDTO: UsersDTO) {
        this.usersDTO.save(this.user);
    }
} 