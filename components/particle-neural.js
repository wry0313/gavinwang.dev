import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticlesNeural () {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {

    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: false,
                            mode: "push",
                        },
                        onHover: {
                            enable: false,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 1,
                        },
                        repulse: {
                            distance: 100,
                            duration: 10,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ffffff"],
                    },
                    links: {
                        color: "#ffffff",
                        distance: 1000,
                        enable: true,
                        opacity: 0.4  ,
                        width: 8,
                    },
                    collisions: {
                        enable: true,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: true,
                        speed: 2,
                        straight: true,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 15,
                    },
                    opacity: {
                        value: 0.6,
                    },
                    shape: {
                        type: ["circle"],
                    },
                    size: {
                        value: { min: 0, max: 0 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};