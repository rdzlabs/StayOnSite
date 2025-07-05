// Retrieves a value from Chrome local storage by key
function getFromStorage<T>(key: string): Promise<T | null> {
  return new Promise((resolve) => {
    chrome.storage.local.get(key, (result) => {
      resolve(result[key] ?? null);
    });
  });
}

// Queries all open tabs in the current Chrome window
function queryTabs(): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => chrome.tabs.query({}, resolve));
}

// Safely extracts the origin from a URL string
function getOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null; // Invalid or special URL like chrome://
  }
}

// Closes all tabs whose origin does not match the stored target origin
export const cleanTabs = async (): Promise<void> => {
  const targetOrigin = await getFromStorage<string>("stayOnSiteTarget");
  if (!targetOrigin) {
    console.warn("No target URL set.");
    return;
  }

  const tabs = await queryTabs();
  const tabsToClose = tabs.filter((tab) => {
    if (!tab.url || !tab.id) return false;
    const origin = getOrigin(tab.url);
    return origin !== targetOrigin;
  });

  for (const tab of tabsToClose) {
    if (typeof tab.id === "number") {
      chrome.tabs.remove(tab.id);
    }
  }
};
