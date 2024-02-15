// ==UserScript==
// @name          DarkLabs
// @description   Night mode for Dealabs.com (and more)
// @author        MonsieurCro
// @run-at        document-start
// @version       20240215
// @match         *://dealabs.com/*
// @match         *://*.dealabs.com/*
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  try {
    const domain = "dealabs.com";
    const style = "https://raw.githubusercontent.com/MonsieurCro/darklabs/main/styles.min.css";

    if (document.domain === domain || document.domain.endsWith(`.${domain}`)) {
      GM_xmlhttpRequest({
        method: "GET",
        url: style,
        onload: function(response) {
          const css = response.responseText;

          const addStyle = css => {
            const node = document.createElement("style");
            node.type = "text/css";
            node.appendChild(document.createTextNode(css));
            document.head ? document.head.appendChild(node) : document.documentElement.appendChild(node);
          };

          const styleFunc = GM_addStyle || addStyle || null;

          if (styleFunc) {
            styleFunc(css);
            console.log('DARKLABS | Style applied.')
          } else {
            console.error('DARKLABS | No style function available.');
          }
        },
        onerror: function(e) {
          console.error('DARKLABS | Fetch error:', e);
        },
        ontimeout: function() {
          console.error('DARKLABS | Fetch timed out.');
        }
      });
    }
  } catch (e) {
    console.error('DARKLABS | An error occurred:', e);
  }
})();
