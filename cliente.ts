import * as net from 'net';

const array: string[] = [];
const portas: number[] = [3000, 3001, 3002];

function solicitaDadosBancadas(){
    portas.forEach(porta => {
        const cliente: net.Socket = net.createConnection({
            host: 'localhost',
            port: porta
        });
    
        cliente.on('data', (mensagem: Buffer) => {
            const dados = JSON.parse(mensagem.toString());
            array.push(dados);
            console.log(` Dados recebidos da bancada (porta ${porta}):\n- Temperatura: ${dados.temperatura}\n- Umidade: ${dados.umidade}\n- Condutividade: ${dados.condutividade}
            `);

            cliente.end();
        
            if(array.length === portas.length){
                EnivarDadosParaServidor();
            }
        });
        
    
        cliente.write(JSON.stringify(array));
    
        cliente.on('error', () => {
            console.error(`Servidor ${porta} encerrou a atividade...`);
            cliente.on('close', () => { })
        });
    
        cliente.write(JSON.stringify("Cliente Pediu dados"), () => {
            console.log(`Solicitando dados a porta ${porta}`);
        });
        
    });
}


function EnivarDadosParaServidor(){
    const servico: net.Socket = net.createConnection({
        host: 'localhost',
        port: 3003
    });

    servico.on('data',(mensagem: Buffer)=>{
        console.log(`Resposta do Servidor Central: ${mensagem.toString()}`);
        servico.end();
    })

    servico.write(JSON.stringify(array));
}

solicitaDadosBancadas()