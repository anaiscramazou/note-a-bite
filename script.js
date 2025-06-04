// ---------------------------------------------------
// script.js
// ---------------------------------------------------

// -------------- Show exactly one screen --------------
function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach(screen => {
    screen.style.display = "none";
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.style.display = "block";
  } else {
    console.warn("Screen not found:", screenId);
  }
}

// -------------- State Arrays --------------
const ingredients = [];
const steps = [];

// -------------- Home Screen / Recipe Name Logic --------------
function confirmRecipeName() {
  const input = document.getElementById('recipe-name');
  const confirmBtn = document.getElementById('confirm-btn');
  const editBtn = document.getElementById('edit-btn');
  if (!input || !confirmBtn || !editBtn) return;

  input.disabled = true;
  confirmBtn.style.display = 'none';
  editBtn.style.display = 'inline-block';
}

function editRecipeName() {
  const input = document.getElementById('recipe-name');
  const confirmBtn = document.getElementById('confirm-btn');
  const editBtn = document.getElementById('edit-btn');
  if (!input || !confirmBtn || !editBtn) return;

  input.disabled = false;
  confirmBtn.style.display = 'inline-block';
  editBtn.style.display = 'none';
}

// -------------- Accordion (Home Screen counters) --------------
function toggleAccordion(id, clickedElement) {
  const content = document.getElementById(id);
  if (!content) return;

  const chevron = clickedElement.querySelector('.chevron h2');
  const isExpanded = content.style.display === 'block';
  content.style.display = isExpanded ? 'none' : 'block';
  if (chevron) {
    chevron.classList.toggle('rotated', !isExpanded);
  }
}

// -------------- Ingredients Screen Logic --------------
function updateIngredientList() {
  const list = document.getElementById("ingredient-inputs");
  const count = document.querySelector(".ingredient-count");
  if (!list || !count) return;

  // First, filter out any empty‐string entries
  const nonEmpty = ingredients.filter(item => item.trim() !== '');

  // Render ONLY the nonEmpty items
  list.innerHTML = nonEmpty
    .map(item => `<li>${item}</li>`)
    .join("");

  // Show the count of nonEmpty items (not the total array length)
  count.textContent = nonEmpty.length;
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
    if (index > -1) {
      ingredients.splice(index, 1);
      div.remove();
      updateIngredientList();
    }
  };

  input.addEventListener('input', () => {
    const index = Array.from(list.children).indexOf(div);
    if (index > -1) {
      ingredients[index] = input.value;
      updateIngredientList();
    }
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      addIngredient();
      // Focus the newly added input
      const lastInput = document.querySelector(
        "#ingredients-list .ingredient-item:last-child input"
      );
      if (lastInput) lastInput.focus();
    }
  });

  div.appendChild(input);
  div.appendChild(removeBtn);
  list.appendChild(div);

  ingredients.push('');
  updateIngredientList();
}

// -------------- Steps Screen Logic --------------
function updateStepsList() {
  const listContainer = document.getElementById("step-inputs");  // Home screen’s <ul id="step-inputs">
  const countLabel    = document.querySelector(".steps-count");  // Home screen’s counter
  if (!listContainer || !countLabel) return;

  // 1) Filter out blank entries from steps[]
  const nonEmpty = steps.filter(item => item.trim() !== "");

  // 2) Render only non-empty strings as <li>…</li>
  listContainer.innerHTML = nonEmpty
    .map((text, idx) => `<li>Step ${idx + 1}: ${text}</li>`)
    .join("");

  // 3) Update the Steps counter with how many real steps exist
  countLabel.textContent = nonEmpty.length;
}


function addStep() {
  const list = document.getElementById("steps-list");  // The container on the Steps screen
  if (!list) return;

  const wrapper = document.createElement("div");
  wrapper.className = "steps-item";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "e.g. Stir-fry garlic until golden...";
  input.className = "step-input";

  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "✕";
  removeBtn.onclick = function() {
    // Find this wrapper’s index within #steps-list
    const idx = Array.from(list.children).indexOf(wrapper);
    if (idx > -1) {
      // Remove that entry from the array & DOM, then re-render
      steps.splice(idx, 1);
      wrapper.remove();
      updateStepsList();
    }
  };

  input.addEventListener("input", () => {
    const idx = Array.from(list.children).indexOf(wrapper);
    if (idx > -1) {
      steps[idx] = input.value;
      updateStepsList();
    }
  });

  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addStep();
      // Optionally, focus the newly created input:
      const lastInput = document.querySelector(
        "#steps-list .steps-item:last-child input"
      );
      if (lastInput) lastInput.focus();
    }
  });


  wrapper.appendChild(input);
  wrapper.appendChild(removeBtn);
  list.appendChild(wrapper);

  steps.push('');
  updateStepsList();
}

// -------------- Navigation Helpers --------------
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

// -------------- Image Preview --------------
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = document.getElementById('image-preview');
    if (img) {
      img.src = e.target.result;
      img.style.display = 'block'; // make sure it’s visible
    }
  };
  reader.readAsDataURL(file);
}

// -------------- Generate Recipe (placeholder) --------------
function generateRecipe() {
  alert("✨ Recipe generated!");
}

// ---------------------------------------------------
// Bind everything once the DOM is fully loaded
// ---------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 script.js loaded and DOM is ready");

  // Show the start screen by default
  window.showScreen('start-screen');

  // Bind “New Recipe” button
  const newBtn = document.getElementById('start-new-recipe');
  console.log("🔍 Found start-new-recipe button:", newBtn);
  if (newBtn) {
    newBtn.addEventListener('click', () => {
      console.log("🖱 'New Recipe' clicked—switching to home-screen");
      window.showScreen('home-screen');
    });
  } else {
    console.warn("❌ Could not find #start-new-recipe button");
  }

  // Bind Confirm/Edit buttons
  const confirmBtn = document.getElementById('confirm-btn');
  if (confirmBtn) confirmBtn.addEventListener('click', window.confirmRecipeName);
  const editBtn = document.getElementById('edit-btn');
  if (editBtn) editBtn.addEventListener('click', window.editRecipeName);

  // Bind image upload listener
  const imageInput = document.getElementById('preview-image');
  if (imageInput) imageInput.addEventListener('change', window.handleImageUpload);
});

// ---------------------------------------------------
// Service Worker registration (unchanged)
// ---------------------------------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('✅ Service Worker registered:', reg.scope))
      .catch(err => console.error('❌ Service Worker registration failed:', err));
  });
}