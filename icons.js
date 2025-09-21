
export function getIcon(type)
{
	switch (type)
	{
	case "dead":
	case "Dead Kingdom":
		return deadKingIcon
	case "kingdom":
	case "Kingdom":
		return kingIcon
	case "POI":
	case "Point of Interest":
		return POIIcon
	case "village":
	case "Village":
		return villageIcon
	case "Town":
	case "City":
		return townIcon
	}
}


let POIIcon = L.icon({
    iconUrl: 'sprites/icons/POI.png',
    iconSize: [16,20]
});

let kingIcon = L.icon({
	iconUrl: 'sprites/icons/kingdom.png',
	iconSize: [40,30]
})

let villageIcon = L.icon({
	iconUrl: 'sprites/icons/village.png',
	iconSize: [20,20]
})

let townIcon = L.icon({
	iconUrl: 'sprites/icons/town.png',
	iconSize: [25,25]

})

let deadKingIcon = L.icon({
	iconUrl: 'sprites/icons/dead_kingdom.png',
	iconSize: [45,35]	
})
