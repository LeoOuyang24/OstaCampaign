import {posToLatLng} from "./markers.js";

//this function allows us to construct paths in load.json using a mix of location names, coordinates, and curve instructions
//if a curve instruction is not provided, L is used by default (leaflet curve default)
function loadPoints(obj,path,places)
{
   //start each path at the obj location
   var points = ['M',posToLatLng(obj.pos)];
   var pathPoints = path.points

   //for each point on the path...
   for (let g = 0; g < path.points.length; g ++)
   {
      let val = path.points[g]
      if (typeof val === "string")
      {
         //location name, find the corresponding position and add to path
         if (val.length > 1)
         {
            let target = places.array.find((obj) => obj.name == val)
            if (target)
            {
               points.push(posToLatLng(target.pos))
            }
         }
         //leaflet curve instruction, add it directly
         else if (val.length == 1)
         {
            points.push(val)
         }
      }
      //a coordinate, convert to LatLng and add to path
      else if (Array.isArray(val))
      {
         points.push(posToLatLng(val))
      }
   }
   //close our path
   //points.push('Z')  
   return points
}

//load paths for the location
//you'll have to also provide the map to add to and the total parsed yaml file
export function loadPaths(obj,map,places)
{
   if (obj.paths)
   {
      //for each path...
      for (let j = 0; j < obj.paths.length; j ++)
      {
         let path = obj.paths[j]

         //load points for path
         let points = loadPoints(obj,path,places)         //add to map
         let options = {color:'#FF0000'}

         //seaborne specific path options
         if (path.boat)
         {
            options.color = 'cyan'
            options.dashArray = '1 4'
         }
        
         if (path.color)
         {
            options.color = path.color
         }

         L.curve(points,options).bindTooltip(path.distance).addTo(map)

         //let result = curve.addTo(map)
      }
   }
}