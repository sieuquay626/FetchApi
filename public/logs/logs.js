getData();
const root1 = document.getElementById("right");
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();
  console.log(data);
  for (let items of data) {
    const root = document.createElement("p");
    const mood = document.createElement("div");
    const geo = document.createElement("div");
    const date = document.createElement("div");
    const image = document.createElement("img");
    const dateString = new Date(items.timestamp).toLocaleString();
    mood.textContent = "mood:" + items.mood;
    geo.textContent = `(${items.lat},${items.long})`;
    date.textContent = dateString;
    image.src = items.image64;
    image.alt = "No Items";
    root.append(mood, geo, date, image);
    document.getElementById("right").append(root);
  }
}
