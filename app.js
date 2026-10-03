// Sound FX Synthesizer via Web Audio API
class RetroAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq, type, duration, delay = 0) {
    if (!this.enabled) return;
    this.init();
    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio policy ignore
      }
    }, delay);
  }

  click() {
    this.playTone(480, 'square', 0.05);
  }

  complete() {
    this.playTone(330, 'square', 0.08, 0);
    this.playTone(440, 'square', 0.08, 70);
    this.playTone(660, 'square', 0.15, 140);
  }

  modalOpen() {
    this.playTone(220, 'triangle', 0.07);
    this.playTone(550, 'triangle', 0.1, 50);
  }
}

const sfx = new RetroAudio();

// Master Cybersecurity Project Dataset
const PROJECTS = [
  // ================= 1. NETWORK SECURITY =================
  {
    id: 'net-01',
    category: 'netsec',
    tierLabel: 'NET_SEC',
    title: 'Raw Socket Packet Sniffer & Protocol Dissector',
    xp: 180,
    desc: 'Low-level network telemetry engine capturing promiscuous interface traffic, parsing Ethernet, IPv4, TCP/UDP headers, and alerting on unencrypted cleartext protocols.',
    realWorld: 'Core engineering basis of Network Detection and Response (NDR) appliances and protocol analysis tools like Zeek and Wireshark.',
    prereqs: ['C or Python (raw sockets / struct module)', 'Linux AF_PACKET or libpcap', 'Wireshark validation'],
    steps: [
      'Bind a raw socket to network interfaces in promiscuous mode to intercept layer 2/3 frames.',
      'Unpack raw binary byte streams using struct unpack to extract MAC, IP, TTL, and TCP sequence flags.',
      'Construct a protocol decoding pipeline identifying cleartext protocols (Telnet, HTTP, FTP) and flag credential exposures.',
      'Implement ring-buffer memory storage to prevent packet drops under saturated multi-megabit throughput.'
    ]
  },
  {
    id: 'net-02',
    category: 'netsec',
    tierLabel: 'NET_SEC',
    title: 'Signature & Heuristic Network IDS/IPS Engine',
    xp: 260,
    desc: 'Inline packet inspection service running custom Snort/Suricata-style signatures and sliding-window rate tracking to drop SYN floods and port sweeps.',
    realWorld: 'Mirrors edge perimeter inspection appliances preventing brute-force and exploit stage deliveries across corporate DMZs.',
    prereqs: ['Python or Go', 'Linux iptables/NFQUEUE integration', 'PCAP baseline datasets'],
    steps: [
      'Intercept outbound and inbound network packets via Linux Netfilter Queue (NFQUEUE).',
      'Parse Layer 4 payloads against regex signatures matching known CVE exploit patterns and traversal indicators.',
      'Implement a token-bucket state tracker to identify high-velocity TCP SYN sweeps without ACK completion.',
      'Execute dynamic packet verdicts (ACCEPT / DROP) and push real-time alert logs to syslog.'
    ]
  },

  // ================= 2. WEB APP SECURITY =================
  {
    id: 'web-01',
    category: 'appsec',
    tierLabel: 'APP_SEC',
    title: 'Automated DAST Vulnerability Crawler & Scanner',
    xp: 240,
    desc: 'Targeted dynamic security scanner parsing DOM inputs, auditing headers, and injecting non-destructive boundary probes for SQLi, XSS, and SSRF.',
    realWorld: 'Automates security verification in corporate staging environments prior to pushing code updates into production.',
    prereqs: ['Python (asyncio / aiohttp / BeautifulSoup)', 'OWASP Top 10 guidelines', 'Local DVWA / Juice Shop lab'],
    steps: [
      'Implement an asynchronous web crawler to map URL endpoints, forms, hidden fields, and URL parameters.',
      'Inject canary strings into reflection points to verify input sanitization against context-breaking characters (<, >, \', ").',
      'Test for out-of-band SSRF vulnerabilities by providing listener URLs inside webhooks and image fetch forms.',
      'Score vulnerabilities with CVSS v3.1 metrics and compile structured JSON remediation reports for engineering teams.'
    ]
  },
  {
    id: 'web-02',
    category: 'appsec',
    tierLabel: 'APP_SEC',
    title: 'Reverse Proxy Web Application Firewall (WAF)',
    xp: 250,
    desc: 'Application gateway inspecting incoming HTTP/S payloads, executing input normalization, and blocking OWASP Top 10 exploit vectors.',
    realWorld: 'Protects enterprise web endpoints from zero-day exploit probes and unpatched legacy systems.',
    prereqs: ['Node.js or Python or Go', 'Regex / AST parsing', 'TLS termination basics'],
    steps: [
      'Establish a reverse proxy sitting upstream of internal web services handling client connections.',
      'Run multi-layer string decoders to defeat double-URL encoding, null bytes, and hex evasion tricks.',
      'Evaluate request parameters against AST rules for SQL injection logic (e.g., tautologies, UNION operators).',
      'Enforce an adaptive rate limiter and return HTTP 403 Forbidden with custom security alert logging.'
    ]
  },

  // ================= 3. CRYPTOGRAPHY =================
  {
    id: 'crypto-01',
    category: 'crypto',
    tierLabel: 'CRYPTO',
    title: 'Zero-Knowledge CLI Password & Secret Vault',
    xp: 220,
    desc: 'End-to-end encrypted secret store utilizing PBKDF2/Argon2id key derivation, AES-256-GCM authenticated encryption, and memory scrubbing.',
    realWorld: 'The architectural pattern behind modern enterprise secret management systems like HashiCorp Vault and Bitwarden.',
    prereqs: ['Python (cryptography library) or C', 'Authenticated AES-GCM cipher mechanics', 'Argon2id hashing'],
    steps: [
      'Derive a 256-bit encryption key from a master passphrase using Argon2id with high memory and iteration costs.',
      'Encrypt individual secret payloads with AES-GCM using unique cryptographically random 96-bit nonces per entry.',
      'Store ciphertext and 128-bit authentication tags into an isolated SQLite database file.',
      'Implement volatile memory overwriting (zeroing byte arrays) immediately after vault lock to resist memory dumps.'
    ]
  },
  {
    id: 'crypto-02',
    category: 'crypto',
    tierLabel: 'CRYPTO',
    title: 'Hybrid PKI File Encryption & Digital Signer',
    xp: 210,
    desc: 'Cryptographic suite leveraging RSA/ECC for asymmetric key exchange and AES for bulk symmetric encryption with SHA-256 HMAC verification.',
    realWorld: 'Implements the secure document signing and data-at-rest encryption standard mandated by HIPAA and SOC2 compliance.',
    prereqs: ['OpenSSL / Python cryptography', 'Public Key Infrastructure (PKI)', 'X.509 standards'],
    steps: [
      'Generate asymmetric keypairs (RSA 4096-bit or Ed25519) and export them with standard PEM formatting.',
      'Generate an ephemeral symmetric session key (AES-256) per file, encrypting the document payload.',
      'Encrypt the ephemeral key using the recipient\'s public key and attach a cryptographically signed SHA-256 hash.',
      'Build verification logic to decrypt and validate file integrity, ensuring non-repudiation.'
    ]
  },

  // ================= 4. MALWARE ANALYSIS & RE =================
  {
    id: 're-01',
    category: 're-malware',
    tierLabel: 'MALWARE_RE',
    title: 'Automated Dynamic Sandbox & Detonation Chamber',
    xp: 300,
    desc: 'Isolated analysis pipeline running suspicious binaries inside ephemeral VMs, capturing API hooks, file changes, and network beacons.',
    realWorld: 'Used by automated threat ingestion pipelines in corporate SOCs to triage email attachments and malware drops.',
    prereqs: ['Python', 'VirtualBox / KVM API or Cuckoo sandbox architecture', 'Sysmon / Procmon trace tools'],
    steps: [
      'Script automated VM snapshot reverting and guest execution controls via virtualization APIs.',
      'Inject API monitoring DLLs to record process creation, registry modifications, and outbound socket calls.',
      'Extract static attributes: PE headers, import/export tables, section entropy, and embedded compile timestamps.',
      'Generate an incident triage report detailing Indicators of Compromise (IOCs) and MITRE ATT&CK mappings.'
    ]
  },
  {
    id: 're-02',
    category: 're-malware',
    tierLabel: 'MALWARE_RE',
    title: 'PE Static Triage & Heuristic Disassembly Inspector',
    xp: 230,
    desc: 'Static malware inspection binary parsing Windows Portable Executable headers to calculate section entropy and identify packed payloads.',
    realWorld: 'Serves as the initial frontline triage stage for reverse engineering teams dealing with malware samples.',
    prereqs: ['Python (pefile / Capstone engine) or C++', 'PE/COFF file format specifications', 'Ghidra basics'],
    steps: [
      'Parse the DOS header, PE signature, COFF header, and Optional Header of targeted binaries.',
      'Calculate Shannon entropy per section (.text, .data, .rsrc) to detect high-entropy packing or encryption.',
      'Audit the Import Address Table (IAT) for suspicious evasion calls (e.g., VirtualAlloc, WriteProcessMemory, IsDebuggerPresent).',
      'Disassemble entry point bytes with the Capstone engine to inspect initial execution logic.'
    ]
  },

  // ================= 5. DIGITAL FORENSICS =================
  {
    id: 'dfir-01',
    category: 'forensics',
    tierLabel: 'FORENSICS',
    title: 'Volatile Memory (RAM) Forensics Pipeline',
    xp: 270,
    desc: 'Automated memory dump parser extracting running processes, injected code segments, network connections, and unpacked credentials.',
    realWorld: 'Essential DFIR practice during live corporate incident response where malware resides strictly in memory (fileless).',
    prereqs: ['Volatility 3 Framework', 'LiME memory acquisition', 'Windows memory architecture internals'],
    steps: [
      'Capture volatile RAM from simulated compromised endpoints using native memory dumping utilities.',
      'Extract process trees using Volatility 3 to locate hidden or orphaned processes attempting evasion.',
      'Identify process hollowing and injected shellcode using memory protection auditing (`malfind`).',
      'Correlate active network sockets from memory structures with known malicious external IP feeds.'
    ]
  },
  {
    id: 'dfir-02',
    category: 'forensics',
    tierLabel: 'FORENSICS',
    title: 'Windows Artifact Timeline Reconstructor',
    xp: 210,
    desc: 'Forensic utility parsing NTFS $MFT records, Prefetch files, and UserAssist registry keys to reconstruct execution sequences.',
    realWorld: 'Used by forensic investigators to prove attribution, execution timing, and dwell time during post-breach audits.',
    prereqs: ['Python', 'NTFS filesystem mechanics', 'Windows registry structures'],
    steps: [
      'Parse Master File Table ($MFT) records to track file creation, modification, and deletion timestamps.',
      'Extract Windows Prefetch (.pf) files to confirm binary execution counts and initial launch times.',
      'Decode UserAssist and ShellBag registry keys to trace interactive user and attacker navigation paths.',
      'Assemble a unified super-timeline in CSV/ELK to reconstruct the complete attacker kill-chain chronologically.'
    ]
  },

  // ================= 6. AI / ML FOR SECURITY =================
  {
    id: 'aiml-01',
    category: 'ai-sec',
    tierLabel: 'AI_ML_SEC',
    title: 'NLP Phishing & Social Engineering Classifier',
    xp: 220,
    desc: 'Machine learning model utilizing TF-IDF tokenization and Transformer embeddings to detect malicious email language and urgency patterns.',
    realWorld: 'The core technology powering enterprise email security gateways (SEG) protecting corporate inboxes from BEC scams.',
    prereqs: ['Python (scikit-learn / HuggingFace)', 'SpamAssassin / Enron email datasets', 'FastAPI'],
    steps: [
      'Clean and tokenize raw email headers, body text, and hyperlinks from public phishing corpora.',
      'Extract linguistic features (urgency metrics, brand impersonation indicators, reply-to mismatches).',
      'Train an ensemble classification pipeline (Random Forest or DistilBERT) optimizing for ultra-low false-positive rates.',
      'Deploy the trained model as an internal REST microservice evaluating real-time inbound mail streams.'
    ]
  },
  {
    id: 'aiml-02',
    category: 'ai-sec',
    tierLabel: 'AI_ML_SEC',
    title: 'Unsupervised Network Anomaly Detector (Isolation Forests)',
    xp: 270,
    desc: 'Telemetry model ingesting continuous NetFlow/IPFIX logs, isolating abnormal traffic spikes, beaconing intervals, and data exfiltration.',
    realWorld: 'Drives User and Entity Behavior Analytics (UEBA) systems inside enterprise Security Operations Centers.',
    prereqs: ['Python (pandas / scikit-learn)', 'CIC-IDS2017 dataset or raw NetFlow', 'Data normalization'],
    steps: [
      'Extract structured flow features: bytes transferred, packet duration, inter-arrival times, and port entropy.',
      'Normalize multi-dimensional telemetry vectors using standard scaling and PCA dimensionality reduction.',
      'Train an Isolation Forest model to isolate statistical anomalies without needing pre-labeled attack data.',
      'Tune detection thresholds and trigger automated SOC alert notifications on persistent beaconing signatures.'
    ]
  },

  // ================= 7. HARDWARE / IOT SECURITY =================
  {
    id: 'iot-01',
    category: 'iot-hw',
    tierLabel: 'IOT_HW',
    title: 'Embedded IoT Firmware Extraction & Analysis Lab',
    xp: 250,
    desc: 'Hardware security workbench reverse engineering IoT firmware images to extract file systems, hardcoded credentials, and backdoor binaries.',
    realWorld: 'Standard security validation required for connected devices, industrial PLCs, and medical equipment.',
    prereqs: ['Linux', 'Binwalk & SquashFS utilities', 'Ghidra / QEMU emulation'],
    steps: [
      'Acquire target vendor firmware binary images (e.g., router, camera, or embedded controller).',
      'Run Binwalk signature sweeps to carve compressed SquashFS / CramFS file system partitions.',
      'Audit configuration files and shadow files to uncover hardcoded administrative credentials and private SSH keys.',
      'Emulate extracted ARM/MIPS service binaries within QEMU user-mode to audit listening network services.'
    ]
  },
  {
    id: 'iot-02',
    category: 'iot-hw',
    tierLabel: 'IOT_HW',
    title: 'Hardware Protocol Interceptor (UART / JTAG / SPI Auditing)',
    xp: 280,
    desc: 'Bench setup interfacing directly with microcontroller debug buses to extract running flash memory and bypass bootloader protections.',
    realWorld: 'Conducted during physical hardware penetration testing and supply-chain vulnerability assessments.',
    prereqs: ['Logic Analyzer or FTDI breakout / Bus Pirate', 'Multimeter', 'UART / SPI / I2C protocols'],
    steps: [
      'Identify hardware PCB debug test points using continuity checks and multimeter voltage profiling.',
      'Hook logic analyzer leads to Rx/Tx traces to decode serial baud rates and intercept early bootloader logs.',
      'Interrupt the U-Boot sequence via console prompt injection to alter boot arguments (`init=/bin/sh`).',
      'Dump external SPI flash memory chips directly using flashrom over SPI pin headers for offline recovery.'
    ]
  },

  // ================= 8. THREAT INTEL / SIEM / LOG ANALYSIS =================
  {
    id: 'siem-01',
    category: 'soc-siem',
    tierLabel: 'SIEM_INTEL',
    title: 'Enterprise SIEM Pipeline & Detection Engineering Lab',
    xp: 290,
    desc: 'Centralized telemetry hub ingesting Windows Sysmon and Linux auditd logs, converted into real-time alerts using Sigma rules.',
    realWorld: 'The defensive operational hub of corporate SOCs to detect adversary movement and persistence.',
    prereqs: ['Elastic Stack / Wazuh', 'Windows Sysmon configurations', 'Sigma Detection Format'],
    steps: [
      'Deploy Sysmon with SwiftOnSecurity configurations to capture detailed process creation (Event ID 1) and network connections.',
      'Ship raw endpoint events through Logstash/Elastic Agent into an Elasticsearch cluster.',
      'Translate community Sigma rules into active SIEM alerts to identify PowerShell encoded commands and LSASS access.',
      'Construct a SOC analyst dashboard tracking detection frequencies and MITRE ATT&CK coverage matrices.'
    ]
  },
  {
    id: 'siem-02',
    category: 'soc-siem',
    tierLabel: 'SIEM_INTEL',
    title: 'Automated Threat Intelligence Feeder & Enricher',
    xp: 230,
    desc: 'Threat ingestion service parsing MISP feeds, AbuseIPDB, and Tor exit nodes, cross-matching indicators against incoming server firewalls.',
    realWorld: 'Enriches raw alerts with context so security analysts do not waste time investigating known safe indicators.',
    prereqs: ['Python', 'STIX/TAXII standards', 'Redis / SQLite caching'],
    steps: [
      'Subscribe to public and private threat feeds using TAXII protocols and structured STIX 2.1 formats.',
      'Normalize extracted IOCs (IPs, hashes, domains) and assign confidence decay scores based on last-seen timestamps.',
      'Store indicators in high-performance Redis cache for sub-millisecond query lookups against edge logs.',
      'Automatically generate IP blocklists for border firewalls and push enriched alert data to SIEM tickets.'
    ]
  }
];

