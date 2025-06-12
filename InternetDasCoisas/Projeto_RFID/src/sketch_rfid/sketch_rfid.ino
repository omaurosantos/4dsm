#include <Servo.h>
#include <SPI.h>
#include <MFRC522.h>

// ----- PINOS -----
#define SS_PIN 10
#define RST_PIN 9
#define SERVO_PIN 3

#define TOUCH_1 4
#define TOUCH_2 5
#define TOUCH_3 6
#define TOUCH_4 7

// ----- OBJETOS -----
MFRC522 rfid(SS_PIN, RST_PIN);
Servo servo;

// ----- DADOS -----
String validUIDs[] = {
  "32 5B 03 10",
  "E9 1B 71 8B"
};

const int senhaCorreta[4] = {1, 3, 2, 4};
int entradaUsuario[4];
int posicao = 0;

void setup() {
  Serial.begin(9600);

  // Inicializa RFID
  SPI.begin();
  rfid.PCD_Init();

  // Inicializa Servo
  servo.attach(SERVO_PIN);
  servo.write(70); // Porta fechada

  // Inicializa entradas do teclado
  pinMode(TOUCH_1, INPUT);
  pinMode(TOUCH_2, INPUT);
  pinMode(TOUCH_3, INPUT);
  pinMode(TOUCH_4, INPUT);

  Serial.println("Sistema iniciado. Use cartão RFID ou senha.");
}

void loop() {
  verificarCartao();
  verificarTeclado();
  delay(100);
}

// ----- FUNÇÃO RFID -----
void verificarCartao() {
  if (!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()) return;

  String uidLido = "";
  for (byte i = 0; i < rfid.uid.size; i++) {
    if (rfid.uid.uidByte[i] < 0x10) uidLido += "0";
    uidLido += String(rfid.uid.uidByte[i], HEX);
    if (i < rfid.uid.size - 1) uidLido += " ";
  }
  uidLido.toUpperCase();

  Serial.print("Cartão detectado: ");
  Serial.println(uidLido);

  for (String uid : validUIDs) {
    if (uidLido == uid) {
      Serial.println("Cartão autorizado! Abrindo porta...");
      abrirPorta();
      break;
    }
  }

  rfid.PICC_HaltA();
  rfid.PCD_StopCrypto1();
}

// ----- FUNÇÃO TECLADO -----
void verificarTeclado() {
  if (digitalRead(TOUCH_1) == HIGH) registrarToque(1, TOUCH_1);
  if (digitalRead(TOUCH_2) == HIGH) registrarToque(2, TOUCH_2);
  if (digitalRead(TOUCH_3) == HIGH) registrarToque(3, TOUCH_3);
  if (digitalRead(TOUCH_4) == HIGH) registrarToque(4, TOUCH_4);
}

void registrarToque(int valor, int pino) {
  while (digitalRead(pino) == HIGH); // Espera soltar o botão

  entradaUsuario[posicao] = valor;
  Serial.print("Botão pressionado: ");
  Serial.println(valor);
  posicao++;

  if (posicao == 4) {
    verificarSenha();
    posicao = 0;
  }
}

void verificarSenha() {
  Serial.print("Você digitou: ");
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
    Serial.println("Senha correta! Abrindo porta...");
    abrirPorta();
  } else {
    Serial.println("Senha incorreta!");
  }
}

void abrirPorta() {
  servo.write(160); // Abre
  delay(3000);
  servo.write(70);  // Fecha
  Serial.println("Porta trancada.");
}
