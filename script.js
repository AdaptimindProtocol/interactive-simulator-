document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mainTpsEl = document.getElementById('main-tps');
    const mainGasEl = document.getElementById('main-gas');
    const mainLoadBarEl = document.getElementById('main-load-bar');
    const mainLogEl = document.getElementById('main-activity');

    const shardTpsEl = document.getElementById('shard-tps');
    const shardGasEl = document.getElementById('shard-gas');
    const shardLoadBarEl = document.getElementById('shard-load-bar');
    const shardLogEl = document.getElementById('shard-activity');

    const oracleCoreEl = document.getElementById('oracle-core');
    const oracleStatusEl = document.getElementById('oracle-status');
    const launchBtn = document.getElementById('launch-app-btn');
    const dynamicShardEl = document.getElementById('dynamic-shard');

    // Initial State
    let mainTps = 1500;
    let mainGas = 0.01;
    let mainLoad = 10;
    let shardActive = false;

    // Logging function
    function log(element, message, type = 'new') {
        const p = document.createElement('p');
        p.textContent = `> ${message}`;
        p.className = type;
        element.prepend(p);
        if (element.children.length > 10) {
            element.lastChild.remove();
        }
    }

    // Update UI function
    function updateUI() {
        mainTpsEl.textContent = mainTps.toLocaleString();
        mainGasEl.textContent = `$${mainGas.toFixed(2)}`;
        mainLoadBarEl.style.width = `${mainLoad}%`;

        if (mainLoad > 80) mainLoadBarEl.style.backgroundColor = 'var(--danger-color)';
        else if (mainLoad > 50) mainLoadBarEl.style.backgroundColor = 'var(--warning-color)';
        else mainLoadBarEl.style.backgroundColor = 'var(--success-color)';
    }

    // Main network simulation
    setInterval(() => {
        if (!shardActive) {
            const fluctuation = (Math.random() - 0.5) * 200;
            mainTps = Math.max(1200, Math.min(1800, mainTps + fluctuation));
            mainLoad = 10 + Math.random() * 15;
        } else {
            const fluctuation = (Math.random() - 0.5) * 100;
            mainTps = Math.max(1400, Math.min(1600, mainTps + fluctuation));
            mainLoad = 5 + Math.random() * 10;
        }
        updateUI();
    }, 1500);

    // Launch dApp button logic
    launchBtn.addEventListener('click', () => {
        if (shardActive) return;

        shardActive = true;
        launchBtn.disabled = true;
        launchBtn.textContent = 'ALLOCATING...';

        log(mainLogEl, 'High-load dApp detected!', 'warning');
        
        oracleStatusEl.textContent = 'AI-ORACLE: HIGH LOAD DETECTED';
        oracleStatusEl.style.backgroundColor = 'var(--warning-color)';
        oracleCoreEl.classList.add('active');

        setTimeout(() => {
            log(mainLogEl, 'AI-Oracle initiating dynamic shard...', 'warning');
            oracleStatusEl.textContent = 'AI-ORACLE: CREATING SHARD...';
            oracleStatusEl.style.backgroundColor = 'var(--danger-color)';
        }, 2000);

        setTimeout(() => {
            dynamicShardEl.classList.add('active');
            log(shardLogEl, 'Shard #1 activated.', 'success');
            log(mainLogEl, 'Traffic offloaded to Shard #1.', 'success');
            
            oracleStatusEl.textContent = 'AI-ORACLE: SHARD ACTIVE';
            oracleStatusEl.style.backgroundColor = 'var(--success-color)';

            // Start shard simulation
            startShardSimulation();
        }, 4000);
    });

    function startShardSimulation() {
        let shardTps = 0;
        let shardGas = 0.05;
        let shardLoad = 0;

        const shardInterval = setInterval(() => {
            shardTps = Math.min(50000, shardTps + Math.random() * 5000);
            shardLoad = Math.min(95, shardLoad + Math.random() * 10);

            shardTpsEl.textContent = shardTps.toLocaleString();
            shardGasEl.textContent = `$${shardGas.toFixed(3)}`;
            shardLoadBarEl.style.width = `${shardLoad}%`;
            
            if (shardLoad > 80) shardLoadBarEl.style.backgroundColor = 'var(--danger-color)';
            else if (shardLoad > 50) shardLoadBarEl.style.backgroundColor = 'var(--warning-color)';
            else shardLoadBarEl.style.backgroundColor = 'var(--success-color)';

            log(shardLogEl, `Processing ${Math.round(shardTps / 10)} game-state updates...`);

        }, 1000);
    }

    // Initial UI update
    updateUI();
});
