# Projeto Tempo Agora - Avaliação P3

Este é um protótipo de aplicativo móvel desenvolvido como parte da Avaliação Prática P3 da disciplina de Programação de Dispositivos Móveis I do 4º semestre de Desenvolvimento de Software Multiplataforma da Fatec Jacareí.

## Descrição das Funcionalidades

O aplicativo "Tempo Agora" exibe informações climáticas simuladas para diferentes cidades em uma interface limpa e moderna.

- **Tela Principal**: Exibe uma lista de cards, cada um representando o clima de uma cidade.
- **Cards de Clima**: Cada card mostra a temperatura atual, condição geral (Ensolarado, Nublado, etc.), umidade do ar e velocidade do vento. O design dos cards inclui efeitos de sombra para dar uma sensação de profundidade.
- **Dados Simulados**: Os dados são carregados de um arquivo local ao iniciar o aplicativo, utilizando os hooks `useState` e `useEffect` do React. Não há consumo de APIs externas.
- **Redirecionamento Externo**: Um botão "Mais Informações" na parte inferior da tela utiliza a função `Linking` do React Native para abrir o site do Climatempo em um navegador externo.
- **Estrutura Modular**: O código-fonte está organizado em pastas (`/components`, `/screens`, `/data`) para promover a reutilização e a manutenibilidade.

## 🛠️ Como Executar o Projeto

Este projeto foi criado com Expo. Para executá-lo, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/omaurosantos/4dsm/tree/main/ProgramacaoParaDispositivosMoveis_I/TempoAgora
    cd TempoAgora
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npm start
    ```
    ou
    ```bash
    npx expo start
    ```

4.  **Execute no seu dispositivo:**
    - Faça o download do aplicativo **Expo Go** na [App Store (iOS)](https://apps.apple.com/us/app/expo-go/id982107779) ou [Google Play (Android)](https://play.google.com/store/apps/details?id=host.exp.exponent).
    - Escaneie o QR Code exibido no terminal com o aplicativo Expo Go.

## 📱 Link de Demonstração (Expo Go)

Você pode executar este projeto diretamente no seu celular escaneando o QR Code abaixo com o app Expo Go.

**./src/assets/qrcode_expo.png**