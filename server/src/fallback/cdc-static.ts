export interface CDCRecord {
  locationabbr: string;
  locationdesc: string;
  category: string;
  measure: string;
  data_value: number;
  year: string;
}

export const cdcStaticData: CDCRecord[] = [
  { locationabbr: "AL", locationdesc: "Alabama", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 14.6, year: "2023" },
  { locationabbr: "AK", locationdesc: "Alaska", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.2, year: "2023" },
  { locationabbr: "AZ", locationdesc: "Arizona", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.5, year: "2023" },
  { locationabbr: "AR", locationdesc: "Arkansas", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 13.7, year: "2023" },
  { locationabbr: "CA", locationdesc: "California", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.5, year: "2023" },
  { locationabbr: "CO", locationdesc: "Colorado", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 7.4, year: "2023" },
  { locationabbr: "CT", locationdesc: "Connecticut", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.8, year: "2023" },
  { locationabbr: "DE", locationdesc: "Delaware", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.8, year: "2023" },
  { locationabbr: "DC", locationdesc: "District of Columbia", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.2, year: "2023" },
  { locationabbr: "FL", locationdesc: "Florida", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.7, year: "2023" },
  { locationabbr: "GA", locationdesc: "Georgia", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.5, year: "2023" },
  { locationabbr: "HI", locationdesc: "Hawaii", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.8, year: "2023" },
  { locationabbr: "ID", locationdesc: "Idaho", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.5, year: "2023" },
  { locationabbr: "IL", locationdesc: "Illinois", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.8, year: "2023" },
  { locationabbr: "IN", locationdesc: "Indiana", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.8, year: "2023" },
  { locationabbr: "IA", locationdesc: "Iowa", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.2, year: "2023" },
  { locationabbr: "KS", locationdesc: "Kansas", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.0, year: "2023" },
  { locationabbr: "KY", locationdesc: "Kentucky", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 14.4, year: "2023" },
  { locationabbr: "LA", locationdesc: "Louisiana", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 14.7, year: "2023" },
  { locationabbr: "ME", locationdesc: "Maine", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.5, year: "2023" },
  { locationabbr: "MD", locationdesc: "Maryland", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.8, year: "2023" },
  { locationabbr: "MA", locationdesc: "Massachusetts", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.4, year: "2023" },
  { locationabbr: "MI", locationdesc: "Michigan", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.8, year: "2023" },
  { locationabbr: "MN", locationdesc: "Minnesota", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 8.5, year: "2023" },
  { locationabbr: "MS", locationdesc: "Mississippi", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 16.2, year: "2023" },
  { locationabbr: "MO", locationdesc: "Missouri", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.7, year: "2023" },
  { locationabbr: "MT", locationdesc: "Montana", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.2, year: "2023" },
  { locationabbr: "NE", locationdesc: "Nebraska", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.8, year: "2023" },
  { locationabbr: "NV", locationdesc: "Nevada", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.5, year: "2023" },
  { locationabbr: "NH", locationdesc: "New Hampshire", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.2, year: "2023" },
  { locationabbr: "NJ", locationdesc: "New Jersey", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.2, year: "2023" },
  { locationabbr: "NM", locationdesc: "New Mexico", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.8, year: "2023" },
  { locationabbr: "NY", locationdesc: "New York", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.8, year: "2023" },
  { locationabbr: "NC", locationdesc: "North Carolina", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.3, year: "2023" },
  { locationabbr: "ND", locationdesc: "North Dakota", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.8, year: "2023" },
  { locationabbr: "OH", locationdesc: "Ohio", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.2, year: "2023" },
  { locationabbr: "OK", locationdesc: "Oklahoma", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 13.5, year: "2023" },
  { locationabbr: "OR", locationdesc: "Oregon", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.8, year: "2023" },
  { locationabbr: "PA", locationdesc: "Pennsylvania", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.4, year: "2023" },
  { locationabbr: "RI", locationdesc: "Rhode Island", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 10.2, year: "2023" },
  { locationabbr: "SC", locationdesc: "South Carolina", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 13.8, year: "2023" },
  { locationabbr: "SD", locationdesc: "South Dakota", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.5, year: "2023" },
  { locationabbr: "TN", locationdesc: "Tennessee", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 14.1, year: "2023" },
  { locationabbr: "TX", locationdesc: "Texas", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 12.8, year: "2023" },
  { locationabbr: "UT", locationdesc: "Utah", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 8.1, year: "2023" },
  { locationabbr: "VT", locationdesc: "Vermont", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 8.8, year: "2023" },
  { locationabbr: "VA", locationdesc: "Virginia", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 11.0, year: "2023" },
  { locationabbr: "WA", locationdesc: "Washington", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.5, year: "2023" },
  { locationabbr: "WV", locationdesc: "West Virginia", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 16.0, year: "2023" },
  { locationabbr: "WI", locationdesc: "Wisconsin", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 9.4, year: "2023" },
  { locationabbr: "WY", locationdesc: "Wyoming", category: "Health Outcomes", measure: "Diagnosed diabetes among adults", data_value: 8.5, year: "2023" },
];

export const measureKeyMap: Record<string, string> = {
  diabetes: "DIABETES",
  obesity: "OBESITY",
  smoking: "CSMOKING",
  hypertension: "BPHIGH",
  mentalHealth: "MHLTH",
  noCheckup: "CHECKUP",
};

