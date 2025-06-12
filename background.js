browser.runtime.onInstalled.addListener(() => {
  // First, get the current data
  browser.storage.local.get("filterWords").then((data) => {
    // Only set the initial value if it's not already defined
    if (data.filterWords === undefined) {
      browser.storage.local.set({ filterWords: [] }).then(() => {
        console.log("Feed filter initialized for the first time.");
      });
    }
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
