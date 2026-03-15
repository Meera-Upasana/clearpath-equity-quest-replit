export type MetricKey = "diabetes" | "obesity" | "smoking" | "hypertension" | "mentalHealth" | "noCheckup";

export interface StateHealthData {
  name: string;
  diabetes: number;
  obesity: number;
  smoking: number;
  hypertension: number;
  mentalHealth: number;
  noCheckup: number;
}

export const stateData: Record<string, StateHealthData> = {
  AL: { name: "Alabama", diabetes: 14.6, obesity: 40.2, smoking: 21.5, hypertension: 38.5, mentalHealth: 20.1, noCheckup: 27.3 },
  AK: { name: "Alaska", diabetes: 9.2, obesity: 30.5, smoking: 18.2, hypertension: 28.1, mentalHealth: 17.5, noCheckup: 34.2 },
  AZ: { name: "Arizona", diabetes: 11.5, obesity: 32.8, smoking: 15.8, hypertension: 29.4, mentalHealth: 18.3, noCheckup: 28.1 },
  AR: { name: "Arkansas", diabetes: 13.7, obesity: 38.3, smoking: 24.0, hypertension: 37.2, mentalHealth: 20.8, noCheckup: 29.5 },
  CA: { name: "California", diabetes: 10.5, obesity: 28.1, smoking: 11.2, hypertension: 27.3, mentalHealth: 16.2, noCheckup: 23.8 },
  CO: { name: "Colorado", diabetes: 7.4, obesity: 24.3, smoking: 14.5, hypertension: 24.1, mentalHealth: 15.8, noCheckup: 22.5 },
  CT: { name: "Connecticut", diabetes: 9.8, obesity: 29.0, smoking: 13.1, hypertension: 27.8, mentalHealth: 15.5, noCheckup: 21.8 },
  DE: { name: "Delaware", diabetes: 11.8, obesity: 33.5, smoking: 17.5, hypertension: 32.1, mentalHealth: 17.2, noCheckup: 24.5 },
  DC: { name: "District of Columbia", diabetes: 10.2, obesity: 24.7, smoking: 14.8, hypertension: 28.5, mentalHealth: 16.8, noCheckup: 21.2 },
  FL: { name: "Florida", diabetes: 11.7, obesity: 30.8, smoking: 16.1, hypertension: 30.2, mentalHealth: 17.8, noCheckup: 26.5 },
  GA: { name: "Georgia", diabetes: 12.5, obesity: 34.4, smoking: 17.8, hypertension: 33.8, mentalHealth: 18.5, noCheckup: 27.8 },
  HI: { name: "Hawaii", diabetes: 10.8, obesity: 25.2, smoking: 12.8, hypertension: 26.5, mentalHealth: 13.3, noCheckup: 21.5 },
  ID: { name: "Idaho", diabetes: 9.5, obesity: 30.1, smoking: 15.2, hypertension: 27.5, mentalHealth: 17.8, noCheckup: 30.2 },
  IL: { name: "Illinois", diabetes: 10.8, obesity: 33.0, smoking: 15.5, hypertension: 30.5, mentalHealth: 17.0, noCheckup: 24.2 },
  IN: { name: "Indiana", diabetes: 12.8, obesity: 36.5, smoking: 21.0, hypertension: 33.2, mentalHealth: 19.5, noCheckup: 26.8 },
  IA: { name: "Iowa", diabetes: 10.2, obesity: 36.1, smoking: 17.8, hypertension: 30.8, mentalHealth: 17.2, noCheckup: 25.5 },
  KS: { name: "Kansas", diabetes: 11.0, obesity: 34.2, smoking: 17.5, hypertension: 30.5, mentalHealth: 18.0, noCheckup: 27.5 },
  KY: { name: "Kentucky", diabetes: 14.0, obesity: 38.0, smoking: 26.0, hypertension: 39.0, mentalHealth: 22.0, noCheckup: 28.5 },
  LA: { name: "Louisiana", diabetes: 14.4, obesity: 39.0, smoking: 22.5, hypertension: 39.6, mentalHealth: 20.5, noCheckup: 29.2 },
  ME: { name: "Maine", diabetes: 10.5, obesity: 30.8, smoking: 18.5, hypertension: 29.2, mentalHealth: 18.2, noCheckup: 23.8 },
  MD: { name: "Maryland", diabetes: 11.5, obesity: 32.2, smoking: 14.2, hypertension: 31.5, mentalHealth: 16.5, noCheckup: 22.8 },
  MA: { name: "Massachusetts", diabetes: 9.5, obesity: 27.5, smoking: 12.8, hypertension: 26.8, mentalHealth: 15.2, noCheckup: 20.5 },
  MI: { name: "Michigan", diabetes: 12.0, obesity: 35.5, smoking: 19.8, hypertension: 32.8, mentalHealth: 19.0, noCheckup: 25.5 },
  MN: { name: "Minnesota", diabetes: 8.8, obesity: 30.2, smoking: 14.8, hypertension: 26.5, mentalHealth: 16.0, noCheckup: 22.2 },
  MS: { name: "Mississippi", diabetes: 15.9, obesity: 41.5, smoking: 24.3, hypertension: 42.3, mentalHealth: 20.8, noCheckup: 30.5 },
  MO: { name: "Missouri", diabetes: 12.2, obesity: 35.8, smoking: 20.5, hypertension: 32.5, mentalHealth: 19.2, noCheckup: 27.0 },
  MT: { name: "Montana", diabetes: 8.8, obesity: 28.5, smoking: 17.8, hypertension: 26.8, mentalHealth: 18.5, noCheckup: 31.5 },
  NE: { name: "Nebraska", diabetes: 10.0, obesity: 33.5, smoking: 16.2, hypertension: 29.2, mentalHealth: 17.0, noCheckup: 26.8 },
  NV: { name: "Nevada", diabetes: 10.8, obesity: 30.5, smoking: 17.2, hypertension: 28.8, mentalHealth: 18.5, noCheckup: 34.5 },
  NH: { name: "New Hampshire", diabetes: 9.2, obesity: 29.5, smoking: 15.2, hypertension: 27.5, mentalHealth: 16.8, noCheckup: 22.0 },
  NJ: { name: "New Jersey", diabetes: 10.5, obesity: 28.5, smoking: 13.5, hypertension: 29.5, mentalHealth: 15.8, noCheckup: 23.5 },
  NM: { name: "New Mexico", diabetes: 12.5, obesity: 31.5, smoking: 17.5, hypertension: 28.5, mentalHealth: 19.5, noCheckup: 30.8 },
  NY: { name: "New York", diabetes: 10.8, obesity: 28.8, smoking: 14.0, hypertension: 29.0, mentalHealth: 16.5, noCheckup: 23.2 },
  NC: { name: "North Carolina", diabetes: 12.2, obesity: 34.8, smoking: 18.5, hypertension: 33.5, mentalHealth: 18.8, noCheckup: 26.5 },
  ND: { name: "North Dakota", diabetes: 9.5, obesity: 33.8, smoking: 18.2, hypertension: 28.5, mentalHealth: 16.5, noCheckup: 28.5 },
  OH: { name: "Ohio", diabetes: 12.5, obesity: 36.0, smoking: 21.2, hypertension: 33.0, mentalHealth: 19.5, noCheckup: 25.0 },
  OK: { name: "Oklahoma", diabetes: 13.9, obesity: 37.5, smoking: 21.8, hypertension: 35.5, mentalHealth: 21.5, noCheckup: 29.8 },
  OR: { name: "Oregon", diabetes: 9.8, obesity: 30.5, smoking: 16.2, hypertension: 27.8, mentalHealth: 18.0, noCheckup: 24.5 },
  PA: { name: "Pennsylvania", diabetes: 11.2, obesity: 33.8, smoking: 18.5, hypertension: 31.2, mentalHealth: 17.8, noCheckup: 24.0 },
  RI: { name: "Rhode Island", diabetes: 10.0, obesity: 30.2, smoking: 14.5, hypertension: 28.5, mentalHealth: 16.2, noCheckup: 22.5 },
  SC: { name: "South Carolina", diabetes: 13.0, obesity: 36.2, smoking: 19.8, hypertension: 35.2, mentalHealth: 19.0, noCheckup: 27.5 },
  SD: { name: "South Dakota", diabetes: 10.5, obesity: 33.0, smoking: 19.5, hypertension: 28.8, mentalHealth: 17.0, noCheckup: 29.5 },
  TN: { name: "Tennessee", diabetes: 13.5, obesity: 37.8, smoking: 22.5, hypertension: 36.5, mentalHealth: 21.5, noCheckup: 28.2 },
  TX: { name: "Texas", diabetes: 12.8, obesity: 35.5, smoking: 15.2, hypertension: 31.8, mentalHealth: 18.0, noCheckup: 30.2 },
  UT: { name: "Utah", diabetes: 8.2, obesity: 26.8, smoking: 8.9, hypertension: 23.3, mentalHealth: 16.5, noCheckup: 25.8 },
  VT: { name: "Vermont", diabetes: 9.0, obesity: 28.2, smoking: 16.0, hypertension: 27.0, mentalHealth: 17.5, noCheckup: 21.8 },
  VA: { name: "Virginia", diabetes: 11.2, obesity: 32.5, smoking: 16.0, hypertension: 31.0, mentalHealth: 17.0, noCheckup: 24.5 },
  WA: { name: "Washington", diabetes: 9.5, obesity: 29.8, smoking: 13.5, hypertension: 27.2, mentalHealth: 17.2, noCheckup: 23.2 },
  WV: { name: "West Virginia", diabetes: 16.2, obesity: 40.6, smoking: 27.3, hypertension: 43.1, mentalHealth: 26.2, noCheckup: 28.8 },
  WI: { name: "Wisconsin", diabetes: 9.8, obesity: 33.5, smoking: 16.5, hypertension: 29.5, mentalHealth: 17.5, noCheckup: 23.5 },
  WY: { name: "Wyoming", diabetes: 9.0, obesity: 29.5, smoking: 18.8, hypertension: 26.5, mentalHealth: 18.0, noCheckup: 34.2 },
};
