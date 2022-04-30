import { Workbox } from "workbox-window";
import Editor from "./editor";
import "./database";
import "../css/style.css";
// clears main element
const main = document.querySelector("#main");
main.innerHTML = "";

// while loading, display spinner
const loadSpinner = () => {
    const spinner = document.createElement("div");
    spinner.classList.add("spinner");
    spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
    main.appendChild(spinner);
};

// create editor element
const editor = new Editor();

// if editor is undefined, display loading
if (typeof editor === "undefined") {
    loadSpinner();
}

// Check if service workers are supported
if ("serviceWorker" in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox("/src-sw.js");
    workboxSW.register();
} else {
    console.error("Service workers are not supported in this browser.");
}
