<template>
    <div class="head">
        <nav>
            <div class="auth">
                <a href="accueil.html" id="logo"><img src="../../assets/logo.png" alt="Logo Groupomania" class=""></a>
                <div class="boutons flex">
                    <ul v-for="item in items" :key="item.title">
                        <li class="menu_li">
                            <router-link :to=item.link>{{ item.title }}</router-link>
                        </li>
                    </ul>

                    <ul v-if="this.modo==1">
                        <li @click="moderation" class="menu_li">
                            Modération
                        </li>
                    </ul>

                    <ul>
                        <li @click="logout" class="menu_li">
                            Se déconnecter
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name : 'TopHeader',
    data(){
        return {
            modo: "",
            drawer: true,
            items: [
                { title: 'Accueil', icon: 'mdi-home', link: '/Accueil'  },
                { title: 'Profil', icon: 'mdi-account', link: '/Accueil/Profil'},
                { title: 'Forum', icon: 'mdi-forum', link: '/Accueil/Forum' },
            ],
        }
    },
    methods: {
        logout(){
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.moderation = "";
             this.$router.push('/');
        },
        moderation(){
            this.$router.push('/Accueil/Moderation')
        }
    },
    mounted(){
        this.modo = localStorage.moderation;
    },
}
</script>

<style>
    a {
        text-decoration: none;
        color: black;
    }
    a:hover {
        text-decoration: underline;  
        color: #FD2D01;   
    }
    .auth .menu_li:hover {
        color: #F13E18!important;
        text-decoration: none;
    }
    .auth .menu_li{
        text-align: right;
        display: inline-block;
        padding: 15px;
        list-style-type: none;
        font-size: 25px;
        text-decoration: none;  
        margin-top: 25px;  
         cursor: pointer; 
    }

    @media screen and (max-width: 1500px) {
        .auth .boutons li{
            width: auto;
            margin-top: 0;
            text-align: left;
           
            padding: 10px;
            min-width: auto;
        }
    }

    @media screen and (max-width: 740px) {
        h2{
            margin-top:20px !important;
            margin-bottom: 35px !important;
        }

        .auth .boutons ul{
            margin:0;
            padding:0;
        }

        .auth .boutons li{
            font-size: 18px;
        }

        .auth .boutons{
            flex-direction: column;
        }

    }
</style>