# Archivo de Audios 🎵

Esta carpeta debe contener archivos MP3 para números y vocales. El sistema intentará reproducir estos archivos. Si no existen, usará síntesis de voz automáticamente.

## Estructura esperada

### Números (0-9)
```
audios/
├── 0.mp3
├── 1.mp3
├── 2.mp3
├── 3.mp3
├── 4.mp3
├── 5.mp3
├── 6.mp3
├── 7.mp3
├── 8.mp3
└── 9.mp3
```

### Vocales (a, e, i, o, u)
```
audios/
├── a.mp3
├── e.mp3
├── i.mp3
├── o.mp3
└── u.mp3
```

## Comportamiento del sistema

1. **Si existen los archivos MP3**: Se reproducen los archivos de audio
2. **Si NO existen los archivos**: Se usa síntesis de voz automáticamente (Web Speech API - Español Latinoamericano)

## Recomendaciones para los archivos de audio

- **Formato**: MP3 (comprimido y compatible)
- **Duración**: 1-2 segundos por archivo
- **Velocidad**: Lenta y clara (para bebés menores de 1 año)
- **Tono**: Agudo y amigable
- **Nombre**: Exactamente `0.mp3`, `1.mp3`, etc. (minúsculas para vocales)

## Console logs útiles

Abre la consola del navegador (F12) para ver:
- `🎵 Reproduciendo archivo MP3:` - Se está usando el archivo MP3
- `⚠️ No encontrado:` - No existe el archivo, usando síntesis
- `🎤 Usando voz:` - Qué voz se está usando para síntesis
- `🔊 Pronunciando número/vocal (síntesis):` - Se está usando síntesis de voz

