import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating particles
    const particles = new THREE.Group();
    const geometry = new THREE.OctahedronGeometry(0.2, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x7e22ce,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(geometry, material);
      particle.position.x = Math.random() * 40 - 20;
      particle.position.y = Math.random() * 40 - 20;
      particle.position.z = Math.random() * 40 - 20;
      particles.add(particle);
    }

    scene.add(particles);
    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.002;
      particles.children.forEach((particle) => {
        particle.position.y +=
          Math.sin(Date.now() * 0.001 + particle.position.x) * 0.01;
      });
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default BackgroundAnimation;
