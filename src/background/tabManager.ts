export const cleanTabs = async (): Promise<void> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("stayOnSiteTarget", (result) => {
      const targetOrigin = result.stayOnSiteTarget;

      if (!targetOrigin) {
        console.warn("No target URL set.");
        return resolve();
      }

      chrome.tabs.query({}, (tabs) => {
        const tabsToClose = tabs.filter((tab) => {
          if (!tab.url || !tab.id) return false;

          try {
            const tabOrigin = new URL(tab.url).origin;
            return tabOrigin !== targetOrigin;
          } catch {
            return false; // skip non-URL tabs like chrome://
          }
        });

        for (const tab of tabsToClose) {
          if (typeof tab.id === "number") {
            chrome.tabs.remove(tab.id);
          }
        }
        

        resolve();
      });
    });
  });
};
