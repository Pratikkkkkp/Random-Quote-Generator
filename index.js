const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const copyBtn = document.getElementById("copyBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");

// API URL
const apiURL = "https://api.api-ninjas.com/v1/quotes?category=inspirational";
const apiKey = "EQoAb5esfKGa52Jq1VINuA==NRuQuuCawmU5L3m9"; // Replace with your API key

let isDarkMode = true; // Initialize theme to dark mode

async function getQuote() {
  try {
    btnEl.innerText = "Loading...";
    btnEl.disabled = true;

    // Fetching the quote
    const response = await fetch(apiURL, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const data = await response.json();
    const quote = data[0].quote;
    const author = data[0].author;

    // Displaying the quote
    quoteEl.innerText = quote;
    authorEl.innerText = `~ ${author || "Unknown"}`;
  } catch (error) {
    console.error(error);
    quoteEl.innerText = "An error occurred. Please try again.";
    authorEl.innerText = "";
  } finally {
    btnEl.innerText = "Get a quote";
    btnEl.disabled = false;
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
    themeToggleBtn.innerText = "Switch to Light Mode";
  } else {
    document.body.style.background = "#ffffff"; // Light background
    document.body.style.color = "#000000"; // Black text
    themeToggleBtn.innerText = "Switch to Dark Mode";
  }
}

// Event listeners
btnEl.addEventListener("click", getQuote);
copyBtn.addEventListener("click", copyQuote);
themeToggleBtn.addEventListener("click", toggleTheme);

// Initialize dark mode on load
applyTheme();
getQuote();
