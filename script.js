class CalculadoraData {
    constructor() {
        this.inicializarElementos();
        this.vincularEventos();
    }

    inicializarElementos() {
        this.dataInput = document.getElementById('dataInput');
        this.calcularBtn = document.getElementById('calcularBtn');
        this.resultado = document.getElementById('resultado');
        this.erro = document.getElementById('erro');
        this.mensagemErro = document.getElementById('mensagemErro');

        this.dataOriginal = document.getElementById('dataOriginal');
        this.somaOriginal = document.getElementById('somaOriginal');
        this.anoInvertido = document.getElementById('anoInvertido');
        this.somaFinal = document.getElementById('somaFinal');
        this.primeiraMilhar = document.getElementById('primeiraMilhar');
        this.segundaMilhar = document.getElementById('segundaMilhar');
        this.terceiraMilhar = document.getElementById('terceiraMilhar');
        this.quartaMilhar = document.getElementById('quartaMilhar');
        this.segundaDezena = document.getElementById('segundaDezena');
        this.tabelaBicho = document.getElementById('tabelaBicho');
    }

    vincularEventos() {
        // 🔽 Garantir que o botão existe antes de adicionar o evento
        if (this.calcularBtn) {
            this.calcularBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.calcular();
            });
        }

        // 🔽 Evento também para a tecla Enter
        if (this.dataInput) {
            this.dataInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.calcular();
                }
            });
        }
    }

    calcular() {
        try {
            const dataValue = this.dataInput.value;
            if (!dataValue) {
                throw new Error('Por favor, selecione uma data.');
            }

            // 🔽 CORREÇÃO: Ajusta a data para o fuso horário local
            const [ano, mes, dia] = dataValue.split('-').map(Number);
            const data = new Date(ano, mes - 1, dia);
            
            const diaCorreto = data.getDate();
            const mesCorreto = data.getMonth() + 1;
            const anoCorreto = data.getFullYear();
            const anoDoisDigitos = anoCorreto % 100;

            if (anoCorreto < 1900 || anoCorreto > 2100) {
                throw new Error('Ano deve estar entre 1900 e 2100.');
            }

            const somaOriginal = diaCorreto + mesCorreto + anoDoisDigitos;
            const anoInvertido = this.inverterNumero(anoDoisDigitos);
            const somaFinal = somaOriginal + anoInvertido;

            const primeiraMilhar = parseInt(`${somaOriginal}${somaFinal}`);
            const segundaMilhar = primeiraMilhar * 2;
            const terceiraMilhar = primeiraMilhar + segundaMilhar;

            let quartaMilhar = segundaMilhar + terceiraMilhar;
            if (quartaMilhar > 9999) {
                quartaMilhar = parseInt(quartaMilhar.toString().slice(-4));
            }

            const segundaDezena = this.extrairSegundaDezenaMilhar(quartaMilhar);

            // Pegar apenas os 4 últimos dígitos de cada milhar
            const milhares = [
                this.ultimos4Digitos(primeiraMilhar),
                this.ultimos4Digitos(segundaMilhar),
                this.ultimos4Digitos(terceiraMilhar),
                this.ultimos4Digitos(quartaMilhar)
            ];

            this.exibirResultados({
                dataOriginal: `${diaCorreto.toString().padStart(2, '0')}/${mesCorreto.toString().padStart(2, '0')}/${anoCorreto}`,
                somaOriginal,
                anoOriginal: anoDoisDigitos,
                anoInvertido,
                somaFinal,
                milhares,
                segundaDezena
            });

            this.exibirTabelaBicho(milhares);

        } catch (error) {
            this.exibirErro(error.message);
        }
    }

    inverterNumero(numero) {
        const str = numero.toString().padStart(2, '0');
        return parseInt(str.split('').reverse().join(''));
    }

    extrairSegundaDezenaMilhar(numero) {
        const str = numero.toString().padStart(4, '0');
        return parseInt(str[1]);
    }

    ultimos4Digitos(numero) {
        return parseInt(numero.toString().slice(-4));
    }

    exibirResultados(resultados) {
        this.erro.classList.add('hidden');

        this.dataOriginal.textContent = resultados.dataOriginal;
        this.somaOriginal.textContent = resultados.somaOriginal;
        this.anoInvertido.textContent = `${resultados.anoOriginal} → ${resultados.anoInvertido}`;
        this.somaFinal.textContent = resultados.somaFinal;
        this.primeiraMilhar.textContent = resultados.milhares[0];
        this.segundaMilhar.textContent = resultados.milhares[1];
        this.terceiraMilhar.textContent = resultados.milhares[2];
        this.quartaMilhar.textContent = resultados.milhares[3];
        this.segundaDezena.textContent = resultados.segundaDezena;

        this.resultado.classList.remove('hidden');
        this.tabelaBicho.classList.remove('hidden');
        this.resultado.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    exibirTabelaBicho(milhares) {
        const gruposBicho = [
            { grupo: 1, animal: 'Avestruz', numeros: ['01', '02', '03', '04'] },
            { grupo: 2, animal: 'Águia', numeros: ['05', '06', '07', '08'] },
            { grupo: 3, animal: 'Burro', numeros: ['09', '10', '11', '12'] },
            { grupo: 4, animal: 'Borboleta', numeros: ['13', '14', '15', '16'] },
            { grupo: 5, animal: 'Cachorro', numeros: ['17', '18', '19', '20'] },
            { grupo: 6, animal: 'Cabra', numeros: ['21', '22', '23', '24'] },
            { grupo: 7, animal: 'Carneiro', numeros: ['25', '26', '27', '28'] },
            { grupo: 8, animal: 'Camelo', numeros: ['29', '30', '31', '32'] },
            { grupo: 9, animal: 'Cobra', numeros: ['33', '34', '35', '36'] },
            { grupo: 10, animal: 'Coelho', numeros: ['37', '38', '39', '40'] },
            { grupo: 11, animal: 'Cavalo', numeros: ['41', '42', '43', '44'] },
            { grupo: 12, animal: 'Elefante', numeros: ['45', '46', '47', '48'] },
            { grupo: 13, animal: 'Galo', numeros: ['49', '50', '51', '52'] },
            { grupo: 14, animal: 'Gato', numeros: ['53', '54', '55', '56'] },
            { grupo: 15, animal: 'Jacaré', numeros: ['57', '58', '59', '60'] },
            { grupo: 16, animal: 'Leão', numeros: ['61', '62', '63', '64'] },
            { grupo: 17, animal: 'Macaco', numeros: ['65', '66', '67', '68'] },
            { grupo: 18, animal: 'Porco', numeros: ['69', '70', '71', '72'] },
            { grupo: 19, animal: 'Pavão', numeros: ['73', '74', '75', '76'] },
            { grupo: 20, animal: 'Peru', numeros: ['77', '78', '79', '80'] },
            { grupo: 21, animal: 'Touro', numeros: ['81', '82', '83', '84'] },
            { grupo: 22, animal: 'Tigre', numeros: ['85', '86', '87', '88'] },
            { grupo: 23, animal: 'Urso', numeros: ['89', '90', '91', '92'] },
            { grupo: 24, animal: 'Veado', numeros: ['93', '94', '95', '96'] },
            { grupo: 25, animal: 'Vaca', numeros: ['97', '98', '99', '00'] }
        ];

        let tabelaHTML = '';

        milhares.forEach((milhar, index) => {
            const numero = milhar.toString().slice(-2).padStart(2, '0');
            const grupo = gruposBicho.find(g => g.numeros.includes(numero));
            
            if (grupo) {
                tabelaHTML += `
                    <tr>
                        <td><span class="premio-icon">🎖️</span> ${index + 1}º Prêmio</td>
                        <td><span class="numero-badge">${numero}</span></td>
                        <td><span class="grupo-badge">${grupo.grupo}</span></td>
                        <td><span class="animal-name">${grupo.animal}</span></td>
                    </tr>
                `;
            }
        });

        document.getElementById('tabelaCorpo').innerHTML = tabelaHTML;
    }

    exibirErro(mensagem) {
        this.resultado.classList.add('hidden');
        this.tabelaBicho.classList.add('hidden');
        this.mensagemErro.textContent = mensagem;
        this.erro.classList.remove('hidden');
        this.dataInput.focus();
    }
}

// 🔽 Inicializa quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', () => {
    new CalculadoraData();
});