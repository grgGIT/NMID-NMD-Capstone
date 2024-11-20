
document.addEventListener('DOMContentLoaded', () => {
    fetch('/getPosters')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('postersContainer');
            data.forEach(poster => {
                const posterDiv = document.createElement('div');
                posterDiv.className = 'poster';
                posterDiv.innerHTML = `
                    <strong>ID:</strong> ${poster.id}<br>
                    <strong>Name:</strong> ${poster.name}<br>
                    <strong>Title:</strong> ${poster.title || 'N/A'}<br>
                    <strong>Original Post:</strong> <a href="${poster['original post']}" target="_blank">${poster['original post']}</a><br>
                    <strong>Email:</strong> ${poster.email}<br>
                    <strong>Link:</strong> <a href="${poster.link}" target="_blank">${poster.link}</a><br>
                    <strong>Font:</strong> ${poster.font}
                `;
                container.appendChild(posterDiv);
            });
        })
        .catch(error => console.error('Error fetching posters:', error));
});
