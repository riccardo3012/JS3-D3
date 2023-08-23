function fetchBooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(
      function (response) {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      },
      function (error) {
        console.error("Errore nella richiesta:", error);
      }
    )
    .then(function (books) {
      displayBooks(books);
    });
}

function displayBooks(books) {
  const bookContainer = document.getElementById("bookContainer");

  books.forEach(function (book) {
    const col = document.createElement("div");
    col.classList.add("col-md-4");
    col.innerHTML = `
          <div class="card mb-4">
              <img src="${book.img}" class="card-img-top" alt="${book.title}">
              <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">Prezzo: $${book.price}</p>
                  <button class="btn btn-danger" onclick="removeCard(this)">Scarta</button>
                  <button class="btn btn-success" onclick="addToCart('${book.title}', '${book.price}')">Compra ora</button>
              </div>
          </div>
      `;
    bookContainer.appendChild(col);
  });
}

function removeCard(button) {
  button.closest(".col-md-4").remove();
}

function addToCart(title, price) {
  const cart = document.getElementById("cart");
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.innerHTML = `${title} - $${price}`;
  cart.appendChild(listItem);
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.push({ title, price });
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function loadCart() {
  const cart = document.getElementById("cart");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.forEach(function (item) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `${item.title} - $${item.price}`;
    cart.appendChild(listItem);
  });
}

fetchBooks();
loadCart();
