class NavBar {
    constructor() {
        this.render();
    }

    render() {
        document.getElementById("navbar").innerHTML = `
        <nav>
          <h1> Ecommerce-Store</h1>
          <ul class="nav-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="cart.html">Cart(<span id="cart-count">0</span>)</a></li>
          </ul>
        </nav>    
      `;
    }

    updateCartCount(count) {
        document.getElementById("cart-count").textContent = count;
    }
}

class Products {
    constructor(products, cart) {
        this.products = products;
        this.cart = cart;
        this.render();
    }

    render() {
        const mainContent = document.getElementById("main-content");
        mainContent.innerHTML = this.products
            .map(
                (product) => `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="cart.addTocart('${product.name}','${product.image}','${product.description}')">Add to cart</button>
          </div>
        `
            )
            .join("");
    }
}

class Footer {
    constructor() {
        this.render();
    }

    render() {
        document.getElementById("footer").innerHTML = `
        <div class="footer-content">
          <h3>E-commerce</h3>
        </div>
      `;
    }
}

class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("cart")) || [];
        this.updateCartDisplay();
    }

    addTocart(name, image, description) {
        this.items.push({ name, image, description });
        console.log(this.items);

        localStorage.setItem("cart", JSON.stringify(this.items));
        this.updateCartDisplay();
    }

    updateCartDisplay() {
        const navbar = new NavBar();
        navbar.updateCartCount(this.items.length);
    }

    displayCartItems() {
        const cartItemsContainer = document.getElementById("cart-items");
        console.log(cartItemsContainer);

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `<p>Your cart is empty</p>`;
        } else {
            cartItemsContainer.innerHTML = this.items
                .map(
                    (item) => `
            <div class="cart-item">
              <h4>${item.name}</h4>
              <img src="${item.image}" alt="${item.description}" width="50">
              <button onclick="cart.removeFromCart('${item.name}')">Remove</button>
            </div>
          `
                )
                .join("");
        }
    }

    removeFromCart(name) {
        this.items = this.items.filter((item) => item.name !== name);
        localStorage.setItem("cart", JSON.stringify(this.items));
        this.displayCartItems();
        this.updateCartDisplay();
    }
}

const cart = new Cart();
const smapleProducts = [
    {
        name: "Product 1",
        description: "description of project 1",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 2",
        description: "description of project 2",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 3",
        description: "description of project 3",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 4",
        description: "description of project 4",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 5",
        description: "description of project 5",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 6",
        description: "description of project 6",
        image: "https://placehold.co/300x300",
    },
    {
        name: "Product 7",
        description: "description of project 7",
        image: "https://placehold.co/300x300",
    },

    {
        name: "Product 8",
        description: "description of project 8",
        image: "https://placehold.co/300x300",
    }
];

if (document.getElementById("main-content")) {
    new NavBar();
    new Products(smapleProducts, cart);
}

if (document.getElementById("cart-items")) {
    new NavBar();
    cart.displayCartItems();
}
