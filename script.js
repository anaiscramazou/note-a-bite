// Helper to show a specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll(".screen");
    screens.forEach(screen => screen.style.display = "none");

    // Show selected screen
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = "block";
    } else {
        console.warn("Screen not found: " + screenId);
    }
}
  
  // Accordion toggle
  function toggleAccordion(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('accordion-content')) {
      content.classList.toggle('open');
    }
  }
  
  // Ingredient handling
  function addIngredient() {
    const list = document.getElementById('ingredients-list');
    const div = document.createElement('div');
    div.className = 'ingredient-item';
    div.innerHTML = `
      <input type="text" placeholder="e.g. 1 cup of flour" class="ingredient-input" />
      <button class="remove-btn" onclick="removeIngredient(this)">✕</button>
    `;
    list.appendChild(div);
    updateCount('ingredient-count', list.querySelectorAll('.ingredient-item').length);
  }
  
  function removeIngredient(button) {
    const item = button.parentElement;
    item.remove();
    updateCount('ingredient-count', document.querySelectorAll('.ingredient-item').length);
  }
  
  // Steps handling
  function addStep() {
    const list = document.getElementById('steps-list');
    const div = document.createElement('div');
    div.className = 'steps-item';
    div.innerHTML = `
      <textarea placeholder="e.g. Stir-fry garlic until golden..." class="step-input"></textarea>
      <button class="remove-btn" onclick="removeStep(this)">✕</button>
    `;
    list.appendChild(div);
    updateCount('step-count', list.querySelectorAll('.steps-item').length);
  }
  
  function removeStep(button) {
    const item = button.parentElement;
    item.remove();
    updateCount('step-count', document.querySelectorAll('.steps-item').length);
  }
  
  // Utility to update count in accordion
  function updateCount(id, count) {
    const counter = document.getElementById(id);
    if (counter) counter.textContent = count;
  }
  
  // Image preview
  document.getElementById('preview-image').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById('preview-image').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Placeholder for generate button
  function generateRecipe() {
    alert("✨ Recipe generated! (This can be customized later)");
  }
  
  // Navigation (optional, for multi-screen flow)
  function goBack() {
    // Implement logic to go to the previous screen
    alert("Go back logic");
  }
  
  function goNext() {
    // Implement logic to go to the next screen
    alert("Go next logic");
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('✅ Service Worker registered:', reg.scope))
        .catch(err => console.error('❌ Service Worker registration failed:', err));
    });
  }
