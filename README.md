# Nota de liberação - SIMPLEX

Aplicação desenvolvida para o trabalho da disciplina de Pesquisa Operacional

## Informações adicionais na Wiki

<a href="https://github.com/alissonsolitto/simplex/wiki/Nota-de-libera%C3%A7%C3%A3o">Nota Liberação</a><br/>
<a href="https://github.com/alissonsolitto/simplex/wiki/Manual-simplex">Manual Simplex</a><br/>

## Integrantes da equipe

1. Alisson Solitto da Silva
2. Gabriel Fontes Loeve
3. Paulo Vinícius Oliveira da Silva


## Introdução

Este documento contem uma visão geral do projeto Simplex. O objetivo é apresentar uma descrição das funcionalidades do aplicativo e a proposta do desenvolvimento

## Link da aplicação

[Aplicação Simplex](http://simplexonline.esy.es)

### 1. Nota da release publicada

Simplex

* Funções maximizar e minimizar
* Não possuir número fixo para variáveis e restrições.
* Demonstrar tabela da programação dinâmica. Não possuir número fixo de itens.
* Gerar passo a passo, que mostra todas as iterações necessárias para o resultado final.

### 2. Problemas conhecidos e limitações

* Necessário ao menos 1 conexão mínima com a internet.
* Em casos de um número muito elevado de variáveis e restrições pode ocorrer uma demora no processo de execução.
* O Simplex já deve estar bem definido para ser calculado, sua função principal e restrições.
		
### 3. Datas importantes

####Segue abaixo as datas importante do desenvolvimento:
		
|Data|Evento|
|---------------|---------------|
|07/11 e 08/11|Criação da Interface Gráfica.|
|09/11 e 10/11|Criação das interações e variáveis dinâmicos.|
|11/11 e 12/11|Implementação do método Maximizar e das variáveis de folga.|
|13/11 e 14/11|Definição da regra quem entra e quem sai e linha do pivô divididas pelo pivô.|
|15/11 e 16/11|Implementação do método Minimizar.|
|17/11|Adicionado função de amostragem passo-a-passo.|
|18/11 e 20/11|Testes e correção de bugs.|
|20/11 e 22/11|Testes finais.|
|23/11|Liberação versão final.|
		
### 4. Compatibilidade
		
Segue abaixo os requisitos:
		
|Requisitos|Ferramenta|
|-----------|---------------|
|Navegadores|Mozzilla Firefox, Chrome, Internet Explorer e Microsoft Edge|
|Sistema operacional|Linux e Windows|
|Dispositivos Móveis|IOS e Android|

|Tecnologias||
|-----------|---------------|
|Linguagem de programação|JavaScript|
|Tecnologia WEB|HTML, CSS, Bootstrap|
|IDE|Notepad++|
|Servidor Web|Hostinger|

### 5. Procedimento e alteração de configuração do ambiente

O projeto foi desenvolvido utilizando AngularJS e JavaScript por serem tecnologias gratuitas e de fácil compreensão pelos membros do grupo. A interface desenvolvida utilizando HTML, CSS3 e Bootstrap contribui para adequação em varias telas.
A Hospedagem foi feita no Hostinger, por ser gratuito e de fácil acesso.

### 6. ATIVIDADES REALIZADAS NO PERÍODO

Nessa liberação foram contemplados os seguintes itens:

|Cód|Título|Tarefa|Situação|Observação|
|---|----------|----------------|---------------------|-----------------|                                                                            	
|1|Maximizar|Cria a equação principal e as equações de restrições dinamicamente, possibilitando o usuário a maximizar sistemas lineares.| Concluído|Apenas restrições de “<=”|
|2|Minimizar|Cria a equação principal e as equações de restrições dinamicamente, possibilitando o usuário a minimizar sistemas lineares.|   Concluído|Apenas restrições de “<=”|
|3|Demonstrar passo a passo|Demonstrar ao usuário as alterações na tabela em cada iteração do método simplex.| Concluído||
