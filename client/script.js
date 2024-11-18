
// Load JSON data and display the fourth poster
function loadPoster() {
  fetch('back/posters.json')
    .then(response => response.json())
    .then(data => {
      const fourthPoster = data.find(poster => poster.id === 4);
      displaySVG(fourthPoster.link);
    })
    .catch(error => console.error('Error loading JSON:', error));
}
function displaySVG(link) {
  const svgObject = document.getElementById('svgObject');
  svgObject.data = link;

  svgObject.addEventListener('load', function() {
    const svgDoc = svgObject.contentDocument;
    const textElement = svgDoc.getElementById('textElementId'); // Replace with actual text element ID

    textElement.addEventListener('click', function() {
      const newText = prompt('Enter new text:', textElement.textContent);
      if (newText !== null) {
        textElement.textContent = newText;
        saveChanges(newText);
      }
    });
  });
}

// Display the SVG and enable editing
function displaySVG(link) {
    const svgObject = document.getElementById('svgObject');
    svgObject.data = link;
  
    svgObject.addEventListener('load', function() {
      const svgDoc = svgObject.contentDocument;
      const textElement = svgDoc.getElementById('textElementId'); // Replace with actual text element ID
  
      if (textElement) {
        textElement.addEventListener('click', function() {
          const newText = prompt('Enter new text:', textElement.textContent);
          if (newText !== null) {
            textElement.textContent = newText;
            saveChanges(newText);
          }
        });
      } else {
        console.error('Text element not found in SVG');
      }
    });
  }
  
function saveChanges(newText) {
  const updatedData = {
    id: 4,
    newText: newText
  };

  fetch('back/uploads/updatedPoster.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
  .then(response => response.json())
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}
window.onload = loadPoster;