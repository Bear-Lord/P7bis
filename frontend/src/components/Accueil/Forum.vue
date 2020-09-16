<template>
    <div id="forum" class="forum">
        <top-header/>
        <h2>Forum</h2>
        <div>
            <div class="bouton">
                <button class="ind" @click="afficheForm">Créer un post</button>
            </div>
            <div class="message" v-for="(post, index) in allPosts" v-bind:key="index">
                <h3>{{ post.title }}</h3>
                <div>Par {{ post.firstName }} {{ post.lastName }}, le {{ post.date }} à {{ post.time }}</div>
                <div> {{ post.content }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import TopHeader from "./TopHeader"

import axios from "axios"

export default {
    name: "forum",
    data(){
        return{
            userId: "",
            admin: "",
            afficheFrmCm: false,
            allPosts: [],
            allLikes: [],
            allComments: [],
            postId: "",

            valid: true,
            titleRules: [
                v => !!v || 'Titre de la publication',
                v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractères',
            ],
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            comContentRules: [
                v => !!v || 'Ecrivez votre commentaire',
                v => (v && v.length <= 255) || 'Le commentaire doit faire moins de 255 caractères',
            ],
            dataPost: {
                id: "",
                title:"",
                content:"",
                userId:"",
            },
            dataPostS: "",
            dataCom:{
                id: "",
                content:"",
                userId: ""
            },
            dataComS: "",
            dataLike:{
                userId: "",
                nbLikes: "",
                postId: "",
                liked: false,
            },
            dataLikeS: "",
            form: true
            
            
        }
    },
    methods: {
        afficheCom(pId){
            this.postId = pId;
            this.afficheFrmCm = false;
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
        },
        sendCom(pId){
            this.dataCom.userId = this.userId;
            this.dataComS = JSON.stringify(this.dataCom);
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false;
                })
                .catch(error => {
                    console.log(error); 
                    this.message=error;
                    this.msg=true
                });
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/forum');
                })
                .catch(error => {
                    console.log(error);    
                })
        },
        deleteCom(cId){
            axios.delete("http://localhost:3000/api/posts/comments/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/forum');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        goDialogUpPost(postTitle, postContent, postId){
            this.dataPost.title = postTitle;
            this.dataPost.content = postContent;
            this.dataPost.id = postId;
            this.dialogUpPost = true;
        },
        updatePost(){
            this.dataPost.userId = localStorage.userId;
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.put("http://localhost:3000/api/posts/" + this.dataPost.id, this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataPost.title = "";
                    this.dataPost.content = "";
                    this.dataPost.userId = "";
                    this.dataPost.id = "";
                    this.dialogUpPost = false;
                    window.location.assign('http://localhost:8080/Accueil/forum');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        goDialogUpCom(comContent, comId){
            this.dataCom.id = comId;
            this.dataCom.content = comContent;
            this.dialogUpCom = true; 
        },
        updateCom(){
            this.dataCom.userId = localStorage.userId;
            this.dataComS = JSON.stringify(this.dataComS);
            axios.put("http://localhost:3000/api/posts/comments/" + this.dataCom.id, this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content = "";
                    this.dataCom.userId = "";
                    this.afficheFrmCm = false;
                    this.dialogUpCom = false;
                    window.location.assign('http://localhost:8080/Accueil/forum');
                })
                .catch(error => {
                    console.log(error);
                    
                })
        },
        afficheForm(){
            this.$router.push('/Accueil/forum/Post')
        },
        afficheFormCom(){
            this.afficheFrmCm = true
        },

        likePost(postId, nbLikes){
            this.allLikes.forEach(element => {
                if(element.postId == postId && element.userId == localStorage.userId){
                    this.dataLike.nbLikes = nbLikes+-1;
                    this.dataLike.liked = true;
                }
            });
            if(this.dataLike.liked == false){
                this.dataLike.nbLikes = nbLikes+1;
            }
            this.dataLike.userId = localStorage.userId;
            this.dataLike.postId = postId;
            this.dataLikeS = JSON.stringify(this.dataLike);
            axios.post("http://localhost:3000/api/posts/" + postId + "/like", this.dataLikeS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataLike.liked = false;
                    window.location.assign('http://localhost:8080/Accueil/forum');
                })
                .catch(error => {
                    console.log(error);
                    this.dataLike.liked = false;
                })
        },
    },
    components: {
        "top-header": TopHeader, 
    },
    mounted(){
        this.userId = localStorage.userId;
        axios.get("http://localhost:3000/api/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/posts/likes", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response =>{
                let likes = JSON.parse(response.data);
                this.allLikes = likes;
            })
            .catch(error => {
                console.log(error)
            }); 
    },
}
</script>
<style>
    h1, h2{
        text-align: center;
    }

    h3{
        margin: 10px 0;
        font-size: 24px;
    }

    .forum .comments .ind{
        position: relative;
    }

    .bouton{
        display: auto;
        text-align: center;
        margin-bottom: 40px;
    }

    .bouton .ind{
        text-align: center;
        display: inline-block;
        padding: 15px;
        list-style-type: none;
        font-size: 25px;
        text-decoration: none;
        color: white;
        background-color: black;
        margin-top: 40px;
        width: 150px ; 
        border-radius: 5px;
        cursor: pointer;
    }

    .bouton .ind:hover{
        color: yellow;
    }

    .message{
        width: 80%;
        margin: auto;
        background-color: #EEE;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
}
</style>