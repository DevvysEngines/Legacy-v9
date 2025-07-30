let idList = {};

export class utilities {
    static generateId = function(length = 28){
        const chars = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=+_|!@#$%^&*()`;
        let result = ``;
        for (let i=0; i<length-4; i++){
            result+=chars.charAt(Math.floor(Math.random()*chars.length));
        }
        if (idList[result]){
            console.log(`Damn lucky day! `, result);
            result = utilities.generateId(length);
        }
        let gen = Math.floor(Math.random()*(result.length+1));
        result = result.slice(0, gen) + 'gen-' + result.slice(gen);
        idList[result] = true;
        return result;
    }
    static normalize_path(...path){
        let newpath = [];
        path.forEach((part)=>{
            switch(typeof part){
                case `string`:
                    newpath.push(
                        ...part
                            .replaceAll(`.`,`/`)
                            .replaceAll(`[`,`/`)
                            .replaceAll(`]`,``)
                            .split(`/`)
                    )
                    break;
                default:
                    newpath.push(part);
                    break;
            }
        })
        return newpath;
    }
    static system_signal_converter(signal=`/`,type=`set`){
        return `*emit?-{system-${type}}:{>${utilities.normalize_path(signal).join(`>`)}}*`;
    }
}