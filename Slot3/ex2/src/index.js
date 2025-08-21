import { createServer } from 'node:http'

const serverVip = createServer((request, respone) => {
        const method = request.method
        const url = request.url
        if(method) {

        switch(url ){
        case '/':
        switch(method){
        case 'POST': 
                break;
        case 'PUT':
                break;
        default: 
                respone.end('Hello World')
        } 
        break;
        case '/hehe':
                respone.end('hehehehehehe')
        default:
                respone.end('Not Found')
                break;

}
} else{
        respone.end('Method not allowed')
}


})
consolog.log('Server start at: http://localhost:3000')
serverVip.listen(3000)




