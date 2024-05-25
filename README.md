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


## Funcionalidades:

1. Recomendando playlist pela temperatura:

   - O usuário enviará o nome de uma cidade para a API.
   - A API será responsável por verificar a temperatura atual da cidade fornecida.
   - Com base na temperatura, a API retornará uma playlist de acordo com as regras de negócio estabelecidas:
      - Se a temperatura estiver acima de 25ºC, será recomendada uma playlist do gênero Pop.
      - Se a temperatura estiver entre 10ºC e 25ºC, será recomendada uma playlist do gênero Rock.
      - Se a temperatura estiver abaixo de 10ºC, será recomendada uma playlist do gênero Clássico.


### Endpoints Disponíveis:

1. **GET /recomendation/{cidade}/{quantidade}**: Este endpoint retorna uma lista de playlists recomendadas com base na temperatura da cidade especificada.

### Parâmetros Aceitos:

- **{cidade}**: O nome da cidade para a qual deseja-se obter a recomendação de playlist.
- **{quantidade}**: O número de playlists que deseja-se receber como resposta.

### Códigos de Status de Resposta:

- **200 OK**: Indica que a requisição foi bem-sucedida. A resposta contém as playlists recomendadas.
- **400 Bad Request**: Indica que a requisição foi malformada ou contém parâmetros inválidos.
- **401 Unauthorized**: Usuário não autorizado.
- **404 Not Found**: Indica que a cidade especificada não pôde ser encontrada ou não possui dados de temperatura disponíveis.
- **500 Internal Server Error**: Indica um erro interno no servidor.

   ### Exemplo de Request:
   ```http
   GET localhost:3000/recomendation/sao%20paulo/2
   ```
   ### Exemplo de Response:
   ```
   [
      {
      "name": "Mix rock",
      "link": "https://open.spotify.com/playlist/37i9dQZF1EQpj7X7UK8OOF",
      "description": "<a href=spotify:playlist:37i9dQZF1EIYWwGqC3GC7o>Linkin Park</a>, <a href=spotify:playlist:37i9dQZF1EIVJW7PzIkjtQ>Creedence Clearwater Revival</a>, <a href=spotify:playlist:37i9dQZF1EIWwyR3K8WKlr>The Police</a> and more"
      },
      {
      "name": "Top Classic Rock Hits Of All Time",
      "link": "https://open.spotify.com/playlist/1ti3v0lLrJ4KhSTuxt4loZ",
      "description": ""
      }
   ]
   ```