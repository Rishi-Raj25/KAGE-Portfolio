"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = document.querySelector<HTMLIFrameElement>(".kage-document");
    if (!frame) return;
    const markReady = () => setReady(true);
    frame.addEventListener("load", markReady);
    return () => frame.removeEventListener("load", markReady);
  }, []);

  return (
    <main className="kage-host" data-ready={ready ? "true" : "false"}>
      <iframe
        className="kage-document"
        title="KAGE — Can Robots Replace Humans?"
        src="/landing-pages/kage.html"
        loading="eager"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-downloads allow-popups allow-popups-to-escape-sandbox"
      />
    </main>
  );
}
