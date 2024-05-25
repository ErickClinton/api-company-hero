## Este projeto consiste no desenvolvimento de um serviço que sugere músicas ao usuário com base na temperatura atual da cidade em que ele se encontra. A ideia surgiu a partir de um estudo que revelou uma relação entre as preferências musicais das pessoas e a temperatura ambiente.

### Requisitos Funcionais:

#### API Acessível:

O serviço deve ser acessível através de uma API para permitir a integração com diferentes aplicativos e plataformas.

#### Sugestão de Músicas por Temperatura:

O serviço deve aceitar o nome de uma cidade como parâmetro. Com base na temperatura atual da cidade fornecida, o serviço deve retornar uma playlist sugerida. As sugestões de músicas devem seguir as seguintes diretrizes:
- Se a temperatura estiver acima de 25ºC, sugerir músicas do gênero Pop.
- Se a temperatura estiver entre 10ºC e 25ºC, sugerir músicas do gênero Rock.
- Se a temperatura estiver abaixo de 10ºC, sugerir músicas do gênero Clássico.


## Como rodar o projeto?

1. Criar o arquivo `.env` e preencher ele com as credenciais:

```bash
   API_KEY_OPEN_WEATHER=
API_CLIENT_ID_SPOTIFY=
API_CLIENT_SECRET=
```

2. Rodar o comando `npm i`.

3. Configurar o Docker:

  - Certifique-se de ter o Docker instalado e em execução no seu sistema.
  - Crie um arquivo `Dockerfile` na raiz do projeto para definir a configuração do contêiner Docker.

### Construir a imagem Docker:

- Abra um terminal na raiz do projeto. Execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t nome_da_imagem .

4. Abra um terminal na raiz do projeto.

   Execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t nome_da_imagem .
    ```
    Substitua nome_da_imagem pelo nome que você deseja dar à imagem Docker.


5. Executar o contêiner Docker:

   Após a construção da imagem, execute o seguinte comando para iniciar o contêiner Docker:

   ```bash
   docker run -p 3000:3000 -d nome_da_imagem
    ```
    Isso iniciará o contêiner Docker em segundo plano e encaminhará o tráfego da porta 3000 do contêiner para a porta 3000 do host.6. Verificar se o contêiner está em execução:

   Você pode verificar se o contêiner está em execução usando o comando:

   ```bash
   docker ps
    ```
## Estruturação das pastas

- **api**: Pasta central que agrupa todas as funcionalidades e responsabilidades da nossa API.
- **cron**: Pasta dedicada aos cronjobs da aplicação, responsável pelas configurações relacionadas às tarefas agendadas.
- **producer**: Pasta responsável por gerenciar as chamadas para APIs externas, onde os dados retornados serão utilizados na nossa API.
- **app**: Pasta central que concentra as funcionalidades da minha aplicação, onde cada subdiretório representa uma feature específica.
- **contract**: Pasta dedicada à definição de tipos para todas as respostas das chamadas de API. Isso facilita a futura manutenção e a adição de novos valores ao sistema, garantindo que todo o retorno das chamadas esteja devidamente mapeado.
- **dto**: Pasta responsável por armazenar os DTOs (Data Transfer Objects) da aplicação.
