module.exports =  {
    path:'/account/login',
    method:'post',
    pre:[
        {params:{phone:"8612312312",password:"1234"},res:{code:{type:'equal',value:1000},'data.name':{type:'exist',value:1}}}
    ],
    data:[
        {s_id:1,params:{phone:"+8615501215528", password:"zh123457"},roles:[{key:"code",type:'equal',value:1000}, {key:'data.name',type:'exist',value:1}]},
        {s_id:2,params:{phone:"",password:"1231"},roles:[{key:"code",type:'equal',value:1001}, {key:'message',type:'equal',value:"账号或密码不正确"}]},
        {s_id:3,params:{phone:"8612312312",password:"1231"},roles:[{key:"code",type:'not_equal',value:1000}, {key:'data.name',type:'exist',value:1}]},
    ]
}
