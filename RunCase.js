const Cases = require('./cases');
const CaseRuner = require('./CaseRunner')
const TestCaseFactory = require('./TestCaseFactory')

async function run() {
    let caseRunner = new CaseRuner('localhost', 8100);
    await caseRunner.init();
    for(let item of Object.keys(Cases)) {
        await caseRunner.run(TestCaseFactory.generateCase(Cases[item]))
    }
}

run()