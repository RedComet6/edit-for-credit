const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// handles actions before install click
window.addEventListener("beforeinstallprompt", (event) => {
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle("hidden", false);
});

//handles install click
butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;

    butInstall.classList.toggle("hidden", true);
});

// handles actions after app has installed
window.addEventListener("appinstalled", (event) => {
    // Clear prompt
    window.deferredPrompt = null;
});
