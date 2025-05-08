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

// Recipe Name
    // Wait until the DOM is ready before attaching event listeners
    document.addEventListener('DOMContentLoaded', function() {
        const confirmBtn = document.getElementById('confirm-btn');
        const editBtn = document.getElementById('edit-btn');
        const recipeNameInput = document.getElementById('recipe-name');
    
    function confirmRecipeName() {
      // Disable the input field and hide the confirm button
      recipeNameInput.disabled = true;
      confirmBtn.style.display = 'none';
      
      // Show the edit button
      editBtn.style.display = 'inline-block';
    }
  
    function editRecipeName() {
      // Enable the input field for editing
      recipeNameInput.disabled = false;
      
      // Show the confirm button and hide the edit button
      confirmBtn.style.display = 'inline-block';
      editBtn.style.display = 'none';
    }
  
    // Attach the functions to the buttons
    confirmBtn.addEventListener('click', confirmRecipeName);
    editBtn.addEventListener('click', editRecipeName);
  });

// Chevron toggle
function toggleAccordion(contentId, chevronEl) {
  const content = document.getElementById(contentId);
  const isVisible = content.style.display === 'block';

  content.style.display = isVisible ? 'none' : 'block';

  // Rotate chevron if expanded
  if (chevronEl) {
    chevronEl.classList.toggle('rotate', !isVisible);
  }
}

// Navigate to Ingredients Screen
function navigateToIngredients() {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => screen.style.display = 'none');

  // Show the ingredients screen
  const ingredientsScreen = document.getElementById('ingredients-screen');
  ingredientsScreen.style.display = 'block';
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

// Navigate to Steps Screen
function navigateToSteps() {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => screen.style.display = 'none');

  // Show the steps screen
  const stepsScreen = document.getElementById('steps-screen');
  stepsScreen.style.display = 'block';
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

// Bottom Navigation
function goHome(button) {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => screen.style.display = 'none');

  // Show the home screen
  const homeScreen = document.getElementById('home-screen');
  homeScreen.style.display = 'block';
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
