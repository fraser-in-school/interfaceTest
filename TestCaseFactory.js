const TestCase = require('./TestCase')
const PreCase = require('./PreCase')

module.exports = {
    generateCase: samples => {
        let caseObj = {}
        caseObj.type = samples.type;
        caseObj.preArr = []
        for(let opt of samples.pre.opts){
            let preCase = new PreCase();
            preCase.pre_id = opt.pre_id;
            preCase.path = opt.path;
            preCase.method = opt.method;
            preCase.params = opt.params;
            preCase.add2Head = opt.add2Head;
            preCase.add2Params = opt.add2Params;
            for(let role of opt.preRoles){
                preCase.addRole(role.key, role.type, role.value);
            }
            caseObj.preArr.push(preCase)
        }
        caseObj.caseArr = []
        for(let item of samples.data) {
            let testCase = new TestCase();
            testCase.sam_id = item.sam_id;
            testCase.path = samples.path;
            testCase.method = samples.method;
            testCase.params = item.params;
            testCase.headers = item.headers;
            for(let role of item.roles){
                testCase.addRole(role.key, role.type, role.value);
            }
            caseObj.caseArr.push(testCase)
        }
        return caseObj;
    }
}