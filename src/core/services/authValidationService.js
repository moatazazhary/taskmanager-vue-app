import { ref } from "vue"
import { useFillList } from "../stores/FillSelectListStore";

export default {
    errors : ref({}),

    emailRegex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    passErrors(password){
        const rules = {
        minLength :password.length >= 8,
        hassUpper : /[A-Z]/.test(password),
        hasLower : /[a-z]/.test(password),
        hasSpecial : /[@$!%*?&]/.test(password),
        hasNumber : /\d/.test(password)
        };

        const passMessages = ref([])

        if(!rules.minLength)
            passMessages.value.push(("Password must be at leat 8 characters log!"))

        if(!rules.hasLower)
            passMessages.value.push(("Must contain a small letter!"))

        if(!rules.hassUpper)
            passMessages.value.push(("Must contain a capital letter!"))

        if(!rules.hasNumber)
            passMessages.value.push(("Must contain a number!"))

        if(!rules.hasSpecial)
            passMessages.value.push(("Must contain a special charactar Ex:[@ , ! , $ , % , &]!"))


        return passMessages.value;
    },

    isValid(user,isLogin=true){


        if(!isLogin){
            user.gender = useFillList().gender
            
            if(!user.firstName || user.firstName.length < 3)
                this.errors.value.firstName = "Must contain 3 characters at least!"
            else
                this.errors.value.firstName =''

            if(!user.lastName || user.lastName.length < 3)
                this.errors.value.lastName = "Must contain 3 characters at least!"
            else
                this.errors.value.lastName = ''

            if(!user.gender)
                this.errors.value.gender = "Gender is required!"
            else
                this.errors.value.gender = ''
        }

        if(user.email){
            if(user.email.match(this.emailRegex) === null){
                this.errors.value.email = "Email is not valid! Ex: expamle@gmail.com"
            }else{
                this.errors.value.email = ''
            }
        }else{
            this.errors.value.email = "Email is required!"
        }

        if(user.password){
            if(!isLogin){
                const passStatus = this.passErrors(user.password);
                if(passStatus.length > 0){
                    this.errors.value.password = passStatus
                }else
                    this.errors.value.password = ''
            }else
                this.errors.value.password = ''
        }else{
            this.errors.value.password = "password is required!"
        }

        return this.errors.value;
    }
}



