# 📦 Como acessar o banco MySQL do Azure via CMD (Windows)

Este tutorial mostra como acessar um banco de dados MySQL hospedado no Azure diretamente pelo prompt de comando do Windows.

---

## ✅ Pré-requisitos

- Acesso ao terminal (CMD)
- Conexão com a internet
- Permissões no firewall do Azure para o seu IP

---

## 🚀 Passo a passo

### 1️⃣ Instale o MySQL Client

Você pode baixar o MySQL Installer no site oficial:

🔗 [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)

Durante a instalação, **selecione apenas o "MySQL Command Line Client"** se quiser algo leve. Certifique-se de marcar a opção para **adicionar ao PATH**.

---

### 2️⃣ Crie a pasta de certificados

Abra o Explorador de Arquivos e crie a seguinte pasta:

C:\certs

---

### 3️⃣ Baixe o certificado da DigiCert

Abra o CMD e cole o seguinte comando para baixar o certificado:

```cmd
curl -O https://www.digicert.com/CACerts/DigiCertGlobalRootCA.crt.pem
```

Isso irá baixar o arquivo DigiCertGlobalRootCA.crt.pem dentro da pasta atual. Certifique-se de estar dentro da pasta C:\certs antes de executar.

---

### 4️⃣ Acesse o banco de dados via CMD

```cmd
    mysql -h db-floatdata-prod.mysql.database.azure.com -u floatData -p --ssl-mode=REQUIRED
```

---

### 5️⃣ (Opcional) Automatize com um arquivo conectar-db.bat

```cmd
    @echo off
    mysql -h db-floatdata-prod.mysql.database.azure.com -u floatData -p --ssl-mode=REQUIRED
```