// Estado del juego - Inicia como null para mostrar el menú
let modoActual = null;

// ===== SISTEMA DE BLOQUEO DE REPRODUCCIÓN =====
// Previene múltiples reproducciones simultáneas en modo números y vocales
let bloqueadoReproduccion = false;

// Función para bloquear reproducciones (2 segundos)
function bloquearReproduccion() {
    bloqueadoReproduccion = true;
    setTimeout(() => {
        bloqueadoReproduccion = false;
    }, 2000);
}

// ===== SISTEMA DE CACHÉ DE AUDIOS =====
// Almacena qué archivos de audio existen
const audioCache = {
    numeros: {},  // { 0: true/false, 1: true/false, ... }
    vocales: {},  // { a: true/false, e: true/false, ... }
    cargado: false
};

// Función para precargar y verificar audios disponibles
async function precargarAudios() {
    // Verificar números (0-9)
    for (let i = 0; i <= 9; i++) {
        audioCache.numeros[i] = await verificarArchivoAudio(`audios/${i}.mp3`);
    }
    
    // Verificar vocales (a, e, i, o, u)
    const vocales = ['a', 'e', 'i', 'o', 'u'];
    for (const vocal of vocales) {
        audioCache.vocales[vocal] = await verificarArchivoAudio(`audios/${vocal}.mp3`);
    }
    
    audioCache.cargado = true;
    
    // Log resumido
    const numerosDisponibles = Object.values(audioCache.numeros).filter(v => v).length;
    const vocalesDisponibles = Object.values(audioCache.vocales).filter(v => v).length;
    console.log(`✅ Audios precargados: ${numerosDisponibles}/10 números, ${vocalesDisponibles}/5 vocales`);
}

