export enum BoatDataType {
  None = 0,
  Heading,
  SOG,
  COG,
  STW,
  Variation,
  AWS,
  TWS,
  MaxAws,
  MaxTws,
  AWA,
  TWA,
  AWD,
  TWD,
  TripLog,
  Log,
  RudderPosition,
  WaterTemperature,
  WaterDepth,
  GPSTime,
  Latitude,
  Longitude,
  Altitude,
};

export const BoatDataTypeStrings = new Map<number, string>([
  [BoatDataType.None, 'None'],
  [BoatDataType.Heading, 'Heading'],
  [BoatDataType.SOG, 'Speed over ground'],
  [BoatDataType.COG, 'Course over ground'],
  [BoatDataType.STW, 'Speed through water'],
  [BoatDataType.Variation, 'Variation'],
  [BoatDataType.AWS, 'Apperent wind speed'],
  [BoatDataType.TWS, 'True wind speed'],
  [BoatDataType.MaxAws, 'Max apperent wind speed'],
  [BoatDataType.MaxTws, 'Max true wind speed'],
  [BoatDataType.AWA, 'Apperent wind angle'],
  [BoatDataType.TWA, 'True wind angle'],
  [BoatDataType.AWD, 'Apperent wind direction'],
  [BoatDataType.TWD, 'True wind direction'],
  [BoatDataType.TripLog, 'Trip log'],
  [BoatDataType.Log, 'Log'],
  [BoatDataType.RudderPosition, 'Rudder position'],
  [BoatDataType.WaterTemperature, 'Water temperature'],
  [BoatDataType.WaterDepth, 'Water Depth'],
  [BoatDataType.GPSTime, 'GPS Time'],
  [BoatDataType.Latitude, 'Latitude'],
  [BoatDataType.Longitude, 'Longitude'],
  [BoatDataType.Altitude, 'Altitude'],
]);

const speedUnits = ['m/s', 'knots', 'km/h'];
const heightUnits = ['feet', 'meters']
const depthUnits = [...heightUnits, 'fathoms'];
const degreesUnits = ['degress'];
const distanceUnits = ['nm', 'km', 'feet', 'meters']

export const BoatDataTypeUnits = new Map<number, string[]>([
  [BoatDataType.Heading, degreesUnits],
  [BoatDataType.SOG, speedUnits],
  [BoatDataType.COG, degreesUnits],
  [BoatDataType.STW, speedUnits],
  [BoatDataType.Variation, degreesUnits],
  [BoatDataType.AWS, speedUnits],
  [BoatDataType.TWS, speedUnits],
  [BoatDataType.MaxAws, speedUnits],
  [BoatDataType.MaxTws, speedUnits],
  [BoatDataType.AWA, degreesUnits],
  [BoatDataType.TWA, degreesUnits],
  [BoatDataType.AWD, degreesUnits],
  [BoatDataType.TWD, degreesUnits],
  [BoatDataType.TripLog, distanceUnits],
  [BoatDataType.Log, distanceUnits],
  [BoatDataType.RudderPosition, degreesUnits],
  [BoatDataType.WaterTemperature, degreesUnits],
  [BoatDataType.WaterDepth, depthUnits],
  [BoatDataType.Altitude, heightUnits],
]);

export function boatDataKeyFromValue(value: string) {
  return Array.from(BoatDataTypeStrings.entries()).find((p) => p[1] === value)?.[0] ?? -1
};
