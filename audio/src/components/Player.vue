<template>
    <div class="player">
        <div class="player_disk">
            <disk/>
        </div>
        <div class="player_controller">

        </div>
        <div class="player_progress">
            
        </div>
    </div>
</template>

<script>
import Disk from '../components/Disk.vue'
export default {
    components:{
        Disk
    }
};
</script>

<style lang="scss">
.player{
    position: relative;
    display: flex;
    max-width: 300px;
    max-height: 75px;
    width: 60vw;
    height: 15vw;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0px 30px 60px rgba(0,0,0,0.32),0px 20px 50px rgba(95,23,101,0.2)
}
.player_disk{
    flex: 1.2;
    padding: 2.4vw;
}
.player_controller{
    flex: 2;
    padding: 2.4vw 0;
    padding-right: 2.4vw;
}
player_progress{
    position: absolute;
    left: 1.8vw;
    right: 1.8vw;
    top: 0px;
    bottom: 5vw;
    z-index: -1;
}


</style>
