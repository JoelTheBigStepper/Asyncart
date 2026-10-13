import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  Bug,
  Building2,
  Church,
  LayoutDashboard,
  Puzzle,
  ShieldCheck,
} from "lucide-react";
import ProjectChip from "../components/ProjectChip";
import HeroPortrait from "../components/HeroPortrait";
import ToolMarquee from "../components/ToolMarquee";
import { findProject } from "../data/realProjects";

export default function Home({ onOpen }) {
  const reduce = useReducedMotion();
  const open = (id) => () => onOpen(findProject(id));

  return (
    <>
      <section
        id="home"
        aria-labelledby="home-title"
        className="relative flex scroll-mt-16 flex-col overflow-hidden lg:min-h-[720px]"
      >
        <div className="w-full px-6 pb-16 pt-6 md:px-12 lg:pb-24 lg:pt-16">
          <div className="mx-auto max-w-6xl">
          <div className="lg:w-[54%]">
            <h1 id="home-title" className="sr-only">
              Joel Ojo, full-stack developer in Ibadan, Nigeria
            </h1>

            <motion.p
              className="font-display text-[1.75rem] font-semibold leading-[1.25] tracking-tight sm:text-[2.1rem] lg:text-[clamp(1.8rem,2.4vw,2.45rem)]"
              initial={reduce ? false : "hidden"}
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
              }}
            >
              I&apos;m Joel, a full-stack developer in Ibadan, Nigeria. I build software for
              problems close to home.{" "}
              <ProjectChip icon={ShieldCheck} tone="sage" onClick={open("medverify")}>
                MedVerify
              </ProjectChip>{" "}
              checks whether a medicine is genuine.{" "}
              <ProjectChip icon={LayoutDashboard} tone="blush" onClick={open("velastrux")}>
                Velastrux
              </ProjectChip>{" "}
              turns any API into a dashboard.{" "}
              <ProjectChip icon={Bug} tone="sage" onClick={open("synerdio")}>
                Synerdio
              </ProjectChip>{" "}
              is a live, shared debugger for web pages.{" "}
              <ProjectChip icon={Puzzle} tone="blush" onClick={open("kherphi")}>
                Kherphi
              </ProjectChip>{" "}
              lets anyone redesign a web page from the browser.
            </motion.p>

            <p className="mt-7 text-lg leading-relaxed text-soft md:text-xl">
              I also build sites for clients, like{" "}
              <ProjectChip icon={Church} tone="blush" onClick={open("rhema")}>
                Rhema Chapel Oluyole
              </ProjectChip>{" "}
              in Ibadan and{" "}
              <ProjectChip icon={Building2} tone="sage" onClick={open("glare")}>
                Glare Solutions
              </ProjectChip>{" "}
              in Lagos.
            </p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.a
                href="#work"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-semibold text-canvas transition-colors hover:bg-link"
              >
                See the work <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </motion.a>
              <a
                href="#contact"
                className="font-semibold underline decoration-fill decoration-2 underline-offset-8 transition-colors hover:text-link"
              >
                Get in touch
              </a>
            </motion.div>
          </div>
          </div>
        </div>

        <HeroPortrait />
      </section>

      <ToolMarquee />
    </>
  );
}
