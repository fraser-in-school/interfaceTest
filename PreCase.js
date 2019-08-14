const log4js = require('log4js')

const Logger = log4js.getLogger()

class Role{
    constructor(key, type, value) {
        this.type = type;  //equal, exists
        this.key = key;
        this.value = value;
    }
    assert(res) {
        let result = true;
        let attrs = this.key.split('.');
        let val = res;
        for(let attr of attrs){
            if(val[attr] == undefined){
                return false;
            }
            val = val[attr];
        }
        switch (this.type) {
            case 'equal':
                result =  val === this.value;
                break;
            case 'exist':
                result = val !== undefined;
                break;
            case 'not_equal':
                result = val !== this.value;
                break;
        }
        return result;

    }
}


class PreCase {
    constructor(){
        this.headers;
        this.params;
        this.method;
        this.path;
        this.roles = [];
        this.s_id;
        this.res;
        this.add2Head;
        this.add2Params;
        this.testHead = {};
        this.testParams = {};
    }

    addRole(key, type, value) {
        this.roles.push(new Role(key, type, value))
        return this;
    }

    getTestParams(){
        return this.testParams;
    }
    getTestHead(){
        return this.testHead;
    }
    assert(res, headers) {
        let access = true;
        for(let item of this.roles) {
            let result = item.assert(res, headers)
            if(result) {
            } else {
                access = false;
                let errObj = {
                    msg: 'failed',
                    pre_id: this.pre_id,
                    reg: {
                        path: this.path,
                        params: this.params,
                        method: this.method,
                    },
                    role: item,
                }
                Logger.error(JSON.stringify(errObj))
                return ;
            }
        }
        if(this.add2Head != undefined){
            for(let item of this.add2Head){
                let attrs = item.res_key.split('.');
                let val = res;
                for(let attr of attrs){
                    if(val[attr] == undefined){
                        return false;
                    }
                    val = val[attr];
                }
                this.testHead[item.header_key] = val;
            }

        }
        if(this.add2Params != undefined){
            for(let item of this.add2Params){
                let attrs = item.res_key.split('.');
                let val = res;
                for(let attr of attrs){
                    if(val[attr] == undefined){
                        return false;
                    }
                    val = val[attr];
                }
                this.testParams[item.params_key] = val;
            }
        }
    }

}

module.exports = PreCase;