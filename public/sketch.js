function setup() {
  noCanvas();

  const video = createCapture(VIDEO);
  video.size(350, 240);

  document.getElementById("geolocate").addEventListener("click", event => {
    if ("geolocation" in navigator) {
      console.log(" geolocation is available ");
      navigator.geolocation.getCurrentPosition(async function(position) {
        const lat = position.coords.latitude;
        document.getElementById("latitude").textContent = lat;
        const long = position.coords.longitude;
        document.getElementById("longitude").textContent = long;
        video.loadPixels(); //tai pixel len canvas de chuyen sang base 64
        const image64 = video.canvas.toDataURL(); //Chuyen thanh dang base 64
        const mood = document.getElementById("mood").value;

        const data = { lat, long, mood, image64 };
        console.log(data);
        const options = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data)
        };
        const response = await fetch("/api", options);
        const json = await response.json();
      });
    } else {
      console.log(" geolocation is not available ");
    }
  });
}
