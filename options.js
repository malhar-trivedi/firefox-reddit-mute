// Function to create a new input box
function createInputBox(value = "") {
    const container = document.getElementById("filterWordsContainer");
  
    // Create a div to hold the input box and the remove button
    const div = document.createElement("div");
    div.className = "word-container";
  
    // Create the input box
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.className = "filterWordInput";
    
    // Create the remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "removeButton";
  
    // Add event listener to remove the input field when the button is clicked
    removeButton.addEventListener("click", () => {
      div.remove();
    });
  
    // Append the input box and remove button to the div
    div.appendChild(input);
    div.appendChild(removeButton);
  
    // Append the div to the container
    container.appendChild(div);
  }
  
  // Load saved filter words when the options page is opened
  browser.storage.local.get("filterWords").then((data) => {
    const filterWords = data.filterWords || [];  // Retrieve saved words or default to an empty array
    
    // Create an input box for each saved filter word
    filterWords.forEach(word => {
      createInputBox(word);
    });
  });
  
  // Add new empty input box when 'Add Word' button is clicked
  document.getElementById("addWord").addEventListener("click", () => {
    createInputBox();
  });
  
  // Save filter words when the 'Save' button is clicked
  document.getElementById("save").addEventListener("click", () => {
    const inputBoxes = document.querySelectorAll(".filterWordInput");
    const filterWords = Array.from(inputBoxes).map(input => input.value.trim()).filter(Boolean);  // Filter out empty values
  
    browser.storage.local.set({ filterWords: filterWords }).then(() => {
      alert("Filter words saved.");
    });
  });
  
  // Reset filter words when the 'Reset' button is clicked
  document.getElementById("reset").addEventListener("click", () => {
    browser.storage.local.set({ filterWords: [] }).then(() => {
      document.getElementById("filterWordsContainer").innerHTML = "";  // Clear all input boxes
      alert("Filter words reset to default (empty).");
    });
  });
  