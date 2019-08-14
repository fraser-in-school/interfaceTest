module.exports =  {
    path:'/friend/list',
    method:'post',
    pre:[
        {params:{phone:"8612312312",password:"1234"},depends:[{key:"data.token",type:'headers',value:'x-access-token'}]}
    ],
    data:[
        {params:{phone:"8612312312",password:"1234"},roles:[{key:"code",type:'equal',value:1000}, {key:'data.name',type:'exist',value:1}]},
        {params:{phone:"8612312312",password:"1231"},roles:[{key:"code",type:'equal',value:1001}, {key:'message',type:'equal',value:"xxxxxx"}]},
        {params:{phone:"8612312312",password:"1231"},roles:[{key:"code",type:'not_equal',value:1000}, {key:'data.name',type:'exist',value:11}]},
    ]
}
