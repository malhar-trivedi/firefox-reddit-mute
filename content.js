// Function to filter the posts based on stored filter words
function filterPosts(filterWords) {
  let feedElement = document.querySelector("shreddit-feed");

  if (feedElement) {
    let articles = feedElement.querySelectorAll("article");

    articles.forEach(article => {
      let title = article.getAttribute("aria-label")?.toLowerCase();

      if (title) {
        if (filterWords.some(word => title.includes(word.toLowerCase()))) {
          article.style.display = "none";
        }
      }
    });
  } else {
    console.log("Feed element not found.");
  }
}

// Listen for changes in the DOM and filter posts dynamically
function observeDOMChanges(filterWords) {
  let feedElement = document.querySelector("shreddit-feed");

  if (feedElement) {
    const observer = new MutationObserver(() => {
      filterPosts(filterWords);
    });

    // Observe changes to the feed element's children
    observer.observe(feedElement, { childList: true, subtree: true });
  } else {
    console.log("Feed element not found.");
  }
}

// Get filter words and apply them when the page loads or new content is added
browser.runtime.sendMessage({ type: "getFilterWords" }, (response) => {
  if (!response || !response.filterWords) {
    console.error("No response or filterWords data received");
    return;
  }

  const filterWords = response.filterWords;

  // Initially filter the posts on page load
  filterPosts(filterWords);

  // Set up MutationObserver to monitor new posts being loaded
  observeDOMChanges(filterWords);
});
