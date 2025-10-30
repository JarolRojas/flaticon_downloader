import { Injectable } from '@angular/core';

declare const chrome: any;

type MsgResponse<T> = { ok: true; value: T } | { ok: false; error: string };

const MSG_GET_PAGINATION_TOTAL = 'GET_PAGINATION_TOTAL';
const MSG_GET_FIRST_PACK_ID = 'GET_FIRST_SEARCH_RESULT_DATAID';

@Injectable({ providedIn: 'root' })
export class ChromeMessagingService {
  private defaultTimeout = 1500; // ms

  private getActiveTabId(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any[]) => {
          const t = tabs && tabs[0];
          if (!t || t.id == null) return reject(new Error('No active tab'));
          resolve(t.id);
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  private sendMessageToTab<T = any>(tabId: number, message: any, timeoutMs = this.defaultTimeout): Promise<MsgResponse<T>> {
    return new Promise((resolve) => {
      let didRespond = false;
      try {
        chrome.tabs.sendMessage(tabId, message, (resp: any) => {
          didRespond = true;
          const lastErr = chrome.runtime.lastError;
          if (lastErr) {
            resolve({ ok: false, error: lastErr.message || String(lastErr) });
            return;
          }
          resolve({ ok: true, value: resp });
        });
      } catch (e: any) {
        resolve({ ok: false, error: String(e) });
        return;
      }

      setTimeout(() => {
        if (!didRespond) resolve({ ok: false, error: 'timeout waiting content script' });
      }, timeoutMs);
    });
  }

  async getPaginationTotal(): Promise<number> {
    try {
      const tabId = await this.getActiveTabId();
      const resp = await this.sendMessageToTab<{ ok?: boolean; total?: number }>(tabId, { type: MSG_GET_PAGINATION_TOTAL });
      if (!resp.ok) throw new Error(resp.error);
      const payload = resp.value || {};
      const n = (typeof payload.total === 'number') ? payload.total : Number(payload.total) || 1;
      return n;
    } catch (e) {
      return 1;
    }
  }

  async getFirstPackId(): Promise<string | null> {
    try {
      const tabId = await this.getActiveTabId();
      const resp = await this.sendMessageToTab<{ ok?: boolean; dataPackId?: string }>(tabId, { type: MSG_GET_FIRST_PACK_ID });
      if (!resp.ok) throw new Error(resp.error);
      const payload = resp.value;
      if (!payload) return null;
      if (typeof payload === 'object' && payload.dataPackId !== undefined) return payload.dataPackId || null;
      if (typeof payload === 'string') return payload || null;
      return null;
    } catch (e) {
      return null;
    }
  }

  async getPackTitle(): Promise<string> {
    try {
      const tabId = await this.getActiveTabId();
      const resp = await this.sendMessageToTab<{ ok?: boolean; packTitle?: string }>(tabId, { type: 'GET_PACK_TITLE' });
      if (!resp.ok) throw new Error(resp.error);
      const payload = resp.value;
      if (!payload) return "flaticon_pack";
      if (typeof payload === 'object' && payload.packTitle !== undefined) return payload.packTitle || "flaticon_pack";
      if (typeof payload === 'string') return payload || "flaticon_pack";
      return "flaticon_pack";
    } catch (e) {
      return "flaticon_pack";
    }
  }

  async getLinkAjaxPng(): Promise < string > {
      const packId = await this.getFirstPackId();
      return "https://www.flaticon.es/ajax/hex/get_icons_by_pack_id/" + packId + "/";
    }
  }
