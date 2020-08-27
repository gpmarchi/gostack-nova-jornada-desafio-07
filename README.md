<h3 align="center">
  Desafio 07: GoMarketplace
</h3>

## :rocket: Sobre o desafio

Nesse desafio foi desenvolvida a aplicação mobile de carrinho de compras, o GoMarketplace. Neste projeto foi exercitado o conteúdo básico do React Native junto com TypeScript, utilizando rotas,  Async Storage e a Context API.

## Instalação

Para instalar o projeto localmente na sua máquina basta clonar o repositório:

```bash
git clone https://github.com/gpmarchi/gostack-nova-jornada-desafio-07.git && cd gostack-nova-jornada-desafio-07
```

E rodar o comando abaixo para instalar as dependências necessárias:

```bash
yarn
```

Essa é uma aplicação que se conecta a uma API fake utilizando o `json-server`. Dentro da raiz do projeto existe um arquivo chamado `server.json` que contem os dados para uma listagem de produtos.

Para rodar esse servidor, basta utilizar o comando abaixo:

```bash
yarn json-server server.json -p 3333
```

## Funcionalidades da aplicação

Abaixo seguem os pontos principais que a aplicação resolve:

- **`Listar os produtos da fake API`**: A página `Dashboard` exibe uma listagem através de uma tabela, com os campos `title`, `image_url`, `price`.

- **`Adicionar itens ao carrinho`**: Em a aplicação, é utilizado o Contexto chamado cart. As funcionalidades do carrinho se encontram dentro de `hooks/cart.tsx`.

- **`Exibir itens do carrinho`**: Na página `Cart` são exibidos todos os itens do carrinho, junto com a quantidade, valor único, valor subtotal dos itens e total de todos os items.

- **`Aumentar quantidade de itens do carrinho`**: Na página `Cart` é permitido ao usuário aumentar a quantidade de itens do mesmo produto, para isso é utilizada a função `increment` dentro do contexto em `/src/hooks/cart.tsx`.

- **`Diminuir quantidade de um item do carrinho`**: Na página `Cart` é permitido ao usuário decrementar a quantidade de itens do mesmo produto, para isso é utilizada a função `decrement` dentro do contexto em `/src/hooks/cart.tsx`.

- **`Exibir valor total dos itens no carrinho`**: Tanto na página `Dashboard`, como na página `Cart` é exibido o valor total de todos os itens que estão no carrinho.

## Especificação dos testes

O desafio foi resolvido seguindo a técnica de TDD. Os testes podem ser encontrados na pasta ```src/__tests__``` e para executá-los rodar o comando:

```bash
yarn test
```

Para cada teste existe uma breve descrição do que a aplicação executa para que o mesmo passe:

- **`should be able to list the products`**: Para esse teste passar, a aplicação permite que sejam listados na tela Dashboard, todos os produtos que são retornadas do Fake API. Essa listagem exibe o title e o price que são formatados utilizando a função Intl.

- **`should be able to add a product to the cart`**: Para esse teste passar, é permitido que sejam adicionados produtos da Dashboard ao carrinho, utilizando o contexto de cart disponibilizado.

- **`should be able to list the products on the cart`**: Para esse teste passar, é permitido listar os produtos que estão salvos no contexto do carrinho na página Cart, nessa página é exibido o nome do produto e o subtotal total de cada produto (price * quantity).

- **`should be able to calculate the cart total`**: Para esse teste passar, tanto na página Dashboard, tanto na página Cart é exibido o valor total de todos os itens que estão no carrinho.

- **`should be able to show the total quantity of itens in the cart`**: Para esse teste passar, tanto na página Dashboard, tanto na página Cart é exibido o número total de itens que estão no carrinho.

- **`should be able to increment product quantity on the cart`**: Para esse teste passar, é permitido que seja incrementada a quantidade de um produto do carrinho, utilizando o contexto de cart disponibilizado.

- **`should be able to decrement product quantity on the cart`**: Para esse teste passar, é permitido que seja decrementada a quantidade de um produto do carrinho, utilizando o contexto de cart disponibilizado.

- **`should be able to navigate to the cart`**: Para esse teste passar, no seu FloatingCart na Dashboard, é permitido que ao clicar no botão de carrinho com o testID de navigate-to-cart-button, o usuário seja redirecionado para a página Cart.

- **`should be able to add products to the cart`**: Para esse teste passar, no arquivo onde está o contexto do carrinho, é permitido que a função addToCart adicione um novo item ao carrinho.

- **`should be able to increment quantity`**: Para esse teste passar, no arquivo onde está o contexto do carrinho, é permitido que a função increment incremente em 1 unidade a quantidade de um item que está armazenado no contexto.

- **`should be able to decrement quantity`**: Para esse teste passar, no arquivo onde está o contexto do carrinho, é permitido que a função decrement decremente em 1 unidade a quantidade de um item que está armazenado no contexto.

- **`should store products in AsyncStorage while adding, incrementing and decrementing`**: Para esse teste passar, no arquivo onde está o contexto do carrinho é permitido que todas as atualizações feitas no carrinho, sejam salvas no AsyncStorage. Por exemplo, ao adicionar um item ao carrinho, ele também é adicionado no AsyncStorage. O valor do AsyncStorage também é atualizado ao se incrementar ou decrementar a quantidade de um item.

- **`should load products from AsyncStorage`**: Para esse teste passar, no arquivo onde está o contexto do carrinho, é permitido que todos os produtos adicionados sejam recuperados do AsyncStorage.
