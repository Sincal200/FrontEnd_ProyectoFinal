import axios from "axios";

export default class ConsultantService{

    url = "http://localhost:8080/consultants/";

    getAll(){
        return axios.get(this.url+ "all")
    }

    save(consultant){
        return axios.post(this.url ,consultant)
    }

    delete(id){
        return axios.get(this.url + "delete/"+id)
    }
}