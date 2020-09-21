<template>
    <div>
        <top-header/>
        <div>
            <h1>Modération</h1>
            <div class="moderation">
                <button @click="clickPosts" class="ind2" >Voir les posts</button>
                <button @click="clickComments" class="ind2" >Voir les commentaires</button>
                <div v-if="showPosts" class="margin_top">
                    <div v-for="(post, index) in allPosts" v-bind:key="index" class="message2">
                        <h2 class="forum__post__title">{{ post.title }}</h2>

                        <p>Par {{ post.firstName }} {{ post.lastName }}, le {{ post.date }}</p>

                        <p class="content">{{ post.content }}</p>
                        
                        <button class="ind2 red" @click="deletePost(post.id)">Delete</button> 
                    </div>
                </div>
                <div v-if="showComments">
                    <div v-for="(comment, index) in allComments" v-bind:key="index" class="post_edit">
                        <p>Le {{ comment.date }}, {{ comment.firstName }} {{ comment.lastName }} commente :</p>

                        <p class="content">{{ comment.comContent }}</p>
                        <button class="ind2 red" @click="deleteComment(comment.id)">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import TopHeader from "./TopHeader"
import axios from "axios"

export default {
    name: "Moderation",
    data(){
        return{
            allPosts: [],
            allComments: [],
            showPosts: true,
            showComments: false
        }
    },
    components: {
        "top-header": TopHeader,
    },
    methods: {
        clickPosts(){
            this.showPosts = true,
            this.showComments = false
        },
        clickComments(){
            this.showPosts = false,
            this.showComments = true
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/moderation/post/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/Moderation');

                })
                .catch(error => {
                    console.log(error);    
                })
        },
        deleteComment(cId){
            axios.delete("http://localhost:3000/api/moderation/comment/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8080/Accueil/Moderation');
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/moderation/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/moderation/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
    }
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

    .ind2{
        text-align: center;
        display: inline-block;
        padding: 10px;
        list-style-type: none;
        font-size: 18px;
        text-decoration: none;
        color: white;
        background-color: black;
        margin-top: 20px;
        min-width: 150px ; 
        border-radius: 5px;
        cursor: pointer;
    }

    .ind2.red{
        background-color: red;
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
        min-width: 150px ; 
        border-radius: 5px;
        cursor: pointer;
    }

    .bouton .ind:hover{
        color: yellow;
    }

    .message2{
        background-color: #EEE;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
    }

    .moderation{
        width: 80%;
        margin: auto;
    }

    .post_edit{

        border-radius: 10px;
        padding: 20px;
        margin-top:15px;
        background-color: #DDD;
    }

    .message2 .content, .post_edit .content{
        font-size: 20px;
        padding: 15px 0;
    }

    .margin_top{
        margin:15px;
    }
</style>