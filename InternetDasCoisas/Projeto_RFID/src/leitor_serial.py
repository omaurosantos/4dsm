import serial
import time
import psycopg2
from config import postgres_config

# Conecta na porta serial
ser = serial.Serial('COM6', 9600)  # Ajuste a porta conforme seu sistema
time.sleep(2)

# Conexão com o PostgreSQL usando as configurações do arquivo separado
conexao = psycopg2.connect(**postgres_config)
cursor = conexao.cursor()

# Cria a tabela se não existir
while True:
    if ser.in_waiting:
        uid = ser.readline().decode().strip()  # Lê o UID
        print(f"UID recebido: {uid}")

        # Insere o UID no banco de dados
        cursor.execute("INSERT INTO acessos (uid) VALUES (%s)", (uid,))
        conexao.commit()  # Confirma a transação

        # Exibe os dados inseridos
        print(f"Dados inseridos para o UID: {uid}")
