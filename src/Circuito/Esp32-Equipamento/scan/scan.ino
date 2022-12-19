#include <ArduinoJson.h>
#include "WiFi.h"
#include <HTTPClient.h>
#include <iostream>
#include <string>
using namespace std;
const char *ssid = "NOME-DO-WIFI"; // Trocar pelo Wifi que será conectado
const char * pass = "SENHA-DO-WIFI"; // Trocar pela senha do WiFi que será conectado
const char *equipamento = "NOME-DO-EQUIPAMENTO"; //Nome do equipamento que será monitorado
const char *patrimonio = "10000"; // Código do patrimônio do equipamento
String predio = "";
String local ="";
void postDataToServer() {   // Função para mandar as informações para a rota do servidor da api
  Serial.println("Posting JSON data to server...");
  // Block until we are able to connect to the WiFi access point
    HTTPClient http;
    http.begin("https://z4y1jj-3001.preview.csb.app/dispositivos/create"); // link do servidor + rota
    http.addHeader("Content-Type", "application/json");
    StaticJsonDocument<1024> doc;
    doc["nome"] = equipamento;
    doc["predio"] = predio;
    doc["codigo_patrimonio"] = patrimonio;
    doc["sala"] = local;
    String requestBody;
    serializeJson(doc, requestBody);
    int httpResponseCode = http.POST(requestBody);
    if(httpResponseCode>0){
      String response = http.getString();
      Serial.println(httpResponseCode);
      Serial.println(response);
    }
    else {
      Serial.println("Error occurred while sending HTTP POST");
    }
}

void setup()
{
  Serial.begin(115200);

    
  WiFi.mode(WIFI_STA);
  
  WiFi.begin(ssid,pass);
  delay(3000);

  Serial.println("Setup done");
}

void loop()
{
  
    
    // WiFi.scanNetworks will return the number of networks found
  int n = WiFi.scanNetworks();
  String stringOne = WiFi.SSID();
  Serial.println("scan start");
  Serial.println("scan done");
  if (n == 0) {
    Serial.println("no networks found");
  } else {
    if(WiFi.status() == WL_CONNECTED){
      Serial.print(n);
      Serial.println(" networks found");
      for (int i = 0; stringOne.startsWith("Finders") != true; ++i) { // Utiliza a tag Finders para diferenciar das outras redes de WiFi
        String stringOne = WiFi.SSID(i);
        local = WiFi.SSID(i);
        predio = WiFi.SSID(i);
        predio.remove(0,8);
        predio.remove(3);
        local.remove(0,12);
        if (stringOne.startsWith("Finders") == true){ //Utiliza a tag Finders para diferenciar das outras redes de WiFi
            // Print SSID and RSSI for each network found
          Serial.println(stringOne);
          local = stringOne;
          predio = stringOne;
          predio.remove(0,8); //remove a primeira parte que se refere a tag da rede
          predio.remove(3); // remove a parte que se refere a sala, deixando somente o codigo do predio
          local.remove(0,12); //remove a tag e o codigo do predio, deixando somente o nome da sala
          Serial.println(predio);
          Serial.println(local);
          Serial.println(equipamento);
          Serial.println(patrimonio);
          // delay(500);
          postDataToServer();//chama a função que manda os dados para o servidor
          delay(5000);
       
          break; //Encerra o loop 
        }
        delay(500);
      }
    }
    else {
      Serial.println("wifi nao conectado");
    }
  }
    const int deep_sleep_sec = 600; //TEMPO QUE O ESP VAI FICAR EM MODO HIBERNACAO, EM SEGUNDOS
    ESP_LOGI(TAG, "Entering deep sleep for %d seconds", deep_sleep_sec);
    esp_deep_sleep(1000000LL * deep_sleep_sec);
}
