import axios from "axios";

const BASE_URL = `https://demoapihistory-hsgagzgtcse4daby.japaneast-01.azurewebsites.net`;
export default axios.create({
    baseURL: BASE_URL
})