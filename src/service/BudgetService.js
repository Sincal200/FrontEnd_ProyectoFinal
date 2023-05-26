import axios from "axios";

export default class BudgetService{

    url = "http://localhost:8080/budgets/";

    getAll(){
        return axios.get(this.url+ "all")
    }

    save(budget){
        return axios.post(this.url ,budget)
    }

    delete(id){
        return axios.get(this.url + "delete/"+id)
    }
}