export const staticByMetric: Record<string, Record<string, number>> = {
  diabetes:     { AL:14.6,AK:9.2,AZ:11.5,AR:13.7,CA:10.5,CO:7.4,CT:9.8,DE:11.8,DC:10.2,FL:11.7,GA:12.5,HI:10.8,ID:9.5,IL:10.8,IN:12.8,IA:10.2,KS:11.0,KY:14.4,LA:14.7,ME:10.5,MD:10.8,MA:9.4,MI:11.8,MN:8.5,MS:16.2,MO:11.7,MT:9.2,NE:9.8,NV:11.5,NH:9.2,NJ:11.2,NM:12.8,NY:10.8,NC:12.3,ND:9.8,OH:12.2,OK:13.5,OR:9.8,PA:11.4,RI:10.2,SC:13.8,SD:9.5,TN:14.1,TX:12.8,UT:8.1,VT:8.8,VA:11.0,WA:9.5,WV:16.0,WI:9.4,WY:8.5 },
  obesity:      { AL:40.2,AK:30.5,AZ:32.8,AR:38.3,CA:28.1,CO:24.3,CT:29.0,DE:33.5,DC:24.7,FL:30.8,GA:34.4,HI:25.2,ID:30.1,IL:33.0,IN:36.5,IA:36.1,KS:34.2,KY:37.5,LA:39.7,ME:31.5,MD:32.8,MA:27.5,MI:35.8,MN:30.1,MS:41.5,MO:35.5,MT:28.5,NE:33.5,NV:30.5,NH:30.2,NJ:29.5,NM:32.5,NY:30.0,NC:34.1,ND:34.2,OH:35.0,OK:38.2,OR:30.5,PA:33.5,RI:30.5,SC:36.5,SD:33.0,TN:38.2,TX:35.8,UT:26.5,VT:28.5,VA:31.5,WA:29.5,WV:40.6,WI:32.5,WY:28.0 },
  smoking:      { AL:21.5,AK:18.2,AZ:15.8,AR:24.0,CA:11.2,CO:14.5,CT:13.1,DE:17.5,DC:14.8,FL:16.1,GA:17.8,HI:12.8,ID:15.2,IL:15.5,IN:21.0,IA:17.8,KS:17.5,KY:25.5,LA:22.8,ME:17.5,MD:14.2,MA:13.5,MI:19.5,MN:14.8,MS:24.5,MO:20.5,MT:17.2,NE:15.8,NV:20.1,NH:15.8,NJ:13.8,NM:18.5,NY:15.8,NC:17.5,ND:18.5,OH:19.8,OK:21.5,OR:16.8,PA:18.5,RI:15.5,SC:20.1,SD:17.8,TN:22.5,TX:16.8,UT:9.5,VT:15.2,VA:16.5,WA:14.5,WV:26.8,WI:16.5,WY:18.5 },
  hypertension: { AL:38.5,AK:28.1,AZ:29.4,AR:37.2,CA:27.3,CO:24.1,CT:27.8,DE:32.1,DC:28.5,FL:30.2,GA:33.8,HI:26.5,ID:27.5,IL:30.5,IN:33.2,IA:30.8,KS:30.5,KY:37.5,LA:40.2,ME:28.5,MD:30.5,MA:26.5,MI:33.5,MN:27.5,MS:43.5,MO:33.8,MT:28.5,NE:30.5,NV:30.2,NH:27.5,NJ:29.5,NM:30.5,NY:29.5,NC:33.5,ND:29.8,OH:33.5,OK:36.8,OR:27.5,PA:32.5,RI:28.5,SC:37.5,SD:30.5,TN:38.5,TX:31.5,UT:22.5,VT:25.5,VA:29.5,WA:26.5,WV:42.5,WI:30.5,WY:28.5 },
  mentalHealth: { AL:20.1,AK:17.5,AZ:18.3,AR:20.8,CA:16.2,CO:15.8,CT:15.5,DE:17.2,DC:16.8,FL:17.8,GA:18.5,HI:13.3,ID:17.8,IL:17.0,IN:19.5,IA:17.2,KS:18.0,KY:22.5,LA:21.5,ME:18.5,MD:16.5,MA:18.5,MI:20.5,MN:15.8,MS:21.8,MO:20.5,MT:19.5,NE:16.5,NV:19.5,NH:18.5,NJ:16.5,NM:21.5,NY:18.5,NC:19.5,ND:16.8,OH:20.5,OK:22.5,OR:20.5,PA:19.8,RI:19.5,SC:20.5,SD:17.5,TN:22.5,TX:18.5,UT:18.5,VT:19.5,VA:18.5,WA:18.5,WV:25.8,WI:17.8,WY:19.5 },
  noCheckup:    { AL:27.3,AK:34.2,AZ:28.1,AR:29.5,CA:23.8,CO:22.5,CT:21.8,DE:24.5,DC:21.2,FL:26.5,GA:27.8,HI:21.5,ID:30.2,IL:24.2,IN:26.8,IA:25.5,KS:27.5,KY:26.5,LA:28.5,ME:22.5,MD:23.5,MA:18.5,MI:26.5,MN:22.5,MS:30.5,MO:27.5,MT:29.5,NE:26.5,NV:28.5,NH:23.5,NJ:22.5,NM:28.5,NY:22.5,NC:26.5,ND:27.5,OH:25.5,OK:29.5,OR:23.5,PA:24.5,RI:22.5,SC:28.5,SD:27.5,TN:28.5,TX:29.5,UT:21.5,VT:19.5,VA:23.5,WA:22.5,WV:30.5,WI:22.5,WY:28.5 },
};
