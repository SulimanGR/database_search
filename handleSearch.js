// Function to handle search
function handleSearch() {
    const calories = document.getElementsByName('text')[0].value;
    const protein = document.getElementsByName('text')[1].value;
    const carbohydrates = document.getElementsByName('text')[2].value;

    fetch(`http://localhost:4000/data?calories=${calories}&protein=${protein}&carbohydrates=${carbohydrates}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
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
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Add event listener to search button
document.getElementById('search').addEventListener('click', handleSearch);

// Add event listeners to search bars for "Enter" key press
document.getElementsByName('text')[0].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.getElementsByName('text')[1].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

document.getElementsByName('text')[2].addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});
