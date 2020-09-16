<template>
    <div class="cadre">
        <h2>Se connecter</h2>
        <form>
            <label for="Email">Email : </label><input type="email" v-model="dataLogin.email" :rules="emailRules" label="Email" autofocus required><br>
            <label for="Mot de passe">Mot de passe : </label><input type="password" v-model="dataLogin.password" :rules="passRules" label="Mot de passe" required><br>
            <button @click.prevent="sendLogin" type="submit">Se connecter</button>
        </form>
        <p v-if="msg">{{message}}</p>
    </div>
</template>
<script>

import axios from "axios"

export default {
    name : "Login",
    data(){
        return{
            valid: true,
            emailRules: [
                v => !!v || 'Renseignez votre e-mail',
                v => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide",
            ],
            passRules: [
                v => !!v || 'Renseignez votre mot de passe'
            ],
            dataLogin: {
                email: "",
                password: "",
            },
            dataLoginS: "",
            msg: false,
            message: ""
        }
    },
    methods: {
        sendLogin(){
            this.dataLoginS = JSON.stringify(this.dataLogin);
            axios.post('http://localhost:3000/api/auth/login', this.dataLoginS, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let log = JSON.parse(response.data);
                    localStorage.userId = log.userId;
                    localStorage.token = log.token;
                    localStorage.moderation = log.moderation;
                    this.$router.push('/Accueil');  
                })
                .catch(error => {
                    console.log(error);
                    this.message = error;
                    this.msg = true 
                }); 
        }
    }
}
</script>
<style>
    .login{
        position: flex;
        flex-direction: row;
        top: 5%;
        width: 350px;
        height: 200px;
        text-align: center;
    }

    .input{
        width:200px;
        border: 1px solid black;
    }
</style>