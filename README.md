# PUZZLE #71 SCANNER v4.0

**secp256k1 real · Web Workers · PWA**

> Deus abriu os olhos de Hagar, e ela viu um poço — Gênesis 21:19  
> Comandante: Pr Uanderley | Soldado: Uenderley

---

## O que é

Scanner criptográfico para o **Bitcoin Puzzle #71** rodando 100% no browser via Web Workers.

- Gera chaves privadas reais usando a curva **secp256k1**
- Testa **endereços Bitcoin** (P2PKH, Bech32, P2SH)
- Carrega lista customizada de alvos (`.txt`)
- Painel em tempo real com velocidade, progresso e ETA
- Funciona **offline** como PWA instalável

---

## Tecnologias

| Item | Detalhe |
|---|---|
| Curva | secp256k1 — igual ao Bitcoin real |
| Workers | Web Workers paralelos (até `cpu_count`) |
| Hash | SHA-256 + RIPEMD-160 (hash160) |
| Lookup | Set O(1) |
| UI | HTML/CSS/JS puro — zero dependências |
| PWA | Service Worker + manifest.json |

---

## Estrutura

```
├── index.html        ← App principal
├── manifest.json     ← PWA manifest
├── sw.js             ← Service Worker (offline)
├── icons/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## Deploy no GitHub Pages

```bash
# 1. Crie o repositório no GitHub
# 2. Clone localmente
git clone https://github.com/SEU_USUARIO/puzzle71-scanner

# 3. Copie os arquivos
cp index.html manifest.json sw.js puzzle71-scanner/
cp -r icons/ puzzle71-scanner/

# 4. Push
cd puzzle71-scanner
git add .
git commit -m "PUZZLE #71 SCANNER v4.0 — PWA"
git push

# 5. Ative GitHub Pages
# Settings → Pages → Source: main → / (root)
```

Acesso: `https://SEU_USUARIO.github.io/puzzle71-scanner`

---

## Instalar como PWA

- **Android:** Chrome → menu (⋮) → "Adicionar à tela inicial"
- **iOS:** Safari → compartilhar → "Adicionar à Tela de Início"
- **Desktop:** Chrome/Edge → ícone de instalação na barra de endereços

---

## Adicionar ao index.html

No `<head>`, adicione:
```html
<link rel="manifest" href="manifest.json"/>
```

Antes de `</body>`, adicione:
```html
<script>
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then(r => console.log('SW registrado:', r.scope))
      .catch(e => console.error('SW erro:', e));
  });
}
</script>
```

---

## Ícones

Gere os PNGs a partir do SVG:

```bash
# Com Inkscape
inkscape icons/icon.svg --export-png=icons/icon-192.png -w 192 -h 192
inkscape icons/icon.svg --export-png=icons/icon-512.png -w 512 -h 512

# Com ImageMagick
convert -background none icons/icon.svg -resize 192x192 icons/icon-192.png
convert -background none icons/icon.svg -resize 512x512 icons/icon-512.png
```

---

*O Senhor é o meu Pastor, Nada me Faltará — Salmos 23:1*
