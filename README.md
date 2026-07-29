# 🔍 PUZZLE #71 SCANNER — v3.1

[![PWA](https://img.shields.io/badge/PWA-Enabled-blueviolet)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Bitcoin Private Key Scanner** — secp256k1 — Puzzle #71

---

## 📖 Sobre

Scanner de chaves privadas Bitcoin para o **Puzzle #71**, com suporte a múltiplos formatos de endereço:

- ✅ P2PKH (endereços `1...`)
- ✅ Bech32 P2WPKH (endereços `bc1q...`)
- ✅ P2SH-P2WPKH (endereços `3...`)

**Versão Web** com Progressive Web App (PWA) — rode como app nativo no seu dispositivo!

---

## 🚀 Funcionalidades

| Recurso | Descrição |
|---------|-----------|
| **Multi-formato** | P2PKH, Bech32 e P2SH |
| **Alvos customizados** | Carregue arquivo `targets.txt` |
| **Índice Radix** | Busca otimizada em memória |
| **Checkpoints** | Retomada automática |
| **Interface Terminal** | Visual estilo terminal com animações |
| **PWA** | Instalável como app |
| **Offline** | Funciona sem internet |

---

## 📦 Instalação

### Como PWA (Recomendado)

1. Acesse o site
2. No navegador, clique em **"Instalar App"** ou **"Adicionar à Tela Inicial"**
3. Abra como um app nativo

### Como Site

```bash
git clone https://github.com/seu-usuario/puzzle71-scanner.git
cd puzzle71-scanner
python -m http.server 8080