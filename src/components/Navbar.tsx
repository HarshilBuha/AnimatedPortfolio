import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { personalInfo } from "../data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

/**
 * PERFORMANCE FIX — Navbar.tsx:
 *
 * Replaced gsap-trial/ScrollSmoother with Lenis (lenis@1.3+).
 * Reasons:
 *  - ScrollSmoother uses `speed: 1.7` which stretches content position beyond
 *    the true scroll value, forcing style recalculation on EVERY frame.
 *  - Lenis hooks into gsap.ticker so smooth scroll and GSAP animations share
 *    the same RAF tick — zero double-RAF overhead.
 *  - `gsap.ticker.lagSmoothing(0)` prevents GSAP from capping delta on slow
 *    frames, which was causing ScrollTrigger scrub to stutter on scroll start.
 *  - `paused(true)` equivalent: lenis.stop() / lenis.start() pattern.
 */

// Module-level lenis instance so GsapScroll / other modules can reference it
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ticker — single RAF for both
    gsap.ticker.add((time) => {
      lenis!.raf(time * 1000);
    });
    // Disable GSAP's lag smoothing cap which causes scroll stutters
    gsap.ticker.lagSmoothing(0);

    // Sync ScrollTrigger with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Start paused until loading screen completes
    lenis.stop();

    // Scroll to top on init
    lenis.scrollTo(0, { immediate: true });

    // Nav link click → smooth scroll to section
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const section = element.getAttribute("data-href");
          if (section) {
            lenis!.scrollTo(section, { offset: 0, duration: 1.4 });
          }
        }
      });
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove((time) => lenis!.raf(time * 1000));
      lenis?.destroy();
      lenis = null;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {personalInfo.name}
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {personalInfo.email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;