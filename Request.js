const axios = require('axios')
const log4js = require('log4js')

const logger = log4js.getLogger('error')

let defaultHeaders = {
    'Connection': 'keep-alive',
    'x-access-token': '757f331614852fcd66ae195413a12457971c40cd',
    'lg': 'zh-CN',
    'accept': 'application/json',
    'content-type': 'application/json',
    'v': '201907310',
    'sv': '38',
    'tz': '+08:00',
    'pt': 'android',
    'did': '00000000-7886-766c-0000-000000000000',
    'app': 'werewolf',
    'pid': 'ffffffff-8007-15e4-0000-000030638eec',
    'w': '1080',
    'h': '1920',
    'Host': '192.168.1.145:8100',
    'connection': 'Keep-Alive',
    'accept-encoding': 'gzip',
    'user-agent': 'okhttp/3.10.0'
}


class Request{
    constructor(host, port, timeout = 5000, headers = defaultHeaders){
        this.host = host;
        this.port = port;
        this.instance = axios.create({
            baseURL: `http://${host}:${port}`,
            timeout: timeout,
        })

        this.headers = headers;
    }

    /**
     * 同步 get 请求
     * @param path
     * @param params
     */
    async get(path, params, headers) {
        headers = Object.assign(this.headers, headers)
        try{
            let response = await this.instance.get(path, {
                headers: headers,
                params: params
            })
            return response;
        }catch (e) {
            logger.error(JSON.stringify(e))
        }
    }

    /**
     * 同步 post 请求
     * @param path
     * @param headers
     * @param data
     */
    async post(path, data, headers) {
        headers = Object.assign(this.headers, headers)
        try{
            let response = await this.instance.post(path, data, {
                headers: headers
            });
            return response;
        }catch (e) {
            logger.error(JSON.stringify(e))
        }
    }

    /**
     * 模拟登陆请求， 将返回的 token 值赋值给 headers
     * @param username
     * @param password
     * @returns {Promise<void>}
     */
    async accountLogin(username, password){
        let data = {
            phone: username,
            password: password,
        }
        let res = await this.post('/account/login', data, defaultHeaders);
        //this.headers['x-access-token'] = res.data.data.token.access_token;
    }
}


module.exports = Request;

async function test() {
    let params = {
        'user_id': '5d39774cf2d2ee6eb69f42b2'
    }

    let req = await new Request('localhost', 8100)
    await req.accountLogin('+8615501215528', 'zh123457')
    let res = await req.get('/user/info', params);
    console.log('headers', req.headers)
    console.log('user/info', res.data)
}

//test()