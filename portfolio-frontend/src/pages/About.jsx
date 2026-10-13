import portrait from "../assets/joel-about.jpg";
import SectionHeading from "../components/SectionHeading";
import ResumeButton from "../components/ResumeButton";
import Reveal from "../components/Reveal";

const facts = [
  { label: "Based in", value: "Ibadan, Nigeria" },
  { label: "Works across", value: "The MERN stack" },
  { label: "Open to", value: "Full-time roles, client projects, collaborations" },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-16 bg-panel px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="about-title" title="About" />

        <div className="mt-14 grid gap-12 md:grid-cols-[18rem_1fr] md:gap-16">
          <Reveal>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden rounded-t-full border-2 border-ink bg-forest md:max-w-none">
              <img
                src={portrait}
                alt="Portrait of Joel Ojo"
                loading="lazy"
                className="h-full w-full object-cover object-[50%_22%]"
              />
              <div className="glass-dark absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-3 text-center">
                <p className="font-display text-lg font-semibold leading-tight">Joel Ojo</p>
                <p className="text-sm text-cream/80">Full-stack developer</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center md:justify-start">
              <ResumeButton variant="solid" className="w-full justify-center md:w-auto" />
            </div>

            <dl className="mt-8 space-y-4">
              {facts.map((fact) => (
                <div key={fact.label} className="border-t border-line pt-3">
                  <dt className="text-sm text-soft">{fact.label}</dt>
                  <dd className="font-semibold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="max-w-[62ch] space-y-6 text-lg leading-relaxed">
            <Reveal delay={0.05}>
              <p className="font-display text-3xl font-medium leading-snug tracking-tight md:text-4xl">
                I build the whole product, from the screen someone taps to the server that answers
                it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                A lot of my work starts with a problem close to home: checking whether a medicine is
                genuine, giving a team one shared place for its documents, or debugging a page
                together with someone who is far away.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                I care about the parts users never see. Rate limits, strict JWT authentication,
                signed webhooks, and a codebase split into small files that are easy to change next
                month.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Right now I am preparing Kherphi for launch, a browser extension that turns any web
                page into a design canvas, and building a mobile football career simulator in Unity.
                I am also learning Python and cybersecurity, so the next thing I ship is secure by
                default.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p>
                Have a role or a project in mind?{" "}
                <a
                  href="#contact"
                  className="font-semibold underline decoration-fill decoration-2 underline-offset-4 hover:text-link"
                >
                  Send me a message
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
