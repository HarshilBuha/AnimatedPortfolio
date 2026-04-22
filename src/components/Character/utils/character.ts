// src/components/Character/utils/character.ts
import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve) => {
      const canDecrypt =
        typeof window !== "undefined" &&
        !!window.crypto &&
        !!window.crypto.subtle;

      let objectUrl: string | null = null;

      const cleanupTempUrl = () => {
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
      };

      try {
        let modelUrl: string;

        if (canDecrypt) {
          try {
            const encryptedBlob = await decryptFile(
              "/models/character.enc",
              "Character3D#@"
            );
            objectUrl = URL.createObjectURL(new Blob([encryptedBlob]));
            modelUrl = objectUrl;
          } catch (e) {
            console.warn("Decryption failed, falling back to plain glb:", e);
            modelUrl = "/models/character.glb";
          }
        } else {
          console.warn(
            "Crypto Subtle not available (non-secure context), using plain glb fallback."
          );
          modelUrl = "/models/character.glb";
        }

        loader.load(
          modelUrl,
          (gltf) => {
            const character = gltf.scene;

            // Resolve immediately so app loading can finish even if shader compile is slow.
            resolve(gltf);

            // Run compile in background; never block app boot on this.
            void renderer.compileAsync(character, camera, scene).catch((err) => {
              console.warn("compileAsync failed or was skipped:", err);
            });

            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });

            setCharTimeline(character, camera);
            setAllTimeline();

            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;

            // Clear GSAP interval on scene dispose.
            renderer.domElement.addEventListener(
              "_dispose",
              () => {
                const interval = (character as any).__intensityInterval;
                if (interval !== undefined) clearInterval(interval);
              },
              { once: true }
            );

            cleanupTempUrl();
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            cleanupTempUrl();
            dracoLoader.dispose();
            resolve(null);
          }
        );
      } catch (err) {
        console.error("Character loading error:", err);
        cleanupTempUrl();
        dracoLoader.dispose();
        resolve(null);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;