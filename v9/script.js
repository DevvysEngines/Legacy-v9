export class script {
    #defaults = {
        trigger:function(){}
        ,tags:[]
        ,signal: `script`
    }
    constructor(config){
        Object.assign(this,this.#defaults,config,{type:`script`});
    }
}