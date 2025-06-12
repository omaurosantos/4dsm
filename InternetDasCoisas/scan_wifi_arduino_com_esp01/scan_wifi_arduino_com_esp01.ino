#include <SoftwareSerial.h>

// Configure os pinos para a comunicação com o ESP-01
// RX do Arduino (conectado ao TX do ESP-01)
// TX do Arduino (conectado ao RX do ESP-01 através do divisor de tensão)
SoftwareSerial espSerial(2, 3); // RX, TX

void setup() {
  Serial.begin(9600);     // Inicia a comunicação serial com o computador
  espSerial.begin(9600); // <<--- IMPORTANTE! Deve ser 9600 bps

  Serial.println("Iniciando ESP-01...");

  delay(1000); // Pequeno delay para o ESP-01 inicializar

  // Limpa qualquer lixo que possa estar no buffer do ESP-01
  while (espSerial.available()) {
    espSerial.read();
  }

  Serial.println("Configurando modo Station (AT+CWMODE=1)...");
  espSerial.println("AT+CWMODE=1");

  String response = "";
  long startTime = millis();
  while(millis() - startTime < 3000) { // Aguarda até 3s pela resposta
    if (espSerial.available()) {
      response += (char)espSerial.read();
    }
  }
  Serial.print("Resposta do ESP-01 para CWMODE: ");
  Serial.println(response);

  if (response.indexOf("OK") != -1) {
    Serial.println("Modo Station configurado com sucesso.");
  } else if (response.indexOf("no change") != -1) {
    Serial.println("Modo Station já estava configurado.");
  }
  else {
    Serial.println("Falha ao configurar modo Station. Verifique a resposta acima.");
    Serial.println("O sketch pode não funcionar corretamente.");
    // Não continue se o modo não puder ser configurado.
    // while(1); // Opcional: travar aqui se preferir
  }

  delay(1000);

  // Limpa o buffer novamente antes de escanear
  response = "";
  while (espSerial.available()) {
    espSerial.read();
  }

  Serial.println("Escaneando redes Wi-Fi (AT+CWLAP)...");
  espSerial.println("AT+CWLAP");

  // Aguarda e lê a resposta do ESP-01
  // Aumente o timeout se necessário para redes com muitas APs ou resposta lenta
  response = ""; // Reseta a string de resposta
  startTime = millis();
  // O ESP pode demorar um pouco para listar todas as redes
  while (millis() - startTime < 15000) { // Timeout de 15 segundos para o scan
    if (espSerial.available()) {
      response += (char)espSerial.read();
    }
  }

  Serial.println("--- Resposta Bruta do CWLAP ---");
  Serial.println(response);
  Serial.println("--- Fim da Resposta Bruta ---");

  if (response.indexOf("+CWLAP:") != -1 && response.indexOf("OK") != -1) {
    Serial.println("\nRedes encontradas! (Veja acima)");
  } else if (response.indexOf("+CWLAP:") != -1 && response.indexOf("OK") == -1) {
    Serial.println("\nLista de redes recebida, mas o 'OK' final pode ter sido perdido ou demorado demais.");
    Serial.println("Verifique a lista acima.");
  }
  else if (response.indexOf("ERROR") != -1) {
    Serial.println("\nO ESP-01 retornou um ERRO ao tentar escanear as redes.");
  }
  else if (response.length() == 0) {
    Serial.println("\nNenhuma resposta do ESP-01 para o comando de scan.");
  }
  else {
    Serial.println("\nResposta do scan não parece conter redes ou terminou inesperadamente.");
    Serial.println("Verifique a 'Resposta Bruta' acima.");
  }
  Serial.println("\nEscaneamento concluído (ou timeout).");
}

void loop() {
  // Opcional: encaminhar comandos do Serial Monitor para o ESP-01 para debug
  // if (Serial.available()) {
  //   espSerial.write(Serial.read());
  // }
  // if (espSerial.available()) {
  //   Serial.write(espSerial.read());
  // }
}