import * as net from 'net';

function getRandomArbitrary() {
    return Math.floor(Math.random() * (100 - 10) + 10);
  }

interface Hidroponia {
    temperatura: number,
    umidade: number,
    condutividade: number
}

const sensor: Hidroponia = {
    temperatura: getRandomArbitrary() ,
    umidade: getRandomArbitrary() ,
    condutividade: getRandomArbitrary() 
}

const porta:number = 3002;

const server:net.Server = net.createServer((socket:net.Socket)=>{

    //envia mensagem ao cliente
    socket.write(`${JSON.stringify(sensor)}`)
    
    //tudo que está cheagando
    socket.on('data',(mensagem:Buffer)=>{
        console.log(JSON.parse(mensagem.toString('utf-8')))
    })
    
    //fecha conexão com cliente
    socket.on('error', ()=> {
        console.log("Cliente encerrou a requisão...")
        socket.on('close',()=>{})
    })
})

server.listen(porta, ()=>{
    console.log(`Servidor rodando na porta: ${porta}`)
})