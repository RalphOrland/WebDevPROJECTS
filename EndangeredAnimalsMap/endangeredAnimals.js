var southWest = L.latLng(-90, -180); // Southwest corner of the bounds (latitude, longitude)
var northEast = L.latLng(90, 180);   // Northeast corner of the bounds (latitude, longitude)
var bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {
    minZoom: 3,
    maxZoom: 4,
    maxBounds: bounds, // Set the maximum bounds for the map
}).setView([15, 30], 2);

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
    iconSize: [110, 110],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

// Custom icon for the leopard marker
var leopardIcon = L.icon({
    iconUrl: 'icons/leopard-icon.png', 
    iconSize: [90, 50],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var rhinoIcon = L.icon({
    iconUrl: 'icons/blackRhino-icon.png', 
    iconSize: [85, 50],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var grauerGorillaIcon = L.icon({
    iconUrl: 'icons/grauerGorilla-icon.png', 
    iconSize: [75, 60],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var giantPandaIcon = L.icon({
    iconUrl: 'icons/giantPanda-icon.png', 
    iconSize: [82, 60],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var tigerIcon = L.icon({
    iconUrl: 'icons/tiger-icon.png', 
    iconSize: [95, 52.5],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var whaleSharkIcon = L.icon({
    iconUrl: 'icons/whaleShark-icon.png',
    iconSize: [120, 80],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var polarBearIcon = L.icon({
    iconUrl: 'icons/polarBear-icon.png', 
    iconSize: [85, 90],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var amazonRiverDolphinIcon = L.icon({
    iconUrl: 'icons/amazonRiverDolphin-icon.png', 
    iconSize: [110, 90],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

var galapagosPenguinIcon = L.icon({
    iconUrl: 'icons/galapagosPenguin-icon.png', 
    iconSize: [90, 85],
    iconAnchor: [35, 35],
    popupAnchor: [0, -35],
});

// Custom icon for the country markers
var countryIcon = L.icon({
    iconUrl: 'icons/pin-icon.png', // Replace with the path to pin icon image (with transparent background)
    iconSize: [40, 40],
    iconAnchor: [15, 45],
    popupAnchor: [0, -30],
    zIndex: 1,
});

      // Create an object to map animal names to their icons
      const animalIcons = {
        'African Forest Elephant': elephantIcon,
        'Amur Leopard': leopardIcon,
        'Black Rhinoceros': rhinoIcon,
        'Eastern Lowland Gorilla' : grauerGorillaIcon,   
        'Giant Panda': giantPandaIcon,
        'Tiger': tigerIcon,
        'Whale-Shark': whaleSharkIcon,
        'Polar Bear' : polarBearIcon,
        'Amazon River Dolphin' : amazonRiverDolphinIcon,
        'Galapagos Penguin' : galapagosPenguinIcon,
        
      };


// Define a separate layer group for animal markers
var animalMarkers = L.layerGroup().addTo(map);

// Define a separate layer group for country markers
var countryMarkers = L.layerGroup().addTo(map);

var endangeredAnimals = [
    {
        name: 'African Forest Elephant',
        latlng: [22, 18.0], // Replace these coordinates with the actual coordinates of the African Forest Elephant
        status: 'Critically Endangered',
        height: '8-10 feet',
        weight: '2-5 tons',
        habitats: 'dense tropical forests',
        countries: ['Gabon', 'Republic of Congo', 'Cameroon'], // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/african-forest-elephant" style="color: #8adf82"; target="_blank">https://www.worldwildlife.org/species/african-forest-elephant</a>',
        image: 'animalImages/african_forest_elephant.png', // Add the image URL here
    },

    {
        name: 'Amur Leopard',
        latlng: [45.75, 127.5], // Replace these coordinates with the actual coordinates of the Amur Leopard
        status: 'Critically Endangered',
        population: 'More than 84 individuals',
        scientificName: '<i>Panthera pardus orientalis</i>',
        weight: '70 - 105 pounds',
        habitats: 'Temperate, Broadleaf, and Mixed Forests',
        countries: ['Russia', 'China', 'North Korea'], // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/amur-leopard" style="color: #8adf82"; target="_blank">https://www.worldwildlife.org/species/amur-leopard</a>',
        image: 'animalImages/amur_leopard.png', // Add the image URL here
    },

    {
        name: 'Black Rhinoceros',
        latlng: [5.30, 30.82], 
        status: 'Critically Endangered',
        population: 'More than 6,000',
        scientificName: '<i>Diceros bicornis</i>',
        weight: '1,760 -3,080 pounds',
        habitats: 'Temperate, Broadleaf, and Mixed Forests',
        countries: ['Kenya', 'Tanzania', 'Namibia', 'South Africa', 'Zimbabwe'],  // Add the countries where the animal lives
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/black-rhino"style="color: #8adf82"; target="_blank">https://www.worldwildlife.org/species/black-rhino</a>',
        image: 'animalImages/black_rhino.png', // Add the image URL here
    },

    {
        name: 'Eastern Lowland Gorilla',
        latlng: [-4.2, 15], 
        status: 'Critically Endangered',
        population: 'Unknown',
        scientificName: '<i>Gorilla beringei graueri</i>',
        height: '4 to 5 ½ feet tall when standing on two feet',
        weight: 'Up to 440 pounds',
        habitats: 'Tropical and Subtropical Moist Broadleaf Forests',
        countries: ['Republic of Congo'],
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/eastern-lowland-gorilla" style="color: #8adf82"; target="_blank">https://www.worldwildlife.org/species/eastern-lowland-gorilla</a>',
        image: 'animalImages/grauers_gorilla.png',
    },

    {
        name: 'Giant Panda',
        latlng: [30.5928, 101.9019], // Replace with the actual coordinates of the Giant Panda
        status: 'Vulnerable',
        population: '1,864 in the wild',
        scientificName: '<i>Ailuropoda melanoleuca</i>',
        height: 'Adults can grow to more than four feet.',
        weight: '220-330 pounds',
        habitats: 'Temperate broadleaf and mixed forests of southwest China',
        countries: ['China'],
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/giant-panda" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/giant-panda</a>',
        image: 'animalImages/giant_panda.png' // Add the image URL here
    },
    
    {
        name: 'Tiger',
        latlng: [12.6392, 77.0], // Replace with the actual coordinates of the Tiger
        status: 'Endangered',
        population: 'About 4,500',
        scientificName: '<i>Panthera tigris</i>',
        weight: '220-660 pounds',
        length: '6-10 feet',
        habitats: 'Tropical rainforests, evergreen forests, temperate forests, mangrove swamps, grasslands, and savannas',
        countries: ['India', 'Bangladesh', 'Nepal', 'Bhutan'],
        description:
            'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/tiger" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/tiger</a>',
        image: 'animalImages/tiger.png' // Add the image URL here
    },

    {
        name: 'Whale-Shark',
        latlng: [12.8797, 121.7740],
        status: 'Endangered',
        scientificName: '<i>Rhincodon typus</i>',
        weight: 'Around 11 tons',
        length: 'Around 40 feet',
        habitats: 'Oceans',
        countries: ['Australia', 'India', 'Maldives', 'South Africa', 'Belize', 'Mexico', 'Galapagos Islands', 'Indonesia', 'Thailand', 'Philippines'],
        description:
        'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/whale-shark" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/whale-shark</a>',
        image: 'animalImages/whale_shark.png' // Add the image URL here
    },
    
    
    {

        name: 'Polar Bear',
        latlng: [71.7069, -42.6043],
        status: 'Vulnerable',
        population: '22,000-31,000',
        scientificName: '<i>Ursus maritimus</i>',
        weight: '800-1,300 pounds (males), 300-700 (females)',
        length: '6-9 feet',
        habitats: 'Arctic Ocean, sea ice, and adjacent coastal areas',
        countries: ['Canada', 'Norway', 'Greenland (Denmark)', 'Russia', 'United States (Alaska)'],
        description:
        'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/polar-bear" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/polar-bear</a>',
        image: 'animalImages/polar_bear.png'
    }, 


    {
        name: 'Amazon River Dolphin',
        latlng: [3.4653, -59.4785],
        scientificName: '<i>Inia geoffrensis</i>',
        status: 'Vulnerable',
        weight: 'Up to 352 pounds',
        length: 'Up to 9.2 feet',
        habitats: 'Rivers and Lakes',
        countries: ['Brazil', 'Bolivia', 'Peru', 'Ecuador', 'Colombia', 'Venezuela'],
        description: 'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/amazon-river-dolphin" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/amazon-river-dolphin</a>',
        image: 'animalImages/amazon_river_dolphin.png' // Add the image URL here
    },


    {
        name: 'Galapagos Penguin',
        latlng: [-0.8324, -91.1353],
        status: 'Endangered',
        population: 'fewer than 2000',
        scientificName: '<i>Spheniscus mendiculus</i>',
        countries: ['Ecuador', 'Galapagos Islands'],
        weight: '5.5 pounds',
        length: '19 inches long',
        habitats: 'Oceans',
        description: 'To know more about these magnificent creatures, visit: <a href="https://www.worldwildlife.org/species/galapagos-penguin" style="color: #8adf82" target="_blank">https://www.worldwildlife.org/species/galapagos-penguin</a>',
        image: 'animalImages/galapagos_penguin.png'
    },
    
    //  animals here...
];


// Function to get the center of a country based on its name
function getCountryCenter(country) {
  
    const countryCenters = {
        'Gabon': [-0.6, 11.6], 
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
        'India': [28.6139, 77.2090],
        'Bangladesh': [23.8103, 90.4125],
        'Nepal': [27.7172, 85.3240],
        'Bhutan': [27.4728, 89.6390],
        'Australia': [-25.2744, 133.7751], 
        'Maldives': [3.2028, 73.2207], 
        'Belize': [17.1899, -88.4976], 
        'Mexico': [23.6345, -102.5528],
        'Galapagos Islands': [-0.8324, -91.1353], 
        'Indonesia': [-2.2170, 120.9405], 
        'Thailand': [15.8700, 100.9925], 
        'Philippines': [12.8797, 121.7740],
        'Canada' : [56.1304, -106.3468],
        'Norway' : [60.4720, 8.4689],
        'Greenland (Denmark)' : [71.7069, -42.6043],
        'United States (Alaska)' : [64.2008, -149.4937],
        'Brazil': [-3.4653, -59.4785],  
        'Bolivia': [-16.5000, -64.0000], 
        'Peru': [-9.1900, -75.0152],  
        'Ecuador': [-1.8312, -78.1834],  
        'Colombia': [4.5709, -74.2973],  
        'Venezuela': [6.4238, -66.5897],  
        

    };
    return countryCenters[country];
}


endangeredAnimals.forEach(animal => {
    const icon = animalIcons[animal.name]; // Get the icon based on the animal's name
    if (icon) {
        const marker = L.marker(animal.latlng, { icon: icon }).addTo(map);

        var popupContent = `<div class="popup-container"><b>${animal.name}</b><br>
        <b>Status:</b>  <br>`;

        
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

// Event listener for the marker mouseover event
marker.on('mouseover', function () {
    // Calculate the new icon size (2x of the original size)

    var iconSizeMap = {
        'African Forest Elephant': [110, 110],
        'Amur Leopard': [90, 50],
        'Black Rhinoceros': [95, 60],
        'Eastern Lowland Gorilla': [75, 60],
        'Giant Panda': [85, 60],
        'Tiger' : [95, 52.5],
        'Whale-Shark' : [120, 80],
        'Polar Bear' : [88, 90],
        'Amazon River Dolphin' : [110, 80],
        'Galapagos Penguin' : [90, 85],
    };
    
    
    // Determine the original icon size based on the animal name
    var originalIconSize = iconSizeMap[animal.name] || defaultIconSize;
    var newIconSize = originalIconSize.map(size => size * 1.6);

    // Keep the icon anchor and popup anchor the same
    var iconAnchor = [originalIconSize[0] / 2, originalIconSize[1]];
    var popupAnchor = [0, -originalIconSize[1] / 2];

        // Set the new icon size while keeping the anchor points unchanged
        marker.setIcon(
            L.icon({
                iconUrl: marker.options.icon.options.iconUrl, // Keep the same icon URL
                iconSize: newIconSize,
                iconAnchor: iconAnchor,
                popupAnchor: popupAnchor,
            })

        )

// Function to clear the pins and tooltips
function clearPinsAndTooltips() {
    animalMarkers.clearLayers(); // Clear existing animal pins
    countryMarkers.clearLayers(); // Clear existing country pins

    map.on('click', function () {
        // Clear pins and tooltips when clicking anywhere on the map
        clearPinsAndTooltips();
        removeBlinkAnimation();
    });
}



// Function to create a pin icon with the blinking animation class
function createPinIcon(country) {
    const countryMarker = L.marker(getCountryCenter(country), { icon: countryIcon }).addTo(countryMarkers);

    // Add tooltip to the country marker
    countryMarker.bindTooltip(country, { permanent: false, direction: 'top', offset: [0, -50] });

    // Add your CSS class for the blinking animation here (e.g., 'blink-animation')
    countryMarker.getElement().classList.add('blink-animation');
}

// Function to remove the blinking animation class from the active pin icons
function removeBlinkAnimation() {
    countryMarkers.eachLayer(function (layer) {
        // Remove the CSS class for blinking animation here (e.g., 'blink-animation')
        layer.getElement().classList.remove('blink-animation');
    });
}


// Event listener for the marker mouseout event
marker.on('mouseout', function () {
    // Get the appropriate icon from the animalIcons object based on the animal name
    const animalIcon = animalIcons[animal.name] || defaultIcon;

    // Restore the original icon size on mouseout
    this.setIcon(animalIcon);

    // Remove the blinking animation class when the mouse leaves the animal icon
    removeBlinkAnimation();
});

// Show the pins when hovering over the animal icon after a delay of 200ms
mouseoverTimer = setTimeout(function () {
    clearPinsAndTooltips(); // Clear pins and tooltips initially

    // Add markers to countries where the animal lives
    animal.countries.forEach(country => {
        createPinIcon(country);
    });

    animalMarkers.addTo(map); // Show the animal pins when hovering over the animal icon
}, 200);

});



    marker.on('click', function () {
        // Show the modal
        var modal = document.getElementById('animal-modal');
        modal.style.display = 'block';

        // Populate modal content with animal information
        var descriptionContainer = document.getElementById('animal-description-container');
        descriptionContainer.innerHTML = `
        <img src="${animal.image}" alt="${animal.name} Image">
        <h3 id="animal-name">${animal.name}</h3>
        <div id="animal-status" style="color: red; font-weight: bold;">${animal.status}</div>
        <div class="animal-detail" style="color: white;"><span style="font-weight: bold; font-size: 16px;">Height:</span> ${animal.height}</div>
        <div class="animal-detail" style="color: white;"><span style="font-weight: bold; font-size: 16px;">Weight:</span> ${animal.weight}</div>
        <div class="animal-detail" style="color: white;"><span style="font-weight: bold; font-size: 16px;">Scientific Name:</span> ${animal.scientificName}</div>
        <div class="animal-detail" style="color: white;"><span style="font-weight: bold; font-size: 16px;">Habitats:</span> ${animal.habitats}</div>
        <div class="animal-detail" style="color: white;"><span style="font-weight: bold; font-size: 16px;">Countries:</span> ${animal.countries.join(', ')}</div>
        <br/>
        <div class="animal-detail" style="color: #66d825; font-size: 16px;">${animal.description}</div>
        
    `;
    
        // Event listener for the modal close button
        var modalClose = document.getElementById('modal-close');
        modalClose.addEventListener('click', function () {
            modal.style.display = 'none'; // Close the modal
        });

        // Event listener to close the modal when clicking outside the modal content
        window.addEventListener('click', function (event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });

        
    });
}

});