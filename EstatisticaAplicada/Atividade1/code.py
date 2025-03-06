import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Lê um arquivo .CSV e o transforma em um DataFrame, ignorando colunas extras
dados = pd.read_csv('dados.csv', delimiter=';', decimal=',', skipinitialspace=True, usecols=[0, 1])

# Remove espaços extras dos nomes das colunas
dados.columns = [col.strip() for col in dados.columns]

# Renomeia a coluna de temperatura se ela existir no DataFrame
colunas_renomeacao = {
    'TEMPERATURA MEDIA': 'Temperatura Media',
    'TEMPERATURA MEDIA, DIARIA (AUT)(°C)': 'Temperatura Media'
}

for nome_original, nome_novo in colunas_renomeacao.items():
    if nome_original in dados.columns:
        dados = dados.rename(columns={nome_original: nome_novo})
        break

# Verifica se a coluna 'Temperatura Media' está presente
if 'Temperatura Media' not in dados.columns:
    raise KeyError("A coluna 'Temperatura Media' não foi encontrada. Verifique o nome correto no CSV.")

# Converte a coluna 'Data Medicao' para o formato datetime
dados['Data Medicao'] = pd.to_datetime(dados['Data Medicao'], format='%Y-%m-%d').dt.strftime('%d/%m/%Y')

# Converte a coluna 'Temperatura Media' para inteiros
dados['Temperatura Media'] = dados['Temperatura Media'].astype(int)

# Cálculo estatístico
media = dados['Temperatura Media'].mean()
moda = dados['Temperatura Media'].mode()[0]
mediana = dados['Temperatura Media'].median()
variancia = dados['Temperatura Media'].var()
desvio_padrao = dados['Temperatura Media'].std()
primeiro_quartil = dados['Temperatura Media'].quantile(0.25)
segundo_quartil = dados['Temperatura Media'].quantile(0.50)
terceiro_quartil = dados['Temperatura Media'].quantile(0.75)
percentil_5 = dados['Temperatura Media'].quantile(0.05)
percentil_95 = dados['Temperatura Media'].quantile(0.95)

# Cálculo do intervalo interquartil (IQR) e outliers
iqr = terceiro_quartil - primeiro_quartil
limite_inferior = primeiro_quartil - 1.5 * iqr
limite_superior = terceiro_quartil + 1.5 * iqr
outliers = dados[(dados['Temperatura Media'] < limite_inferior) | (dados['Temperatura Media'] > limite_superior)]

# Criando e salvando o gráfico de Box Plot
plt.figure(figsize=(8, 5))
sns.boxplot(y=dados['Temperatura Media'], color='skyblue')
plt.title("Box Plot - Temperatura Média")
plt.ylabel("Temperatura Média (°C)")
plt.grid(True, linestyle="--", alpha=0.7)
plt.savefig("boxplot_temperatura.png")  # Salva o gráfico como imagem
plt.show()

# Criando o relatório
relatorio = f"""RELATÓRIO ESTATÍSTICO - TEMPERATURA MÉDIA

1. Média, Moda e Mediana:
   - Média: {media:.2f}°C
   - Moda: {moda:.2f}°C
   - Mediana: {mediana:.2f}°C

   * A média indica a temperatura média registrada. 
   * A moda mostra o valor que mais se repetiu.
   * A mediana representa o ponto central dos dados.

2. Variância e Desvio Padrão:
   - Variância: {variancia:.2f}
   - Desvio Padrão: {desvio_padrao:.2f}

   * A variância mede o quanto os dados se espalham em torno da média.
   * O desvio padrão indica a dispersão dos valores em relação à média.

3. Quartis:
   - 1º Quartil (Q1): {primeiro_quartil:.2f}°C
   - 2º Quartil (Mediana/Q2): {segundo_quartil:.2f}°C
   - 3º Quartil (Q3): {terceiro_quartil:.2f}°C

   * Q1: 25% dos dados estão abaixo deste valor.
   * Q2: Mediana, ou ponto central dos dados.
   * Q3: 75% dos dados estão abaixo deste valor.

4. Percentis 5 e 95:
   - Percentil 5: {percentil_5:.2f}°C
   - Percentil 95: {percentil_95:.2f}°C

   * O percentil 5 representa o limite inferior dos dados, excluindo valores extremos.
   * O percentil 95 mostra a faixa superior da distribuição.

5. Outliers Identificados:
   - Limite Inferior: {limite_inferior:.2f}°C
   - Limite Superior: {limite_superior:.2f}°C
   - Número de Outliers: {len(outliers)}

   * Outliers são valores que se distanciam muito do restante dos dados.
   * Esses valores podem ser erros ou eventos climáticos atípicos.

6. Análise do Box Plot:
   - A linha dentro da caixa representa a mediana.
   - As extremidades da caixa representam Q1 e Q3.
   - Os "bigodes" mostram o intervalo sem outliers.
   - Pontos fora dos "bigodes" são outliers.

   * Se a mediana estiver mais próxima do Q1 ou Q3, indica assimetria na distribuição.
   * A presença de muitos outliers pode indicar anomalias nos dados.

Gráfico de Box Plot salvo como 'boxplot_temperatura.png'.
"""

# Salva o relatório em um arquivo .txt
with open("relatorio_temperatura.txt", "w", encoding="utf-8") as arquivo:
    arquivo.write(relatorio)

# Exibe mensagem de conclusão
print("\nRelatório gerado com sucesso! Arquivo salvo como 'relatorio_temperatura.txt'.")
print("O gráfico de Box Plot foi salvo como 'boxplot_temperatura.png'.")
