import { utilities } from "../../utilities.js";



export function script_handler(sCls){
    return class extends sCls {
        insert(script,...args){
            let stored_script = {
                id: utilities.generateId()
                ,info:args
                ,active: true
                ,proto: script
            }
            stored_script.run = utilities.ctxUse(stored_script,this,`trigger`);
            this.set(`scripts_storage/${stored_script.id}`,stored_script);
            this.set(`signals_storage/${stored_script.proto.signal}/${stored_script.id}`,true);
            return stored_script.id;
        }
        remove(script=this.context){
            if (typeof script == `string`)script = this.script(script);
            this.set()
        }
        script(id=this.context.id){
            return this.system_get([`scripts_storage`,id]);
        }
        emit(signal,...args){
            /*console.log(
                `%cEmit from '%c${this.id}%c': %c${signal}`
                ,"color: pink"
                ,"color: yellow"
                ,"color: pink"
                ,"color: orange"
            );*/
            let scripts = this.system_get([`signals_storage`,signal]);
            if (!scripts)return;
            Object.keys(scripts).forEach((id)=>{
                let script = this.script(id);
                if (!script.active)return;
                script.run(...args,...script.info);
            })
        }
    }
}