"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./robots.css";

const chapters = [
  { id: "opening", number: "01", label: "The question", time: "0:50", title: "Can robots\nreplace humans?", eyebrow: "A question about the future", copy: "For generations, machines have changed the way we live and work. Today, they can write, design, analyze, move and build. So the question is no longer whether technology will change our world. It already has.", line: "What happens when human imagination meets machine capability?", kind: "hero" },
  { id: "evolution", number: "02", label: "The evolution", time: "1:00", title: "From tools\nto teammates.", eyebrow: "A brief evolution", copy: "A robot is a machine that can sense, move or act in the physical world. Artificial intelligence is software that performs tasks such as recognizing patterns, generating language or making predictions. Automation connects tools and processes so work can happen with less manual effort.", line: "Different technologies. One powerful shift: what people can do.", kind: "evolution" },
  { id: "capability", number: "03", label: "What machines do", time: "1:00", title: "Let machines\ndo what they do best.", eyebrow: "The machine advantage", copy: "Robots excel at repeatable physical tasks. AI can search patterns across enormous amounts of data. Together, they can take on dangerous, repetitive or time-consuming work—helping people work more safely, consistently and efficiently.", line: "The goal is not to make people more machine-like. It is to free people for more meaningful work.", kind: "capability" },
  { id: "human", number: "04", label: "The human element", time: "1:10", title: "But work is\nmore than tasks.", eyebrow: "What we bring", copy: "People bring lived experience, accountability, relationships, cultural understanding and the ability to decide what matters. Human strengths are not a list of things technology can never touch; they are capabilities we must keep developing as the tools evolve.", line: "Technology can suggest an answer. People must decide what is worth doing—and why.", kind: "human" },
  { id: "detroit", number: "05", label: "Detroit: Become Human", time: "1:20", title: "A glimpse into\na fictional 2038.", eyebrow: "A thought experiment · fiction", copy: "Detroit: Become Human imagines a world where androids are woven into everyday life. Connor, Kara and Markus encounter very different questions about purpose, care, autonomy and choice. The game asks us to examine our assumptions about intelligence and humanity.", line: "If a machine could act like a person, what responsibilities would people have?", kind: "detroit" },
  { id: "collaboration", number: "06", label: "The shift", time: "1:00", title: "From replacement\nto collaboration.", eyebrow: "A better question", copy: "In real workplaces, the most useful question is often not “Which person can we remove?” but “Which tasks can technology improve, and where does human judgment matter most?” A clinician can use AI to review information; a farmer can use sensors to guide decisions; an engineer can use simulation to test ideas.", line: "The strongest team may not be human or machine. It may be human with machine.", kind: "collaboration" },
  { id: "advantage", number: "07", label: "The AI advantage", time: "1:20", title: "Make the tool\nyour advantage.", eyebrow: "For the next generation", copy: "Use AI to learn a difficult concept, compare approaches, prototype an idea, debug code, practice a presentation or explore a new field. Then verify the output, bring your own judgment and turn the result into something real. The advantage is not access to a tool. It is knowing how to use it well.", line: "Don't just ask AI for an answer. Use it to become better at asking, building and solving.", kind: "advantage" },
  { id: "future", number: "08", label: "The future", time: "1:10", title: "Progress needs\npeople in the loop.", eyebrow: "Opportunity with responsibility", copy: "The transition will not benefit everyone automatically. We need accessible learning, thoughtful design, privacy, fairness, safety and clear accountability. New tools create possibilities—but people, institutions and communities shape who benefits from them.", line: "Optimism is not assuming everything will work out. It is choosing to build it responsibly.", kind: "future" },
  { id: "closing", number: "09", label: "What will you build?", time: "1:10", title: "The future is\nyours to build.", eyebrow: "The final chapter", copy: "A machine can calculate faster. It can process more. It can automate thousands of tasks. But what happens when human imagination learns to use all that power? The next breakthrough may come from someone in this room deciding to try.", line: "Maybe the question isn't what machines will do to us. It's what we will do with them.", kind: "closing" },
];

