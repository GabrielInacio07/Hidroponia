import * as net from 'net';

interface Hidroponia {
    temperatura: number;
    umidade: number;
    condutividade: number;
}

function calcularMedias(array: Hidroponia[]) {
    const total = array.length;
    const soma = array.reduce((acc, item) => {
        acc.temperatura += item.temperatura;
        acc.umidade += item.umidade;
        acc.condutividade += item.condutividade;
        return acc;
    }, { temperatura: 0, umidade: 0, condutividade: 0 });

    return {
        temperatura: Number((soma.temperatura / total).toFixed(2)),
        umidade: Number((soma.umidade / total).toFixed(2)),
        condutividade: Number((soma.condutividade / total).toFixed(2))
    };
}

function calcularMediana(array: Hidroponia[]) {
    const getMediana = (valores: number[]) => {
        valores.sort((a, b) => a - b);
        const meio = Math.floor(valores.length / 2);
        if (valores.length % 2 === 0) {
            return Number(((valores[meio - 1] + valores[meio]) / 2).toFixed(2));
        } else {
            return valores[meio];
        }
    };

    const temperaturas = array.map(item => item.temperatura);
    const umidades = array.map(item => item.umidade);
    const condutividades = array.map(item => item.condutividade);

    return {
        temperatura: getMediana(temperaturas),
        umidade: getMediana(umidades),
        condutividade: getMediana(condutividades)
    };
}

const porta = 3003;

const server = net.createServer((socket) => {
    socket.on('data', (mensagem: Buffer) => {
        const dadosRecebidos: Hidroponia[] = JSON.parse(mensagem.toString());

        const medias = calcularMedias(dadosRecebidos);
        const medianas = calcularMediana(dadosRecebidos);

        const resultado = `
 Médias:
- Temperatura: ${medias.temperatura}
- Umidade: ${medias.umidade}
- Condutividade: ${medias.condutividade}

 Medianas:
- Temperatura: ${medianas.temperatura}
- Umidade: ${medianas.umidade}
- Condutividade: ${medianas.condutividade}
`;

        socket.write(resultado, () => {
            socket.end();
        });
    });
});

server.listen(porta, () => {
    console.log(`Servidor Central rodando na porta: ${porta}`);
});
