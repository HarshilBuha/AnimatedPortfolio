import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { personalInfo } from "../data/portfolioData";

/**
 * PERFORMANCE FIXES in SocialIcons.tsx:
 * 1. Previously spawned 4 independent requestAnimationFrame loops (one per icon)
 *    — all running forever. Now uses a SINGLE shared RAF loop for all icons.
 * 2. mousemove listener is now passive: true.
 * 3. Cleanup actually cancels the RAF and removes the document listener.
 */
const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    type IconState = {
      elem: HTMLElement;
      link: HTMLElement;
      rect: DOMRect;
      mouseX: number;
      mouseY: number;
      currentX: number;
      currentY: number;
    };

    const icons: IconState[] = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;
      const rect = elem.getBoundingClientRect();
      icons.push({
        elem,
        link,
        rect,
        mouseX: rect.width / 2,
        mouseY: rect.height / 2,
        currentX: rect.width / 2,
        currentY: rect.height / 2,
      });
    });

    // Single RAF loop for ALL icons — far cheaper than 4 separate loops
    let rafId: number;
    const updateAll = () => {
      for (const icon of icons) {
        icon.currentX += (icon.mouseX - icon.currentX) * 0.1;
        icon.currentY += (icon.mouseY - icon.currentY) * 0.1;
        icon.link.style.setProperty("--siLeft", `${icon.currentX}px`);
        icon.link.style.setProperty("--siTop", `${icon.currentY}px`);
      }
      rafId = requestAnimationFrame(updateAll);
    };
    rafId = requestAnimationFrame(updateAll);

    const onMouseMove = (e: MouseEvent) => {
      for (const icon of icons) {
        const rect = icon.elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          icon.mouseX = x;
          icon.mouseY = y;
        } else {
          icon.mouseX = rect.width / 2;
          icon.mouseY = rect.height / 2;
        }
      }
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={personalInfo.github} target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={personalInfo.linkedin} target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://x.com" target="_blank">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="#">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;