#include "DisplaySettingsService.h"

namespace N2kGateway {

DisplaySettingsService::DisplaySettingsService(AsyncWebServer* server, FS* fs, SecurityManager* securityManager) :
    _httpEndpoint(DisplaySettings::read, DisplaySettings::update, this, server, DISPLAY_SETTINGS_PATH, securityManager, AuthenticationPredicates::NONE_REQUIRED),
    _fsPersistence(DisplaySettings::read, DisplaySettings::update, this, fs, DISPLAY_SETTINGS_FILE) {
}

void DisplaySettingsService::begin() {
  _fsPersistence.readFromFS();
}

}  // namespace N2kGateway