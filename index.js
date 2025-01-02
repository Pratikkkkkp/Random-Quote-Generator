const btn = document.getElementById("btn");
const quoteEl = document.getElementById("quote"); // Correct element reference
const authorEl = document.getElementById("author"); // Correct element reference
const copyBtn = document.getElementById("copyBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// API URL
const apiURL = "https://api.api-ninjas.com/v1/quotes";
const apiKey = "EQoAb5esfKGa52Jq1VINuA==NRuQuuCawmU5L3m9"; // Replace with your API key

let isDarkMode = true; // Initialize theme to dark mode

async function getQuote() {
  try {
    // Fade out current quote and author
    quoteEl.classList.add("fadeOut");
    authorEl.classList.add("fadeOut");

    // Change the button text and disable it
    btn.innerText = "Loading..."; // Use `btn` instead of `btnEl`
    btn.disabled = true;

    // Wait for the fade-out to complete before fetching a new quote
    await new Promise((resolve) => setTimeout(resolve, 500)); // 500ms delay to match fade-out duration

    // Fetching the quote
    const response = await fetch(apiURL, {
      headers: {
        "X-Api-Key": "EQoAb5esfKGa52Jq1VINuA==NRuQuuCawmU5L3m9", // Correct API key syntax
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();

    // Log the entire response to inspect its structure
    console.log("API Response:", data);

    // Check if the response has the expected structure
    if (data && data[0] && data[0].quote && data[0].author) {
      const quote = data[0].quote;
      const author = data[0].author;

      // Displaying the new quote
      quoteEl.innerText = quote || "No quote available.";
      authorEl.innerText = `~ ${author || "Unknown"}`;

      // Reset the animation classes and trigger reflow to restart animations
      quoteEl.classList.remove("fadeOut");
      authorEl.classList.remove("fadeOut");
      quoteEl.offsetHeight; // This triggers a reflow
      authorEl.offsetHeight; // This triggers a reflow

      // Add the fadeIn animation again
      quoteEl.classList.add("fadeIn");
      authorEl.classList.add("fadeIn");
    } else {
      console.error("Invalid data structure or missing quote/author");
      quoteEl.innerText = "An error occurred. Please try again.";
      authorEl.innerText = "";
    }
  } catch (error) {
    console.error(error);
    quoteEl.innerText = "An error occurred. Please try again.";
    authorEl.innerText = "";
  } finally {
    // Reset the button text and re-enable it after fetching is done
    btn.innerText = "Get a quote"; // Use `btn` instead of `btnEl`
    btn.disabled = false;
  }
}

function copyQuote() {
  const quoteText = `${quoteEl.innerText} ${authorEl.innerText}`;
  navigator.clipboard.writeText(quoteText);
  alert("Quote copied to clipboard!");
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  applyTheme();
}

function applyTheme() {
  if (isDarkMode) {
    document.body.style.background = "#121212"; // Dark background
    document.body.style.color = "#ffffff"; // White text
    themeToggleBtn.innerText = "Light Mode";
  } else {
    document.body.style.background = "#ffffff"; // Light background
    document.body.style.color = "#000000"; // Black text
    themeToggleBtn.innerText = "Dark Mode";
  }
}

// Event listeners
btn.addEventListener("click", getQuote); // Use `btn` instead of `btnEl`
copyBtn.addEventListener("click", copyQuote);
themeToggleBtn.addEventListener("click", toggleTheme);

// Initialize dark mode on load
applyTheme();
getQuote(); // Fetch a quote when the page loads
