import { isValidUrl } from "./validation";

// Keys
const CURRENT_URL_KEY = "currentTargetUrl";
const ACTIVATE_KEY = "activate";
const SHOW_SITE_KEY = "showSite";
const BOOKMARK_KEY = "stayOnSiteBookmarks";

// --- Core Promisified Helpers ---

function getFromStorage<T>(key: string): Promise<T | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve(result[key] ?? null);
    });
  });
}

function setToStorage<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
}

function removeFromStorage(key: string): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove([key], () => {
      if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
      else resolve();
    });
  });
}

// --- Current Target URL ---

export const saveCurrentUrl = (url: string) => setToStorage(CURRENT_URL_KEY, url);

export const getCurrentUrl = () => getFromStorage<string>(CURRENT_URL_KEY);

export const clearCurrentUrl = () => removeFromStorage(CURRENT_URL_KEY);

// --- Activation Flag ---

export const setActivate = (value: boolean): void => {
  chrome.storage.local.set({ [ACTIVATE_KEY]: value });
};

export const getActivate = (): Promise<boolean> =>
  getFromStorage<boolean>(ACTIVATE_KEY).then((val) => val ?? false);

// --- Show Site Flag ---

export const setShowSite = (flag: boolean): void => {
  chrome.storage.local.set({ [SHOW_SITE_KEY]: flag });
};

export const getShowSite = (): Promise<boolean> =>
  getFromStorage<boolean>(SHOW_SITE_KEY).then((val) => val ?? false);

// --- Bookmarks ---

export const saveBookmark = async (newBookmark: { name: string; url: string }) => {
  if (!isValidUrl(newBookmark.url)) return;
  await setToStorage(BOOKMARK_KEY, [newBookmark]); // overwrites existing
};

export const getBookmark = (): Promise<{ name: string; url: string }[]> =>
  getFromStorage<{ name: string; url: string }[]>(BOOKMARK_KEY).then((val) => val ?? []);

export const deleteBookmark = async (nameToDelete: string): Promise<void> => {
  const existing = await getBookmark();
  const updated = existing.filter((b) => b.name !== nameToDelete);
  await setToStorage(BOOKMARK_KEY, updated);
};
