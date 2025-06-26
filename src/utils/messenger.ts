export const sendCleanTabsRequest = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "cleanTabs" }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.status === "done") {
        resolve();
      } else {
        reject("Unexpected response");
      }
    });
  });
};

export const sendActivateRequest = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: "activateFiltering" }, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (response?.status === "done") {
        resolve();
      } else {
        reject("Unexpected response");
      }
    });
  });
};
