import {sidebar} from "./sidebar.js"
import {loadMarkers} from "./markers.js"

export const width = 1000
export const height = 1000

var map = L.map('map', {
    crs: L.CRS.Simple
   	});
var bounds = [[0,0], [width,height]];
var image = L.imageOverlay('sprites/map.png', bounds).addTo(map);
map.fitBounds(bounds);
map.setMaxBounds(bounds)

map.on("click",(e) => document.getElementById("sidebar").style.display = "none")

sidebar.addTo(map)

loadMarkers(map)
