import axios from "axios";

export default class ProjectService{

    url = "http://localhost:8080/projects/";

    getAll(){
        return axios.get(this.url+ "all")
    }

    save(project){
        return axios.post(this.url ,project)
    }

    delete(id){
        return axios.get(this.url + "delete/"+id)
    }
}