// Función auxiliar para verificar si un archivo existe
async function verificarArchivoAudio(ruta) {
    try {
        const response = await fetch(ruta, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}



// Arrays de emojis/caracteres por modo
const contenidoModos = {
    emoticonos: [
        '🍎', '🍊', '🍋', '🍌', '🍉', '🍓', '🍑', '🍒', '🍍', '🍈', '🍐', '🥝',
        '😊', '😄', '😍', '🤩', '😆', '😂', '🎉', '⭐', '🌟', '💫', '✨', '🎈',
        '🦋', '🐝', '🐞', '🌸', '🌼', '🌻', '🌺', '🎪', '🎨', '🎭', '🎯',
        '❤️', '💛', '💚', '💙', '💜', '🧡', '🤍', '🖤', '💕', '💗', '💓', '💞',
        '🚀', '🛸', '🌙', '☀️', '🌈', '⛅', '🌤️', '⛈️'
    ],
    numeros: [
        '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ],
    vocales: [
        '🅰️', '🅴️', '🅸️', '🅾️', '🅤️',
        'A', 'E', 'I', 'O', 'U',
        '🔤', '📝', '✏️', '📕', '📗'
    ]
};

// Array de animaciones disponibles
const animations = ['float-down', 'bounce-up', 'spin-around'];

// Función para seleccionar modo
function seleccionarModo(modo) {
    modoActual = modo;
    document.getElementById('menuInicial').classList.add('oculto');
    document.getElementById('botonMenu').style.display = 'block';
    
    // Actualizar mensaje
    const titulos = {
        emoticonos: '🎹 ¡Presiona cualquier tecla! 🎉',
        numeros: '🔢 ¡Presiona para ver números! 🔢',
        vocales: '🅰️ ¡Presiona para ver vocales! 🅰️'
    };
    document.getElementById('infoText').textContent = titulos[modo];
}

// Función para mostrar el menú
function mostrarMenu() {
    modoActual = null;
    document.getElementById('menuInicial').classList.remove('oculto');
    document.getElementById('botonMenu').style.display = 'none';
    // Limpiar emojis en pantalla
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => emoji.remove());
}

// Función para reproducir número con audio MP3 o síntesis de voz
function hablarNumero(numero) {
    // Si el audio existe en caché, reproducirlo
    if (audioCache.cargado && audioCache.numeros[numero]) {
        reproducirArchivoAudio(`audios/${numero}.mp3`, () => usarSintesisNumero(numero));
        return;
    }
    
    // Si no existe en caché, ir directo a síntesis
    usarSintesisNumero(numero);
}

// Función auxiliar para reproducir un archivo de audio
function reproducirArchivoAudio(ruta, fallbackFn) {
    const audio = new Audio(ruta);
    audio.volume = 1.0;
    
    audio.oncanplay = () => {
        audio.play().catch(() => {
            console.warn('⚠️ Error al reproducir:', ruta);
            if (fallbackFn) fallbackFn();
        });
        console.log('🎵 Reproduciendo audio:', ruta);
    };
    
    audio.onerror = () => {
        console.warn('⚠️ Audio no encontrado:', ruta);
        if (fallbackFn) fallbackFn();
    };
    
    audio.load();
}

// Función auxiliar para síntesis de voz de números
function usarSintesisNumero(numero) {
    try {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(numero.toString());
        
        // Buscar voces en español latinoamericano
        const voces = window.speechSynthesis.getVoices();
        let vozSeleccionada = voces.find(v => v.lang.includes('es-MX')) ||  // México
                              voces.find(v => v.lang.includes('es-CO')) ||  // Colombia
                              voces.find(v => v.lang.includes('es-AR')) ||  // Argentina
                              voces.find(v => v.lang.startsWith('es'));     // Cualquier español
        
        if (vozSeleccionada) {
            utterance.voice = vozSeleccionada;
            console.log('🎤 Usando voz:', vozSeleccionada.name, vozSeleccionada.lang);
        }
        
        utterance.rate = 0.5;      // Muy lento para bebés (50% velocidad)
        utterance.pitch = 1.5;    // Tono más agudo y amigable
        utterance.volume = 1.0;  // Volumen máximo
        utterance.lang = 'es-MX';               // Preferir español latinoamericano

        window.speechSynthesis.speak(utterance);
        console.log('🔊 Pronunciando número (síntesis):', numero);
    } catch (e) {
        console.error('Error al hablar número:', e);
    }
}

// Función para reproducir vocal con audio MP3 o síntesis de voz
function hablarVocal(vocal) {
    const vocalLower = vocal.toLowerCase();
    
    // Si el audio existe en caché, reproducirlo
    if (audioCache.cargado && audioCache.vocales[vocalLower]) {
        reproducirArchivoAudio(`audios/${vocalLower}.mp3`, () => usarSintesisVocal(vocal));
        return;
    }
    
    // Si no existe en caché, ir directo a síntesis
    usarSintesisVocal(vocal);
}

// Función auxiliar para síntesis de voz de vocales
function usarSintesisVocal(vocal) {
    try {
        window.speechSynthesis.cancel();
        
        const nombreVocal = {
            'A': 'A',
            'E': 'E',
            'I': 'I',
            'O': 'O',
            'U': 'U'
        };
        
        const vocalTexto = nombreVocal[vocal.toUpperCase()] || vocal;
        const utterance = new SpeechSynthesisUtterance(vocalTexto);
        
        // Buscar voces en español latinoamericano
        const voces = window.speechSynthesis.getVoices();
        let vozSeleccionada = voces.find(v => v.lang.includes('es-MX')) ||  // México
                              voces.find(v => v.lang.includes('es-CO')) ||  // Colombia
                              voces.find(v => v.lang.includes('es-AR')) ||  // Argentina
                              voces.find(v => v.lang.startsWith('es'));     // Cualquier español
        
        if (vozSeleccionada) {
            utterance.voice = vozSeleccionada;
            console.log('🎤 Usando voz:', vozSeleccionada.name, vozSeleccionada.lang);
        }
        
        utterance.rate = 0.5;      // Muy lento para bebés (50% velocidad)
        utterance.pitch = 1.5;    // Tono más agudo y amigable
        utterance.volume = 1.0;  // Volumen máximo
        utterance.lang = 'es-MX';               // Preferir español latinoamericano

        window.speechSynthesis.speak(utterance);
        console.log('🔊 Pronunciando vocal (síntesis):', vocalTexto);
    } catch (e) {
        console.error('Error al hablar vocal:', e);
    }
}

// Función para mostrar número grande
function mostrarNumeroGrande(numero) {
    const numeroDiv = document.createElement('div');
    numeroDiv.className = 'numero-grande';
    numeroDiv.textContent = numero;
    
    // Color aleatorio para cada número
    const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    numeroDiv.style.color = colores[Math.floor(Math.random() * colores.length)];
    
    document.body.appendChild(numeroDiv);
    
    // Reproducir sonido del número
    hablarNumero(numero);
    
    // Crear pulso visual
    createPulseRing(window.innerWidth / 2, window.innerHeight / 2);
    
    // Eliminar después de la animación
    setTimeout(() => numeroDiv.remove(), 2000);
}

// Función para mostrar vocal grande
function mostrarVocalGrande(vocal) {
    const vocalDiv = document.createElement('div');
    vocalDiv.className = 'numero-grande';
    vocalDiv.textContent = vocal.toUpperCase();
    
    // Color aleatorio para cada vocal
    const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    vocalDiv.style.color = colores[Math.floor(Math.random() * colores.length)];
    
    document.body.appendChild(vocalDiv);
    
    // Reproducir sonido de la vocal
    hablarVocal(vocal);
    
    // Crear pulso visual
    createPulseRing(window.innerWidth / 2, window.innerHeight / 2);
    
    // Eliminar después de la animación
    setTimeout(() => vocalDiv.remove(), 2000);
}

// Función para reproducir un sonido simple (usando Web Audio API)
function playSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Frecuencia aleatoria para un sonido diferentes
        const frequency = 200 + Math.random() * 600;
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
        // Si no se puede reproducir sonido, simplemente continúa
    }
}

