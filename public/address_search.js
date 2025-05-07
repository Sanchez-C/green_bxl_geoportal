const input = document.getElementById('searchInput');
const suggestionsList = document.getElementById('suggestions');

// 👉 ECOUTEUR POUR LES SUGGESTIONS (à l'extérieur du submit)
input.addEventListener('input', async (e) => {
  const value = e.target.value.trim();

  if (value.length < 3) {
    suggestionsList.innerHTML = '';
    suggestionsList.classList.remove('visible');
    input.setAttribute('autocomplete', 'on'); // Réactive autocomplete
    return;
  }

  try {
    const res = await fetch(`/api/search/suggestions?adresse=${encodeURIComponent(value)}`);
    const suggestions = await res.json();

    // Désactive les suggestions natives quand on en affiche
    input.setAttribute('autocomplete', 'off'); 

    // 👉 on vérifie si la liste est actuellement masquée
    const wasHidden = !suggestionsList.classList.contains('visible');

    suggestionsList.innerHTML = '';
    suggestions.forEach(suggestion => {
      const li = document.createElement('li');
      li.textContent = suggestion.name_fr;
      li.addEventListener('click', () => {
        const currentValue = input.value.trim();
        // Regex pour capturer un numéro ou un mot avant la suggestion
        const match = currentValue.match(/^(\d{1,5}[A-Za-z]?(?:\s*(bis|ter|quater))?)\s*/); // Capture les numéros au début (ou un numéro suivi d'une lettre ou de bis, ter ou quater)
        let prefix = '';
        if (match) {
          prefix = match[1] + ' ';
        }
        input.value = prefix + suggestion.name_fr;
        suggestionsList.innerHTML = '';
        suggestionsList.classList.remove('visible');
      });
      suggestionsList.appendChild(li);
    });

    if (suggestions.length && wasHidden) {
      // afficher avec animation
      suggestionsList.classList.add('visible');
    } else if (!suggestions.length) {
      suggestionsList.classList.remove('visible');
    }

  } catch (err) {
    console.error("Erreur lors de la requête de suggestions :", err);
  }
});

// 👉 ECOUTEUR POUR LE SUBMIT DE LA RECHERCHE
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault(); // bloque le rechargement

  const adresse = input.value.trim();
  const distance = document.getElementById("distanceInput").value || 500;
  const errorDiv = document.getElementById('adresseError');

  // Utilise une regex pour extraire un numéro au début
  const match = adresse.match(/(\d{1,5}[A-Za-z]?)(?:\s*(bis|ter|quater))?/i); // accepte "12", "12A", etc.

  if (!adresse) {
    errorDiv.textContent = "Veuillez entrer une adresse.";
    errorDiv.style.display = 'block';
    return;
  }

  if (!match) {
    errorDiv.textContent = "Veuillez indiquer un numéro dans l'adresse (ex: 16 Rue de la Loi).";
    errorDiv.style.display = 'block';
    return;
  }

  // Sinon, on redirige
  window.location.href = `/geoportal.html?adresse=${encodeURIComponent(adresse)}&distance=${distance}`;
});

// 👉 MASQUER LES SUGGESTIONS SI L'UTILISATEUR CLIQUE EN DEHORS
document.addEventListener('click', function(event) {
  const searchContainer = document.querySelector('.search-row'); // Remplace `#search-container` par `.search-container`

  // Vérifie si le clic a eu lieu en dehors de la barre de recherche et de la liste
  if (!searchContainer.contains(event.target)) {
    suggestionsList.classList.remove('visible');
  }
});