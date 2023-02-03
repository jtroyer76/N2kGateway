#include <ESP8266React.h>
#include <LightMqttSettingsService.h>
#include <LightStateService.h>
#include <DisplaySettingsService.h>

#define SERIAL_BAUD_RATE 115200

using namespace N2kGateway;

AsyncWebServer server(80);
ESP8266React esp8266React(&server);

DisplaySettingsService displaySettingsService =
    DisplaySettingsService(&server, esp8266React.getFS(), esp8266React.getSecurityManager());



// LightMqttSettingsService lightMqttSettingsService =
//     LightMqttSettingsService(&server, esp8266React.getFS(), esp8266React.getSecurityManager());
// LightStateService lightStateService = LightStateService(&server,
//                                                         esp8266React.getSecurityManager(),
//                                                         esp8266React.getMqttClient(),
//                                                         &lightMqttSettingsService);

void setup() {
  // start serial and filesystem
  Serial.begin(SERIAL_BAUD_RATE);

  // start the framework and demo project
  esp8266React.begin();

  // load the initial light settings
  displaySettingsService.begin();

  // start the server
  server.begin();
}

void loop() {
  // run the framework's loop function
  esp8266React.loop();
}
