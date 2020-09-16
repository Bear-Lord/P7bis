<template>
    <div>
        <top-header/>
        <h2>Accueil</h2>
        <router-view></router-view>
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
</style>