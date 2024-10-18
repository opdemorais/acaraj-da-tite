let cart = [];
let totalPrice = 0;

// Adicionar item ao carrinho
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const price = parseFloat(this.getAttribute("data-price"));

    cart.push({ name, price });
    updateCart();
  });
});

// Atualizar o carrinho e total
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("p");
    cartItem.innerHTML = `${item.name} - R$ ${item.price.toFixed(
      2
    )} <button onclick="removeFromCart(${index})">Remover</button>`;
    cartItems.appendChild(cartItem);
  });

  totalPrice = cart.reduce((total, item) => total + item.price, 0);
  document.getElementById("total-price").innerText = totalPrice.toFixed(2);

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Carrinho vazio</p>";
  }
}

// Remover item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Finalizar Pedido
document.getElementById("checkout").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const message = cart
    .map((item) => `${item.name} - R$ ${item.price.toFixed(2)}`)
    .join("\n");
  const total = `Total: R$ ${totalPrice.toFixed(2)}`;
  const whatsappUrl = `https://wa.me/5575981747174?text=Meu%20pedido:%0A${encodeURIComponent(
    message
  )}%0A${encodeURIComponent(total)}`;

  window.open(whatsappUrl, "_blank");
});
