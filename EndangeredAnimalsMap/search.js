// Get references to the search input and button
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');

// Event listener for the search button click event
searchButton.addEventListener('click', function () {
    var searchText = searchInput.value.trim();
    if (searchText !== '') {
        searchMap(searchText);
    }
});

// Function to search for countries or animals on the map
function searchMap(text) {
    // Convert the search text to lowercase for case-insensitive search
    var searchTextLower = text.toLowerCase();

    // Search for countries and highlight matching ones
    countryLayer.eachLayer(function (layer) {
        var countryName = layer.feature.properties.name.toLowerCase();
        if (countryName.includes(searchTextLower)) {
            layer.setStyle({
                fillColor: 'maroon',
                fillOpacity: 0.7,
            });
            highlightedCountries.addLayer(layer);
        } else {
            layer.setStyle({
                fillColor: 'transparent',
            });
            highlightedCountries.removeLayer(layer);
        }
    });

    // Search for animals and show their popups
    animalLayer.eachLayer(function (layer) {
        var animalName = layer.feature.properties.name.toLowerCase();
        if (animalName.includes(searchTextLower)) {
            layer.openPopup();
        } else {
            layer.closePopup();
        }
    });
}
