## Este projeto consiste no desenvolvimento de um serviço que sugere músicas ao usuário com base na temperatura atual da cidade em que ele se encontra.

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

### Detalhamento dos services:

### recomendationService
1. Método getRecomendation

    Este método é responsável por obter uma recomendação de playlists com base na temperatura atual de uma determinada cidade.
    
    #### Parâmetros
    
    - **city**: Uma string contendo o nome da cidade para a qual deseja-se obter a recomendação de playlist.
    - **quantityPlaylist**: Um número indicando a quantidade de playlists desejadas.
    
    #### Retorno
    
    Uma promessa (Promise) que resolve para uma matriz de objetos do tipo `ResponsePlaylistDto`, representando as playlists sugeridas com base na temperatura da cidade fornecida.
    
    #### Funcionamento

    - O método inicia registrando informações de logging indicando o início do processo de obtenção da recomendação de playlists.
    - Em seguida, ele utiliza o serviço openWeatherService para obter a temperatura atual da cidade especificada.
    - Com base na temperatura obtida, o método chama o serviço spotifyService para buscar playlists adequadas de acordo com as regras de negócio estabelecidas.
    - Após obter as playlists recomendadas, o método registra informações de logging indicando o fim do processo e retorna as playlists.
    - Em caso de erro durante o processo, uma exceção é lançada encapsulada em um objeto HandleHttpError.


### OpenWeatherService

1. Método GetTemperatureByCity

    Este método é responsável por obter a temperatura atual de uma cidade por meio de uma chamada à API OpenWeather.

    - **Parâmetros**
      - `city`: Uma string contendo o nome da cidade para a qual deseja-se obter a temperatura.

    - **Retorno**
      - Uma promessa (Promise) que resolve para um número representando a temperatura atual da cidade.

    - **Funcionamento**
      - O método inicia registrando informações de logging indicando o início do processo de obtenção da temperatura da cidade especificada.
      - Em seguida, ele faz uma requisição à API OpenWeather para obter os dados de temperatura da cidade.
      - Se a cidade não for encontrada (status 404), uma exceção do tipo HttpException é lançada com uma mensagem indicando o problema.
      - Se ocorrer qualquer outro erro durante o processo, uma exceção do tipo HttpException é lançada com uma mensagem de erro genérica.
      - Caso contrário, o método registra informações de logging indicando o fim do processo e retorna a temperatura obtida.

### AuthenticationService

1. Método SetToken

    Este método é responsável por realizar a autenticação e obter o token de acesso necessário para as chamadas à API Spotify.

    - **Retorno**:
    - Uma promessa (Promise) que resolve sem nenhum valor (void).

    - **Funcionamento**:
        - O método inicia registrando informações de logging indicando o início do processo de autenticação.
        - Em seguida, ele constrói os parâmetros de login e faz uma requisição POST para a API Spotify para obter o token de acesso.
        - Se ocorrer qualquer erro durante o processo, uma exceção do tipo `HttpException` é lançada com uma mensagem de erro genérica.
        - Caso contrário, o método armazena o token obtido, registra informações de logging indicando o fim do processo e retorna.



2. Método GetToken

    Este método é responsável por obter o token de acesso necessário para as chamadas à API Spotify. Se o token ainda não estiver disponível, ele chama o método `setToken` para realizar a autenticação e obter o token.

    - **Retorno**:
    - Uma promessa (Promise) que resolve para uma string representando o token de acesso.

    - **Funcionamento**:
        - O método inicia registrando informações de logging indicando o início do processo de obtenção do token.
        - Verifica se o token já está disponível. Se não estiver, chama o método `setToken` para realizar a autenticação.
        - Após obter o token, registra informações de logging indicando o fim do processo e retorna o token.

3. Método CreateRequestLogin

    Este método é responsável por criar e retornar um objeto do tipo RequestLoginDto, contendo os parâmetros necessários para realizar a autenticação na API do Spotify.

    - **Retorno**:
    - Um objeto do tipo RequestLoginDto contendo os parâmetros necessários para a autenticação.

    - **Funcionamento**:
        - O método inicia registrando informações de logging indicando o início do processo de criação do objeto de requisição de login.
        - Cria um novo objeto do tipo RequestLoginDto e preenche seus atributos com os valores adequados, incluindo grant_type, client_secret e client_id.
        - Registra informações de logging indicando o fim do processo e retorna o objeto de requisição de login.

### SpotifyService

