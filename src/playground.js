const request = require('request')

let options = {
    url : 'http://localhost:3001/users',
    form:{
        name:'Abhi from request',
        email:'me@example.com',
        password:'Red123()()'
    }
}

request.post(options,function(error,response,body){
    if(error){
        console.log(error)
        return
    }
    console.log(body)
})