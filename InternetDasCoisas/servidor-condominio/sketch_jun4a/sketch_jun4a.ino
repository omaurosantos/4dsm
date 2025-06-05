#include <SPI.h>
#include <MFRC522.h>
#include <SoftwareSerial.h>

// Pinos RFID
#define SS_PIN 10
#define RST_PIN 9

// Pinos Touch
#define TOUCH1 5
#define TOUCH2 6
#define TOUCH3 7
#define TOUCH4 8

MFRC522 mfrc522(SS_PIN, RST_PIN);

// Comunicação com ESP-01
SoftwareSerial espSerial(2, 3); // RX, TX do Arduino (conectado TX, RX do ESP-01)

// Dados WiFi - altere para sua rede
const char* ssid = "Mauro";
const char* password = "mhhx9428)";

// UID autorizado (TAG)
String uidAutorizado = "E9 1B 71 8B";

// Senha correta
const int senhaCorreta[4] = {1, 2, 3, 4};
int entradaUsuario[4];
int posicao = 0;

// Função para enviar comando AT e aguardar resposta
bool enviarComando(const char* cmd, const char* esperado, unsigned long timeout) {
  espSerial.println(cmd);
  unsigned long inicio = millis();
  String resposta = "";
  while (millis() - inicio < timeout) {
    while (espSerial.available()) {
      char c = espSerial.read();
      resposta += c;
    }
    if (resposta.indexOf(esperado) != -1) {
      Serial.println("Resposta OK para: " + String(cmd));
      return true;
    }
    if (resposta.indexOf("ERROR") != -1) {
      Serial.println("Resposta ERROR para: " + String(cmd));
      return false;
    }
  }
  Serial.println("Timeout para comando: " + String(cmd));
  return false;
}

void limparBuffer() {
  while (espSerial.available()) espSerial.read();
}

void conectarWiFi() {
  Serial.println("Configurando modo Station...");
  enviarComando("AT+CWMODE=1", "OK", 2000);

  limparBuffer();

  String cmd = "AT+CWJAP=\"" + String(ssid) + "\",\"" + String(password) + "\"";
  Serial.println("Conectando WiFi...");
  if (enviarComando(cmd.c_str(), "WIFI CONNECTED", 10000)) {
    Serial.println("WiFi conectado!");
  } else {
    Serial.println("Falha na conexão WiFi");
  }
}

// Função para enviar dados ao servidor via HTTP POST
void enviarDadosHTTP(String dados) {
  String ip = "192.168.86.250";  // IP do servidor - ajuste para o seu
  int porta = 3000;               // Porta do servidor - ajuste se necessário

  String cmd = "AT+CIPSTART=\"TCP\",\"" + ip + "\"," + String(porta);
  Serial.println("Abrindo conexão TCP...");
  if (!enviarComando(cmd.c_str(), "OK", 5000)) {
    Serial.println("Falha na conexão TCP");
    return;
  }

  // Montar requisição HTTP POST
  String httpRequest = "POST /log HTTP/1.1\r\n";
  httpRequest += "Host: " + ip + "\r\n";
  httpRequest += "Content-Type: application/x-www-form-urlencoded\r\n";
  httpRequest += "Content-Length: " + String(dados.length()) + "\r\n\r\n";
  httpRequest += dados;

  cmd = "AT+CIPSEND=" + String(httpRequest.length());
  Serial.println("Enviando dados HTTP...");
  if (enviarComando(cmd.c_str(), ">", 2000)) {
    espSerial.print(httpRequest);
    Serial.println("Requisição HTTP enviada");
  } else {
    Serial.println("Falha ao enviar comando CIPSEND");
    enviarComando("AT+CIPCLOSE", "OK", 3000); // fecha conexão no erro
    return;
  }

  delay(2000); // aguardar envio

  enviarComando("AT+CIPCLOSE", "OK", 3000);
}

void setup() {
  Serial.begin(9600);
  espSerial.begin(9600);

  SPI.begin();
  mfrc522.PCD_Init();

  pinMode(TOUCH1, INPUT);
  pinMode(TOUCH2, INPUT);
  pinMode(TOUCH3, INPUT);
  pinMode(TOUCH4, INPUT);

  Serial.println("Sistema iniciado: RFID + Senha Touch + WiFi");

  delay(1000);
  limparBuffer();

  if (!enviarComando("AT", "OK", 2000)) {
    Serial.println("Erro na comunicação com ESP-01");
    while (1); // trava aqui
  }

  conectarWiFi();
}

void loop() {
  verificarToque();
  verificarCartao();
  delay(50);
}

void verificarToque() {
  if (digitalRead(TOUCH1) == HIGH) registrarToque(1, TOUCH1);
  if (digitalRead(TOUCH2) == HIGH) registrarToque(2, TOUCH2);
  if (digitalRead(TOUCH3) == HIGH) registrarToque(3, TOUCH3);
  if (digitalRead(TOUCH4) == HIGH) registrarToque(4, TOUCH4);
}

void registrarToque(int valor, int pino) {
  while (digitalRead(pino) == HIGH); // espera soltar o botão
  delay(100); // debounce

  entradaUsuario[posicao] = valor;
  Serial.print("Toque ");
  Serial.println(valor);
  posicao++;

  if (posicao == 4) {
    verificarSenha();
    posicao = 0; // reinicia entrada
  }
}

void verificarSenha() {
  Serial.print("Senha digitada: ");
  for (int i = 0; i < 4; i++) {
    Serial.print(entradaUsuario[i]);
    Serial.print(" ");
  }
  Serial.println();

  bool correta = true;
  for (int i = 0; i < 4; i++) {
    if (entradaUsuario[i] != senhaCorreta[i]) {
      correta = false;
      break;
    }
  }

  if (correta) {
    Serial.println("Senha correta! Entrada autorizada.");

    // Envia dados ao servidor (exemplo: tipo=senha&valor=1234)
    String dados = "tipo=senha&valor=";
    for (int i = 0; i < 4; i++) {
      dados += String(entradaUsuario[i]);
    }
    enviarDadosHTTP(dados);
  } else {
    Serial.println("Senha incorreta. Acesso negado.");
  }
}

void verificarCartao() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) return;

  String uidLido = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) uidLido += "0";
    uidLido += String(mfrc522.uid.uidByte[i], HEX);
    if (i < mfrc522.uid.size - 1) uidLido += " ";
  }
  uidLido.toUpperCase();

  Serial.print("UID lido: ");
  Serial.println(uidLido);

  if (uidLido == uidAutorizado) {
    Serial.println("TAG autorizada! Entrada liberada.");

    // Envia dados ao servidor (exemplo: tipo=rfid&uid=E9 1B 71 8B)
    String dados = "tipo=rfid&uid=" + uidLido;
    enviarDadosHTTP(dados);
  } else {
    Serial.println("Cartão não autorizado. Acesso negado.");
  }

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
}
