#include <WiFi.h> //Biblioteca 
const char* ssid = "Finders-p05-nomedasala"; //Define o nome do ponto de wifi
const char* senha = "findersipt"; //Define a senha do wifi
 
WiFiServer sv(80); 
void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_AP_STA); //Define o modo do wifi
  WiFi.softAP(ssid, senha); // Inicia o wifi com o nome do ponto e a senha de acesso
  delay(500);
  Serial.print("Se conectando a: "); //Imprime mensagem sobre o nome do ponto de acesso
  Serial.println(ssid);
  IPAddress ip = WiFi.softAPIP(); //Endereço de IP
  
  Serial.print("Endereço de IP: "); //Imprime o endereço de IP
  Serial.println(ip);
  sv.begin(); //Inicia o servidor 
  Serial.println("Servidor online"); //Imprime a mensagem de início
}
void loop() {

}