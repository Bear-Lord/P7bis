<template>
    <div class="cadre">
        <h2>Modifier mon profil</h2>
        <form>
            <label for="Prénom">Prénom : </label><input type="text" v-model="dataUp.firstName" :rules="firstNameRules" label="Prénom" autofocus required><br>
            <label for="Nom">Nom : </label><input type="text" v-model="dataUp.lastName" :rules="lastNameRules" label="Nom" required><br>
            <label for="Email">Email : </label><input type="email" v-model="dataUp.email" :rules="emailRules" label="Email" required><br>
            <label for="Mot de passe">Mot de passe : </label><input type="password" v-model="dataUp.password" :rules="passRules" label="Mot de passe" required><br>
            <button @click.prevent="updateUser" type="submit" class="ind">Modifier</button>
        </form>
        <p v-if="msg">{{message}}</p>
    </div>
</template>
<script>

import axios from "axios"

export default {
    name : "ModifyProfil",
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
                v => !!v || 'Renseignez votre mot de passe'
            ],
            dataUp: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            dataUpS: "",
            msg: false,
            message: ""
        }
    },
    methods: {
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            axios.put("http://localhost:3000/api/auth/", this.dataUpS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                this.dialogUp = false;
                window.location.assign('http://localhost:8080/Accueil/Profil');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
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