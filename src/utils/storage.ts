import { isValidUrl } from "./validation";
const CURRENT_URL_KEY = "currentTargetUrl";

export const saveCurrentUrl = async (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [CURRENT_URL_KEY]: url }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

export const getCurrentUrl = async (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([CURRENT_URL_KEY], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[CURRENT_URL_KEY] || null);
      }
    });
  });
};

export const clearCurrentUrl = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove([CURRENT_URL_KEY], () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
};

export const setActivate = (value: boolean): void => {
  chrome.storage.local.set({ activate: value });
};

export const getActivate = (): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["activate"], (result) => {
      resolve(result.activate ?? false);
    });
  });
};

export const saveBookmark = async (newBookmark: { name: string; url: string }) => {
  if (!isValidUrl(newBookmark.url)) return;

  chrome.storage.local.set({
    stayOnSiteBookmarks: [newBookmark], // replaces existing as per your request
  });
};

export const getBookmark = (): Promise<{ name: string; url: string }[]> => {
  return new Promise((resolve) => {
    chrome.storage.local.get("stayOnSiteBookmarks", (result) => {
      resolve(result.stayOnSiteBookmarks || []);
    });
  });
};

export const deleteBookmark = async (nameToDelete: string) => {
  const existing = await getBookmark();
  const updated = existing.filter(b => b.name !== nameToDelete);
  chrome.storage.local.set({ stayOnSiteBookmarks: updated });
};

// persist the “show site” flag
export const setShowSite = (flag: boolean): void => {
  chrome.storage.local.set({ showSite: flag });
};

// read it back (defaults to false)
export const getShowSite = (): Promise<boolean> =>
  new Promise((resolve) => {
    chrome.storage.local.get(["showSite"], (res) => {
      resolve(res.showSite ?? false);
    });
  });