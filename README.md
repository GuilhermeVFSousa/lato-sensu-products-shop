# 🛍️ Projeto de E-commerce - UFSCar

Este projeto foi desenvolvido como parte da disciplina **Desenvolvimento de Software do Front ao Back End**, do curso de pós-graduação em **Desenvolvimento de Software para Web** da **Universidade Federal de São Carlos (UFSCar)**.

## 🚀 Tecnologias Utilizadas

- **React**
- **TypeScript**
- **CSS Modules**
- **Axios**

## 🛒 Funcionalidades

O sistema permite:

- Listar produtos
- Filtrar produtos por código
- Adicionar produtos individualmente ou em massa (via CSV)
- Editar produtos existentes
- Excluir produtos

## 📝 Como Adicionar Produtos

O sistema permite cadastrar produtos **individualmente** ou **em massa** via arquivo CSV.

### 1️⃣ Cadastro Individual
1. No menu lateral, clique em **Produtos**.
2. Clique em **+ Adicionar**.
3. Preencha os campos do formulário:
   - **Nome**
   - **Categoria**
   - **Preço**
   - **URL da imagem**
   - **Descrição**
4. Clique em **Adicionar** para salvar o produto.

### 2️⃣ Cadastro em Massa (CSV)
1. No menu lateral, clique em **Produtos**.
2. Clique em **+ Adicionar** e selecione a aba **Cadastro em Massa**.
3. Selecione o arquivo CSV com os produtos. Por exemplo, há um arquivo de exemplo no diretório do projeto:  

public/data/products-csv.csv

4. Clique em **Processar CSV**.
5. Aguarde a confirmação do processamento, que exibirá quantos produtos foram cadastrados com sucesso e possíveis erros.

### 3️⃣ Edição de Produtos
1. Na tela de **Produtos**, localize o produto desejado.
2. Clique em **Editar** no card do produto.
3. Modifique os campos desejados.
4. Clique em **Editar** para salvar as alterações.

### 4️⃣ Exclusão de Produtos
1. Na tela de **Produtos**, localize o produto desejado.
2. Clique em **Excluir** no card do produto.
3. Confirme a ação no diálogo de confirmação.