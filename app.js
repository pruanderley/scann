/**
 * Puzzle #71 Scanner - App Controller
 * v3.1 - PWA Ready
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o scanner
    scanner.init();
    
    // Atualiza a interface periodicamente
    setInterval(() => {
        scanner.updateUI();
    }, 1000);
    
    // Atalhos de teclado
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            scanner.pause();
        }
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            if (scanner.isRunning()) {
                scanner.pause();
            } else {
                scanner.start();
            }
        }
    });
    
    // Detecta se está offline
    window.addEventListener('online', () => {
        document.querySelector('#statusDot').style.background = '#34d399';
    });
    window.addEventListener('offline', () => {
        document.querySelector('#statusDot').style.background = '#f87171';
    });
    
    console.log('🔍 Puzzle #71 Scanner v3.1 carregado!');
    console.log('📌 Pressione ESPAÇO para iniciar/pausar');
});