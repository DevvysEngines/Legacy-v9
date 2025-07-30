import { utilities } from "../../utilities.js";

export class base_module{
    #context = [];
    #files = {
        scripts_storage:{}
        ,signals_storage:{}
        ,system_storage:{}
    };
    get id(){
        return this.#files[`system_storage`][`id`];
    }
    get context(){
        return this.#context[this.#context.length-1];
    }
    set_context(context){
        return this.#context.push(context);
    }
    remove_context(){
        return this.#context.pop();
    }
    system_set(path=[],value=0){
        let current = this.#files
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)current[path[part]]={};
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        current[path[path.length-1]] = value;
        return [oldValue,value,...path];
    }
    system_delete(path=[]){
        let current = this.#files
        let oldValue;
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return [undefined,false,...path];
            current = current[path[part]];
        }
        oldValue = current[path[path.length-1]];
        delete current[path[path.length-1]];
        return [oldValue,true,...path];
    }
    system_get(path=[]){
        let current = this.#files
        for (let part = 0; part<path.length-1; part++){
            if (typeof current[path[part]] != `object`)return;
            current = current[path[part]];
        }
        return current[path[path.length-1]];
    }
    set(...path){
        let value = path.pop();
        let normalized_path = utilities.normalize_path(...path);
        let change = this.system_set(normalized_path,value);
        if (change[0]==value)return;
        let newpath = ``;
        this.emit(`*emit?-{system-set}:{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*emit?-{system-set}:{${newpath}>}*`,change);
        })
        this.emit(`*emit?-{system-set}:{${newpath}}*`,change);
    }
    get(...path){
        return this.system_get(utilities.normalize_path(...path));
    }
    delete(...path){
        let normalized_path = utilities.normalize_path(...path);
        let change = this.system_delete(normalized_path);
        if (!change[1])return;
        let newpath = ``;
        this.emit(`*emit?-{system-delete}:{>>}*`,change);
        normalized_path.forEach((part)=>{
            newpath+=`>${part}`;
            this.emit(`*emit?-{system-delete}:{${newpath}>}*`,change)
        })
        this.emit(`*emit?-{system-delete}:{${newpath}}`,change);
    }
    constructor(config,...scripts){
        Object.assign(this.#files,config,{scripts_storage:{},signals_storage:{},system_storage:{id:utilities.generateId()}});
        scripts.forEach((script)=>{
            this.insert(...script);
        })
    }
}