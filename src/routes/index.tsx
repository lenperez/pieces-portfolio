import { createFileRoute } from "@tanstack/react-router";
import p2 from "@/assets/work/p-02.jpg";
import p3 from "@/assets/work/p-03.jpg";
import p4 from "@/assets/work/p-04.jpg";
import p5 from "@/assets/work/p-05.jpg";
import p6 from "@/assets/work/p-06.jpg";
import p7 from "@/assets/work/p-07.jpg";
import p8 from "@/assets/work/p-08.jpg";
import p9 from "@/assets/work/p-09.jpg";

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

type Step = { kind: string; title: string; text: string };
type Project = { id: string; name: string; client: string; steps: Step[]; images: string[] };

const projects: Project[] = [
  {
    id: "purchasing",
    name: "Purchasing Platform",
    client: "eProcurement redesign",
    images: [p2, p3, p4, p5],
    steps: [
      { kind: "Synopsis", title: "Timeline Development", text: "Redesigning a complete eProcurement platform from search & browse through to checkout — starting with timing, resources, KPIs and strategic goals." },
      { kind: "Process", title: "Heuristic Review", text: "Understanding the current site's pain-points and technical challenges to set the right approach for interaction design, structure, content and hierarchy." },
      { kind: "Process", title: "Competitive Analysis", text: "Gathering insights from competitors and like-minded establishments to glean best practices and proven methodologies." },
      { kind: "Process", title: "Personas", text: "Understanding the user base and the needs of different groups — ever-changing descriptors that ground interaction and layout decisions." },
      { kind: "Process", title: "Storymapping", text: "Streamlined user-flows showing which back-end components link into each page and step of the process." },
      { kind: "Process", title: "Heat Mapping", text: "Seeing how users navigated the current structure — what was used most and what felt necessary to get through." },
      { kind: "Process", title: "Analytics & User Flow", text: "Screen sizes, bounce rates and drop-off points informed the quickest, simplest route to conversion." },
      { kind: "Process", title: "Whiteboarding", text: "Heavy sketching to quickly facilitate ideas and iterate on interactions together as a team." },
      { kind: "Design", title: "Lo-Fi to Hi-Fi", text: "Wireframes and prototypes hammered out structure and flow; high-fidelity comps showed the site across platforms and screen sizes." },
    ],
  },
  {
    id: "grainger",
    name: "Grainger",
    client: "Benefit management tool",
    images: [p6, p7],
    steps: [
      { kind: "Synopsis", title: "Scaling a channel", text: "Grainger acquired a proprietary benefit management tool built for one channel, and needed it to scale across all of the company's offerings." },
      { kind: "Process", title: "Heuristic Review", text: "A thorough understanding of the system's components and the purpose each served in completing the process." },
      { kind: "Process", title: "Extrapolation & Simplification", text: "Whiteboarding to restructure components so they were interchangeable, while simplifying how information is entered and retrieved." },
    ],
  },
  {
    id: "press-ganey",
    name: "Press Ganey",
    client: "Style guide & spec docs",
    images: [p8, p9],
    steps: [
      { kind: "Synopsis", title: "Second-gen suite", text: "A style guide and specification document for a second-generation user dashboard and medical community web suite." },
      { kind: "Design", title: "Style Guide", text: "Extending the corporate guide with a secondary palette, plus a grid system built with UXAs for every component." },
      { kind: "Design", title: "Spec Docs", text: "Look and feel for the widget creator, dashboard, widgets and web pages, working with UXAs and development." },
      { kind: "Design", title: "Dashboard Widgets", text: "Distinctive, crisp and clear — dense information made understandable in quick bites." },
      { kind: "Design", title: "Community Pages", text: "A more traditional layout, flexible enough to scale across many components and scenarios." },
    ],
  },
];

function Index() {
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
            <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.steps.map((s) => (
                <div key={s.title} className="grid grid-cols-[7rem_1fr] gap-3 border-t border-border pt-4">
                  <div>
                    <div className="label">{s.kind}:</div>
                    <div className="mt-1 text-sm font-semibold leading-tight">{s.title}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-16 space-y-8">
              {p.images.map((src, i) => (
                <figure key={src} className="border border-border bg-card p-2 shadow-sm">
                  <img src={src} alt={`${p.name} — portfolio page ${i + 1}`} loading="lazy" className="w-full" />
                </figure>
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
    </div>
  );
}
