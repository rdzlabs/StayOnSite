import { cleanTabs } from "./tabManager.js";
import { getActivate, getShowSite, getCurrentUrl } from "../utils/storage.js";

let isEnforcing = false;

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "cleanTabs") {
    cleanTabs().then(() => sendResponse({ status: "done" }));
    return true;
  }

  if (message.action === "activateFiltering") {
    Promise.all([getActivate(), getShowSite(), getCurrentUrl()])
      .then(([isActive, showSite, rawUrl]) => {
        if (!isActive || !showSite) {
          sendResponse({ status: "inactive" });
          return;
        }

        if (!rawUrl) {
          sendResponse({ status: "no-url" });
          return;
        }

        const targetUrl = rawUrl.endsWith("/") ? rawUrl : rawUrl + "/";

        chrome.tabs.query({}, (tabs) => {
          const hasTargetTab = tabs.some(
            (tab) => tab.url && tab.url.startsWith(targetUrl)
          );

          if (!hasTargetTab) {
            chrome.tabs.create({ url: targetUrl, active: true }, (newTab) => {
              setTimeout(() => {
                chrome.tabs.query({}, (allTabs) => {
                  for (const tab of allTabs) {
                    if (
                      tab.id !== newTab.id &&
                      tab.url &&
                      tab.id != null
                    ) {
                      chrome.tabs.remove(tab.id);
                    }
                  }
                  sendResponse({ status: "done" });
                });
              }, 1000);
            });
            return;
          }

          for (const tab of tabs) {
            if (tab.url && !tab.url.startsWith(targetUrl) && tab.id != null) {
              chrome.tabs.remove(tab.id);
            }
          }

          sendResponse({ status: "done" });
        });
      });

    return true;
  }
});

// periodic enforcement
setInterval(async () => {
  if (isEnforcing) return;
  isEnforcing = true;

  const [isActive, showSite] = await Promise.all([
    getActivate(),
    getShowSite(),
  ]);

  if (!isActive) {
    isEnforcing = false;
    return;
  }

  const rawUrl = await getCurrentUrl();
  if (!rawUrl) {
    isEnforcing = false;
    return;
  }

  const targetUrl = rawUrl.endsWith("/") ? rawUrl : rawUrl + "/";

  chrome.tabs.query({}, (tabs) => {
    if (tabs.length === 1) {
      isEnforcing = false;
      return;
    }

    const hasTargetTab = tabs.some(
      (tab) => tab.url && tab.url.startsWith(targetUrl)
    );

    if (!hasTargetTab) {
      chrome.tabs.create({ url: targetUrl, active: true }, (newTab) => {
        setTimeout(() => {
          chrome.tabs.query({}, (allTabs) => {
            for (const tab of allTabs) {
              if (
                tab.id !== newTab.id &&
                tab.url &&
                tab.id != null
              ) {
                chrome.tabs.remove(tab.id);
              }
            }
            isEnforcing = false;
          });
        }, 1000);
      });
      return;
    }

    for (const tab of tabs) {
      if (tab.url && !tab.url.startsWith(targetUrl) && tab.id != null) {
        chrome.tabs.remove(tab.id);
      }
    }

    isEnforcing = false;
  });
}, 1000); // 1 second interval to prevent overload
