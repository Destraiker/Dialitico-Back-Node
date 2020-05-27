# Trabalho final da materia de Desenvolvimento Mobile - BackEnd em node

### Como instalar: 
- Import o arquivo `Event.sql` para o banco de dados local (XAMPP);
- Tenha o node instalado en sua maquina;
- Clone o projeto em sua maquina;
- Abra o local do projeto no terminal;
- Execute o comando `npm install` para instalar as bibliotecas nescessarias;
- Para executar o projeto tem 2 maneiras:
    - Executar o arquivo `./bin/server.js` com o nodemon ou node. EX: `nodemon ./bin/server.js`;
    - Executar o comando de atalho ja configurado no arquivo `package.json`. EX: `npm start`;
- o projeto ja estara rodando na porta 3000 ou em outra porta disponivel, sera informado no console;

### Observaçoes: 
- os headers das requisiçoes estão no arquivo: `./src/app.js`;
- Atualmente so aceita requisiçoes do endereço padrão do Angular: `http://localhost:4200`;
- O arquivo de conexão com o banco esta em: `./src/models/connection.js`;