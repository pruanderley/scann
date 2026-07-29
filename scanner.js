/**
 * Puzzle #71 Scanner - Core
 * Simulação do motor de busca secp256k1
 */

const scanner = {
    // Estado
    running: false,
    paused: false,
    progress: 0,
    tested: 42700000,
    speed: 482391,
    elapsed: 5520, // segundos
    workers: [],
    hits: [],
    
    // Configuração
    config: {
        totalKeyspace: 1180591620717411303424, // 2^70
        workersCount: 8,
        checkpointInterval: 10000000,
        range: '71 bits  [2^70, 2^71)'
    },
    
    // Inicialização
    init() {
        this.createWorkers();
        this.updateUI();
        this.attachEvents();
    },
    
    // Criar workers
    createWorkers() {
        this.workers = [];
        for (let i = 0; i < this.config.workersCount; i++) {
            this.workers.push({
                id: i,
                pos: `0x${Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0')}...`,
                active: true,
                keys: 0
            });
        }
        this.renderWorkers();
    },
    
    // Renderizar lista de workers
    renderWorkers() {
        const container = document.getElementById('workerList');
        if (!container) return;
        
        container.innerHTML = this.workers.map(w => 
            `<span class="worker-item">
                <span class="wid">▸ w${w.id}</span> 
                <span class="pos">${w.pos}</span>
            </span>`
        ).join('');
    },
    
    // Iniciar
    start() {
        if (this.running) return;
        this.running = true;
        this.paused = false;
        document.getElementById('btnStart').disabled = true;
        document.getElementById('btnPause').disabled = false;
        document.getElementById('statusDot').style.background = '#34d399';
        document.querySelector('#statusDot').style.animation = 'pulse 1.5s infinite';
        console.log('▶️ Scanner iniciado');
        
        // Simula atividade dos workers
        this.simulateWork();
    },
    
    // Pausar
    pause() {
        if (!this.running) return;
        this.paused = !this.paused;
        document.getElementById('btnPause').innerHTML = this.paused ? 
            '<i class="fas fa-play"></i> Continuar' : 
            '<i class="fas fa-pause"></i> Pausar';
        document.getElementById('statusDot').style.background = this.paused ? '#fbbf24' : '#34d399';
        console.log(this.paused ? '⏸️ Scanner pausado' : '▶️ Scanner continuando');
        
        if (!this.paused) {
            this.simulateWork();
        }
    },
    
    // Reset
    reset() {
        this.running = false;
        this.paused = false;
        this.progress = 0;
        this.tested = 0;
        this.elapsed = 0;
        this.hits = [];
        document.getElementById('btnStart').disabled = false;
        document.getElementById('btnPause').disabled = true;
        document.getElementById('btnPause').innerHTML = '<i class="fas fa-pause"></i> Pausar';
        document.getElementById('statusDot').style.background = '#5a7a9a';
        document.querySelector('#statusDot').style.animation = 'none';
        document.getElementById('hitBox').style.display = 'none';
        this.createWorkers();
        this.updateUI();
        console.log('🔄 Scanner reiniciado');
    },
    
    // Simular trabalho
    simulateWork() {
        if (!this.running || this.paused) return;
        
        const interval = setInterval(() => {
            if (!this.running || this.paused) {
                clearInterval(interval);
                return;
            }
            
            // Atualiza métricas
            const increment = Math.floor(Math.random() * 50000 + 10000);
            this.tested += increment;
            this.progress = (this.tested / this.config.totalKeyspace) * 100;
            if (this.progress > 100) this.progress = 0;
            
            this.elapsed += 1;
            this.speed = Math.floor(380000 + Math.random() * 200000);
            
            // Atualiza posição dos workers
            this.workers.forEach(w => {
                w.pos = `0x${Math.floor(Math.random() * 0xFFFFFFFFFFFFFFFF).toString(16).padStart(16, '0')}...`;
                w.keys += Math.floor(Math.random() * 1000 + 100);
            });
            
            // Verifica se encontrou algo (1% de chance a cada 1000 iterações)
            if (Math.random() < 0.0001 && this.tested > 1000000) {
                this.foundHit();
            }
            
            this.updateUI();
            
        }, 1000);
    },
    
    // Simular descoberta
    foundHit() {
        const hit = {
            key: `0x${Math.floor(Math.random() * 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF).toString(16).padStart(64, '0')}`,
            match: ['p2pkh/bech32', 'p2sh', 'uncompressed'][Math.floor(Math.random() * 3)],
            wif: `L${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
            p2pkh: `1${Math.random().toString(36).substring(2, 10)}...`,
            bech32: `bc1q${Math.random().toString(36).substring(2, 10)}...`,
            p2sh: `3${Math.random().toString(36).substring(2, 10)}...`
        };
        this.hits.push(hit);
        this.showHit(hit);
        console.log('💥 CHAVE ENCONTRADA!', hit);
    },
    
    // Mostrar hit
    showHit(hit) {
        const box = document.getElementById('hitBox');
        box.style.display = 'block';
        document.getElementById('hitMatch').textContent = hit.match;
        document.getElementById('hitKey').textContent = hit.key;
        document.getElementById('hitWif').textContent = hit.wif;
        document.getElementById('hitP2pkh').textContent = hit.p2pkh;
        document.getElementById('hitBech32').textContent = hit.bech32;
        document.getElementById('hitP2sh').textContent = hit.p2sh;
        
        // Rolagem suave para o hit
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },
    
    // Atualizar UI
    updateUI() {
        // Progresso
        document.getElementById('progressFill').style.width = Math.min(this.progress, 100) + '%';
        document.getElementById('progressLabel').textContent = Math.min(this.progress, 100).toFixed(4) + '%';
        
        // Testadas
        const human = this.tested > 1e9 ? (this.tested / 1e9).toFixed(2) + ' B' :
                      this.tested > 1e6 ? (this.tested / 1e6).toFixed(1) + ' M' :
                      this.tested > 1e3 ? (this.tested / 1e3).toFixed(1) + ' K' :
                      this.tested.toFixed(0);
        document.getElementById('testedDisplay').textContent = human;
        document.getElementById('testedRaw').textContent = `(${this.tested.toLocaleString()})`;
        
        // Velocidade
        document.getElementById('speedDisplay').innerHTML = `<strong>${this.speed.toLocaleString()}</strong>`;
        
        // Tempo
        const h = String(Math.floor(this.elapsed / 3600)).padStart(2, '0');
        const m = String(Math.floor((this.elapsed % 3600) / 60)).padStart(2, '0');
        const s = String(Math.floor(this.elapsed % 60)).padStart(2, '0');
        document.getElementById('timeDisplay').textContent = `${h}h ${m}m ${s}s`;
        
        // Workers
        document.getElementById('workersStatus').textContent = `${this.workers.filter(w => w.active).length}/${this.config.workersCount} ativos`;
        
        // Sparkline (simula)
        const sparkChars = '▁▂▃▄▅▆▇█';
        let spark = '';
        const baseSpeed = 400000;
        for (let i = 0; i < 24; i++) {
            const val = Math.sin(i * 0.5 + Date.now() / 5000) * 0.5 + 0.5;
            const idx = Math.floor(val * 7);
            spark += sparkChars[idx] || '▁';
        }
        document.getElementById('sparkDisplay').textContent = spark;
        
        // ETA
        if (this.speed > 0) {
            const remaining = this.config.totalKeyspace - this.tested;
            const etaSec = remaining / this.speed;
            const etaStr = etaSec > 86400 * 365 ? 
                (etaSec / (86400 * 365)).toFixed(1) + ' anos' :
                etaSec > 86400 ? 
                (etaSec / 86400).toFixed(1) + ' dias' :
                etaSec > 3600 ?
                Math.floor(etaSec / 3600) + 'h ' + Math.floor((etaSec % 3600) / 60) + 'm' :
                Math.floor(etaSec / 60) + 'm ' + Math.floor(etaSec % 60) + 's';
            document.getElementById('etaDisplay').textContent = etaStr;
        }
        
        // Atualiza workers
        this.renderWorkers();
    },
    
    // Verifica se está rodando
    isRunning() {
        return this.running && !this.paused;
    },
    
    // Atach events
    attachEvents() {
        // Botão de start via Enter
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target === document.body) {
                if (!this.running) {
                    this.start();
                }
            }
        });
    }
};