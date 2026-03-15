export interface ZipCentroid {
  lat: number;
  lng: number;
  city: string;
  state: string;
}

export const zipCentroids: Record<string, ZipCentroid> = {
  "85035": { lat: 33.4485, lng: -112.1749, city: "Phoenix", state: "AZ" },
  "85033": { lat: 33.4760, lng: -112.1450, city: "Phoenix", state: "AZ" },
  "85031": { lat: 33.4897, lng: -112.1537, city: "Phoenix", state: "AZ" },
  "85037": { lat: 33.4441, lng: -112.2050, city: "Phoenix", state: "AZ" },
  "85040": { lat: 33.3716, lng: -112.0165, city: "Phoenix", state: "AZ" },
  "38126": { lat: 35.1306, lng: -90.0490, city: "Memphis", state: "TN" },
  "70802": { lat: 30.4395, lng: -91.1365, city: "Baton Rouge", state: "LA" },
  "25301": { lat: 38.3568, lng: -81.6326, city: "Charleston", state: "WV" },
  "39203": { lat: 32.3084, lng: -90.1924, city: "Jackson", state: "MS" },
  "71201": { lat: 32.5110, lng: -92.1193, city: "Monroe", state: "LA" },
  "36603": { lat: 30.6844, lng: -88.0431, city: "Mobile", state: "AL" },
  "73501": { lat: 34.6036, lng: -98.3959, city: "Lawton", state: "OK" },
  "72201": { lat: 34.7465, lng: -92.2896, city: "Little Rock", state: "AR" },
  "40202": { lat: 38.2527, lng: -85.7585, city: "Louisville", state: "KY" },
  "10001": { lat: 40.7484, lng: -73.9967, city: "New York", state: "NY" },
  "10002": { lat: 40.7157, lng: -73.9863, city: "New York", state: "NY" },
  "60601": { lat: 41.8858, lng: -87.6181, city: "Chicago", state: "IL" },
  "60602": { lat: 41.8819, lng: -87.6278, city: "Chicago", state: "IL" },
  "77001": { lat: 29.7489, lng: -95.3677, city: "Houston", state: "TX" },
  "77002": { lat: 29.7543, lng: -95.3677, city: "Houston", state: "TX" },
  "90001": { lat: 33.9731, lng: -118.2479, city: "Los Angeles", state: "CA" },
  "90002": { lat: 33.9494, lng: -118.2468, city: "Los Angeles", state: "CA" },
  "30301": { lat: 33.7490, lng: -84.3880, city: "Atlanta", state: "GA" },
  "30302": { lat: 33.7490, lng: -84.3880, city: "Atlanta", state: "GA" },
  "19101": { lat: 39.9526, lng: -75.1652, city: "Philadelphia", state: "PA" },
  "19102": { lat: 39.9526, lng: -75.1652, city: "Philadelphia", state: "PA" },
  "78201": { lat: 29.4530, lng: -98.5289, city: "San Antonio", state: "TX" },
  "78202": { lat: 29.4195, lng: -98.4747, city: "San Antonio", state: "TX" },
  "85701": { lat: 32.2219, lng: -110.9265, city: "Tucson", state: "AZ" },
  "85702": { lat: 32.2541, lng: -110.9918, city: "Tucson", state: "AZ" },
  "32201": { lat: 30.3322, lng: -81.6557, city: "Jacksonville", state: "FL" },
  "32202": { lat: 30.3272, lng: -81.6511, city: "Jacksonville", state: "FL" },
  "43201": { lat: 39.9948, lng: -83.0050, city: "Columbus", state: "OH" },
  "43202": { lat: 40.0242, lng: -83.0084, city: "Columbus", state: "OH" },
  "28201": { lat: 35.2271, lng: -80.8431, city: "Charlotte", state: "NC" },
  "28202": { lat: 35.2271, lng: -80.8431, city: "Charlotte", state: "NC" },
  "76101": { lat: 32.7555, lng: -97.3308, city: "Fort Worth", state: "TX" },
  "76102": { lat: 32.7555, lng: -97.3308, city: "Fort Worth", state: "TX" },
  "97201": { lat: 45.5051, lng: -122.6750, city: "Portland", state: "OR" },
  "97202": { lat: 45.4850, lng: -122.6350, city: "Portland", state: "OR" },
  "78701": { lat: 30.2672, lng: -97.7431, city: "Austin", state: "TX" },
  "78702": { lat: 30.2672, lng: -97.7201, city: "Austin", state: "TX" },
  "89101": { lat: 36.1699, lng: -115.1398, city: "Las Vegas", state: "NV" },
  "89102": { lat: 36.1375, lng: -115.1896, city: "Las Vegas", state: "NV" },
  "87101": { lat: 35.0844, lng: -106.6504, city: "Albuquerque", state: "NM" },
  "87102": { lat: 35.0722, lng: -106.6500, city: "Albuquerque", state: "NM" },
  "85001": { lat: 33.4484, lng: -112.0740, city: "Phoenix", state: "AZ" },
  "85004": { lat: 33.4484, lng: -112.0740, city: "Phoenix", state: "AZ" },
  "94102": { lat: 37.7749, lng: -122.4194, city: "San Francisco", state: "CA" },
  "94103": { lat: 37.7749, lng: -122.4094, city: "San Francisco", state: "CA" },
  "98101": { lat: 47.6062, lng: -122.3321, city: "Seattle", state: "WA" },
  "98102": { lat: 47.6241, lng: -122.3145, city: "Seattle", state: "WA" },
  "80201": { lat: 39.7392, lng: -104.9903, city: "Denver", state: "CO" },
  "80202": { lat: 39.7539, lng: -104.9997, city: "Denver", state: "CO" },
  "37201": { lat: 36.1627, lng: -86.7816, city: "Nashville", state: "TN" },
  "37202": { lat: 36.1627, lng: -86.7816, city: "Nashville", state: "TN" },
  "35201": { lat: 33.5186, lng: -86.8104, city: "Birmingham", state: "AL" },
  "35202": { lat: 33.5186, lng: -86.8104, city: "Birmingham", state: "AL" },
  "23220": { lat: 37.5407, lng: -77.4360, city: "Richmond", state: "VA" },
  "23221": { lat: 37.5540, lng: -77.4630, city: "Richmond", state: "VA" },
  "70112": { lat: 29.9511, lng: -90.0715, city: "New Orleans", state: "LA" },
  "70113": { lat: 29.9444, lng: -90.0854, city: "New Orleans", state: "LA" },
  "48201": { lat: 42.3314, lng: -83.0458, city: "Detroit", state: "MI" },
  "48202": { lat: 42.3744, lng: -83.0755, city: "Detroit", state: "MI" },
  "21201": { lat: 39.2904, lng: -76.6122, city: "Baltimore", state: "MD" },
  "21202": { lat: 39.2925, lng: -76.6064, city: "Baltimore", state: "MD" },
  "67201": { lat: 37.6872, lng: -97.3301, city: "Wichita", state: "KS" },
  "67202": { lat: 37.6908, lng: -97.3378, city: "Wichita", state: "KS" },
  "53201": { lat: 43.0389, lng: -87.9065, city: "Milwaukee", state: "WI" },
  "53202": { lat: 43.0534, lng: -87.8954, city: "Milwaukee", state: "WI" },
  "85043": { lat: 33.4042, lng: -112.1421, city: "Phoenix", state: "AZ" },
  "85041": { lat: 33.3813, lng: -112.0745, city: "Phoenix", state: "AZ" },
};

export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getNearestZips(targetZip: string, count = 3): string[] {
  const target = zipCentroids[targetZip];
  if (!target) return [];
  return Object.entries(zipCentroids)
    .filter(([z]) => z !== targetZip)
    .map(([z, c]) => ({ zip: z, dist: haversineDistance(target.lat, target.lng, c.lat, c.lng) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count)
    .map((x) => x.zip);
}
