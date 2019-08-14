/**
 * pre 为 接口请求前需要进行的操作
 * opts 为  一个叔祖，需要进行的操作
 * type: {
 *     all: 每执行一次 re.opts, 测试所有用例,
 *     random: 每执行一次 re.opts, 测试 times 次用例
 * }
 * times: type 为 random 时有效， 执行用例的个数
 *
 */
module.exports = {
    path:'/user/info',
    method:'post',
    pre:{
         opts: [
             {pre_id:1,path: '/account/login', params:{phone:"+8615501215528",password:"zh123457"}, method: 'post', add2Head:[{res_key:'data.token.access_token', header_key: 'x-access-token'}],preRoles: [{key:'code',type:'equal',value:1000},{key:'data.name',type:'exist',value:'1'}]},
             //{pre_id:1,path: '/account/login', params:{phone:"+8615501215528",password:"zh123457"}, method: 'get', add2Params:[{res_key:'data.user_id', params_key: 'user_id'}],preRoles: [{key:'code',type:'equal',value:1000},{key:'data.name',type:'exist',value:'1'}]}
        ],
    },
    type: 'all', // or 'one'
    data:[
        {sam_id:1,params:{user_id: '5d4d332ef2d2ee6eb6aef41c'},headers:{'x-access-token': ''},roles:[{key:"code",type:'equal',value:1000}, {key:'data.name',type:'exist',value:1}]},
        {sam_id:2,params:{user_id: '5d50dca6f2d2ee6eb6e1121f'},roles:[{key:"code",type:'equal',value:1001}, {key:'data.name',type:'exist',value:0}]},
    ]
}