// Función para crear un pulso visual
function createPulseRing(x, y) {
    const ring = document.createElement('div');
    ring.className = 'pulse-ring';
    ring.style.left = (x - 25) + 'px';
    ring.style.top = (y - 25) + 'px';
    document.body.appendChild(ring);
    
    setTimeout(() => ring.remove(), 1500);
}

// Función para crear emojis aleatorios
function createEmoji(x, y) {
    if (!modoActual) return; // No crear emojis si no hay modo seleccionado

    const emoji = document.createElement('div');
    const contenido = contenidoModos[modoActual];
    const randomEmoji = contenido[Math.floor(Math.random() * contenido.length)];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    emoji.textContent = randomEmoji;
    emoji.className = 'emoji ' + randomAnimation;
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';

    // Añadir variación de posición
    const offsetX = (Math.random() - 0.5) * 200;
    const offsetY = (Math.random() - 0.5) * 200;
    emoji.style.setProperty('--offsetX', offsetX + 'px');
    emoji.style.setProperty('--offsetY', offsetY + 'px');

    document.body.appendChild(emoji);

    // Eliminar elemento después de que termine la animación
    setTimeout(() => emoji.remove(), 3000);
}

// Evento para detectar presión de teclas
document.addEventListener('keydown', (event) => {
    if (!modoActual) return; // No hacer nada si no hay modo seleccionado

    // Si estamos en modo números
    if (modoActual === 'numeros') {
        // Solo permitir teclas numéricas 0-9
        if (event.key >= '0' && event.key <= '9') {
            if (!bloqueadoReproduccion) {
                bloquearReproduccion();
                mostrarNumeroGrande(event.key);
            }
        }
        // Bloquear todas las outras teclas
        event.preventDefault();
        return;
    }

    // Si estamos en modo vocales
    if (modoActual === 'vocales') {
        const teclaLower = event.key.toLowerCase();
        const vocales = ['a', 'e', 'i', 'o', 'u'];
        // Solo permitir teclas vocales
        if (vocales.includes(teclaLower)) {
            if (!bloqueadoReproduccion) {
                bloquearReproduccion();
                mostrarVocalGrande(teclaLower);
            }
        }
        // Bloquear todas las otras teclas
        event.preventDefault();
        return;
    }

    // Para emoticonos y vocales (comportamiento original)
    // Obtener posición aleatoria
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 150);

    // Crear múltiples emojis para más diversión
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            createEmoji(x + (Math.random() - 0.5) * 150, y + (Math.random() - 0.5) * 150);
        }, i * 100);
    }

    // Crear pulso visual
    createPulseRing(x, y);

    // Reproducir sonido
    playSound();

    // Efecto visual adicional
    document.body.style.animation = 'none';
    setTimeout(() => {
        document.body.style.animation = 'gradientShift 8s ease infinite';
    }, 10);
});

