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


class TestCase {
    constructor(){
        this.headers;
        this.params;
        this.method;
        this.path;
        this.roles = [];
        this.s_id;
        this.res;
    }
    pre() {

    }
    addRole(key, type, value) {
        this.roles.push(new Role(key, type, value))
        return this;
    }
    addPreRole(key, type, value){
        this.roles.push(new Role(key, type, value))
        return this;
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
                    sam_id: this.sam_id,
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
        if(access){
            let accessObj = {
                msg: 'has accessed',
                sam_id: this.sam_id,
                reg: {
                    path: this.path,
                    params: this.params,
                    method: this.method,
                },
                role: this.roles,
            }
            Logger.info(JSON.stringify(accessObj))
        }
    }

}

module.exports = TestCase;