// State Management
let completedQuests = JSON.parse(localStorage.getItem('cyber_completed_quests')) || [];
let activeFilter = 'all';

// DOM Elements
const projectContainer = document.getElementById('project-container');
const hudLevel = document.getElementById('hud-level');
const hudRank = document.getElementById('hud-rank');
const hudXpText = document.getElementById('hud-xp-text');
const hudXpBar = document.getElementById('hud-xp-bar');
const hudCleared = document.getElementById('hud-cleared');
const questModal = document.getElementById('quest-modal');
const modalContent = document.getElementById('modal-content');
const modalCloseBtn = document.getElementById('modal-close-btn');
const toggleSfxBtn = document.getElementById('toggle-sfx');
const toggleCrtBtn = document.getElementById('toggle-crt');
const resetBtn = document.getElementById('reset-progress');
const tabButtons = document.querySelectorAll('.tab-btn');

// Calculate and refresh HUD statistics
function updateHUD() {
  const totalXP = completedQuests.reduce((sum, id) => {
    const item = PROJECTS.find(p => p.id === id);
    return sum + (item ? item.xp : 0);
  }, 0);

  const maxXP = PROJECTS.reduce((sum, p) => sum + p.xp, 0);
  const percentage = Math.min(100, Math.round((totalXP / maxXP) * 100));

  let level = 1;
  let rank = 'RECON CADET';

  if (totalXP >= 3200) {
    level = 5;
    rank = 'PRINCIPAL ARCHITECT';
  } else if (totalXP >= 2200) {
    level = 4;
    rank = 'LEAD INCIDENT COMMANDER';
  } else if (totalXP >= 1200) {
    level = 3;
    rank = 'TIER-2 SOC ENGINEER';
  } else if (totalXP >= 500) {
    level = 2;
    rank = 'SECURITY ANALYST';
  }

  hudLevel.textContent = `LV. 0${level}`;
  hudRank.textContent = rank;
  hudXpText.textContent = `${totalXP} / ${maxXP} XP`;
  hudXpBar.style.width = `${percentage}%`;
  hudCleared.textContent = `${completedQuests.length} / ${PROJECTS.length}`;
}

