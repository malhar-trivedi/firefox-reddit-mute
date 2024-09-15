browser.runtime.onInstalled.addListener(() => {
    // Initialize storage with an empty array if not already set
    browser.storage.local.set({ filterWords: [] }).then(() => {
      console.log("Feed filter initialized with empty filter words.");
    });
  });
  
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "getFilterWords") {
      // Get the stored filter words from browser local storage
      browser.storage.local.get("filterWords").then((data) => {
        sendResponse({ filterWords: data.filterWords || [] });
      });
  
      // Return true to indicate we will be sending a response asynchronously
      return true;
    }
  });