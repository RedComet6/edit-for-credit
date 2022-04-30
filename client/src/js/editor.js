// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
    constructor() {
        const localData = localStorage.getItem("content");

        // check if CodeMirror is loaded
        if (typeof CodeMirror === "undefined") {
            throw new Error("CodeMirror is not loaded");
        }

        this.editor = CodeMirror(document.querySelector("#main"), {
            value: "",
            mode: "javascript",
            theme: "monokai",
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });

        // populates editor with what is stored in indexedDD.
        //if nothing in indexedDB, populates editor with what is stored in localstorage
        // if nothing in either indexedDB or localstorage, populate editor with header ASCII art
        getDb().then((data) => {
            console.info("Loaded data from IndexedDB, injecting into editor");
            this.editor.setValue(data.content || localData || header);
        });

        this.editor.on("change", () => {
            localStorage.setItem("content", this.editor.getValue());
        });

        // Saves content of editor when editor loses focus
        this.editor.on("blur", () => {
            console.log("The editor has lost focus");
            putDb(localStorage.getItem("content"));
        });
    }
}
