import api from "../../../core/services/api";

export default{
    GetAll(){
        return api.get('/tasks')
    },
    GetTask(id){
        return api.get(`/tasks/${id}`)
    },
    AddTask(task){
        return api.post('/tasks',task)
    },
    UpdateTask(id,task){
        return api.put(`/tasks/${id}`,task)
    }
}