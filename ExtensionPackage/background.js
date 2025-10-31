// Background service worker: enable the action only on Flaticon "packs" pages.

const packsRegex = /^https?:\/\/(?:www\.)?flaticon\.[^\/]+\/packs/;

function isPacksUrl(url) {
	try {
		if (!url) return false;
		return packsRegex.test(url);
	} catch (e) {
		return false;
	}
}

function updateActionForTab(tabId, url) {
	if (isPacksUrl(url)) {
		try { chrome.action.enable(tabId); } catch (e) { /* ignore */ }
	} else {
		try { chrome.action.disable(tabId); } catch (e) { /* ignore */ }
	}
}

// On installed / service worker start: evaluate all open tabs.
chrome.runtime.onInstalled.addListener(() => {
	chrome.tabs.query({}, (tabs) => {
		for (const t of tabs) {
			updateActionForTab(t.id, t.url);
		}
	});
});

// Also run when the service worker starts (in some browsers on startup)
chrome.tabs.query({}, (tabs) => {
	for (const t of tabs) updateActionForTab(t.id, t.url);
});

// When a tab updates (navigates / finishes loading), re-evaluate
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// changeInfo.url may be set during navigation; tab.url may be available after load
	const url = changeInfo.url || (tab && tab.url);
	updateActionForTab(tabId, url);
});

// When the active tab changes, ensure the action is correctly enabled/disabled for that tab
chrome.tabs.onActivated.addListener((activeInfo) => {
	chrome.tabs.get(activeInfo.tabId, (tab) => {
		if (chrome.runtime.lastError) return;
		updateActionForTab(tab.id, tab.url);
	});
});

// Optional: respond to messages from content scripts to enable action if needed
chrome.runtime.onMessage.addListener((message, sender) => {
	if (message === 'recheck-packs' && sender.tab) {
		updateActionForTab(sender.tab.id, sender.tab.url);
	}
});

