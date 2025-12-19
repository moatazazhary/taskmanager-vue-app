import api from "./api";

export default {
    getRolesData(){
        return api.get('/roles');
    },
    getJobTitlesData(){
        return api.get('/jobTitlea');
    },
    getCategoriesData(){
        return api.get('/Categories');
    },
    getComplexitiesData(){
        return api.get('/Complexities');
    },
}
