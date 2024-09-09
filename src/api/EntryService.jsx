import axios from "axios";

const API_URL = "http://localhost:8080/entry"

export async function saveEntry(entry){
    return await axios.post(API_URL, entry);
}

export async function getEntry(id){
    return await axios.get('${API_URL}/${id}');
}
