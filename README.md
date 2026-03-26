# 🎹 Teclado Divertido para Bebés

Un sitio web interactivo y estimulante diseñado especialmente para bebés menores de 1 año. Cada tecla presionada, clic del ratón o toque en la pantalla genera emojis y frutas divertidas con animaciones y sonidos alegres.

## 🎯 Características

✨ **Experiencia Visual Atractiva**
- Fondo colorido con gradiente dinámico que cambia continuamente
- Múltiples emojis y frutas que caen, rebotan y giran
- Efectos visuales como anillos pulsantes y ondas de sonido

🎵 **Sistema de Voz y Audio Avanzado**
- Síntesis de voz con Web Speech API en español (México, Colombia, Argentina)
- Soporte para archivos MP3 personalizados con fallback automático a síntesis
- Voz lenta y tono agudo diseñado especialmente para bebés
- Pronunciación clara de números y vocales

🎮 **Tres Modos de Juego**

1. **Modo Emoticonos** 😊
   - Emojis y frutas coloridas
   - Interacción libre con teclado, ratón y pantalla táctil
   - Efectos visuales dinámicos con cada interacción

2. **Modo Números** 🔢
   - Presiona 0-9 para ver números grandes en pantalla
   - Reproducción de audio (MP3 o síntesis) para cada número
   - Números con colores aleatorios para mayor estimulación visual

3. **Modo Vocales** 🅰️
   - Presiona A, E, I, O, U para ver vocales grandes
   - Pronunciación clara de cada vocal en español
   - Emojis relacionados con las vocales

🍎 **Frutas y Emojis**
- Manzana, naranja, limón, plátano, sandía, fresa, piña y más
- Caritas alegres, estrellas, corazones, mariposas y otros emojis divertidos

## 🚀 Cómo Usar

### 📋 Seleccionar un Modo
1. **Abre el archivo `index.html`** en tu navegador web
2. **Selecciona un modo de juego** en el menú inicial:
   - 😊 **Emoticonos**: Interacción libre con emojis
   - 🔢 **Números**: Aprende números presionando 0-9
   - 🅰️ **Vocales**: Aprende vocales presionando A, E, I, O, U

3. **Regresa al menú**: Presiona el botón "☰ Menú" en la esquina superior

### 🎮 Interacción en Cada Modo

**Modo Emoticonos:**
- Presiona cualquier tecla
- Haz clic en la pantalla
- Toca la pantalla (dispositivos móviles)

**Modo Números:**
- Presiona las teclas 0-9 para ver números grandes
- Escucha la pronunciación de cada número
- Cada número tiene un color aleatorio diferente

**Modo Vocales:**
- Presiona A, E, I, O, U
- Escucha la pronunciación clara de cada vocal
- Observa emojis relacionados con cada vocal

¡Eso es todo! El bebé puede explorar libremente sin preocupaciones.

## 🛡️ Seguridad y Control Parental

El sitio incluye protecciones para evitar que los bebés accedan a funciones no deseadas:

### ✅ Teclas Deshabilitadas
- **Tecla Windows** (izquierda y derecha) - Evita abrir el menú de inicio
- **Tecla Alt** (izquierda y derecha) - Previene atajos del sistema
- **Alt+Tab** - Bloquea el cambio de ventanas
- **Menú Contextual** (clic derecho) - Desactiva el menú contextual
- **Ctrl+R, Ctrl+W, Ctrl+T** - Bloquea recargar, cerrar y nuevas pestañas
- **F5, F12** - Desactiva recargar la página y herramientas de desarrollo
- **Ctrl+Shift+I, J, K** - Bloquea atajos para abrir herramientas de desarrollo

### ⚠️ Teclas Permitidas
- **F11** - Activa pantalla completa (recomendado para mayor enfoque)
- Todas las téclas normales generan efectos visuales y sonoros

## � Estructura del Proyecto

```
teclado-bebes/
├── index.html           # Archivo principal (entrada a la aplicación)
├── css/
│   └── styles.css       # Estilos y animaciones
├── js/
│   └── script.js        # Lógica de la aplicación
├── audios/              # Archivos de audio MP3 (opcional)
│   ├── 0.mp3 -> 9.mp3   # Pronunciación de números
│   └── a.mp3, e.mp3, ... # Pronunciación de vocales
├── README.md            # Este archivo
└── .gitignore          # Configuración de Git

```

## �📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Computadoras de escritorio
- ✅ Tabletas (iPad, tablets Android)
- ✅ Dispositivos móviles
- ✅ Pantallas táctiles

## 🎨 Personalización

### 🔊 Sistema de Audios (MP3 con Fallback a Síntesis)

El aplicativo utiliza un sistema inteligente que:
1. **Busca archivos MP3** en la carpeta `/audios/`
2. **Reproduce el archivo** si existe
3. **Fallback automático** a síntesis de voz si el archivo no existe

#### Agregar Archivos de Audio Personalizados

Para agregar pronunciaciones personalizadas, crea archivos MP3:

**Para Números:**
```
audios/0.mp3
audios/1.mp3
audios/2.mp3
... hasta audios/9.mp3
```

**Para Vocales:**
```
audios/a.mp3
audios/e.mp3
audios/i.mp3
audios/o.mp3
audios/u.mp3
```

El sistema automáticamente usará estos archivos si existen. Si no, reproducirá la síntesis de voz en español.

#### Voces Disponibles (Síntesis)
- 🇲🇽 Español (México) - es-MX
- 🇨🇴 Español (Colombia) - es-CO
- 🇦🇷 Español (Argentina) - es-AR

### 🎨 Personalizar Emojis

Si deseas cambiar los emojis de cada modo, edita el objeto `contenidoModos` en `js/script.js`:

```javascript
const contenidoModos = {
    emoticonos: [
        '🍎', '🍊', '🍋', // Agrega tus emojis favoritos
    ],
    numeros: [
        '0️⃣', '1️⃣', '2️⃣', // Variantes numéricas
    ],
    vocales: [
        '🅰️', '🅴️', '🅸️', // Letras destacadas
    ]
};
```

## 💡 Consejos de Uso

1. **Pantalla Completa**: Presiona F11 para activar la pantalla completa y eliminar distracciones
2. **Sonido**: Asegúrate de que el volumen esté a un nivel cómodo para el bebé
3. **Duración**: Se recomienda usar en sesiones cortas (5-15 minutos)
4. **Supervisión**: Siempre supervisa al bebé mientras usa la aplicación

## 🧠 Beneficios del Desarrollo

- **Estimulación Visual** con colores brillantes, movimientos y números grandes
- **Desarrollo Auditivo** a través de:
  - Tonos variados en cada interacción
  - Pronunciación clara de números (0-9)
  - Pronunciación clara de vocales (A-E-I-O-U)
  - Voces naturales en español con velocidad adaptada para bebés
- **Reconocimiento de Números** mediante repetición y pronunciación clara
- **Reconocimiento de Vocales** base del alfabeto
- **Coordinación Motriz** mediante interacción con teclado o pantalla táctil
- **Causa y Efecto** - El bebé aprende que sus acciones generan resultados inmediatos
- **Aprendizaje Multimodal** combinando visual, auditivo y motor

## � Detalles Técnicos

### Sistema de Síntesis de Voz

La aplicación utiliza la **Web Speech API** del navegador para síntesis clara:

- **Velocidad**: 0.5x (50% más lento, diseñado para bebés)
- **Tono**: 1.5 (más agudo y amigable para menores)
- **Volumen**: 100%
- **Idioma**: Español Latinoamericano (es-MX como preferencia)

### Selección de Voz

El sistema intenta usar voces en este orden:
1. 🇲🇽 Español México (es-MX)
2. 🇨🇴 Español Colombia (es-CO)
3. 🇦🇷 Español Argentina (es-AR)
4. Cualquier otra voz en español

### Stack Tecnológico

- **HTML5** - Estructura semántica
- **CSS3** - Animaciones y responsividad
- **JavaScript ES6+** - Lógica interactiva y síntesis de voz
- **Web Speech API** - Síntesis de voz nativa del navegador
- **Google Fonts** - Tipografía amigable (Lilita One, Quicksand, Fredoka One)

### Sin Dependencias Externas

✅ Cero librerías JavaScript
✅ Cero APIs pagadas
✅ Funciona completamente offline (excepto los Google Fonts)

## �📄 Licencia

Libre para usar con propósitos personales y educativos.

## 👨‍💻 Desarrollado por

Creado con amor para bebés y sus familias. ❤️

---

**¡Disfruta jugando con tu bebé! 🍎👶✨**
