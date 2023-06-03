import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

export default function ParticlesExp () {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={
                {
                    background: {
                    },
                    fpsLimit: 120,
                    "emitters": {
                        "position": {
                            "x": 50,
                            "y": 50
                        },
                        "size": {
                            "width": 50,
                            "height": 50,
                            "mode": "precise"
                        },
                        "rate": {
                            "delay": 0.25,
                            "quantity": 4
                        }
                    },
                    "particles": {
                        "number": {
                            "value": 0,
                            "limit": 300
                        },
                        "color": {
                            "value": ["#FFFFFF"]
                        },
                        "shape": {
                            "type": "circle"
                        },
                        "opacity": {
                            "value": 1
                        },
                        "size": {
                            "value": 3
                        },
                        "links": {
                            "enable": false,
                            "distance": 150,
                            "color": "#00",
                            "opacity": 0.4,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 3,
                            "direction": "none",
                            "random": false,
                            "straight": false,
                            "outModes": {
                                "default": "destroy"
                            },
                            "bounce": false,
                            "path": {
                                "enable": true,
                                "delay": {
                                    "value": 0.1
                                },
                                "options": {
                                    "size": 5,
                                    "draw": false,
                                    "increment": 0.001
                                },
                                "generator": "perlinNoise"
                            },
                            "trail": {
                                "enable": true,
                                "fillColor": "#000000",
                                "length": 20
                            },
                            "attract": {
                                "enable": false,
                                "rotateX": 600,
                                "rotateY": 1200
                            }
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onHover": {
                                "enable": false,
                                "mode": "grab"
                            },
                            "onClick": {
                                "enable": false,
                                "mode": "repulse"
                            },
                            "resize": true
                        },
                        "modes": {
                            "grab": {
                                "distance": 200,
                                "links": {
                                    "opacity": 1
                                }
                            },
                            "bubble": {
                                "distance": 400,
                                "size": 40,
                                "duration": 2,
                                "opacity": 8
                            },
                            "repulse": {
                                "distance": 200
                            },
                            "push": {
                                "quantity": 4
                            },
                            "remove": {
                                "quantity": 2
                            }
                        }
                    }
                }
            }
        />
    );
};