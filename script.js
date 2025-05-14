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

document.addEventListener("DOMContentLoaded", function () {
    showScreen('start-screen');
});

// HOME SCREEN

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


    // Accordion toggle
    function toggleAccordion(id, clickedElement) {
      const content = document.getElementById(id);
      const chevron = clickedElement.querySelector('.chevron h2');

      const isExpanded = content.style.display === 'block';

      // Toggle visibility
      content.style.display = isExpanded ? 'none' : 'block';

      // Toggle chevron rotation class
      if (chevron) {
        chevron.classList.toggle('rotated', !isExpanded);
      }
    }

    // Utility to update count in accordion
    function updateCount(id, count) {
      const counter = document.getElementById(id);
      if (counter) counter.textContent = count;
    }


// INGREDIENTS SCREEN

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

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'e.g. 1 cup of flour';
      input.className = 'ingredient-input';
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = '✕';
      removeBtn.onclick = function () {
        const index = Array.from(list.children).indexOf(div);
        ingredients.splice(index, 1); // Remove from array
        div.remove();
        updateCount('ingredient-count', document.querySelectorAll('.ingredient-item').length);
        updateIngredientList(); // Re-render list
      };

      input.addEventListener('input', () => {
        const index = Array.from(list.children).indexOf(div);
        ingredients[index] = input.value; // Update array with new input
        updateIngredientList();
      });

    // Enable Enter key to add another ingredient
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault(); // prevent form submission or new line
          addIngredient();
        }
      });

      div.appendChild(input);
      div.appendChild(removeBtn);
      list.appendChild(div);
      
      // Add to ingredients array
      ingredients.push(''); // add placeholder
      updateIngredientList(); // Immediately sync if there's already some input (for when going home)
      updateCount('ingredient-count', document.querySelectorAll('.ingredient-item').length);
    }



// STEPS SCREEN
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

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'e.g. Stir-fry garlic until golden...';
      input.className = 'step-input';
      
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-btn';
      removeBtn.textContent = '✕';
      removeBtn.onclick = function () {
        const index = Array.from(list.children).indexOf(div);
        steps.splice(index, 1); // Remove from array
        div.remove();
        updateCount('steps-count', document.querySelectorAll('.steps-item').length);
        updateStepsList(); // Re-render list
      };

      input.addEventListener('input', () => {
        const index = Array.from(list.children).indexOf(div);
        steps[index] = input.value; // Update array with new input
        updateStepsList();
      });

      div.appendChild(input);
      div.appendChild(removeBtn);
      list.appendChild(div);
      
      // Add to steps array
      steps.push('');
      updateCount('steps-count', document.querySelectorAll('.steps-item').length);
    }


// STORING INPUTS
const ingredients = [];
const steps = [];

function updateIngredientList() {
  const list = document.getElementById("ingredient-inputs");
  const count = document.querySelector(".ingredient-count");
  list.innerHTML = ingredients.map(item => `<li>${item}</li>`).join("");
  count.textContent = ingredients.length;
}

function updateStepsList() {
  const list = document.getElementById("step-inputs");
  const count = document.querySelector(".steps-count");
  list.innerHTML = steps.map((item, index) => `<li>Step ${index + 1}: ${item}</li>`).join("");
  count.textContent = steps.length;
}


// BOTTOM NAV
function goHome(button) {
  // Hide all screens
  const allScreens = document.querySelectorAll('.screen');
  allScreens.forEach(screen => screen.style.display = 'none');

  // Show the home screen
  const homeScreen = document.getElementById('home-screen');
  homeScreen.style.display = 'block';

   // Update the lists when returning home
  console.log("Ingredients array on return:", ingredients);
  updateIngredientList();
  updateStepsList();
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


// BUTTONS
function generateRecipe() {
  alert("✨ Recipe generated!");
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
