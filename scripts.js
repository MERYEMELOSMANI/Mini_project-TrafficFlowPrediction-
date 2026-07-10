// Initialisation des variables globales
let isScrolled = false;

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Masquer l'écran de chargement après 2 secondes
    setTimeout(function() {
        document.getElementById('loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('loading-screen').style.display = 'none';
        }, 500);
    }, 2000);

    // Initialiser les particules
    initParticles();
    
    // Initialiser la scène Three.js
    initThreeScene();
    
    // Initialiser les graphiques
    initCharts();
    
    // Initialiser les animations GSAP
    initGSAPAnimations();
    
    // Initialiser les compteurs de statistiques
    initCounters();
    
    // Gérer le menu de navigation
    initNavigation();

    // Gérer le bouton de retour en haut
    initBackToTop();
});

// Fonction pour initialiser les particules
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#3498db'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3498db',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// Fonction pour initialiser la scène Three.js
function initThreeScene() {
    if (typeof THREE !== 'undefined') {
        const container = document.getElementById('canvas-container');
        
        // Créer la scène, la caméra et le renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // Créer un groupe pour les objets
        const group = new THREE.Group();
        scene.add(group);
        
        // Créer des objets représentant des voitures stylisées
        for (let i = 0; i < 20; i++) {
            const geometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
            const material = new THREE.MeshBasicMaterial({ 
                color: new THREE.Color(Math.random(), Math.random(), Math.random()),
                transparent: true,
                opacity: 0.7
            });
            
            const car = new THREE.Mesh(geometry, material);
            
            // Positionner aléatoirement les voitures
            car.position.x = Math.random() * 10 - 5;
            car.position.y = Math.random() * 5 - 2.5;
            car.position.z = Math.random() * 5 - 2.5;
            
            // Ajouter une propriété de vitesse
            car.userData.speed = Math.random() * 0.02 + 0.01;
            
            group.add(car);
        }
        
        // Positionner la caméra
        camera.position.z = 5;
        
        // Animation
        function animate() {
            requestAnimationFrame(animate);
            
            // Faire tourner le groupe
            group.rotation.y += 0.003;
            
            // Animer les voitures
            group.children.forEach(car => {
                car.position.x -= car.userData.speed;
                
                // Réinitialiser la position si la voiture sort de l'écran
                if (car.position.x < -5) {
                    car.position.x = 5;
                    car.position.y = Math.random() * 5 - 2.5;
                    car.position.z = Math.random() * 5 - 2.5;
                }
            });
            
            renderer.render(scene, camera);
        }
        
        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        animate();
    }
}

// Fonction pour initialiser les graphiques
function initCharts() {
    if (typeof Chart !== 'undefined') {
        // Graphique de distribution des classes de trafic
        const trafficClassCtx = document.getElementById('trafficChart').getContext('2d');
        const trafficClassChart = new Chart(trafficClassCtx, {
            type: 'pie',
            data: {
                labels: ['Rouge', 'Jaune', 'Vert'],
                datasets: [{
                    data: [30, 50, 20],
                    backgroundColor: [
                        '#e74c3c',
                        '#f39c12',
                        '#2ecc71'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
}

// Fonction pour initialiser les animations GSAP
function initGSAPAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Enregistrer le plugin ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);
        
        // Animation du header au défilement
        gsap.to('#main-nav', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'bottom top',
                toggleClass: {targets: '#main-nav', className: 'scrolled'}
            }
        });
        
        // Animation des sections au défilement
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            // Animation de l'en-tête de section
            gsap.from(section.querySelector('.section-header'), {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%'
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
            
            // Animation du contenu de section
            const content = section.querySelector('.section-header').nextElementSibling;
            
            if (content) {
                gsap.from(content, {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 70%'
                    },
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    delay: 0.3
                });
            }
        });
    }
}

// Fonction pour initialiser les compteurs
function initCounters() {
    const stats = document.querySelectorAll('.stat-value');
    
    stats.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const step = target / duration * 10; // Incrément tous les 10ms
        let current = 0;
        
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !stat.classList.contains('counted')) {
                stat.classList.add('counted');
                
                const timer = setInterval(() => {
                    current += step;
                    
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    // Formater le nombre selon qu'il s'agit d'un entier ou d'un décimal
                    if (Number.isInteger(target)) {
                        stat.textContent = Math.floor(current);
                    } else {
                        stat.textContent = current.toFixed(3);
                    }
                }, 10);
            }
        }, { threshold: 0.5 });
        
        observer.observe(stat);
    });
}

// Fonction pour initialiser la navigation
function initNavigation() {
    const nav = document.getElementById('main-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    
    // Gérer le clic sur le bouton du menu
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animer les barres du menu
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].classList.toggle('rotated');
        bars[1].classList.toggle('hidden');
        bars[2].classList.toggle('rotated-reverse');
    });
    
    // Gérer le clic sur les liens de navigation
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Supprimer la classe active de tous les liens
            links.forEach(l => l.classList.remove('active'));
            
            // Ajouter la classe active au lien cliqué
            this.classList.add('active');
            
            // Fermer le menu mobile si ouvert
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                
                // Réinitialiser l'animation des barres du menu
                const bars = menuToggle.querySelectorAll('.bar');
                bars[0].classList.remove('rotated');
                bars[1].classList.remove('hidden');
                bars[2].classList.remove('rotated-reverse');
            }
        });
    });
    
    // Mettre à jour la navigation active au défilement
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Vérifier si la page a défilé
        if (scrollPosition > 50 && !isScrolled) {
            nav.classList.add('scrolled');
            isScrolled = true;
        } else if (scrollPosition <= 50 && isScrolled) {
            nav.classList.remove('scrolled');
            isScrolled = false;
        }
        
        // Mettre à jour le lien actif en fonction de la section visible
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Fonction pour initialiser le bouton de retour en haut
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Ajouter des classes CSS pour les animations des barres du menu
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .bar.rotated {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .bar.hidden {
            opacity: 0;
        }
        
        .bar.rotated-reverse {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    </style>
`);
