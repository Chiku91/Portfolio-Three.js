import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import HackerRoom from "../components/HackerRoom.jsx";
import CanvasLoader from "../components/CanvasLoader";  // Assuming this component is defined

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        const onContextLost = (event) => {
            console.error("WebGL context lost");
            event.preventDefault(); // Prevent default behavior of losing context
        };

        const onContextRestored = () => {
            console.log("WebGL context restored");
        };

        if (canvas) {
            canvas.addEventListener('webglcontextlost', onContextLost, false);
            canvas.addEventListener('webglcontextrestored', onContextRestored, false);

            return () => {
                canvas.removeEventListener('webglcontextlost', onContextLost);
                canvas.removeEventListener('webglcontextrestored', onContextRestored);
            };
        }
    }, []);

    return (
        <section className="min-h-screen w-full flex flex-col relative">
            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I am Priyanshu Satapathy <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient">Crafting Innovation & Building Softwares</p>
            </div>

            <div className="w-full h-full absolute inset-0">
                <Canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    gl={{ preserveDrawingBuffer: true, antialias: true, alpha: true }}
                    onCreated={({ gl }) => {
                        gl.getContext().lostContext = () => {
                            console.log("WebGL context lost, attempting recovery...");
                            gl.getContext().restore();
                        };
                    }}
                >
                    <Suspense fallback={<CanvasLoader />}>
                        <PerspectiveCamera makeDefault position={[0, 0, 30]} />
                        <HackerRoom scale={0.07} position={[0, 0, 0]} rotation={[0, 0, 0]} />
                        <ambientLight intensity={1} />
                        <directionalLight position={[10, 10, 10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Hero;
