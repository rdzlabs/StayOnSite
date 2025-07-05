type ActionType = "cleanTabs" | "activateFiltering";

// Generic function to send a message and expect a { status: "done" } response
function sendAction(action: ActionType): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action }, (response) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      if (response?.status === "done") {
        resolve();
      } else {
        reject("Unexpected response");
      }
    });
  });
}

// Specific functions using the generic one
export const sendCleanTabsRequest = (): Promise<void> => sendAction("cleanTabs");
export const sendActivateRequest = (): Promise<void> => sendAction("activateFiltering");
