# HackathonCodeCon2025

## Nome do time: 

## Integrantes:
- Myriam Gantner
- Monica Hillman
- Diana Saramago
- Ana Luiza Dias da Rocha
- Maria Eduarda Gomes e Silva

## Nome: PlantTalk

## Objetivo:
Criar um sistema eficaz de communicação entre plantas.

## Descrição:
Duas plantas são colocadas em frente da camera pra ser reconhecido pelo sistema. Assim que forem reconhecidos, um chat abre em que as plantas vão conversando entre si, mandando mensagens na linguagem delas. 

Nice to have: 
- cada tipo de planta tem uma linguagem propria
- alguns tipos de plantas não falam entre si -> tela de erro de communicação
- cada planta tem uma personalidade
- modo empresa: restringir a communciao somente entre plantas que estao na localozcao de empresa (CNPJ registrado)
- traducao das conversas das plantas

## Componentes do sistema:
- componente acesso a webcam
- componente de reconhecimento de planta
- componete de geração aleatoria de caracteres
- componente leitura de palavras no navegador (vozes das plantas)
- interface do chat

## Arquitetura do sistema:
Applicativo web em React + vite, puro frontend sem backend
- Acesso à webcam	Captura vídeo ao vivo das plantas: getUserMedia
- Reconheciemnto de plantas com plant.id API https://documenter.getpostman.com/view/24599534/2s93z5A4v2#d1329bea-e15b-422b-8b5f-628b605e5bba
- Gerador de linguagem prõpria (Javascript)
(- personalidade da planta, define estilo de fala (cursive, CAPS, palavrão, ...), frequência - predefinição por tipo de planta (cactus é rude, ...) - talvez usar IA) nice to have
(- Regras de comunicação	Impede que plantas "incompatíveis" conversem: Dicionário com compatibilidades (ex: "Orquídea odeia Samambaia"))
- Interface do chat (lib ?, js + tailwind?)
(- Vozes das plantas - Web Speech API – speechSynthesis / ou modelo de IA pra poder mudar as vozes) nice to have

## Como rodar:
- `npm install`
- `npm dev`
