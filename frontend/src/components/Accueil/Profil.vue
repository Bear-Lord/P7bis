<template>
    <div id="profil">
        <top-header/>
        <div class="cadre">
            <h2>Mon profil</h2>
            <p>Prénom : {{ dataGet.firstName }}</p>
            <p>Nom : {{ dataGet.lastName }}</p>
            <p>E-mail : {{ dataGet.email }}</p>
        </div>
        <div class="boutons">
            <button class="ind" @click="component='modify-profil'" title="Modifier profil">Modifier</button>
            <button class="ind red" @click="component='delete-profil'" title="Supprimer profil">Supprimer</button>
        </div>
        <div class="auth">
            <component v-bind:is="component"></component>
        </div> 
    </div>
</template>

<script>

import TopHeader from "./TopHeader"
import ModifyProfil from "./ModifyProfil"
import DeleteProfil from "./DeleteProfil"
import axios from "axios"

export default {
    name: "Profil",
    data() {
        return{
            dialogDel: false,
            dialogUp: false,
            msg: "",
            dataGet: { 
                firstName: "",
                lastName: "",
                email: ""
            },

            valid: true,
            component:""
        }
    },
    mounted() { 
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profil = JSON.parse(response.data);
                this.dataGet.email = profil[0].email;
                this.dataGet.firstName = profil[0].firstName;
                this.dataGet.lastName = profil[0].lastName;

            })
            .catch(error => {
                console.log(error);
            });    
    },
    
    components: {
        "top-header": TopHeader,
        "modify-profil" : ModifyProfil,
        "delete-profil" : DeleteProfil
    }
}
</script>

<style>
    .logo{
        margin-top: 5%;
        margin-left: 30%;
    }

    .cadre{
        margin: auto;
        border: 1px solid black;
        padding: 20px;
        line-height: 1.5em;
        font-size: 18px;
        width: 400px;
    }

    h2{
        font-size: 30px;
        margin-top: 0;
        margin-bottom: 15px;
    }

    .boutons{
        display: auto;
        text-align: center;
        margin-bottom: 40px;
    }

    .ind{
        text-align: center;
        display: inline-block;
        padding: 15px;
        list-style-type: none;
        font-size: 25px;
        text-decoration: none;
        color: white;
        background-color: black;
        margin-top: 40px;
        min-width: 150px ; 
        border-radius: 5px;
        cursor: pointer;
    }
    .ind.red{
        background-color: red;
        margin-left: 20px;
    }

    .ind:hover{
        color: yellow;
    }
@media screen and (max-width: 740px) {
    .ind, .ind.red{
        display: block;
        margin: auto;
        margin-top: 20px;
    }
}
</style>