1. Método GetPlaylist

    Este método é responsável por obter playlists adequadas com base na temperatura atual e na quantidade desejada, realizando uma chamada à API do Spotify.

   - **Parâmetros**:
       - `temperature`: Um número representando a temperatura atual.
       - `quantityPlaylist`: Um número indicando a quantidade de playlists desejadas.

   - **Retorno**:
       - Uma promessa (Promise) que resolve para uma matriz de objetos do tipo ResponsePlaylistDto, representando as playlists sugeridas com base na temperatura e quantidade especificadas.

   - **Funcionamento**:
       - O método inicia registrando informações de logging indicando o início do processo de obtenção das playlists.
       - Obtém o token de autenticação necessário para acessar a API do Spotify.
       - Determina o gênero musical com base na temperatura fornecida.
       - Realiza uma requisição à API do Spotify para buscar playlists do gênero musical determinado e com a quantidade especificada.
       - Se a requisição não for autorizada (status 401), uma exceção do tipo HttpException é lançada com uma mensagem indicando o problema.
       - Se ocorrer qualquer outro erro durante o processo, uma exceção do tipo HttpException é lançada com uma mensagem de erro genérica.
       - Caso contrário, o método registra informações de logging indicando o fim do processo, cria objetos ResponsePlaylistDto com base nos dados retornados pela API do Spotify e retorna as playlists obtidas.

2. Método GetMusicalGenre

    Este método é responsável por determinar o gênero musical com base na temperatura fornecida.

   - **Parâmetros**:
       - `temperature`: Um número representando a temperatura atual.

   - **Retorno**:
       - Um valor do tipo MusicalGenreEnum representando o gênero musical determinado.

   - **Funcionamento**:
       - O método inicia registrando informações de logging indicando o início do processo de determinação do gênero musical.
       - Com base na temperatura fornecida, determina o gênero musical de acordo com as seguintes regras:
           - Se a temperatura for superior a 25ºC, retorna o gênero Pop.
           - Se a temperatura estiver entre 10ºC e 25ºC, retorna o gênero Rock.
           - Caso contrário, retorna o gênero Clássico.
       - Se ocorrer qualquer erro durante o processo, uma exceção é lançada encapsulada em um objeto HandleHttpError.

3. Método CreateResponsePlaylist

    Este método é responsável por converter o contrato de resposta das playlists em objetos do tipo ResponsePlaylistDto.

   - **Parâmetros**:
       - `responsePlaylistsContract`: Um objeto contendo o contrato de resposta das playlists da API Spotify.

   - **Retorno**:
       - Uma matriz de objetos do tipo ResponsePlaylistDto representando as playlists convertidas.

   - **Funcionamento**:
       - O método inicia registrando informações de logging indicando o início do processo de conversão das playlists.
       - Itera sobre cada playlist no contrato de resposta.
       - Para cada playlist, cria um novo objeto ResponsePlaylistDto e popula seus campos com os dados da playlist correspondente no contrato.
       - Adiciona o objeto ResponsePlaylistDto à matriz de playlists.
       - Registra informações de logging indicando o fim do processo e retorna a matriz de playlists convertidas.
       - Se ocorrer qualquer erro durante o processo, uma exceção é lançada encapsulada em um objeto HandleHttpError.

### CronService

1. Método RefreshTokenSpotify

    Este método é responsável por renovar o token de autenticação do Spotify periodicamente.

   - **Funcionamento**:
       - O método é executado periodicamente de acordo com a configuração de cron, a cada 55 minutos.
       - Inicia registrando informações de logging indicando o início do processo de renovação do token.
       - Chama o método `getToken` do serviço de autenticação para obter um novo token do Spotify.
       - Registra informações de logging indicando o fim do processo.
       - Se ocorrer qualquer erro durante o processo, uma exceção é lançada encapsulada em um objeto HandleHttpError.

### Classe HandleHttpError

Esta classe fornece um método estático chamado `return`, que é usado para lidar com erros HTTP. Se o erro não for do tipo 4xx (cliente), ele lança uma exceção HTTP interna do servidor (status 500) com uma mensagem de erro genérica. Caso contrário, lança uma exceção com o status e a mensagem de erro recebidos.

- **Funcionamento**:
    - O método `return` recebe um erro como argumento.
    - Verifica se o erro não é do tipo 4xx (cliente).
    - Se não for, lança uma exceção HTTP interna do servidor (status 500) com uma mensagem de erro genérica.
    - Caso contrário, lança uma exceção com o status e a mensagem de erro recebidos.
