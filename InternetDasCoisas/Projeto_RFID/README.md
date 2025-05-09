# Sistema de Controle de Acesso com RFID + Senha

Este projeto foi desenvolvido como parte da **Prova 2 da disciplina de IoT** no curso de **Desenvolvimento de Software Multiplataforma (4º semestre)** da **FATEC Jacareí**.

---

## 💡 Sobre o Projeto

Criamos um sistema de controle de acesso utilizando:

- **Arduino UNO**
- **Sensor RFID MFRC522**
- **Microservo (simulando uma cancela)**
- **Sensor Touch (teclado de 4 botões para senha)**
- **Banco de dados PostgreSQL**
- **Python para leitura e inserção dos dados**

O objetivo foi permitir o acesso ao sistema por meio de um **cartão RFID válido** ou pela **digitação de uma senha correta**.

---

## 🎯 Objetivo da Apresentação

Apresentamos o projeto durante um dos intervalos da faculdade com a intenção de:
- Divulgar o nosso curso para os demais alunos.
- Motivar os estudantes dos semestres iniciais.
- Demonstrar, na prática, o que é possível desenvolver ao longo da graduação.

---

## ⚙️ Tecnologias Utilizadas

- **Arduino C/C++**
- **Bibliotecas:**
  - `MFRC522`
  - `SPI`
  - `Servo`
- **Python**
  - `psycopg2` para conexão com o PostgreSQL
  - `pyserial` para comunicação serial
- **PostgreSQL** para registro dos acessos

---

## 🔒 Segurança

As **credenciais do banco de dados PostgreSQL** são armazenadas em um arquivo separado (`config.py`), que **não é versionado no repositório**, garantindo maior segurança.

---

## 📂 Estrutura do Projeto

📁 projeto-rfid

├── 📁 src <br>
│   ├── 📄 main.py          → Código Python que conecta ao Arduino e insere dados no banco <br>
│   ├── 📄 config.py        → Credenciais do banco <br>
│   ├── 📄 leitor_rfid.ino  → Código Arduino que faz leitura do cartão e senha <br>
│   └── 📄 .gitignore       → Arquivos a serem ignorados pelo Git <br>
└── 📄 README.md            → Este documento

---

## 🤝 Créditos
| Nome | GitHub | LinkedIn |
| :-: | :-: | :-: |
|André Flávio de Olivera|[![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/andreflavio)| [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/andr%C3%A9fl%C3%A1vio/)|
|Mauro do Prado Santos|[![GitHub Badge](https://img.shields.io/badge/GitHub-111217?style=flat-square&logo=github&logoColor=white)](https://github.com/omaurosantos)| [![Linkedin Badge](https://img.shields.io/badge/Linkedin-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/mauro-do-prado-santos-350b2720a/) |

Disciplina: Internet das Coisas (IoT)

Professor: Henrique Duarte Borges Louro
