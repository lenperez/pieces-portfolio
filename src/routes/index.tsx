import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pieces — A collection of work from Len Perez" },
      { name: "description", content: "UX case studies by Len Perez: an eProcurement purchasing platform, Grainger benefit management, and the Press Ganey style guide." },
      { property: "og:title", content: "Pieces — Len Perez, UX Design" },
      { property: "og:description", content: "UX case studies: purchasing platform, Grainger, Press Ganey." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const imgs = import.meta.glob("@/assets/work/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const img = (n: string) => Object.entries(imgs).find(([k]) => k.endsWith(`/${n}.jpg`))![1];

type Step = { kind: string; title: string; text: string; image: string };
type Project = { id: string; name: string; client: string; steps: Step[] };

const projects: Project[] = [
  {
    id: "purchasing",
    name: "Purchasing Platform",
    client: "eProcurement redesign",
    steps: [
      { kind: "Synopsis", title: "Timeline Development", image: img("pp-timeline"), text: "Redesigning a complete eProcurement platform from search & browse through to checkout — starting with timing, resources, KPIs and strategic goals." },
      { kind: "Process", title: "Heuristic", image: img("pp-heuristic"), text: "Understanding the current site's pain-points and technical challenges to set the right approach for interaction design, page structure, content and hierarchy." },
      { kind: "Process", title: "Competitive / Comparative Analysis", image: img("pp-competitive"), text: "Gathering insights from market competitors and like-minded establishments to glean best practices and proof-in-practice methodologies." },
      { kind: "Process", title: "Persona Development", image: img("pp-personas"), text: "Understanding the user base and the needs of different groups — ever-changing descriptors that ground interaction and layout decisions." },
      { kind: "Process", title: "Storymapping", image: img("pp-storymap"), text: "Streamlined user-flows indicating which back-end components link into each page and step of the process." },
      { kind: "Process", title: "Heat Mapping", image: img("pp-heatmap"), text: "Insights into how users navigated the current structure — what was used most and what felt necessary to get through the site." },
      { kind: "Process", title: "Analytics", image: img("pp-analytics"), text: "Diving into the numbers: which screen sizes were used most, bounce rates, where users dropped off, and purchasing habits to aid marketing." },
      { kind: "Process", title: "User Flow", image: img("pp-userflow"), text: "User flows show where the challenges were and where processes could be streamlined for the quickest, simplest route to conversion." },
      { kind: "Process", title: "Whiteboarding", image: img("pp-whiteboard"), text: "Heavy sketching on whiteboards to quickly facilitate ideas and iterate on interactions as a group, discussing design decisions together." },
      { kind: "Design", title: "Lo-Fidelity Wireframing / Prototyping", image: img("pp-lofi"), text: "Lo-fi wireframes and prototypes clarified page structure and interactions, letting the team feel the flow and hammer out limitations not seen earlier." },
      { kind: "Design", title: "High-Fidelity Comps", image: img("pp-hifi"), text: "Using the established style guide, high-fidelity comps show how the site will look and behave across platforms and screen sizes." },
    ],
  },
  {
    id: "grainger",
    name: "Grainger",
    client: "Benefit management tool",
    steps: [
      { kind: "Synopsis", title: "Scaling a channel", image: img("gr-synopsis"), text: "Grainger acquired a proprietary benefit management tool built for one channel, and needed it to scale across all of the company's offerings." },
      { kind: "Process", title: "Heuristic", image: img("gr-heuristic"), text: "A thorough understanding of the system's components and the purpose each served in completing the process." },
      { kind: "Process", title: "Extrapolation & Simplification", image: img("gr-extrapolation"), text: "Whiteboarding to restructure components so they were interchangeable, while simplifying how information is entered and retrieved." },
      { kind: "Design", title: "Basic Wireframes", image: img("gr-basic"), text: "Wireframes were created and iterated so simple interactions could be tested and vetted with the team and stakeholders, covering every scenario." },
      { kind: "Design", title: "Advanced Wireframes", image: img("gr-advanced"), text: "Once basic structure and functionality were agreed upon, more detailed wireframes were created with annotations and variants." },
      { kind: "Design", title: "High-Fidelity Comps", image: img("gr-hifi"), text: "Hi-fi comps gave real-world views of visual hierarchy, making sure all information was presented as clearly as possible." },
    ],
  },
  {
    id: "press-ganey",
    name: "Press Ganey",
    client: "Style guide & spec docs",
    steps: [
      { kind: "Synopsis", title: "Second-gen suite", image: img("pg-synopsis"), text: "A style guide and specification document for a second-generation user dashboard and medical community web suite." },
      { kind: "Design", title: "Style Guide", image: img("pg-styleguide"), text: "Extending the corporate guide with a secondary palette, plus a grid system built with UXAs for every component." },
      { kind: "Design", title: "Spec Docs", image: img("pg-specdocs"), text: "Look and feel for the widget creator, dashboard, widgets and web pages, working with UXAs and development." },
      { kind: "Design", title: "Dashboard Widgets", image: img("pg-widgets"), text: "Distinctive, crisp and clear — dense information made understandable in quick bites." },
      { kind: "Design", title: "Community Web Pages", image: img("pg-community"), text: "A more traditional layout, flexible enough to scale across many components and scenarios." },
    ],
  },
];

function Index() {
  const [zoom, setZoom] = useState<Step | null>(null);
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="sticky top-0 z-20 border-t-4 border-primary bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-lg font-light tracking-tight">PIECES</a>
          <div className="flex gap-6 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {projects.map((p) => (
              <a key={p.id} href={`#${p.id}`} className="hidden transition-colors hover:text-primary sm:inline">{p.name}</a>
            ))}
            <a href="#contact" className="text-primary">Contact</a>
          </div>
        </nav>
      </header>

      <section id="top" className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-end px-6 pb-20">
        <h1 className="font-display text-[22vw] font-extralight leading-[0.8] tracking-[-0.06em] md:text-[14rem]">PIECES</h1>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          A collection of work from <span className="font-bold text-primary">Len Perez</span>
        </p>
        <p className="mt-10 max-w-xl text-lg font-light text-muted-foreground">
          UX design across research, interaction and visual systems — from heuristic reviews and storymaps to high-fidelity comps and spec docs.
        </p>
      </section>

      {projects.map((p, idx) => (
        <section key={p.id} id={p.id} className="scroll-mt-16 border-t border-border py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="section-tag">{p.name}</h2>
              <span className="label">0{idx + 1} — {p.client}</span>
            </div>
            <div className="mt-16 space-y-20 md:space-y-28">
              {p.steps.map((s, i) => (
                <article key={s.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                  <button
                    type="button"
                    onClick={() => setZoom(s)}
                    className={`group md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}
                    aria-label={`Enlarge ${s.title}`}
                  >
                    <img src={s.image} alt={`${p.name} — ${s.title}`} loading="lazy" className="mx-auto max-h-[34rem] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                  </button>
                  <div className="border-t border-border pt-5 md:col-span-5">
                    <div className="label">{String(i + 1).padStart(2, "0")} · {s.kind}</div>
                    <h3 className="mt-2 font-display text-2xl font-light tracking-tight md:text-3xl">{s.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{s.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="contact" className="scroll-mt-16 bg-primary py-24 text-primary-foreground">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-6xl font-extralight tracking-tight md:text-8xl">Contact</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">Email</div>
              <a href="mailto:lenperez@gmail.com" className="mt-2 block text-2xl font-light hover:underline">lenperez@gmail.com</a>
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">Phone</div>
              <a href="tel:7739916149" className="mt-2 block text-2xl font-light hover:underline">773.991.6149</a>
            </div>
          </div>
        </div>
      </section>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
        >
          <img src={zoom.image} alt={zoom.title} className="max-h-full max-w-full bg-card object-contain" />
        </div>
      )}
    </div>
  );
}
