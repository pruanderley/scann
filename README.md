# Puzzle #71 Scanner – PWA

Scanner de chaves privadas Bitcoin para o Puzzle #71, executado inteiramente no navegador usando secp256k1 puro em JavaScript. Totalmente offline após o primeiro carregamento.

## Funcionalidades
- Carregamento de `targets.txt` (P2PKH, Bech32, P2SH)
- Range configurável (ex: 71 ou 50-60)
- Multi‑workers via Web Workers
- Criptografia real (SHA-256, RIPEMD-160, secp256k1) em JS puro
- Salva hits no console (F12) – futuramente exportará arquivo

## Como usar
1. Acesse a página (ou instale como PWA)
2. Carregue um arquivo de alvos (opcional – se não, busca o Puzzle #71)
3. Defina o range de bits
4. Clique em "Iniciar"
5. Quando encontrar um hit, ele aparecerá no painel e no console

## Tecnologias
- HTML5/CSS3/JavaScript puro
- secp256k1, SHA-256, RIPEMD-160 implementados em JS
- Web Workers para multi-threading
- PWA (Service Worker, manifest)

## Instalação como PWA
- No celular: abra no Chrome e toque em "Adicionar à tela inicial"
- No PC: abra no Edge/Chrome e instale pelo ícone da barra de endereço

## Licença
MIT