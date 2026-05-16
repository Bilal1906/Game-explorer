// 
// Toon een toast melding onderaan het scherm
// 
export const showToast = (message, duration = 2500) => {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  // Verberg de toast na X milliseconden
  setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
};

// 
// Toon een laad-animatie in een container
// 
export const showLoader = (container) => {
  container.innerHTML = `
    <div class="loader-wrap">
      <div class="loader"></div>
      <p>Loading games...</p>
    </div>
  `;
};

// 
// Toon een foutmelding in een container
// 
export const showError = (container, message) => {
  container.innerHTML = `
    <div class="error-state">
      <span>⚠️</span>
      <p>${message}</p>
    </div>
  `;
};