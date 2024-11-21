document.addEventListener('DOMContentLoaded', () => {
    
    fetch('/getPosters')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('postersContainer');
            const overlay = document.getElementById('overlay');
            const infoPane = document.getElementById('infoPane');
            const continueButton = document.getElementById('continue-button');
            let activePoster = null;
            let activePosterDiv = null;

            data.forEach(poster => {
                const posterDiv = document.createElement('div');
                posterDiv.className = 'poster';

                posterDiv.innerHTML = `
                    <img src="${poster.link}" alt="Poster Image">
                    <div class="checkmark">&#10004;</div>
                `;

                posterDiv.addEventListener('click', () => {
                    overlay.classList.add('active');
                    infoPane.innerHTML = `
                        <button id="closeBtn">&times;</button>
                        <h2>Poster Details</h2>
                        <p><strong>ID:</strong> ${poster.id}</p>
                        <p><strong>Name:</strong> ${poster.name}</p>
                        <p><strong>Original Post:</strong> <a href="${poster['original post']}" target="_blank">${poster['original post']}</a></p>
                        <p><strong>Email:</strong> <a href="mailto:${poster.email}">${poster.email}</a></p>
                        <p><strong>Font:</strong> <a href="${poster.font}" target="_blank">Download Font</a></p>
                        <img src="${poster.link}" alt="Poster Image" style="max-width: 100%; border-radius: 2px;">
                    `;

                    if (activePosterDiv) {
                        activePosterDiv.classList.remove('selected');
                    }
                    posterDiv.classList.add('selected');
                    activePosterDiv = posterDiv;

                    activePoster = poster;
                    enableButton();

                    const newCloseBtn = document.getElementById('closeBtn');
                    newCloseBtn.addEventListener('click', () => {
                        overlay.classList.remove('active');
                    });
                });

                container.appendChild(posterDiv);
            });

            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) {
                    overlay.classList.remove('active');
                }
            });

            function enableButton() {
                continueButton.disabled = false;
                continueButton.classList.add('enabled');
            }

            continueButton.addEventListener('click', () => {
                if (activePoster) {
                    window.location.href = `/inputPage.html/${activePoster.id}`;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching posters:', error);
            alert('Failed to load posters. Please try again later.');
        });
});