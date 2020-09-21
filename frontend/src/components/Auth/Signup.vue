<template>
    <div class="cadre">
        <h2>S'inscrire</h2>
        <form>
            <label for="Prénom">Prénom :</label><input type="text" label="Prénom" v-model="dataSignup.firstName" :rules="firstNameRules" autofocus required><br>
            <label for="Nom">Nom :</label><input type="text" label="Nom" v-model="dataSignup.lastName" :rules="lastNameRules" required><br>
            <label for="Email">Email :</label><input type="email" label="Email" v-model="dataSignup.email" :rules="emailRules" required><br>
            <label for="Mot de passe">Mot de passe :</label><input error-count="4" type="password" v-model="dataSignup.password" :rules="passRules" label="Mot de passe" required><br>
            <button @click.prevent="sendSignup" type="submit" class="valid_button">S'inscrire</button>
        </form>
        <p v-if="msg">{{message}}</p>
    </div>
</template>
<script>
import axios from "axios"

export default {
    name : "Signup",
    data(){
        return{
            valid: true,
            firstNameRules: [
                v => !!v || 'Renseignez votre prénom',
                v => /^[A-Za-z]+$/.test(v) || "Votre prénom n'est pas valide",
            ],
            lastNameRules: [
                v => !!v || 'Renseignez votre nom',
                v => /^[A-Za-z]+$/.test(v) || "Votre nom n'est pas valide",
            ],
            emailRules: [
                v => !!v || 'Renseignez votre e-mail',
                v => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide",
            ],
            passRules: [
                v => !!v || 'Renseignez votre mot de passe',
                v => (v && v.length >= 5) || '5 caractères minimun',
                v => /(?=.*[A-Z])/.test(v) || 'Au moins une majuscule', 
                v => /(?=.*\d)/.test(v) || 'Au moins un chiffre',
            ],
            dataSignup:{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        sendSignup(){
            this.dataSignupS = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignupS, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true; 
                });
        }
    }
}
</script>
<style>
    .signup{
        position: flex;
        flex-direction: row;
        top: 5%;
        width: 350px;
        height: 200px;
        text-align: center;
    }
    
</style>
