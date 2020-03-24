const API_KEY = "AIzaSyAy9D4PfefAqqy5mP8UtVAnbzHrfD9u7vE";
const INITIAL_STATE = `<p>Enter the information in the following boxes:</p>

<form id="form">
    <label for="lat">Latitude</label>
    <input type="number" step="any" id="lat" /><br />
    
    <label for="lon">Longitude</label>
    <input type="number" step="any" id="lon" /><br />

    <label for="heading">Heading</label>
    <input type="number" step="any" id="heading" /><br />


    <label for="pitch">Pitch</label>
    <input type="number" step="any" id="pitch" /><br />

    <label for="fov">FOV</label>
    <input type="number" step="any" id="fov" /><br />

    <input type="submit" id="submit">
</form>`

const RESET_BUTTON = `<button onclick="reset()">Reset</button>`

function init() {
    reset();
}

function reset() {
    document.getElementById("main").innerHTML = INITIAL_STATE;
    let form = document.getElementById("form");
    form.addEventListener("submit", submitForm);
}

function validate(lat, lon, heading) {
    let valid = (lat !== "" && lon !== "" && heading !== "");

    let elems = ["lat", "lon", "heading"];

    for (let i = 0; i < elems.length; i++) {
        let val = document.getElementById(elems[i]).value;
        let className = (val === "") ? "err" : "";

        document.getElementById(elems[i]).className = className;
    }

    return valid;
}


function submitForm(e) {
    e.preventDefault();
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;
    let heading = document.getElementById("heading").value;
    let pitch = document.getElementById("pitch").value;
    let fov = document.getElementById("fov").value;

    if (validate(lat, lon, heading)) {
        let svIFrame = getStreetViewIframeHTML(lat, lon, heading, pitch, fov);
        let mapIFrame = getMapIframeHTML(lat, lon);

        let html = `${svIFrame} <br /> ${mapIFrame} <br /> ${RESET_BUTTON}`

        document.getElementById("main").innerHTML = html;
    }

}

function getStreetViewIframeHTML(lat, lon, heading, pitch, fov) {

    let link = `https://www.google.com/maps/embed/v1/streetview?key=${API_KEY}&location=${lat},${lon}&heading=${heading}`;

    if (pitch !== "") {
        link += `&pitch=${pitch}`;
    }

    if (fov != "") {
        link += `&fov=${fov}`;
    }

    return `<iframe src="${link}" width="640" height="480"></iframe>`
}

function getMapIframeHTML(lat, lon) {
    let link = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${lat},${lon}`
    return `<iframe src="${link}" width="640" height="480"></iframe>`
}