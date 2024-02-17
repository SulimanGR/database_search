fetch('/index.js')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Data received from server:', data);

    // Create a container for the data
    const dataContainer = document.getElementById('dataContainer');

    // Iterate over the data and create an element for each item
    data.forEach(item => {
      // Create a new div element for the item
      const itemDiv = document.createElement('div');
      itemDiv.className = 'item';

      // Create a new h2 element for the item name
      const itemName = document.createElement('h2');
      itemName.textContent = item.name; // Assuming 'name' is a property of the item

      // Create a new p element for the item description
      const itemDescription = document.createElement('p');
      itemDescription.textContent = item.description; // Assuming 'description' is a property of the item

      // Append the item name and description to the item div
      itemDiv.appendChild(itemName);
      itemDiv.appendChild(itemDescription);

      // Append the item div to the data container
      dataContainer.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
