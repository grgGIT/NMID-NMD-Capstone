document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('postersContainer');
    const overlay = document.getElementById('overlay');
    const infoPane = document.getElementById('infoPane');
    const continueButton = document.querySelector('.continue-button');
    let activeIndex = 0;
    let posters = [];

    fetch('/getPosters')
        .then(response => response.json())
        .then(data => {
            posters = data;
            renderPosters();
            updatePostersDisplay();
        })
        .catch(error => {
            console.error('Error fetching posters:', error);
            alert('Failed to load posters. Please try again later.');
        });

    function renderPosters() {
        container.innerHTML = ''; // Clear existing posters
        posters.forEach((poster, index) => {
            const posterDiv = document.createElement('div');
            posterDiv.className = 'poster';
            posterDiv.innerHTML = `<img src="${poster.link}" alt="Poster Image">`;
            posterDiv.addEventListener('click', () => showPosterDetails(index));
            container.appendChild(posterDiv);
        });
    }

    function updatePostersDisplay() {
        const posterElements = container.querySelectorAll('.poster');
        posterElements.forEach((posterElement, index) => {
            const distance = Math.abs(index - activeIndex);
            posterElement.style.opacity = 1 - distance * 0.2;
            posterElement.style.transform = `scale(${1 - distance * 0.1})`;
            posterElement.classList.toggle('active', index === activeIndex);
        });
    }

    function showPosterDetails(index) {
        activeIndex = index;
        updatePostersDisplay();
        const poster = posters[activeIndex];
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
        enableButton();

        const newCloseBtn = document.getElementById('closeBtn');
        newCloseBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
    }

    function enableButton() {
        continueButton.disabled = false;
        continueButton.classList.add('enabled');
    }

    continueButton.addEventListener('click', () => {
        if (posters[activeIndex]) {
            window.location.href = `/poster/${posters[activeIndex].id}`;
        }
    });

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    // Add keyboard navigation for rotary effect
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            activeIndex = (activeIndex + 1) % posters.length;
            updatePostersDisplay();
        } else if (event.key === 'ArrowLeft') {
            activeIndex = (activeIndex - 1 + posters.length) % posters.length;
            updatePostersDisplay();
        }
    });
});