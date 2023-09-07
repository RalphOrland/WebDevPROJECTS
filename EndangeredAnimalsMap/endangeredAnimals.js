var southWest = L.latLng(-90, -180); // Southwest corner of the bounds (latitude, longitude)
var northEast = L.latLng(90, 180);   // Northeast corner of the bounds (latitude, longitude)
var bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
    minZoom: 2,
    maxZoom: 5,
    maxBounds: bounds, // Set the maximum bounds for the map
}).setView([32, 53], 3);

L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: '<a href="https://stamen.com">Stamen</a>',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
}).addTo(map);

// Custom icon for the elephant marker
var elephantIcon = L.icon({
    iconUrl: 'icons/elephant-icon.png', // path to elephant icon image
    iconSize: [120, 120],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

// Custom icon for the leopard marker
var leopardIcon = L.icon({
    iconUrl: 'icons/leopard-icon.png', // path to leopard icon image
    iconSize: [90, 50],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var rhinoIcon = L.icon({
    iconUrl: 'icons/blackRhino-icon.png', // path to leopard icon image
    iconSize: [100, 60],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var grauerGorillaIcon = L.icon({
    iconUrl: 'icons/grauerGorilla-icon.png', // path to leopard icon image
    iconSize: [80, 65],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});


// Custom icon for the country markers
var countryIcon = L.icon({
    iconUrl: 'icons/pin-icon.png', // Replace with the path to your pin icon image (with transparent background)
    iconSize: [40, 40],
    iconAnchor: [15, 45],
    popupAnchor: [0, -30],
});

// Define a separate layer group for animal markers
var animalMarkers = L.layerGroup().addTo(map);

// Define a separate layer group for country markers
var countryMarkers = L.layerGroup().addTo(map);

var endangeredAnimals = [
    {
        name: 'African Forest Elephant',
        latlng: [30, 14.0], // Replace these coordinates with the actual coordinates of the African Forest Elephant
        status: 'Critically Endangered',
        height: '8-10 feet',
        weight: '2-5 tons',
        habitats: 'dense tropical forests',
        countries: ['Gabon', 'Republic of Congo', 'Cameroon'], // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/african-forest-elephant" target="_blank">https://www.worldwildlife.org/species/african-forest-elephant</a>',
        image: 'animalImages/african_forest_elephant.png', // Add the image URL here
    },

    {
        name: 'Amur Leopard',
        latlng: [45.75, 127.5], // Replace these coordinates with the actual coordinates of the Amur Leopard
        status: 'Critically Endangered',
        population: 'More than 84 individuals',
        scientificName: '_Panthera pardus orientalis_',
        weight: '70 - 105 pounds',
        habitats: 'Temperate, Broadleaf, and Mixed Forests',
        countries: ['Russia', 'China', 'North Korea'], // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/amur-leopard" target="_blank">https://www.worldwildlife.org/species/amur-leopard</a>',
        image: 'animalImages/amur_leopard.png', // Add the image URL here
    },

    {
        name: 'Black Rhinoceros',
        latlng: [-5.30, 25.82], 
        status: 'Critically Endangered',
        population: 'More than 6,000',
        scientificName: '_Diceros bicornis_',
        weight: '1,760 -3,080 pounds',
        habitats: 'Temperate, Broadleaf, and Mixed Forests',
        countries: ['Kenya', 'Tanzania', 'Namibia', 'South Africa', 'Zimbabwe'],  // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/black-rhino" target="_blank">https://www.worldwildlife.org/species/black-rhino</a>',
        image: 'animalImages/black_rhino.png', // Add the image URL here
    },

    {
        name: 'Eastern Lowland Gorilla',
        latlng: [-0.2, 15], 
        status: 'Critically Endangered',
        population: 'Unknown',
        scientificName: '_Gorilla beringei graueri_',
        height: '4 to 5 ½ feet tall when standing on two feet',
        weight: 'Up to 440 pounds',
        habitats: 'Tropical and Subtropical Moist Broadleaf Forests',
        countries: ['Republic of Congo'],
        description:
            'To learn more about these incredible gorillas, visit: <a href="https://www.worldwildlife.org/species/eastern-lowland-gorilla" target="_blank">https://www.worldwildlife.org/species/eastern-lowland-gorilla</a>',
        image: 'animalImages/grauers_gorilla.png',
    },
    
    //  animals here...
];

// Function to get the center of a country based on its name
function getCountryCenter(country) {
  
    const countryCenters = {
        'Gabon': [-0.6, 11.6], // Replace these coordinates with the actual coordinates of the countries
        'Republic of Congo': [-0.2, 15],
        'Cameroon': [6, 12],
        'Russia': [61.5240, 105.3188],
        'China': [35.8617, 104.1954],
        'North Korea': [40.3399, 127.5101],
        'Kenya': [-1.2921, 36.8219],
        'Tanzania': [-6.369028, 34.888822],
        'Namibia': [-22.9576, 18.4904],
        'South Africa': [-30.5595, 22.9375],
        'Zimbabwe': [-19.0154, 29.1549],
        // Add more countries and their center coordinates as needed
    };
    return countryCenters[country];
}

var mouseoverTimer;
var currentAnimalMarker;

endangeredAnimals.forEach(animal => {
    var marker;
    if (animal.name === 'African Forest Elephant') {
        marker = L.marker(animal.latlng, { icon: elephantIcon }).addTo(map);
    } else if (animal.name === 'Amur Leopard') {
        marker = L.marker(animal.latlng, { icon: leopardIcon }).addTo(map);
    }
      else if (animal.name === 'Black Rhinoceros') {
        marker = L.marker(animal.latlng, { icon: rhinoIcon }).addTo(map);
    }
      else if (animal.name === 'Eastern Lowland Gorilla') {
        marker = L.marker(animal.latlng, { icon: grauerGorillaIcon }).addTo(map);
    }   

    var popupContent = `<div class="popup-container"><b>${animal.name}</b><br>
    <b>Status:</b>  <span style="color: red">${animal.status}</span><br>`;

    if (animal.height) {
        popupContent += `<b>Height:</b> ${animal.height}<br>`;
    }

    if (animal.weight) {
        popupContent += `<b>Weight:</b> ${animal.weight}<br>`;
    }

    if (animal.habitats) {
        popupContent += `<b>Habitats:</b> ${animal.habitats}<br>`;
    }

    if (animal.countries.length > 0) {
        popupContent += '<b>Countries:</b> <ul>';
        animal.countries.forEach(country => {
            popupContent += `<li>${country}</li>`;
        });
        popupContent += '</ul>';
    }

    popupContent += '<div class="image-popup-container">'; // Image popup container starts here

    // Add the image to the popup content
    popupContent += `<img class="image-popup" src="${animal.image}" alt="${animal.name} Image">`;

    popupContent += '</div>'; // Image popup container ends here
 
    popupContent += '<br>'; 

    popupContent += `${animal.description}</div>`; // Description div ends here

    marker.bindPopup(popupContent);

// Event listener for the marker mouseover event
marker.on('mouseover', function () {
    // Calculate the new icon size (2x of the original size)
    var originalIconSize = (animal.name === 'African Forest Elephant') ? [80, 80] : [70, 40];
    var newIconSize = originalIconSize.map(size => size * 2);

    // Calculate the icon anchor and popup anchor
    var iconAnchor = [newIconSize[0] / 2, newIconSize[1]];
    var popupAnchor = [0, -newIconSize[1] / 2];

      
          // Set the default icon path for any other animal
this.setIcon(
    L.icon({
      iconUrl:
        animal.name === 'African Forest Elephant'
          ? 'icons/elephant-icon.png'
          : animal.name === 'Amur Leopard'
          ? 'icons/leopard-icon.png'
          : animal.name === 'Black Rhinoceros'
          ? 'icons/blackRhino-icon.png'
          : animal.name === 'Eastern Lowland Gorilla'
          ? 'icons/grauerGorilla-icon.png'
          : 'icons/default-icon.png', 
          
          iconSize: newIconSize,
          iconAnchor: iconAnchor,
          popupAnchor: popupAnchor,
    })
  );
  

      // Create an object to map animal names to their icons
const animalIcons = {
    'African Forest Elephant': elephantIcon,
    'Amur Leopard': leopardIcon,
    'Black Rhinoceros': rhinoIcon,
    'Eastern Lowland Gorilla' : grauerGorillaIcon,
  };
  
  // Event listener for the marker mouseout event
  marker.on('mouseout', function () {
    // Get the appropriate icon from the animalIcons object based on the animal name
    const animalIcon = animalIcons[animal.name] || defaultIcon;
  
    // Restore the original icon size on mouseout
    this.setIcon(animalIcon);
    clearTimeout(mouseoverTimer); // Clear the mouseover timer
  });
  
        // Show the pins when hovering over the animal icon after a delay of 200ms
        mouseoverTimer = setTimeout(function () {
            animalMarkers.clearLayers(); // Clear existing animal pins
            countryMarkers.clearLayers(); // Clear existing country pins

          // Add markers to countries where the animal lives
animal.countries.forEach(country => {
    var countryMarker = L.marker(getCountryCenter(country), { icon: countryIcon }).addTo(countryMarkers);
    // Remove the line below to disable click popup
    // countryMarker.bindPopup(country);

    // Add event listeners to show/hide the tooltip on hover
    countryMarker.on('mouseover', function () {
        this.openTooltip();
    });

    countryMarker.on('mouseout', function () {
        this.closeTooltip();
    });

    // Add tooltip to the country marker
    countryMarker.bindTooltip(country, { permanent: false, direction: 'top' });
});

            animalMarkers.addTo(map); // Show the animal pins when hovering over the animal icon
        }, 200);
    });

// Event listener for the marker click event
    // Event listener for the marker click event
    marker.on('click', function () {
        // Hide the previous description container if it's open
        var previousDescription = document.querySelector('#animal-description-container');
        if (previousDescription.style.display === 'block') {
            previousDescription.style.display = 'none';
        }

        // Show the description container for the clicked animal
        var descriptionContainer = document.querySelector('#animal-description-container');
        descriptionContainer.style.display = 'block';
        descriptionContainer.innerHTML = `
            <div id="animal-name">${animal.name}</div>
            <div id="animal-status">${animal.status}</div>
            <div class="animal-detail">Height: ${animal.height}</div>
            <div class="animal-detail">Weight: ${animal.weight}</div>
            <div class="animal-detail">Habitats: ${animal.habitats}</div>
            <div class="animal-detail">Countries: ${animal.countries.join(', ')}</div>
            <div class="animal-detail">${animal.description}</div>
        `;

        // Update the position of the description container relative to the marker position
        var markerLatLng = marker.getLatLng();
        var mapContainer = document.querySelector('#map-container');
        var mapWidth = mapContainer.offsetWidth;
        var descriptionWidth = descriptionContainer.offsetWidth;
        var descriptionHeight = descriptionContainer.offsetHeight;
        descriptionContainer.style.top = (markerLatLng.y - descriptionHeight - 20) + 'px';
        descriptionContainer.style.left = (mapWidth - descriptionWidth - 20) + 'px';



// Event listener for the map click event to clear the pins when clicking elsewhere on the map
map.on('click', function () {
    animalMarkers.clearLayers();
    countryMarkers.clearLayers();
});

});


});