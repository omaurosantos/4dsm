#include <SoftwareSerial.h>

// --- Configurações do Usuário ---
const char* SSID = "Mauro"; 
const char* PASSWORD = "mhhx9428)"; 

const char* MQTT_BROKER = "broker.hivemq.com";
const int MQTT_PORT = 1883;
const char* MQTT_CLIENT_ID = "meuESP01ClientGemini123"; 
const char* MQTT_PUB_TOPIC = "gemini/esp01/test";
const char* MQTT_MESSAGE = "Ola MQTT do ESP01 via Gemini!";
// --- Fim das Configurações ---

SoftwareSerial espSerial(2, 3); 

// Função para enviar comandos AT e esperar por uma resposta específica
// Retorna true se a resposta esperada (ou "OK") for encontrada, false caso contrário.
bool sendATCommand(const String& command, const int timeout, const String& expectedResponse1, const String& expectedResponse2 = "") {
  // Usar F() para strings de debug dentro da função
  Serial.print(F("DEBUG: sendATCommand INICIOU. Comando: '")); 
  Serial.print(command);                                  
  Serial.println(F("'"));                                    

  String response = "";
  bool foundExpected1 = false;
  bool foundExpected2 = false;
  bool foundOK = false;
  bool foundError = false;

  Serial.println(F("DEBUG: sendATCommand - Limpando buffer espSerial..."));
  while(espSerial.available()) {
    espSerial.read();
    delay(1); 
  }
  Serial.println(F("DEBUG: sendATCommand - Buffer espSerial limpo."));
  
  Serial.print(F("Enviando COMANDO AT: "));
  Serial.println(command);
  espSerial.println(command);
  Serial.println(F("DEBUG: sendATCommand - Comando enviado para espSerial."));

  long int startTime = millis();
  Serial.println(F("DEBUG: sendATCommand - Iniciando loop de espera por resposta..."));
  while ((millis() - startTime) < timeout) {
    while (espSerial.available()) {
      char c = espSerial.read();
      response += c;
    }
    if (!foundExpected1 && response.indexOf(expectedResponse1) != -1) {
      foundExpected1 = true;
    }
    if (expectedResponse2 != "" && !foundExpected2 && response.indexOf(expectedResponse2) != -1) {
      foundExpected2 = true;
    }
    if (!foundOK && response.indexOf(F("OK")) != -1) { // Usar F() para "OK" e "ERROR" se possível, mas indexOf em String não aceita F() diretamente
      foundOK = true;
    }
    if (!foundError && response.indexOf(F("ERROR")) != -1) {
      foundError = true;
      break; 
    }
    if (foundExpected1) break;
    if (expectedResponse2 != "" && foundExpected2) break;
    // Ajuste: Se expectedResponse1 ou 2 for "OK", foundOK já cobriria.
    if (foundOK && (expectedResponse1 == "OK" || (expectedResponse2 != "" && expectedResponse2 == "OK") || (expectedResponse1 != "OK" && (expectedResponse2 == "" || expectedResponse2 != "OK")) ) ) break;

  } 
  Serial.println(F("DEBUG: sendATCommand - Loop de espera por resposta CONCLUÍDO."));
  
  Serial.print(F("Resposta ESP: ["));
  if (response.length() > 250) {
    Serial.print(response.substring(0, 250));
    Serial.print(F("... (resposta truncada para display)"));
  } else {
    Serial.print(response);
  }
  Serial.println(F("]"));

  if (foundError) {
    Serial.println(F(">>> ERRO encontrado na resposta!"));
    return false;
  }
  if (foundExpected1) {
    Serial.print(F(">>> Resposta esperada 1 ('"));
    Serial.print(expectedResponse1);
    Serial.println(F("') encontrada!"));
    return true;
  }
  if (expectedResponse2 != "" && foundExpected2) {
    Serial.print(F(">>> Resposta esperada 2 ('"));
    Serial.print(expectedResponse2);
    Serial.println(F("') encontrada!"));
    return true;
  }
  if (foundOK) {
    Serial.println(F(">>> 'OK' encontrado."));
    return true;
  }
  
  if (response.length() > 0) {
    Serial.println(F(">>> Resposta inesperada ou timeout sem confirmação clara."));
  } else {
    Serial.println(F(">>> Nenhuma resposta (timeout)."));
  }
  return false; 
}

