import api from "../../../core/services/api";

export default{
    GetAll(){
        return api.get('/projects');
    },
    GetProject(id){
        return api.get(`/projects/${id}`);
    },
    AddProject(project){
        return api.post('/projects/',project);
    },
    UpdateProject(id,project){
        return api.put(`/projects/${id}`,project);
    },
    DeleteProject(id){
        return api.delete(`/projects/${id}`);
    }

}