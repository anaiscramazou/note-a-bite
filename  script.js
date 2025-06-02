// Show a specific screen by ID
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => screen.style.display = "none");

  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = "block";
  } else {
    console.warn("Screen not found:", screenId);
  }
}

// State
const ingredients = [];
const steps = [];

// Confirm and edit recipe name
function confirmRecipeName() {
  const input = document.getElementById('recipe-name');
  const confirmBtn = document.getElementById('confirm-btn');
  const editBtn = document.getElementById('edit-btn');

  input.disabled = true;
  confirmBtn.style.display = 'none';
  editBtn.style.display = 'inline-block';
}

function editRecipeName() {
  const input = document.getElementById('recipe-name');
  const confirmBtn = document.getElementById('confirm-btn');
  const editBtn = document.getElementById('edit-btn');

  input.disabled = false;
  confirmBtn.style.display = 'inline-block';
  editBtn.style.display = 'none';
}

// Accordion toggle (for Home screen counters)
function toggleAccordion(id, clickedElement) {
  const content = document.getElementById(id);
  const chevron = clickedElement.querySelector('.chevron h2');
  const isExpanded = content.style.display === 'block';

  content.style.display = isExpanded ? 'none' : 'block';
  if (chevron) chevron.classList.toggle('rotated', !isExpanded);
}

// Ingredient list management
function updateIngredientList() {
  const list = document.getElementById("ingredient-inputs");
  const count = document.querySelector(".ingredient-count");
  if (list) {
    list.innerHTML = ingredients.map(item => `<li>${item}</li>`).join("");
  }
  if (count) {
    count.textContent = ingredients.length;
  }
}

function addIngredient() {
  const list = document.getElementById('ingredients-list');
  if (!list) return;

  const div = document.createElement('div');
  div.className = 'ingredient-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'e.g. 1 cup of flour';
  input.className = 'ingredient-input';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = '✕';
  removeBtn.onclick = function () {
    const index = Array.from(list.children).indexOf(div);
    ingredients.splice(index, 1);
    div.remove();
    updateIngredientList();
  };

  input.addEventListener('input', () => {
    const index = Array.from(list.children).indexOf(div);
    ingredients[index] = input.value;
    updateIngredientList();
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
    }
  });

  div.appendChild(input);
  div.appendChild(removeBtn);
  list.appendChild(div);

  ingredients.push('');
  updateIngredientList();
}

// Steps list management
function updateStepsList() {
  const list = document.getElementById("step-inputs");
  const count = document.querySelector(".steps-count");
  if (list) {
    list.innerHTML = steps
      .map((item, index) => `<li>Step ${index + 1}: ${item}</li>`)
      .join("");
  }
  if (count) {
    count.textContent = steps.length;
  }
}

function addStep() {
  const list = document.getElementById('steps-list');
  if (!list) return;

  const div = document.createElement('div');
  div.className = 'steps-item';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'e.g. Stir-fry garlic until golden...';
  input.className = 'step-input';

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = '✕';
  removeBtn.onclick = function () {
    const index = Array.from(list.children).indexOf(div);
    steps.splice(index, 1);
    div.remove();
    updateStepsList();
  };

  input.addEventListener('input', () => {
    const index = Array.from(list.children).indexOf(div);
    steps[index] = input.value;
    updateStepsList();
  });

  div.appendChild(input);
  div.appendChild(removeBtn);
  list.appendChild(div);

  steps.push('');
  updateStepsList();
}

// Navigation functions
function navigateToIngredients() {
  showScreen('ingredients-screen');
}

function navigateToSteps() {
  showScreen('steps-screen');
}

function goHome() {
  showScreen('home-screen');
  updateIngredientList();
  updateStepsList();
}

// Image preview
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById('image-preview');
      if (img) {
        img.src = e.target.result;
        img.style.display = 'block';
      }
    };
    reader.readAsDataURL(file);
  }
}

// Generate recipe (placeholder)
function generateRecipe() {
  alert("✨ Recipe generated!");
}

// Initial event bindings
document.addEventListener("DOMContentLoaded", function () {
  // Always start on the start screen
  showScreen('start-screen');

  // Image upload listener
  document.getElementById('preview-image')?.addEventListener('change', handleImageUpload);

  // Confirm/Edit recipe name
  document.getElementById('confirm-btn')?.addEventListener('click', confirmRecipeName);
  document.getElementById('edit-btn')?.addEventListener('click', editRecipeName);

  // “New Recipe” button on the Start screen
  document.getElementById('start-new-recipe')?.addEventListener('click', () => {
    showScreen('home-screen');
  });

  // Note: The following navigation buttons still rely on inline onclicks in your HTML:
  //   - In Home screen: <h2 onclick="navigateToIngredients()"> and <h2 onclick="navigateToSteps()">
  //   - In Ingredients screen: <button onclick="goHome()">Back to Home</button>
  //   - In Steps screen: <button onclick="goHome()">Back</button>
  //   - In Share screen: <button onclick="showScreen('home-screen')">New Recipe</button>
});

// Service Worker registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('❌ Service Worker registration failed:', err));
  });
}