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
      // Check if we can use the encrypted file (requires Secure Context / crypto.subtle)
      const canDecrypt = typeof window !== 'undefined' && window.crypto && window.crypto.subtle;
      
      try {
        let modelUrl: string;

        if (canDecrypt) {
          try {
            const encryptedBlob = await decryptFile(
              "/models/character.enc",
              "Character3D#@"
            );
            modelUrl = URL.createObjectURL(new Blob([encryptedBlob]));
          } catch (e) {
            console.warn("Decryption failed, falling back to plain glb:", e);
            modelUrl = "/models/character.glb";
          }
        } else {
          console.warn("Crypto Subtle not available (Non-secure context?), using plain glb fallback.");
          modelUrl = "/models/character.glb";
        }

        loader.load(
          modelUrl,
          async (gltf) => {
            const character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            
            // Safety check for foot bones
            const footR = character.getObjectByName("footR");
            const footL = character.getObjectByName("footL");
            if (footR) footR.position.y = 3.36;
            if (footL) footL.position.y = 3.36;
            
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            resolve(null); // Resolve with null to let the loading screen finish
          }
        );
      } catch (err) {
        console.error("Character loading error:", err);
        resolve(null);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
