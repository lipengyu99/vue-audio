class Dispatcher{
    constructor(){
        this.handlers = []
    }
    listen(handler){
        this.handlers.push(handler)
    }
    emit(...args){
        this.handlers.forEach(handler=>{
            handler(...args)
        })
    }
}
class Player{
    constructor(){
        this.audioContext = new AudioContext()
        this.playlist = []
        this.playIndex = 0
        this.emptyNode={
            file:null,
            offset:0,
            start:null,
            source:null,
            buffer:null,

        }
        this.OnPlay = new Dispatcher()
        this.OnPause = new Dispatcher()
        this.OnChange = new Dispatcher()
        this.OnReady = new Dispatcher()
    }

    async readAudioBuffer(file){

    }
    async append(file){

    }
    play(){

    }
    pause(){

    }
    stop(){

    }
    next(){

    }
    prev(){

    }
    get isEmpty(){

    }
    get curren(){

    }
    get position(){

    }
    set position(val){

    }
    get duration(){

    }
}
export const player = new Player()
