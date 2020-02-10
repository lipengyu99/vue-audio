<template>
    <div class="disk" :class="{ disk__playing:isPlaying}">
    <label for="file" class="disk_cover" ref="cover" :style="{
        transform: stopMatrix,
        backgroundImage: coverUrl ? 'url(${coverUrl})' :''}">
    </label>
    <input type="file" id="file" ref="file" accept=".mp3" multiple @change="handleChange">
    
    
    </div>
</template>

<script>
import{mapState,mapMutations } from 'vuex'
import {player} from '../store/player.js'
export default {
    data() {
        return {
            stopMatrix:'',
        }
    },
    computed: {
       ...mapState(['isPlaying','coverUrl'])
    },
    watch: {
        isPlaying(val){
            if(!val){
                this.stopMatrix = window.getComputedStyle(this.$refs.cover).transform
            }else{
                const matrix = this.stopMatrix
                this.stopMatrix = ''

                const match = matrix.match(/^matrix\(([^,]+),([^,]+)/)
                const[,sin,cos] = match || [0,0,0]
                const deg = ((Math.atan2(cos,sin)/2/Math.PI)*360)

                const style = [...document.styleSheets]
                style.forEach(style =>{
                    const rules = [...style.cssRules]
                    rules.forEach(rule =>{
                        if(rule.type===rule.KEYFRAMES_RULE && rule.name === 'rotate'){
                           rule.cssRules[0].style.transform = 'rotate(${deg}deg)'
                           rule.cssRules[1].style.transform = 'rotate($deg+360)deg'
                        }
                    })
                })
            }
        }
    },
    methods: {
        ...mapMutations(['togglePlay','changeCover']),

       async handleChange(){
           const target = this.$refs.file
           const files = target.files ||[]

           if(files.length){
               for (let i = 0; i < files.length; i++) {
                   await player.append(files[i]);
                   
               }
           }
           target.value = ''
        }
    },
    mounted() {
        player.OnReady.listen(()=>{
            this.changeCover()
        })
        player.OnChange.listen(()=>{
            this.changeCover()
        })
        player.OnPlay.listen(()=>{
            this.togglePlay(true)
        })
        player.OnPause.listen(()=>{
            this.togglePlay(false)
        })
    },
};
</script>

<style>
.disk{
    position: relative;
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
    transform: translateY(-50%) scale(0.88);
    transform-origin: center bottom;
    transition: all 0.6s ease;
  
}
.disk input{
    display: none;
}
.disk_cover{
    position: absolute;
    top:-10px;
    left:-10px;
    right: -10px;
    bottom: -10px;
    background-image: radial-gradient(circle,#444 0%,#333 100%);
    background-size: cover;
    background-position: center;
}
.disk_cover::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-image: linear-gradient(45deg,white,#dabad1);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.disk__playing{
    transform: translateY(-50%);
    box-shadow: 0 10xp 30px rgba(0, 0, 0, 0.1),0 20px 20px -10px rgba(108, 29, 171, 0.3)
}
.disk__playing .disk_cover {
    animation: rotate infinite 6s linear;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
