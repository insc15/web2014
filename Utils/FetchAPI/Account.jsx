import axios from "axios"
import { Domain } from "./Config"
import * as base64 from 'base-64'

const avatarArray = []

function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

for (let index = 1; index < 10; index++) {
    avatarArray.push(`/assets/avatars/avatar${index}.png`)
}

export async function Login(username, password) {
    const response = await axios.post(`${Domain}/account/auth.php`, {
        token: base64.encode(JSON.stringify({
            username: username,
            password: base64.encode(password)
        })),
        method: 'login'
    })
    const result = await response.data
    return result
}

export async function Register(email, username, password) {
    const response = await axios.post(`${Domain}/account/auth.php`, {
        token: base64.encode(JSON.stringify({
            email: email,
            username: username,
            password: base64.encode(password),
            avatar_path: avatarArray[random(1,9)]
        })),
        method: 'register'
    })
    const result = await response.data
    return result
}

export async function ChangePassword(user_id, username, password, newPassword) {
    const response = await axios.post(`${Domain}/account/changepassword.php`, {
        token: base64.encode(JSON.stringify({
            user_id: user_id,
            username: username,
            password: base64.encode(password),
            newPassword: base64.encode(newPassword)
        }))
    })

    const result = await response.data
    return result
}