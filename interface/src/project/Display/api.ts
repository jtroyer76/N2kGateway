import { AxiosPromise } from "axios";

import { AXIOS } from "../../api/endpoints";
import { DisplaySettings } from "./types";

export function readDisplaySettings(): AxiosPromise<DisplaySettings> {
  return AXIOS.get('/displaySettings');
}

export function updateDisplaySettings(displaySettings: DisplaySettings): AxiosPromise<DisplaySettings> {
  return AXIOS.post('/displaySettings', displaySettings);
}
