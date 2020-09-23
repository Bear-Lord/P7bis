<template>
    <div id="auth">
        
        <div class="auth">
            <div id="logo">
                <a href="accueil.html"><img src="../assets/logo.png" alt="Logo Groupomania"></a>
            </div>
            <div class="boutons">
                <button class="nav_button" @click="component='signup'">S'inscrire</button>
                <button class="nav_button" @click="component='login'">Se connecter</button>
            </div>
        </div>

        <div class="auth">
            <component v-bind:is="component"></component>
        </div>   
        
    </div>
</template>

<script>
    import Signup from "./Auth/Signup.vue"
    import Login from "./Auth/Login.vue"

    export default {
        name : "Auth",
        data(){
            return{
                
                component: ""
            }
        },
        
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

  body {
    font-family: "Roboto", sans-serif ;
  }

  #logo, .auth .boutons{
    width:50%;
    display: inline-block;
  }

  .auth img{
    margin: 10px;
  }

    .auth {
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    
    .auth .boutons{
        text-align: right;
        align-items: center;
        margin-bottom: 2%;
    }

    .boutons.flex{
         display: flex;
        flex-direction: row;
        justify-content: right;
    }

    .auth .boutons .nav_button{
        text-align: right;
        display: inline-block;
        padding: 15px;
        list-style-type: none;
        font-size: 25px;
        text-decoration: none;
        color: black;
        margin-top: 5%;
        width: 250px ; 
        background-color: white;
        border: 0px;
    }

    .auth .boutons .nav_button:hover{
        color: #FD2D01;
    }

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
    input{
        margin-left:10px;
        height:20px;
        font-size: 18px;
        margin-bottom: 10px;
    }
    .valid_button{
        margin:auto;
        margin-top:10px;
        border-radius: 10px;
        background-color: black;
        color: white;
        padding: 10px;
        font-size: 20px;
    }

    @media screen and (max-width: 1500px) {
        .auth{
            flex-direction: column;
        }

        #logo{
            width:95%;
        }

        #logo img{
            width:100%;
        }

        .auth .boutons{
            width:100%;
        }

        .auth .boutons .nav_button{
            width: auto;
            margin-top: 0;
            text-align: left;
           
            padding: 10px;
            min-width: auto;
        }
    }
    
    @media screen and (max-width: 740px) {

        .cadre{
            width: calc(90% - 40px) !important;
        }

        .auth .boutons .nav_button{
            font-size: 18px;
        }

    }
</style>