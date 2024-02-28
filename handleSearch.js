// Function to fetch data with pagination
function fetchPaginatedData(page = 1, calories = '', protein = '', carbohydrates = '') {
    const url = new URL(`http://localhost:4000/data`);
    url.searchParams.append('page', page);
    if (calories) url.searchParams.append('calories', calories);
    if (protein) url.searchParams.append('protein', protein);
    if (carbohydrates) url.searchParams.append('carbohydrates', carbohydrates);

    console.log('Request URL:', url); // Log the URL being requested

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data from server:', data); // Log received data
            // Ensure 'data' object is defined
            if (data && data.data && Array.isArray(data.data)) {
                // Render the fetched data
                renderData(data.data); // Access 'data' property from the response object
                // Update pagination controls based on total pages
                updatePaginationControls(page, data.totalPages, calories, protein, carbohydrates);
            } else {
                console.error('Invalid data format received from server');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// Function to fetch all data initially
function fetchData() {
    fetchPaginatedData(); // Fetch the first page by default
}

// Function to handle search with pagination
function handleSearch() {
    const calories = document.getElementsByName('calories')[0].value;
    const protein = document.getElementsByName('protein')[0].value;
    const carbohydrates = document.getElementsByName('carbohydrates')[0].value;
    console.log('Search parameters:', { calories, protein, carbohydrates }); // Log the extracted parameters
    fetchPaginatedData(1, calories, protein, carbohydrates); // Search from the first page
}

// Render function to display data
function renderData(data) {
    const dataContainer = document.getElementById('dataContainer');
    dataContainer.innerHTML = '';

    data.forEach(item => {
        // Create a new div element for the item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        // Create a new h2 element for the item name
        const itemName = document.createElement('h2');
        itemName.textContent = item.name;

        // Create a new p element for the item calories
        const itemCalories = document.createElement('p');
        itemCalories.textContent = `Calories: ${item.calories}`;

        // Create a new p element for the item carbohydrates
        const itemCarbohydrates = document.createElement('p');
        itemCarbohydrates.textContent = `Carbohydrates: ${item.carbohydrates}`;

        // Create a new p element for the item protein
        const itemProtein = document.createElement('p');
        itemProtein.textContent = `Protein: ${item.protein}`;

        // Create a new p element for the item source
        const itemSource = document.createElement('p');
        itemSource.textContent = `Source: ${item.source}`;

        // Append the item name, calories, carbohydrates, protein, and source to the item div
        itemDiv.appendChild(itemName);
        itemDiv.appendChild(itemCalories);
        itemDiv.appendChild(itemCarbohydrates);
        itemDiv.appendChild(itemProtein);
        itemDiv.appendChild(itemSource);

        // Append the item div to the data container
        dataContainer.appendChild(itemDiv);
    });
}

// Pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    console.log('Previous button clicked'); // Log to check if the event is triggered
    let currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    if (currentPage > 1) {
        const { calories, protein, carbohydrates } = getCurrentSearchParams(); // Get current search parameters
        fetchPaginatedData(currentPage - 1, calories, protein, carbohydrates); // Include search parameters
        document.getElementById('currentPage').textContent = `Page ${currentPage - 1}`;
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    let currentPage = parseInt(document.getElementById('currentPage').textContent.split(' ')[1]);
    const { calories, protein, carbohydrates } = getCurrentSearchParams(); // Get current search parameters
    fetchPaginatedData(currentPage + 1, calories, protein, carbohydrates); // Include search parameters
    document.getElementById('currentPage').textContent = `Page ${currentPage + 1}`;
});

// Function to get current search parameters
function getCurrentSearchParams() {
    const calories = document.getElementsByName('calories')[0].value;
    const protein = document.getElementsByName('protein')[0].value;
    const carbohydrates = document.getElementsByName('carbohydrates')[0].value;
    console.log('Current search parameters:', { calories, protein, carbohydrates }); // Log the extracted parameters
    return { calories, protein, carbohydrates };
}

// Function to update pagination controls based on current page, total pages, and search parameters
function updatePaginationControls(currentPage, totalPages, calories, protein, carbohydrates) {
    document.getElementById('prevPage').disabled = currentPage <= 1;
    document.getElementById('nextPage').disabled = currentPage >= totalPages;

    // Update the search parameters display
    document.getElementById('currentPage').textContent = `Page ${currentPage}`;
    document.getElementsByName('calories')[0].value = calories;
    document.getElementsByName('protein')[0].value = protein;
    document.getElementsByName('carbohydrates')[0].value = carbohydrates;
}


// Add event listener to search button
document.getElementById('search').addEventListener('click', handleSearch);

// Add event listeners to search bars for "Enter" key press
document.getElementsByName('calories')[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.getElementsByName('protein')[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.getElementsByName('carbohydrates')[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Fetch all data initially when the page loads
fetchData();