// También detectar clics del ratón para bebés con pantalla táctil
document.addEventListener('click', (event) => {
    // No crear emojis si se hace clic en los botones del menú o menú
    if (event.target.closest('.opcion-boton') || event.target.closest('#botonMenu')) {
        return;
    }

    if (!modoActual) return;

    // Si estamos en modo números
    if (modoActual === 'numeros') {
        if (!bloqueadoReproduccion) {
            bloquearReproduccion();
            const numeroAleatorio = Math.floor(Math.random() * 10);
            mostrarNumeroGrande(numeroAleatorio);
        }
        return;
    }

    // Si estamos en modo vocales
    if (modoActual === 'vocales') {
        if (!bloqueadoReproduccion) {
            bloquearReproduccion();
            const vocales = ['a', 'e', 'i', 'o', 'u'];
            const vocalAleatoria = vocales[Math.floor(Math.random() * vocales.length)];
            mostrarVocalGrande(vocalAleatoria);
        }
        return;
    }

    // Para emoticonos y vocales (comportamiento original)
    const x = event.clientX;
    const y = event.clientY;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createEmoji(x + (Math.random() - 0.5) * 200, y + (Math.random() - 0.5) * 200);
        }, i * 80);
    }

    createPulseRing(x, y);
    playSound();
});

// Evento táctil para dispositivos móviles
document.addEventListener('touchstart', (event) => {
    if (!modoActual) return;
    
    // Si estamos en modo números
    if (modoActual === 'numeros') {
        if (!bloqueadoReproduccion) {
            bloquearReproduccion();
            const numeroAleatorio = Math.floor(Math.random() * 10);
            mostrarNumeroGrande(numeroAleatorio);
        }
        return;
    }

    // Si estamos en modo vocales
    if (modoActual === 'vocales') {
        if (!bloqueadoReproduccion) {
            bloquearReproduccion();
            const vocales = ['a', 'e', 'i', 'o', 'u'];
            const vocalAleatoria = vocales[Math.floor(Math.random() * vocales.length)];
            mostrarVocalGrande(vocalAleatoria);
        }
        return;
    }

    // Para emoticonos y vocales (comportamiento original)
    const touch = event.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createEmoji(x + (Math.random() - 0.5) * 200, y + (Math.random() - 0.5) * 200);
        }, i * 80);
    }

    createPulseRing(x, y);
    playSound();
});

// Prevenir comportamiento por defecto en teclas especiales
document.addEventListener('keydown', (event) => {
    // Teclas de navegación y espaciador
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(event.code)) {
        event.preventDefault();
    }
    // Tecla Windows/Meta (izquierda y derecha)
    if (['MetaLeft', 'MetaRight'].includes(event.code)) {
        event.preventDefault();
    }
    // Tecla Alt
    if (event.code === 'AltLeft' || event.code === 'AltRight') {
        event.preventDefault();
    }
    // Ctrl+Alt para evitar combinaciones del sistema
    if (event.ctrlKey && (event.code === 'AltLeft' || event.code === 'AltRight')) {
        event.preventDefault();
    }
    // Alt+Tab (no se puede prevenir completamente en todos los navegadores)
    if (event.altKey && event.code === 'Tab') {
        event.preventDefault();
    }
});

// Deshabilitar menú contextual (clic derecho)
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

// Deshabilitar algunas combinaciones de teclas del navegador
document.addEventListener('keydown', (event) => {
    // F5 (Recargar)
    if (event.code === 'F5') {
        event.preventDefault();
    }
    // F12 (Herramientas de desarrollo)
    if (event.code === 'F12') {
        event.preventDefault();
    }
    // Ctrl+R (Recargar)
    if (event.ctrlKey && event.code === 'KeyR') {
        event.preventDefault();
    }
    // Ctrl+W (Cerrar pestaña)
    if (event.ctrlKey && event.code === 'KeyW') {
        event.preventDefault();
    }
    // Ctrl+T (Nueva pestaña)
    if (event.ctrlKey && event.code === 'KeyT') {
        event.preventDefault();
    }
    // Ctrl+Shift+I (Herramientas de desarrollo)
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
        event.preventDefault();
    }
    // Ctrl+Shift+J (Consola)
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyJ') {
        event.preventDefault();
    }
    // Ctrl+Shift+K (Herramientas de desarrollo)
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyK') {
        event.preventDefault();
    }
});

// ===== INICIALIZACIÓN =====
// Precargar audios cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    precargarAudios();
});
