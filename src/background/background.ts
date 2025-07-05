import { cleanTabs } from "./tabManager.js";
import { getActivate, getShowSite, getCurrentUrl } from "../utils/storage.js";
import {
  normalizeUrl,
  closeNonMatchingTabs,
  queryAllTabs,
} from "./tabUtils.js";

let isEnforcing = false;

// Handle incoming extension messages
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "cleanTabs") {
    cleanTabs().then(() => sendResponse({ status: "done" }));
    return true;
  }

  if (message.action === "activateFiltering") {
    (async () => {
      const [isActive, showSite, rawUrl] = await Promise.all([
        getActivate(),
        getShowSite(),
        getCurrentUrl(),
      ]);

      if (!isActive || !showSite) {
        sendResponse({ status: "inactive" });
        return;
      }

      if (!rawUrl) {
        sendResponse({ status: "no-url" });
        return;
      }

      const targetUrl = normalizeUrl(rawUrl);
      const tabs = await queryAllTabs();

      const hasTargetTab = tabs.some((tab) => tab.url?.startsWith(targetUrl));

      if (!hasTargetTab) {
        chrome.tabs.create({ url: targetUrl, active: true }, (newTab) => {
          setTimeout(async () => {
            const allTabs = await queryAllTabs();
            closeNonMatchingTabs(allTabs, targetUrl, newTab.id);
            sendResponse({ status: "done" });
          }, 1000);
        });
        return;
      }

      closeNonMatchingTabs(tabs, targetUrl);
      sendResponse({ status: "done" });
    })();

    return true;
  }
});

// Periodically enforce tab filtering every second
setInterval(async () => {
  if (isEnforcing) return;
  isEnforcing = true;

  const [isActive, showSite] = await Promise.all([getActivate(), getShowSite()]);
  if (!isActive || !showSite) {
    isEnforcing = false;
    return;
  }

  const rawUrl = await getCurrentUrl();
  if (!rawUrl) {
    isEnforcing = false;
    return;
  }

  const targetUrl = normalizeUrl(rawUrl);
  const tabs = await queryAllTabs();

  if (tabs.length === 1) {
    isEnforcing = false;
    return;
  }

  const hasTargetTab = tabs.some((tab) => tab.url?.startsWith(targetUrl));

  if (!hasTargetTab) {
    chrome.tabs.create({ url: targetUrl, active: true }, (newTab) => {
      setTimeout(async () => {
        const allTabs = await queryAllTabs();
        closeNonMatchingTabs(allTabs, targetUrl, newTab.id);
        isEnforcing = false;
      }, 100);
    });
    return;
  }

  closeNonMatchingTabs(tabs, targetUrl);
  isEnforcing = false;
}, 100);
