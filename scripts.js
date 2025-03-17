// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Données pour les graphiques
    const trafficClassData = {
        labels: ['Rouge', 'Jaune', 'Vert'],
        datasets: [{
            label: 'Distribution des classes de trafic',
            data: [33, 42, 25],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(243, 156, 18, 0.7)',
                'rgba(46, 204, 113, 0.7)'
            ],
            borderColor: [
                'rgba(231, 76, 60, 1)',
                'rgba(243, 156, 18, 1)',
                'rgba(46, 204, 113, 1)'
            ],
            borderWidth: 1
        }]
    };

    const weatherImpactData = {
        labels: ['Clair', 'Nuageux', 'Pluie', 'Neige'],
        datasets: [{
            label: 'Volume de trafic moyen',
            data: [0.65, 0.72, 0.81, 0.58],
            backgroundColor: 'rgba(52, 152, 219, 0.5)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 1
        }]
    };

    const rushHourData = {
        labels: ['Heure de pointe', 'Heure normale'],
        datasets: [{
            label: 'Volume de trafic moyen',
            data: [0.82, 0.45],
            backgroundColor: [
                'rgba(231, 76, 60, 0.7)',
                'rgba(46, 204, 113, 0.7)'
            ],
            borderColor: [
                'rgba(231, 76, 60, 1)',
                'rgba(46, 204, 113, 1)'
            ],
            borderWidth: 1
        }]
    };

    const economicActivityData = {
        labels: ['Marché', 'Concert', 'Événement sportif', 'Parade', 'Aucun'],
        datasets: [{
            label: 'Volume de trafic moyen',
            data: [0.75, 0.68, 0.72, 0.65, 0.40],
            backgroundColor: 'rgba(155, 89, 182, 0.5)',
            borderColor: 'rgba(155, 89, 182, 1)',
            borderWidth: 1
        }]
    };

    const modelPerformanceData = {
        labels: ['Précision', 'Rappel', 'F1-Score'],
        datasets: [{
            label: 'Trafic Rouge',
            data: [0.85, 0.82, 0.83],
            backgroundColor: 'rgba(231, 76, 60, 0.5)',
            borderColor: 'rgba(231, 76, 60, 1)',
            borderWidth: 1
        }, {
            label: 'Trafic Jaune',
            data: [0.78, 0.80, 0.79],
            backgroundColor: 'rgba(243, 156, 18, 0.5)',
            borderColor: 'rgba(243, 156, 18, 1)',
            borderWidth: 1
        }, {
            label: 'Trafic Vert',
            data: [0.88, 0.84, 0.86],
            backgroundColor: 'rgba(46, 204, 113, 0.5)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 1
        }]
    };

    // Configuration des graphiques
    const pieConfig = {
        type: 'pie',
        data: trafficClassData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribution des classes de trafic'
                }
            }
        }
    };

    const barConfig = {
        type: 'bar',
        data: weatherImpactData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Impact des conditions météorologiques sur le trafic'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    };

    const horizontalBarConfig = {
        type: 'bar',
        data: rushHourData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Volume de trafic pendant les heures de pointe vs heures normales'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    };

    const barConfig2 = {
        type: 'bar',
        data: economicActivityData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Impact des activités économiques sur le trafic'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    };

    const radarConfig = {
        type: 'radar',
        data: modelPerformanceData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Performance du modèle par classe de trafic'
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 1
                }
            }
        }
    };

    // Création des graphiques
    const trafficClassChart = new Chart(
        document.getElementById('trafficClassChart'),
        pieConfig
    );

    const weatherImpactChart = new Chart(
        document.getElementById('weatherImpactChart'),
        barConfig
    );

    const rushHourChart = new Chart(
        document.getElementById('rushHourChart'),
        horizontalBarConfig
    );

    const economicActivityChart = new Chart(
        document.getElementById('economicActivityChart'),
        barConfig2
    );

    const modelPerformanceChart = new Chart(
        document.getElementById('modelPerformanceChart'),
        radarConfig
    );

    // Animation au défilement
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .step, .result-item');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // Si l'élément est visible dans la fenêtre
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Appliquer les styles initiaux pour l'animation
    const elementsToAnimate = document.querySelectorAll('.card, .step, .result-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Déclencher l'animation au chargement et au défilement
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Déclencher une fois au chargement
});
