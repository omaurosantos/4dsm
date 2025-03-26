# Análise de Temperaturas 📊

Este projeto processa um arquivo CSV contendo medições de temperatura e gera uma tabela de distribuição de frequência, além de responder algumas perguntas estatísticas.

## Enunciado
Fornecer uma tabela de distribuição de frequência para os dados contínuos de temperatura que estão no CSV na pasta arquivos do canal geral. Para isso, utilize:

- O número de classes dado pela fórmula i = 1 + 3.3*log n

- O tamanho das classes dado pela fórmula h = AT/i

Baseado na tabela de distribuição de frequência, responda:

- a) Em qual porcentagem do tempo a temperatura tem até 20,5°C? 
- b) Qual a faixa de temperatura mais frequente? 
- c) Com base na sua tabela de distribuição de frequência, calcule a temperatura média e mediana.

## 📂 Estrutura do Projeto
- `dados.csv` → Arquivo de entrada com os dados de temperatura.
- `code.py` → Código que processa o CSV e gera os resultados.
- `requirements.txt` → Lista de dependências necessárias.

## 🚀 Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/omaurosantos/4dsm.git
cd 4dsm
cd EstatisticaAplicada
cd Atividade2
```
### 2️⃣ Instalar Dependências
```bash
pip install -r requirements.txt
```

### 3️⃣ Executar o script
```bash
python code.py
```
