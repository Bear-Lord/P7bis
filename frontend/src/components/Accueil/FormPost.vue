<template>
    <div id="formPost">
        <top-header/>
        <div class="cadre">
            <h2>Nouveau post</h2>
            <form>
                <label for="Titre">Titre : </label><input label="Titre" type="text" v-model="dataPost.title" :rules="titleRules" autofocus required><br>
                <label for="Message">Message : </label><br><textarea v-model="dataPost.content" :rules="contentRules" label="Message" required></textarea><br>
                <button @click.prevent="sendPost" type="submit" class="ind">Poster</button>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios"
import TopHeader from "./TopHeader"


export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Titre de la publication',
                v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractères',

            ],
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Accueil/Forum')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
    components: {
        "top-header": TopHeader, 
        
    },
}
</script>
<style>
    .cadre{
        margin: auto;
        border: 1px solid black;
        padding: 20px;
        line-height: 1.5em;
        font-size: 18px;
    }
    h2{
        font-size: 30px;
        margin-top: 0;
        margin-bottom: 15px;
    }
    input, textarea{
        margin-left:10px;
        height:20px;
        font-size: 18px;
        margin-bottom: 10px;
    }
    textarea{
        height: 200px;
        width: 95%;
    }
</style>