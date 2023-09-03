// user-script.js
document.addEventListener('DOMContentLoaded', () => {
    const feedingList = document.getElementById('feeding-list');
    const recordButton = document.getElementById('record-feeding');
  
    recordButton.addEventListener('click', async () => {
      const feedingTime = document.getElementById('feeding-time').value;
      const selectedFoodOptions = document.querySelectorAll('#food-type option:checked');
      const selectedFoods = Array.from(selectedFoodOptions).map(option => option.value);
  
      const feedingData = {
        time: feedingTime,
        food: selectedFoods.join(', '),
      };
  
      try {
        const response = await fetch('/.netlify/functions/recordFeeding', {
          method: 'POST',
          body: JSON.stringify(feedingData),
        });
  
        if (response.ok) {
          // Clear input fields
          document.getElementById('feeding-time').value = '';
          selectedFoodOptions.forEach(option => option.selected = false);
          // Refresh feeding history after submitting
          fetchFeedingHistory();
        } else {
          console.error('Error recording feeding');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    });
  
    // Fetch and display feeding history
    const fetchFeedingHistory = async () => {
      try {
        const response = await fetch('/.netlify/functions/getFeedingHistory');
        const feedingHistory = await response.json();
        
        feedingList.innerHTML = ''; // Clear the existing list
        
        const feedingHistoryArray = Array.from(feedingHistory); // convert to array
        feedingHistoryArray.forEach(feeding => {
          const feedingEntry = document.createElement('li');
          feedingEntry.innerHTML = `
            <strong>Feeding Time:</strong> ${feeding.time}<br>
            <strong>Food Type:</strong> ${feeding.food}
          `;
          feedingList.appendChild(feedingEntry);
        });
      } catch (error) {
        console.error('An error occurred while fetching feeding history', error);
      }
    };
  
    fetchFeedingHistory(); // Initial fetch and display of feeding history
  });