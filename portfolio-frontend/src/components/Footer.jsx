import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const social = [
  { href: "https://github.com/JoelTheBigStepper", label: "GitHub", icon: FaGithub },
  { href: "https://x.com/JoelDaBigSteppa", label: "X", icon: FaTwitter },
  { href: "https://linkedin.com/", label: "LinkedIn", icon: FaLinkedin },
];

export default function Footer() {
  return (
    <footer className="bg-forest px-6 pb-8 pt-16 text-cream md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            Async<span className="text-panel2">Art</span>
          </p>
          <p className="mt-3 max-w-sm text-cream/80">
            Joel Ojo, full-stack developer in Ibadan, Nigeria.
          </p>
        </div>

        <ul className="flex items-center gap-3">
          {social.map(({ href, label, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-dark flex h-11 w-11 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:bg-panel2 hover:text-forest"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mx-auto mt-12 max-w-6xl border-t border-cream/20 pt-6 text-sm text-cream/70">
        &copy; {new Date().getFullYear()} AsyncArt. All rights reserved.
      </p>
    </footer>
  );
}
