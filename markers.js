import {sidebar} from "./sidebar.js"
import {width, height} from "./main.js"
import * as icons from "./icons.js";
import {loadPaths} from "./paths.js";
//import places from "./yaml/load.json"  with { type: 'json' };  

//creates and loads all markers based on the yaml files

//mfw when I gotta do a whole HTTP request just to fetch a local file
//idk I didn't find a better way to do this
export function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}


//function called when a marker is clicked, basically changes the sidebar
function onMapClick(e) {
    let style = document.getElementById("sidebar").style
    style.display = "initial" ;
    sidebar.update(this.props)
}

//convert json position to lat lng
export function posToLatLng(pos)
{
   return [pos[0]*height, pos[1]*width]
}

//give the city name, position
function loadMarker(name, pos)
{
   let parsed = jsyaml.load(loadFile(`./yaml/${name}.yaml`))
   let marker =  L.marker(posToLatLng(pos),{icon: icons.getIcon(parsed.type)})
   marker.props = parsed
   marker.on('click',onMapClick)
   return marker
}

//loads all our markers
export function loadMarkers(map)
{

   var places = JSON.parse(loadFile("./yaml/load.json"))

   for (let i = 0; i < places.array.length; i ++)
   {
      let obj = places.array[i]
      let marker = loadMarker(obj.name,obj.pos)
      let latlng = marker.getLatLng()
      loadPaths(obj,map,places)
      marker.addTo(map)
   }
   //console.log(points)
   //var path = L.curve(points,{color:'white'}).addTo(map)


}