import axios from "axios"
import { Domain } from "./Config"
import * as base64 from 'base-64'

export async function GetAllGenre() {
    const response = await axios.get(`${Domain}/genre/`)

    const result = await response.data
    return result.message
}