// Render Project Cards
function renderProjects() {
  projectContainer.innerHTML = '';

  const filtered = activeFilter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  filtered.forEach(project => {
    const isDone = completedQuests.includes(project.id);
    const card = document.createElement('article');
    card.className = `quest-card ${isDone ? 'is-done' : ''}`;

    card.innerHTML = `
      <div>
        <div class="quest-header">
          <span class="quest-tier-badge">[${project.tierLabel}]</span>
          <span class="quest-xp-badge">+${project.xp} XP</span>
        </div>
        <h2 class="quest-title">${project.title}</h2>
        <p class="quest-desc">${project.desc}</p>
        <div class="real-world-highlight">
          <span class="highlight-label">&gt;&gt; REAL-WORLD IMPACT:</span>
          <p class="highlight-text">${project.realWorld}</p>
        </div>
      </div>
      <div class="quest-actions">
        <button class="retro-btn btn-steps" data-id="${project.id}">[STEPS &amp; SPECS]</button>
        <button class="retro-btn btn-done ${isDone ? 'btn-completed' : ''}" data-id="${project.id}">
          ${isDone ? '[DONE ✓]' : '[MARK DONE]'}
        </button>
      </div>
    `;

    projectContainer.appendChild(card);
  });
}

// Toggle quest status
function toggleQuestDone(id) {
  const index = completedQuests.indexOf(id);
  if (index > -1) {
    completedQuests.splice(index, 1);
    sfx.click();
  } else {
    completedQuests.push(id);
    sfx.complete();
  }
  localStorage.setItem('cyber_completed_quests', JSON.stringify(completedQuests));
  updateHUD();
  renderProjects();
}

