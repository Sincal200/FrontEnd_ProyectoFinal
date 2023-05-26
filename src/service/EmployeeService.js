import axios from "axios";

export default class EmployeeService{

    url = "http://localhost:8080/employees/";

    getAll(){
        return axios.get(this.url+ "all")
    }

    save(employee){
        return axios.post(this.url ,employee)
    }

    delete(id){
        return axios.get(this.url + "delete/"+id)
    }
}