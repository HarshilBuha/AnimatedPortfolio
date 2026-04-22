import { useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

/**
 * PERFORMANCE FIX in WorkImage.tsx:
 * - Previously fetched a new blob URL on EVERY mouseenter event.
 * - Now caches the blob URL in a ref after the first fetch so subsequent
 *   hovers just set state — no network/blob creation overhead.
 */
const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const cachedBlobUrl = useRef<string | null>(null);

  const handleMouseEnter = async () => {
    if (!props.video) return;
    setIsVideo(true);
    if (cachedBlobUrl.current) {
      setVideo(cachedBlobUrl.current);
      return;
    }
    try {
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      cachedBlobUrl.current = blobUrl;
      setVideo(blobUrl);
    } catch (e) {
      console.error("Failed to load project video", e);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={props.image} alt={props.alt} loading="lazy" decoding="async" />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;