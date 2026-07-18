# AGENTS.md

> **Nota (gerada pelo template Expo):** Expo mudou desde treino do modelo. Consultar docs versionadas em https://docs.expo.dev/versions/v57.0.0/ antes de escrever código que dependa de APIs do Expo.

# 3x3 Rachao Placar

Aplicativo mobile desenvolvido com React Native + Expo para controle de partidas de basquete 3x3.

## Objetivo

Construir um aplicativo extremamente simples, rápido e offline para controlar o placar e o cronômetro de partidas de basquete 3x3.

O projeto será desenvolvido priorizando simplicidade, legibilidade e evolução incremental. O MVP deve conter apenas o essencial para uso durante um rachão.

## Stack

- React Native
- Expo
- TypeScript
- Expo Router
- StyleSheet nativo do React Native (sem Tailwind/NativeWind — tentado, causou incompatibilidade de bundling; abandonado)
- React Hooks
- Sem backend
- Sem autenticação
- Sem banco de dados
- Estado somente em memória

## Filosofia

- Mobile First
- Offline First
- Interface minimalista
- Código simples
- Componentes pequenos
- Evitar abstrações desnecessárias
- Sempre preferir composição ao invés de herança
- Manter baixo acoplamento

## Estrutura inicial

```
app/
components/
hooks/
stores/
types/
constants/
utils/
```

Não criar pastas antes de existir necessidade.

## MVP

A aplicação inicia diretamente na tela do placar.

### Placar

Exibir:

- Nome do Time A
- Pontuação Time A

- Nome do Time B
- Pontuação Time B

Cada lado possui:

- Botão +1
- Botão -1

O placar nunca pode ficar negativo.

---

No centro da tela haverá:

- Botão de Configuração

---

Abaixo do placar:

- Cronômetro regressivo com valor padrão de 7 minutos

Exemplo:

```
05:52
```

Logo abaixo:

Botão único de:

- Play
- Pause

O botão alterna automaticamente entre os dois estados.

## Configurações

Tela simples contendo:

### Pontuação objetivo

Campo numérico.

Exemplos:

- 11
- 15
- 21

junto desse botão, quero que tenha um switch de bloqueio. Caso ele esteja ativo, ele não deixa adicionar mais pontos em nenhum time.  

---

### Tempo da partida

Campo numérico em minutos.

Exemplos:

- 8
- 10
- 12

---

Botão:

Salvar

Ao salvar:

- voltar para tela principal
- reiniciar cronômetro utilizando o novo tempo

## Estado da aplicação

Mesmo que ainda não exista tela para editar os nomes dos times, eles devem existir em estado.

Estado esperado:

```ts
teamA: {
    name: string
    score: number
}

teamB: {
    name: string
    score: number
}

game: {
    targetScore: number
    durationInMinutes: number
    remainingTime: number
    running: boolean
}
```

## Regras de negócio

### Pontuação

Adicionar:

+1 ponto

Remover:

-1 ponto

Nunca permitir pontuação negativa.

---

### Cronômetro

Regressivo.

Quando iniciar:

- começa no tempo configurado

Quando pausar:

- mantém tempo

Quando continuar:

- continua do ponto onde parou

Quando chegar em zero:

- parar automaticamente

---

### Vitória

Nesta primeira versão:

Caso algum dos times atinja a pontuação objetivo, deve ser inserido um emoji de coroa abaixo do span do nome do time vencedor. 

## Persistência

Nesta primeira versão:

Nenhuma.

Todos os dados vivem apenas durante a execução do aplicativo.

## Interface

Utilizar `StyleSheet.create` do React Native.

Visual minimalista.

Evitar:

- sombras
- gradientes
- animações
- excesso de cores

Priorizar:

- boa tipografia
- espaçamento consistente
- botões grandes
- excelente usabilidade durante uma partida

## Componentização

Preferir componentes pequenos.

Exemplo:

```
ScoreCard

ScoreButton

Timer

PlayPauseButton

SettingsButton

SettingsModal
```

## Convenções

Sempre utilizar:

- TypeScript
- Functional Components
- Hooks

Evitar:

- Classes
- Context API sem necessidade
- Bibliotecas de gerenciamento de estado enquanto o estado for pequeno

## Evolução futura

Possíveis funcionalidades futuras (não implementar no MVP):

- Editar nome dos times
- Histórico de partidas
- Persistência local
- Vibração ao marcar ponto
- Som ao marcar ponto
- Contagem de faltas
- Posse de bola
- Vitória automática ao atingir pontuação objetivo
- Prorrogação
- Tema escuro
- Estatísticas
- Compartilhar resultado
- Sincronização entre dispositivos
