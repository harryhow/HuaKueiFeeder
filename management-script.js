// management-script.js
document.addEventListener('DOMContentLoaded', () => {
    const catPhotoForm = document.getElementById('cat-photo-form');
    const locationDescriptionForm = document.getElementById('location-description-form');
  
    catPhotoForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const catPhotoURL = document.getElementById('cat-photo-url').value;
  
      try {
        const response = await fetch('/.netlify/functions/updateCatPhoto', {
          method: 'POST',
          body: JSON.stringify({ catPhotoURL }),
        });
  
        if (response.ok) {
          console.log('Cat photo updated successfully');
          document.getElementById('cat-photo-url').value = ''; // Clear the input field
        } else {
          console.error('Error updating cat photo');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    });
  
    locationDescriptionForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const locationDescription = document.getElementById('location-description').value;
  
      try {
        const response = await fetch('/.netlify/functions/updateLocationDescription', {
          method: 'POST',
          body: JSON.stringify({ locationDescription }),
        });
  
        if (response.ok) {
          console.log('Location description updated successfully');
          document.getElementById('location-description').value = ''; // Clear the input field
        } else {
          console.error('Error updating location description');
        }
      } catch (error) {
        console.error('An error occurred', error);
      }
    });
  });