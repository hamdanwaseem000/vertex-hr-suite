window.addEventListener(
  "unhandledrejection",
  (event) => {
    const reason = event.reason;
    const msg = String(reason?.message || "");
    const code = String(reason?.code || "");
    const shouldSuppress =
      reason &&
      (reason.name === "AbortError" ||
        /signal is aborted/i.test(msg) ||
        /Missing or insufficient permissions/i.test(msg) ||
        /permission-denied/i.test(code) ||
        /client is offline/i.test(msg));

    if (shouldSuppress) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true
);

window.addEventListener(
  "error",
  (event) => {
    const msg = String(event?.message || event?.error?.message || "");
    if (
      /Missing or insufficient permissions/i.test(msg) ||
      /signal is aborted/i.test(msg) ||
      /client is offline/i.test(msg)
    ) {
      event.stopImmediatePropagation();
      event.preventDefault();
    }
  },
  true
);
