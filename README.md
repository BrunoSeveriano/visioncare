# Template Viveo App

Este é um projeto template construído com as seguintes tecnologias:

- Next.js
- TypeScript
- Tailwind CSS
- React MUI
- Zustand
- Axios

## Sobre o projeto

Este projeto é uma aplicação white label desenvolvida para fornecer uma base sólida para a criação de aplicativos personalizáveis. A ideia principal é fornecer um esqueleto robusto e flexível que possa ser facilmente adaptado para diferentes casos de uso e marcas.

**Documentação atual do projeto:** https://app.gitbook.com/o/enYYaroMNBPkufHjiQ19/s/h4SCWnHco2r8PCJlgOpy/

## Recursos

A aplicação white label possui os seguintes recursos:

- Arquitetura baseada em Next.js, que permite renderização no lado do servidor (SSR) e geração de páginas estáticas (SSG).
- Estilização com Tailwind CSS, um framework utilitário de CSS altamente configurável e fácil de usar.
- Componentes de interface do usuário fornecidos pelo React MUI (Material-UI), que oferece uma biblioteca rica em componentes prontos para uso.
- Gestão de estado com Zustand, uma biblioteca leve e poderosa que simplifica a gestão do estado da aplicação.
- Integração com a biblioteca Axios para realizar requisições HTTP de forma fácil e eficiente.

## Configuração de ambiente

Siga as instruções abaixo para configurar o ambiente de desenvolvimento:

1. Certifique-se de ter o Node.js instalado em sua máquina. Você pode fazer o download em [https://nodejs.org](https://nodejs.org).
2. Clone este repositório para sua máquina local.
3. Navegue até o diretório do projeto e execute o seguinte comando para instalar as dependências:

   ```
   npm install
   ```

4. Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias.

## Startando a aplicação

Para iniciar o servidor de desenvolvimento, execute o seguinte comando:

```
npm run dev
```

Isso iniciará a aplicação em modo de desenvolvimento. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.

## Produção

Para construir a aplicação para produção, antes de tudo, descomente os arquivos `server.js` e `web.config`. Em seguida, execute o seguinte comando:

```
npm run build
```

Este comando irá gerar os arquivos otimizados no diretório `out`.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.
