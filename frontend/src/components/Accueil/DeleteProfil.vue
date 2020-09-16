<template>
    <div class="cadre">
        <h2>Supprimer mon profil</h2>
        <p> Êtes-vous sûr.e ?</p>
        <p>En supprimant votre profil, vous effacerez aussi tous vos posts ainsi que vos commentaires.</p>
        <p>{{ msg }}</p>
        <button text @click="deleteUser">
            Supprimer mon profil
        </button>
    </div>
</template>
<script>

import axios from "axios"

export default {
    name : "DeleteProfil",
    data(){
        return{
            msg: ""
        }
    },
    methods: {
        deleteUser() {
            
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                this.$router.push('/');  
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
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