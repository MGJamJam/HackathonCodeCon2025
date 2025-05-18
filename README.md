# 🌱 PlantTalk
**Hackathon CodeCon 2025**

---

# Deploy

**Via Magalu Cloud**: https://planttalk.minetest.land

**Via Vercel**: https://planttalk-two.vercel.app

---

# Ferramenta de organização da equipe

**Trello - Kanban**: https://trello.com/invite/b/6828a0fcd1782d1f53350747/ATTI635ee413c6bb4b6b4990d7657bd645faE1D98E80/hackathon-codecon-2025-🌱

---

## 🧑‍🌾 Nome do time
**Jardineiras de Bits**

---

## 👩‍💻 Integrantes

- Myriam Gantner
- Monica Hillman
- Diana Saramago
- Ana Luiza Dias da Rocha
- Maria Eduarda Gomes e Silva

---

## 🪴 Sobre o Projeto

**PlantTalk** é um sistema de comunicação entre plantas com tradução para o português.  
Posicione duas plantas diante da câmera, o sistema:

1. Reconhece as espécies
2. Capta a “conversa” entre elas em linguagem vegetal
3. Permite traduzir as falas para o português via OpenAI

Tudo de forma puramente frontend, divertida e “inútil” — ideal para o Hackathon!

---

## 🧩 Componentes do Sistema

1. **Acesso à webcam**
  - Captura vídeo ao vivo das plantas (`getUserMedia`)
2. **Reconhecimento de plantas**
  - Plant.id API ([Documentação](https://documenter.getpostman.com/view/24599534/2s93z5A4v2#d1329bea-e15b-422b-8b5f-628b605e5bba))
3. **Divisão de imagem**
  - Divide o frame em duas metades (cada planta)
4. **Geração de “linguagem vegetal”**
  - Função JS que monta strings aleatórias por tipo de planta
5. **Interface de chat**
  - React + Vite + TailwindCSS
6. **Voz das plantas**
  - Web Speech API (`speechSynthesis`)
7. **Tradução para português**
  - OpenAI API para traduzir mensagens vegetais

---

## 🏗️ Arquitetura

- **Frontend**: React + Vite (SPA)
- **Estilização**: TailwindCSS
- **Roteamento**: React Router (páginas: `/` → captura; `/chat` → bate-papo; `/erro` → falha)
- **APIs externas**:
  - Plant.id (reconhecimento de plantas)
  - OpenAI (tradução)

## ⚙️ Como Rodar Localmente

1. Clone este repositório: `git clone https://github.com/MGJamJam/HackathonCodeCon2025.git`

2. Crie um arquivo .env na raiz com as chaves:
   - `VITE_PLANT_ID_API_KEY=SEU_PLANT_ID_API_KEY`
   - `VITE_OPENAI_API_KEY=SEU_OPENAI_API_KEY`

3. Instale dependências: `npm install`


4. Inicie o servidor de desenvolvimento: `npm run dev`
 
5. Abra no navegador: `http://localhost:5173`

## Utils
- rodar os tests: `npm run test`
- formatar: `npm run format`
