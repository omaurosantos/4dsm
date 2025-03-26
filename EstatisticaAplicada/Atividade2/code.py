import csv
import math
import numpy as np
from datetime import datetime

# Nome do arquivo CSV
caminho_arquivo = 'dados.csv'

# Abrindo o arquivo CSV
with open(caminho_arquivo, 'r', newline='', encoding='utf-8') as arquivo_csv:
    leitor_csv = csv.reader(arquivo_csv, delimiter=';')

    # Lendo o cabeçalho
    cabecalho = next(leitor_csv)

    # Lendo e armazenando os dados
    dados = []
    for linha in leitor_csv:
        try:
            # Convertendo a data para formato datetime e temperatura para float
            data_medicao = datetime.strptime(linha[0], "%Y-%m-%d")
            temperatura = float(linha[1].replace(',', '.'))  # Substituir ',' por '.' caso necessário
            dados.append((data_medicao, temperatura))
        except ValueError:
            print(f"Erro ao processar a linha: {linha}")

# Ordenando os dados por Data Medicao (crescente)
dados.sort()

# Extraindo apenas as temperaturas para análise estatística
temperaturas = [valor for _, valor in dados]

# Passo 1: Calcular o número de classes (i)
n = len(temperaturas)  # Número de observações
i = round(1 + 3.3 * math.log10(n))  # Arredondando para número inteiro

# Passo 2: Calcular o tamanho das classes (h)
AT = max(temperaturas) - min(temperaturas)  # Amplitude total
h = AT / i  # Tamanho das classes

# Criar os intervalos das classes
intervalos = np.linspace(min(temperaturas), max(temperaturas), num=i+1)

# Criar as labels das classes
rotulos_classes = [f'{intervalos[j]:.1f} a {intervalos[j+1]:.1f}' for j in range(len(intervalos)-1)]

# Contar as frequências
frequencias = np.histogram(temperaturas, bins=intervalos)[0]

# Criar a tabela de distribuição de frequência
tabela_freq = list(zip(rotulos_classes, frequencias))

# Responder às perguntas:

# (a) Porcentagem do tempo que a temperatura foi até 20,5°C
percentual_ate_20_5 = (sum(1 for temp in temperaturas if temp <= 20.5) / n) * 100

# (b) Faixa de temperatura mais frequente
faixa_mais_frequente = rotulos_classes[np.argmax(frequencias)]

# (c) Cálculo da média e mediana
temperatura_media = sum(temperaturas) / n
temperatura_mediana = sorted(temperaturas)[n // 2] if n % 2 == 1 else \
    (sorted(temperaturas)[n // 2 - 1] + sorted(temperaturas)[n // 2]) / 2

# Exibir resultados
print("\nTabela de Distribuição de Frequência:")
print(f"{'Intervalo de Temperatura':<20} | {'Frequência':<10}")
print("-" * 35)
for classe, freq in tabela_freq:
    print(f"{classe:<20} | {freq:<10}")

print("\nRespostas:")
print(f"a) Em {percentual_ate_20_5:.2f}% do tempo, a temperatura foi até 20,5°C.")
print(f"b) A faixa de temperatura mais frequente é: {faixa_mais_frequente}.")
print(f"c) Temperatura média: {temperatura_media:.2f}°C")
print(f"   Temperatura mediana: {temperatura_mediana:.2f}°C")
