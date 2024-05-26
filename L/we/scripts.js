let products = [];
let currentId = 1;

function showForm(action) {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = "";

    if (action === "create") {
        formContainer.innerHTML = `
            <h2>Incluir novo produto</h2>
            <form onsubmit="createProduct(event)">
                <input type="text" id="product-name" placeholder="Nome do produto" required>
                <input type="text" id="product-brand" placeholder="Marca do produto" required>
                <input type="number" id="product-price" placeholder="Preço do produto" required>
                <textarea id="product-description" placeholder="Descrição do produto" required></textarea>
                <input type="file" id="product-image" accept="image/*" required>
                <button type="submit">Incluir</button>
            </form>
        `;
    } else if (action === "read") {
        formContainer.innerHTML = `
            <h2>Consultar um produto</h2>
            <form onsubmit="readProduct(event)">
                <input type="text" id="search-name" placeholder="Nome do produto" required>
                <button type="submit">Consultar</button>
            </form>
        `;
    } else if (action === "update") {
        formContainer.innerHTML = `
            <h2>Alterar dados de um produto</h2>
            <form onsubmit="updateProduct(event)">
                <input type="text" id="search-name" placeholder="Nome do produto" required>
                <input type="text" id="new-product-name" placeholder="Novo nome do produto" required>
                <input type="text" id="new-product-brand" placeholder="Nova marca do produto" required>
                <input type="number" id="new-product-price" placeholder="Novo preço do produto" required>
                <textarea id="new-product-description" placeholder="Nova descrição do produto" required></textarea>
                <input type="file" id="new-product-image" accept="image/*" required>
                <button type="submit">Alterar</button>
            </form>
        `;
    } else if (action === "delete") {
        formContainer.innerHTML = `
            <h2>Excluir dados de um produto</h2>
            <form onsubmit="deleteProduct(event)">
                <input type="text" id="search-name" placeholder="Nome do produto" required>
                <button type="submit">Excluir</button>
            </form>
        `;
    }
}

function createProduct(event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const brand = document.getElementById("product-brand").value;
    const price = document.getElementById("product-price").value;
    const description = document.getElementById("product-description").value;
    const image = document.getElementById("product-image").files[0];

    // Verificar se o nome do produto já existe
    if (products.some((product) => product.name === name)) {
        alert(
            "Já existe um produto com este nome. Por favor, escolha um nome diferente."
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const id = currentId++;
        products.push({
            id,
            name,
            brand,
            price,
            description,
            image: e.target.result,
        });
        alert("Produto incluído com sucesso!");
        document.getElementById("form-container").innerHTML = "";
        listProducts();
    };
    reader.readAsDataURL(image);
}

function readProduct(event) {
    event.preventDefault();
    const name = document.getElementById("search-name").value;
    const product = products.find((p) => p.name === name);
    const productDetails = document.getElementById("product-details");
    productDetails.innerHTML = "";

    if (product) {
        productDetails.innerHTML = `<h2>Detalhes do Produto</h2>
            <p>ID: ${product.id}</p>
            <p>Nome: ${product.name}</p>
            <p>Marca: ${product.brand}</p>
            <p>Preço: ${product.price}</p>
            <p>Descrição: ${product.description}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 200px;">`;
    } else {
        productDetails.innerHTML = "<p>Produto não encontrado</p>";
    }
    listProducts();
}

function updateProduct(event) {
    event.preventDefault();
    const name = document.getElementById("search-name").value;
    const newName = document.getElementById("new-product-name").value;
    const newBrand = document.getElementById("new-product-brand").value;
    const newPrice = document.getElementById("new-product-price").value;
    const newDescription = document.getElementById(
        "new-product-description"
    ).value;
    const newImage = document.getElementById("new-product-image").files[0];
    const product = products.find((p) => p.name === name);

    if (!product) {
        alert("Produto não encontrado");
        return;
    }

    // Verificar se o novo nome do produto já existe (exceto para o próprio produto que está sendo atualizado)
    if (products.some((p) => p.name === newName && p.id !== product.id)) {
        alert(
            "Já existe um produto com este novo nome. Por favor, escolha um nome diferente."
        );
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        product.name = newName;
        product.brand = newBrand;
        product.price = newPrice;
        product.description = newDescription;
        product.image = e.target.result;
        alert("Produto atualizado com sucesso!");
        document.getElementById("form-container").innerHTML = "";
        listProducts();
    };
    reader.readAsDataURL(newImage);
}

function deleteProduct(event) {
    event.preventDefault();
    const name = document.getElementById("search-name").value;
    const index = products.findIndex((p) => p.name === name);

    if (index !== -1) {
        const confirmation = confirm(
            "Tem certeza que deseja excluir este produto?"
        );
        if (confirmation) {
            products.splice(index, 1);
            alert("Produto excluído com sucesso!");
        }
    } else {
        alert("Produto não encontrado");
    }
    document.getElementById("form-container").innerHTML = "";
    listProducts();
}

function listProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "<h2>Lista de Perfumes</h2>";
    if (products.length > 0) {
        products.forEach((product) => {
            productList.innerHTML += `<img src="${product.image}" alt="${product.name}" style="max-width: 500px; border-radius: 5px;" 
            > <p>Nome: ${product.name} <p>Marca: ${product.brand} <p>Preço: R$ ${product.price} <p>Descrição: ${product.description}</p>
                                      `;
        });
    } else {
        productList.innerHTML += "<p>Nenhum produto cadastrado</p>";
    }
}
