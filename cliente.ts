import * as net from 'net';

const array: string[] = [];
const portas: number[] = [3000, 3001, 3002]; 

portas.forEach(porta => {
    const cliente: net.Socket = net.createConnection({ 
        host: 'localhost', 
        port: porta
    });

    cliente.on('data', (mensagem: Buffer) => {
        const dados = mensagem.toString();
        if (!array.includes(dados)) {
            array.push(dados);
            console.log(`Mensagem recebida do servidor (porta ${porta}): ${dados}`);
        }
    });

    // cliente.on('close', () => {
    //     console.log(`Conexão na porta ${porta} fechada`);
    // });

    cliente.on('error', () => {
        console.error(`Servidor ${porta} encerrou a atividade...`);
        cliente.on('close',()=>{})
    });

    cliente.write(JSON.stringify('Cliente Pediu dados'), () => {
        console.log(`Solicitando dados a porta ${porta}`);
    });

    
});
