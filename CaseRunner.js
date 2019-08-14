const Request = require('./Request')
const log4js = require('log4js')
const Diff = require('./ObjectDiff')

const access = log4js.getLogger('access');
const failed = log4js.getLogger('failed');

let defaultUser ={
    username: '+8615501215528',
    password: 'zh123457',
}


class CaseRunner{
    constructor(host = 'localhost', port = 8100, user = defaultUser) {
        this.host = host;
        this.port = port;
        this.user = user;
        this.testHead = {};
        this.testParams = {};
    };

    async init(){
        this.req = await new Request(this.host, this.port)
        //await this.req.accountLogin(defaultUser.username, defaultUser.password)
    }

    async setUser(newUser){
        await this.req.accountLogin(newUser.username, newUser.password);
    }

    setTestHeaders(headers){
        console.log(headers)
        this.testHead = Object.assign(this.testHead, headers)
    }

    setTestParams(params){
        this.testParams = Object.assign(this.testParams, params)
    }
    async exec(testCase) {
        //console.log(testCase)
        let result
        switch (testCase.method) {
            case 'post':
                //this.req.post(testCase.pre);
                result = await this.req.post(testCase.path, testCase.params, testCase.headers);
                testCase.assert(result.data);
                break;
            case 'get':
                result = await this.req.get(testCase.path, testCase.params, testCase.headers);
                testCase.assert(result.data);
                break;
        }

    }

    async execPre(preCase){
        let result
        switch (preCase.method) {
            case 'post':
                //this.req.post(testCase.pre);
                result = await this.req.post(preCase.path, preCase.params, preCase.headers);
                preCase.assert(result.data);
                break;
            case 'get':
                result = await this.req.get(preCase.path, preCase.params, preCase.headers);
                preCase.assert(result.data);
                break;
        }
    }
    async pre(caseObj){
        //console.log(caseObj.preArr)
        for(let item of caseObj.preArr){
            await this.execPre(item)
            this.setTestHeaders(item.getTestHead())
            this.setTestParams(item.getTestParams())
        }
    }
    async run(caseObj){
        if(caseObj.type == 'all'){
            await this.pre(caseObj);
            for(let item of caseObj.caseArr) {
                item.headers = Object.assign(item.headers || {}, this.testHead);
                item.params = Object.assign(item.params || {}, this.testParams);
                this.exec(item)
            }
        }
        else if(caseObj.type == 'one'){
            for(let item of caseObj.caseArr) {
                await this.pre(caseObj);
                item.headers = Object.assign(item.headers, this.testHead);
                item.params = Object.assign(item.params, this.testParams);
                this.exec(item)
            }
        }
    }
}

module.exports = CaseRunner