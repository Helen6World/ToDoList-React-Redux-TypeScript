import axios from "axios";

const baseUrl = "http://localhost:58321/"

export default {

    thingToDo(url = baseUrl + 'thingtodo/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: (id: any) => axios.get(url + id),
            create: (newRecord: any) => axios.post(url, newRecord),
            update: (id: any, updateRecord: any) => axios.put(url + id, updateRecord),
            delete: (id: any) => axios.delete(url + id)

        }
    }
}