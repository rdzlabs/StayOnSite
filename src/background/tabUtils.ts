// Ensures the URL ends with a slash for consistent matching
export function normalizeUrl(url: string): string {
    return url.endsWith("/") ? url : url + "/";
}

// Closes all tabs that don't start with the target URL
export function closeNonMatchingTabs(
    tabs: chrome.tabs.Tab[],
    targetUrl: string,
    excludeTabId?: number
): void {
    for (const tab of tabs) {
        if (
            tab.id != null &&
            tab.url &&
            !tab.url.startsWith(targetUrl) &&
            tab.id !== excludeTabId
        ) {
            chrome.tabs.remove(tab.id);
        }
    }
}

// Promisified wrapper for chrome.tabs.query
export function queryAllTabs(): Promise<chrome.tabs.Tab[]> {
    return new Promise((resolve) => chrome.tabs.query({}, resolve));
}