const sources = [
  { name: "International Labour Organization", detail: "Generative AI and Jobs: A Refined Global Index of Occupational Exposure (2025)", url: "https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure" },
  { name: "World Economic Forum", detail: "The Future of Jobs Report 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025/" },
  { name: "International Federation of Robotics", detail: "World Robotics 2025 — industrial robot installations", url: "https://ifr.org/ifr-press-releases/news/global-demand-for-industrial-robots-doubles-over-10-years" },
  { name: "Quantic Dream", detail: "Detroit: Become Human — official game page (fictional case study)", url: "https://www.quanticdream.com/en/detroit-become-human" },
];

export default function RobotsPresentation() {
  const [active, setActive] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(chapters.length - 1, index));
    sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(next);
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          if (!Number.isNaN(index)) setActive(index);
        }
      });
    }, { threshold: 0.58 });
    sectionRefs.current.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement)?.tagName)) return;
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault(); goTo(active + 1);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault(); goTo(active - 1);
      }
      if (event.key.toLowerCase() === "s") setSourcesOpen((value) => !value);
      if (event.key.toLowerCase() === "n") setNotesOpen((value) => !value);
      if (event.key === "Escape") { setSourcesOpen(false); setNotesOpen(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const chapter = chapters[active];

  return (
    <main className="robots-experience">
      <div className="robots-grain" aria-hidden="true" />
      <header className="robots-topbar">
        <a className="robots-brand" href="/" aria-label="Return to KAGE home"><span className="brand-mark">影</span><span>KAGE <i>/ FUTURES</i></span></a>
        <div className="robots-top-meta"><span>AN EXPLORATION OF HUMANITY & TECHNOLOGY</span><span className="live-dot" /> <span>10 MIN EXPERIENCE</span></div>
        <button className="icon-button menu-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Open chapter menu">☰</button>
      </header>

      <aside className={"chapter-rail" + (menuOpen ? " is-open" : "")}>
        <div className="rail-heading">CHAPTERS <span>09</span></div>
        {chapters.map((item, index) => (
          <button key={item.id} className={"rail-link" + (active === index ? " is-active" : "")} onClick={() => goTo(index)}>
            <span>{item.number}</span><b>{item.label}</b><small>{item.time}</small>
          </button>
        ))}
        <div className="rail-bottom">SCROLL OR USE ↑ ↓</div>
      </aside>

      <div className="robots-progress"><span style={{ width: ((active + 1) / chapters.length * 100) + "%" }} /></div>

      <div className="robots-stage">
        {chapters.map((item, index) => (
          <section
            key={item.id}
            id={item.id}
            data-index={index}
            ref={(node) => { sectionRefs.current[index] = node; }}
            className={"robots-chapter chapter-" + item.kind + (active === index ? " is-current" : "")}
            aria-label={"Chapter " + item.number + ": " + item.label}
          >
            <div className="chapter-backdrop" aria-hidden="true">
              <div className="orb orb-one" /><div className="orb orb-two" /><div className="horizon" />
              {item.kind === "detroit" && <div className="city-silhouette"><i /><i /><i /><i /><i /><i /></div>}
              {item.kind === "capability" && <div className="machine-orbit"><span /><span /><span /><b>01</b></div>}
              {item.kind === "human" && <div className="human-orbit"><span>HUMAN</span><span>JUDGMENT</span><span>EMPATHY</span></div>}
              {item.kind === "collaboration" && <div className="collab-graphic"><span>HUMAN</span><b>+</b><span>MACHINE</span></div>}
              {item.kind === "advantage" && <div className="advantage-graphic"><span>IDEA</span><b>→</b><span>PROTOTYPE</span><b>→</b><span>IMPACT</span></div>}
            </div>
            <div className="chapter-content">
              <div className="chapter-kicker"><span>{item.number} / 09</span><i />{item.eyebrow}</div>
              <h1>{item.title.split("\n").map((line, i) => <span key={i}>{line}</span>)}</h1>
              <p className="chapter-copy">{item.copy}</p>
              <blockquote>{item.line}</blockquote>

              {item.kind === "evolution" && <div className="concept-grid"><div><small>ROBOTICS</small><b>Physical action</b><span>Machines that sense and act in the world.</span></div><div><small>ARTIFICIAL INTELLIGENCE</small><b>Pattern & prediction</b><span>Systems that interpret, generate or recommend.</span></div><div><small>AUTOMATION</small><b>Repeatable workflows</b><span>Processes that run with less manual effort.</span></div></div>}

              {item.kind === "capability" && <div className="fact-strip"><div><strong>542,000</strong><span>industrial robots installed worldwide in 2024</span><sup>IFR · 2025 report</sup></div><div><strong>4.66M</strong><span>industrial robots in operation worldwide in 2024</span><sup>IFR · 2025 report</sup></div></div>}

              {item.kind === "human" && <div className="human-traits"><span>CREATIVITY</span><span>CARE</span><span>CONTEXT</span><span>ACCOUNTABILITY</span></div>}

              {item.kind === "detroit" && <div className="character-grid"><div><b>CONNOR</b><span>Logic · Investigation · Choice</span></div><div><b>KARA</b><span>Care · Protection · Connection</span></div><div><b>MARKUS</b><span>Leadership · Autonomy · Identity</span></div></div>}

              {item.kind === "collaboration" && <div className="example-grid"><div><b>DOCTOR + AI</b><span>More information to support clinical judgment.</span></div><div><b>FARMER + SENSORS</b><span>Better signals for decisions in the field.</span></div><div><b>ENGINEER + SIMULATION</b><span>More ways to test before building.</span></div></div>}

              {item.kind === "advantage" && <div className="advantage-list"><span><b>01</b> Learn something difficult</span><span><b>02</b> Build a small prototype</span><span><b>03</b> Verify, improve, publish</span></div>}

              {item.kind === "future" && <div className="future-tags"><span>ACCESS</span><span>FAIRNESS</span><span>PRIVACY</span><span>SAFETY</span><span>ACCOUNTABILITY</span></div>}

              {item.kind === "closing" && <div className="closing-question">WHAT WILL YOU BUILD WITH IT?</div>}
            </div>
            <div className="chapter-footer"><span>KAGE / HUMAN FUTURES</span><span>{item.time} MINUTE CHAPTER</span><button onClick={() => goTo(index + 1)} disabled={index === chapters.length - 1}>{index === chapters.length - 1 ? "END OF EXPERIENCE" : "CONTINUE ↓"}</button></div>
          </section>
        ))}
      </div>

      <footer className="robots-controls">
        <button onClick={() => goTo(active - 1)} disabled={active === 0}>← <span>BACK</span></button>
        <div><b>{chapter.number}</b><span> / 09</span></div>
        <button onClick={() => goTo(active + 1)} disabled={active === chapters.length - 1}><span>NEXT</span> →</button>
      </footer>

      <div className="robots-utility">
        <button onClick={() => setSourcesOpen(true)} title="Sources (S)">SOURCES</button>
        <button onClick={() => setNotesOpen(true)} title="Presenter notes (N)">PRESENTER NOTES</button>
      </div>

      {sourcesOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Research sources"><div className="overlay-panel"><button className="overlay-close" onClick={() => setSourcesOpen(false)}>×</button><small>RESEARCH & REFERENCES</small><h2>Evidence behind the story.</h2><p>Figures on this experience are dated and linked to their original publishers. Forecasts describe possible futures, not guarantees.</p>{sources.map((source) => <a className="source-link" href={source.url} target="_blank" rel="noreferrer" key={source.name}><b>{source.name}</b><span>{source.detail}</span><i>↗</i></a>)}<div className="source-note">Key figures: 542,000 global industrial robot installations in 2024; 9,100 installations in India. ILO estimates one in four workers are in occupations with some GenAI exposure, while only a smaller share is in the highest exposure category. Exposure is not the same as job loss.</div></div></div>}

      {notesOpen && <div className="overlay" role="dialog" aria-modal="true" aria-label="Presenter notes"><div className="overlay-panel notes-panel"><button className="overlay-close" onClick={() => setNotesOpen(false)}>×</button><small>PRESENTER MODE · CHAPTER {chapter.number}</small><h2>{chapter.label}</h2><p>{chapter.copy}</p><div className="source-note"><b>Suggested delivery:</b> Speak conversationally. Pause after the chapter's highlighted line and let the audience absorb it. Use the chapter navigation to move at your own pace. This is a 10-minute outline; adjust the pacing to your speaking style.</div><button className="panel-action" onClick={() => { setNotesOpen(false); goTo(active + 1); }}>NEXT CHAPTER →</button></div></div>}
    </main>
  );
}
