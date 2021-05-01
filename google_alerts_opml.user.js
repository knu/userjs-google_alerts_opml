// ==UserScript==
// @name         Download Google Alerts OPML
// @namespace    https://idaemons.org/
// @version      0.1
// @author       Akinori MUSHA
// @description  adds a "Download OPML" button to your Google Alerts page
// @match        https://www.google.com/alerts
// @match        https://www.google.com/alerts?*
// @grant        none
// @license      BSD-2-Clause
// @homepage     https://github.com/knu/userjs-google_alerts_opml
// ==/UserScript==

(function () {
  "use strict";

  const div = document.createElement("div");
  const button = document.createElement("button");
  button.textContent = "Download OPML";
  button.addEventListener("click", (e) => {
    const doc = document.implementation.createDocument("", "", null);
    doc.appendChild(doc.createProcessingInstruction("xml", 'version="1.0"'));
    const opml = doc.createElement("opml");
    opml.setAttribute("version", "1.0");
    doc.appendChild(opml);
    const head = doc.createElement("head");
    opml.appendChild(head);
    const title = doc.createElement("title");
    title.textContent = "My Google Alerts";
    head.appendChild(title);
    const body = doc.createElement("body");
    opml.appendChild(body);
    document.querySelectorAll(".alert_instance").forEach((li) => {
      const title = li.querySelector(".query_div span").textContent;
      const url = li.querySelector("a > .rss_icon").parentElement.href;
      const outline = doc.createElement("outline");
      outline.setAttribute("type", "rss");
      outline.setAttribute("text", title);
      outline.setAttribute("title", title);
      outline.setAttribute("xmlUrl", url);
      body.appendChild(outline);
    });
    const link = document.createElement("a");
    link.download = "google_alerts.opml";
    link.href =
      "data:text/x-opml;base64," +
      btoa(new XMLSerializer(doc).serializeToString(doc));
    link.click();
  });
  div.appendChild(button);
  const listDiv = document.getElementById("manage-alerts-div");
  listDiv.parentNode.insertBefore(div, listDiv);
})();