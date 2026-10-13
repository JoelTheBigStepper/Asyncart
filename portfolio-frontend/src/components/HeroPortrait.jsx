import { motion } from "framer-motion";
import portrait from "../assets/joel-hero.jpg";
import ResumeButton from "./ResumeButton";

// Phones: a blended band above the headline. Desktop: bleeds in from the right edge.
// The photo fades out with an alpha mask, so it blends into either theme.
export default function HeroPortrait() {
  return (
    <div className="order-first flex flex-col lg:absolute lg:inset-y-0 lg:right-0 lg:order-none lg:w-[46%]">
      <div className="relative h-[370px] sm:h-[470px] lg:h-auto lg:min-h-0 lg:flex-1">
        <motion.img
          src={portrait}
          alt="Portrait of Joel Ojo"
          className="fade-bottom h-full w-full object-cover object-[50%_20%] lg:fade-corner lg:object-[50%_15%]"
          initial={{ opacity: 0, scale: 1.07 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />

        <motion.div
          className="absolute left-4 top-4 sm:left-8 sm:top-6 lg:bottom-4 lg:left-auto lg:right-10 lg:top-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <div className="glass-dark flex animate-float items-center gap-3 rounded-2xl px-4 py-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-panel2 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-panel2" />
            </span>
            <div>
              <p className="text-sm font-semibold">Open to work</p>
              <p className="text-xs text-cream/80">Full-time roles and client projects</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 -mt-6 px-6 sm:px-10 lg:mt-0 lg:pb-10 lg:pl-[24%] lg:pr-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <ResumeButton variant="glass" />
      </motion.div>
    </div>
  );
}
