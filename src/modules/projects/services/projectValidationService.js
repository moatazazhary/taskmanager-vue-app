import { ref } from "vue"
import { useFillList } from "../../../core/stores/FillSelectListStore";

export default{

    errors : ref({}),

    isValid(project){

        project.categoryId = useFillList().selectProjCategoryId;
        project.category = useFillList().selectProjCategorytitle;
        project.complexityId = useFillList().selectProjComplextyId;
        project.complexity = useFillList().selectProjComplextytitle;

        if(!project.title || project.title.length < 5)
            this.errors.value.title = "Must contain 5 characters at least!"
        else
            this.errors.value.title =''

        if(!project.description || project.description.length < 10)
            this.errors.value.description = "Must contain 10 characters at least!"
        else
            this.errors.value.description = ''

        if(! project.complexityId)
            this.errors.value.complexityId = "Complexy is required!"
        else{
            this.errors.value.complexityId = ''
        }

        if(! project.categoryId)
            this.errors.value.categoryId = "Category is required!"
        else
            this.errors.value.categoryId = ''

        if(! project.startDate)
            this.errors.value.startDate = "Start date is required!"
        else
            this.errors.value.startDate = ''

        if(! project.endDate)
            this.errors.value.endDate = "End date is required!"
        else
            this.errors.value.endDate = ''

        return this.errors.value;
    }

}