// Open modal with step details
function openModal(id) {
  const project = PROJECTS.find(p => p.id === id);
  if (!project) return;

  sfx.modalOpen();

  const prereqItems = project.prereqs.map(item => `<li>${item}</li>`).join('');
  const stepItems = project.steps.map((step, idx) => `
    <li><span class="step-num">[PHASE 0${idx + 1}]</span> ${step}</li>
  `).join('');

  modalContent.innerHTML = `
    <h2 class="modal-title">${project.title}</h2>
    <p style="color: #9bb7ce; margin-bottom: 14px;">${project.desc}</p>

    <h3 class="modal-section-title">&gt; PREREQUISITES &amp; TECH STACK</h3>
    <ul class="spec-list">${prereqItems}</ul>

    <h3 class="modal-section-title">&gt; IMPLEMENTATION ROADMAP</h3>
    <ul class="step-list">${stepItems}</ul>

    <h3 class="modal-section-title">&gt; ENTERPRISE DEPLOYMENT CONTEXT</h3>
    <div class="real-world-highlight" style="margin-top: 8px;">
      <p class="highlight-text">${project.realWorld}</p>
    </div>
  `;

  questModal.classList.add('is-open');
  questModal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  questModal.classList.remove('is-open');
  questModal.setAttribute('aria-hidden', 'true');
  sfx.click();
}