void setup() {
  Serial.begin(9600);
  Serial.println(F("DEBUG: setup() - Serial com computador iniciado.")); 

  Serial.println(F("DEBUG: setup() - Tentando iniciar espSerial (SoftwareSerial)...")); 
  espSerial.begin(9600); 
  Serial.println(F("DEBUG: setup() - espSerial iniciado (ou tentativa concluída).")); 

  Serial.println(F("Iniciando ESP-01 para teste MQTT..."));
  delay(2000); 
  Serial.println(F("DEBUG: setup() - Delay de 2 segundos concluído.")); 

  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand('AT', ...)")); 
  // Para indexOf, "OK" e "ERROR" precisam ser Strings normais ou char* se a 'response' for String.
  // Se 'response' fosse um char array, poderíamos usar strstr com PSTR().
  // Por enquanto, deixaremos "OK" e "ERROR" como Strings normais para indexOf.
  if (!sendATCommand(F("AT"), 2000, F("OK"))) { 
    Serial.println(F("Falha na comunicação básica com ESP-01."));
    while(1); 
  }
  Serial.println(F("Comunicação AT OK."));

  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand('AT+CWMODE=1', ...)"));
  if (!sendATCommand(F("AT+CWMODE=1"), 3000, F("OK"), F("no change"))) {
    Serial.println(F("Falha ao configurar modo Station."));
    while(1); 
  }
  Serial.println(F("Modo Station configurado."));

  Serial.print(F("Conectando ao Wi-Fi: "));
  Serial.println(SSID); // SSID e PASSWORD são const char*, não precisam de F() aqui
  
  // Construir cmdConnectWIFI com F() para as partes literais não é direto com String.
  // Vamos manter a concatenação de String por enquanto, mas ela contribui para o uso de RAM.
  String cmdConnectWIFI = F("AT+CWJAP=\""); // Usar F() aqui ajuda um pouco
  cmdConnectWIFI += SSID;
  cmdConnectWIFI += F("\",\"");
  cmdConnectWIFI += PASSWORD;
  cmdConnectWIFI += F("\"");

  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand para CWJAP..."));
  if (!sendATCommand(cmdConnectWIFI, 25000, F("WIFI GOT IP"), F("OK"))) { 
    Serial.println(F("Falha ao conectar ao Wi-Fi. Verifique SSID/Senha ou sinal."));
    while(1);
  }
  Serial.println(F("Conectado ao Wi-Fi com sucesso!"));
  delay(1000);

  Serial.println(F("\nVerificando versão do Firmware (AT+GMR)..."));
  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand para GMR..."));
  sendATCommand(F("AT+GMR"), 5000, F("AT version")); 
  delay(1000);

  Serial.println(F("Configurando MQTT UserCFG..."));
  char cmdMqttUserCfgBuffer[150]; 
  // Usar PSTR para strings de formato em sprintf se o compilador suportar (AVR-GCC geralmente suporta)
  int charsWritten = sprintf_P(cmdMqttUserCfgBuffer, PSTR("AT+MQTTUSERCFG=0,1,\"%s\",\"\",\"\",0,0,\"\""), MQTT_CLIENT_ID);

  if (charsWritten < 0 || charsWritten >= 150) {
      Serial.println(F("ERRO: Falha ao construir a string do comando MQTTUSERCFG com sprintf!"));
      while(1);
  }
  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand para MQTTUSERCFG..."));
  if (!sendATCommand(cmdMqttUserCfgBuffer, 5000, F("OK"))) {
    Serial.println(F("Falha ao configurar MQTTUSERCFG."));
    Serial.println(F("Verifique a versão do firmware impressa acima (AT+GMR)."));
    while(1);
  }
  Serial.println(F("MQTT UserCFG configurado."));

  Serial.print(F("Conectando ao broker MQTT: "));
  Serial.println(MQTT_BROKER);
  char cmdMqttConnBuffer[150];
  sprintf_P(cmdMqttConnBuffer, PSTR("AT+MQTTCONN=0,\"%s\",%d,0"), MQTT_BROKER, MQTT_PORT);
  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand para MQTTCONN..."));
  if (!sendATCommand(cmdMqttConnBuffer, 10000, F("OK"), F("+MQTTCONNECTED"))) { 
    Serial.println(F("Falha ao enviar comando de conexão MQTT ou broker inacessível."));
    while(1);
  }
  Serial.println(F("Comando de conexão MQTT enviado. Aguardando alguns segundos para estabilizar..."));
  delay(5000); 

  Serial.println(F("Publicando mensagem MQTT..."));
  char cmdMqttPubBuffer[200]; 
  sprintf_P(cmdMqttPubBuffer, PSTR("AT+MQTTPUB=0,\"%s\",\"%s\",0,0"), MQTT_PUB_TOPIC, MQTT_MESSAGE);
  Serial.println(F("DEBUG: setup() - PRESTES A CHAMAR sendATCommand para MQTTPUB..."));
  if (!sendATCommand(cmdMqttPubBuffer, 5000, F("OK"))) {
    Serial.println(F("Falha ao publicar mensagem MQTT."));
    while(1);
  }
  Serial.println(F("Mensagem MQTT publicada com sucesso para o tópico: "));
  Serial.println(MQTT_PUB_TOPIC);
  Serial.println(F("Verifique no cliente web do HiveMQ!"));

  Serial.println(F("\n--- Fim do Setup ---"));
} 

void loop() {
  if (espSerial.available()) {
    Serial.write(espSerial.read());
  }
}
