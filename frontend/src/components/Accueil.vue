<template>
    <div>
        <top-header/>
        <h2>Accueil</h2>
        <router-view></router-view>
        <div class="main_image">
            <img src="../assets/building.jpg" alt="bâtiment groupomania">
            <p>Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions à peine 300 il y a 3 ans.</p>
        </div>
    </div>
</template>

<script>
import TopHeader from "./Accueil/TopHeader"

export default {
    name: "Accueil",
    data(){
        return {}
    },
    components: {
        "top-header": TopHeader,
    },
}
</script>
<style>
    #accueil .header{
        background-color: rgb(253,45,1);
        color: white;
    }    
    .main_image{
        margin:auto;
        text-align: center;
        width:80%;
    }
    .main_image img{
        width: 100%;
    }
    .main_image p{
        font-size: 22px;
    }
</style>