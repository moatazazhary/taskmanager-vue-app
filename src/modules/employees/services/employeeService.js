import api from "../../../core/services/api";

export default {
    GetAll(){
        return api.get("/employees");
    },

    GetEmployee(id){
        return api.get(`/employees/${id}`);
    },

    CreateEmployee(employee){
        return api.post("/employees",employee);
    },

    UpdateEmployee(id,employee){
        return api.put(`/employees/${id}`,employee);
    },

    DeleteEmployee(id){
        return api.delete(`/employees/${id}`)
    }

};
