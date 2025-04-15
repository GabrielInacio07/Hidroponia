import * as net from 'net';

const porta:number = 3000;

const server:net.Server = net.createServer((socket:net.Socket)=>{

    //envia mensagem ao cliente
    // socket.write(`\n${JSON.stringify()}`)
    
    //tudo que está cheagando
    socket.on('data',(mensagem:Buffer)=>{
        console.log(JSON.parse(mensagem.toString('utf-8')))
    })
    
    //fecha conexão com cliente
    socket.on('close', ()=> {
        console.log("Cliente foi de Americanas...")
    })
})

server.listen(porta, ()=>{
    console.log(`Servidor rodando na porta: ${porta}`)
})