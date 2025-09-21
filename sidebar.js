//creates and handles the sidebar

export let sidebar = L.control();

sidebar.onAdd = function (map) {
    this.div = L.DomUtil.create('div'); // create a div with a class "info"
    this.div.id = "sidebar"
    this.div.style.display = "none"
    this.div.addEventListener("wheel", (event) => {event.stopPropagation();}); //allows mouse scroll
    this.div.addEventListener("touchmove", (event) => {event.stopPropagation();}); //allows mobile phone scroll 
    this.div.addEventListener("click", (event) => {event.stopPropagation();}) //prevents clicking on the sidebar clearing the sidebar

    return this.div;
};

// method that we will use to update the control based on feature properties passed
sidebar.update = function (props) {
    this.div.innerHTML = `
        <div id="header">
            <img src="${props.img}">
            <h1>${props.name}</h1>  
            <h3>${props.type}</h3>`
             + (props.ruler ? `<h3>Ruled by ${props.ruler}</h3>` : "") + `

        </div>
        <div id="text">
            ${props.text}
        </div>

    `
};