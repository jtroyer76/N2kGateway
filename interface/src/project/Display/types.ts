import { BoatDataType } from '../boatdata';
import Schema from "async-validator";

export enum DisplayType {
  Status,
  NumericGuage,
}

export const DisplayTypeStrings = new Map<number, string>([
  [DisplayType.Status, 'Status Display'],
  [DisplayType.NumericGuage, 'Numeric Guage'],
]);

export function displayTypeKeyFromValue(value: string) {
  return Array.from(DisplayTypeStrings.entries()).find((p) => p[1] === value)?.[0] ?? -1
};

export interface Display {
  displayType: number;
  dataType: BoatDataType;
  units?: string;
}

export interface DisplaySettings {
  displays: Display[];
}

export const createDisplayValidator = (display: Display[], creating: boolean) => new Schema({
  displayType: [
    { required: true, message: "DisplayType is required" },
  ],
});
