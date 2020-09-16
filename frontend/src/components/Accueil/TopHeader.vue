<template>
    <div class="head">
        <nav>
            <div class="auth">
                <a href="accueil.html" id="logo"><img src="../../assets/logo.png" alt="Logo Groupomania" class=""></a>
                <ul v-for="item in items" :key="item.title">
                    <li class="ind">
                        <router-link :to=item.link>{{ item.title }}</router-link>
                    </li>
                </ul>
                <ul v-if="this.modo==1">
                    <li @click="moderation" class="ind">
                        Modération
                    </li>
                </ul>

                <ul>
                    <li @click="logout" class="ind">
                        Se déconnecter
                    </li>
                </ul>
                
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
    .lien {
        cursor: pointer;
    }
    .lien:hover {
        color: #F13E18!important;
        text-decoration: underline;
    }
    .auth .ind{
        text-align: right;
        display: inline-block;
        padding: 15px;
        list-style-type: none;
        font-size: 25px;
        text-decoration: none;     
    }
</style>