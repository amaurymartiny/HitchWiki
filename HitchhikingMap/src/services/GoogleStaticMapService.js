const API_KEY = 'AIzaSyBSajyyu9eTKS8RY7xYqmLGRix3niphXmA';

export default function createStaticMap(markerLatLng) {
  const url = `https://maps.googleapis.com/maps/api/staticmap\
?center=${markerLatLng.latitude},${markerLatLng.longitude}\
&zoom=16&size=600x300&maptype=roadmap\
&markers=color:red%7C${markerLatLng.latitude},${markerLatLng.longitude}\
&key=${API_KEY}`;
  return url;
}
