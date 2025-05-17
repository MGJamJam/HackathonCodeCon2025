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
Applicativo web em React + vite
- Acesso à webcam	Captura vídeo ao vivo das plantas: getUserMedia
- Reconheciemnto de plantas 




🧩 Componentes do Sistema (com techs sugeridas)
Componente	O que faz	Como fazer com mínimo esforço
1. Acesso à webcam	Captura vídeo ao vivo das plantas	HTML + JS: getUserMedia
2. Reconhecimento de plantas	Detecta qual planta está na frente da câmera	Usar API pronta de reconhecimento de plantas via imagem, tipo: Plant.id API (ou simular com imagem dummy e hardcoded output para MVP)
3. Geração de linguagem própria	Cria “língua das plantas”	Geração aleatória de símbolos ou textos tipo “klorbx wzzzzz nnnah” — simples com JS/Python
4. Personalidade da planta	Define estilo de fala, tom, frequência	Predefinição por planta: ex. Cacto é rude, Girassol é alegre etc.
5. Regras de comunicação	Impede que plantas "incompatíveis" conversem	Dicionário com compatibilidades (ex: "Orquídea odeia Samambaia")
6. Interface do chat	Mostra conversa entre as plantas	React com chat fake estilo WhatsApp/Slack
7. Vozes das plantas	Texto-para-fala das mensagens	Web Speech API – speechSynthesis no navegador
8. Modo Empresa	Bloqueia plantas que não estão em empresa registrada	Fake check com campo de CNPJ e validação simples tipo RegEx
