#pragma once

#include "BoatData.h"

#include <SettingValue.h>
#include <HttpEndpoint.h>
#include <FSPersistence.h>

#define DISPLAY_SETTINGS_FILE "/config/displaySettings.json"
#define DISPLAY_SETTINGS_PATH "/rest/displaySettings"

namespace N2kGateway {
enum class DisplayType : uint8_t {
  Status = 0,
  SingleDisplay,
};

class Display {
 public:
  DisplayType displayType;
  BoatDataType dataType;
  String units;

 public:
  Display(DisplayType displayType, BoatDataType dataType = BoatDataType::None, String units = "") :
      displayType(displayType), dataType(dataType), units(units) {
  }
};

class DisplaySettings {
 public:
  std::list<Display> displays;

  static void read(DisplaySettings& settings, JsonObject& root) {
    JsonArray displays = root.createNestedArray("displays");
    for (Display display : settings.displays) {
      JsonObject displayRoot = displays.createNestedObject();
      displayRoot["displayType"] = static_cast<uint8_t>(display.displayType);
      displayRoot["dataType"] = static_cast<uint8_t>(display.dataType);
      displayRoot["units"] = display.units;
    }
  }

  static StateUpdateResult update(JsonObject& root, DisplaySettings& settings) {
    settings.displays.clear();
    if (root["displays"].is<JsonArray>()) {
      for (JsonVariant display : root["displays"].as<JsonArray>()) {
        settings.displays.push_back(Display(static_cast<DisplayType>(display["displayType"] | 0),
                                            static_cast<BoatDataType>(display["dataType"] | 0),
                                            display["units"]));
      }
    } else {
      settings.displays.push_back(Display(DisplayType::Status));
    }
    return StateUpdateResult::CHANGED;
  }
};

class DisplaySettingsService : public StatefulService<DisplaySettings> {
 public:
  DisplaySettingsService(AsyncWebServer* server, FS* fs, SecurityManager* securityManager);
  void begin();

 private:
  HttpEndpoint<DisplaySettings> _httpEndpoint;
  FSPersistence<DisplaySettings> _fsPersistence;
};
}  // namespace N2kGateway