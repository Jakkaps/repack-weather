export function getPosition() {
  return new Promise((resolve) => {
    const lat = window.localStorage.getItem("lat");
    const lng = window.localStorage.getItem("lng");

    if ((!lat || !lng) && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        window.localStorage.setItem("lat", position.coords.latitude.toString());
        window.localStorage.setItem(
          "lng",
          position.coords.longitude.toString()
        );
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      resolve({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
    }
  });
}