// Event Delegations
projectContainer.addEventListener('click', (e) => {
  const target = e.target;
  const id = target.getAttribute('data-id');
  if (!id) return;

  if (target.classList.contains('btn-done')) {
    toggleQuestDone(id);
  } else if (target.classList.contains('btn-steps')) {
    openModal(id);
  }
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    sfx.click();
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    renderProjects();
  });
});

modalCloseBtn.addEventListener('click', closeModal);
questModal.addEventListener('click', (e) => {
  if (e.target === questModal) closeModal();
});

toggleSfxBtn.addEventListener('click', () => {
  sfx.enabled = !sfx.enabled;
  toggleSfxBtn.textContent = `SFX: ${sfx.enabled ? 'ON' : 'OFF'}`;
  if (sfx.enabled) sfx.click();
});

toggleCrtBtn.addEventListener('click', () => {
  sfx.click();
  document.body.classList.toggle('crt-active');
  const isActive = document.body.classList.contains('crt-active');
  toggleCrtBtn.textContent = `CRT: ${isActive ? 'ON' : 'OFF'}`;
});

resetBtn.addEventListener('click', () => {
  if (confirm('RESET ALL PROGRESS TRACKING LOGS?')) {
    sfx.click();
    completedQuests = [];
    localStorage.removeItem('cyber_completed_quests');
    updateHUD();
    renderProjects();
  }
});
const fullscreenBtn = document.getElementById('toggle-fullscreen');

if (fullscreenBtn) {
  fullscreenBtn.addEventListener('click', () => {
    sfx.click();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
      fullscreenBtn.textContent = '[⛶ EXIT FULL]';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        fullscreenBtn.textContent = '[⛶ FULLSCREEN]';
      }
    }
  });

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
      fullscreenBtn.textContent = '[⛶ FULLSCREEN]';
    }
  });
}

// Initialization
updateHUD();
renderProjects();