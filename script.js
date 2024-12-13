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
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        image: "https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129805.jpg",
    },
    {
        name: "Product 2",
        image: "https://t4.ftcdn.net/jpg/03/71/92/67/360_F_371926762_MdmDMtJbXt7DoaDrxFP0dp9Nq1tSFCnR.jpg ",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
        name: "Product 3",
        image: "https://media.istockphoto.com/id/1212526330/photo/bohemian-living-room-interior-3d-render.jpg?s=612x612&w=0&k=20&c=iIQ5wqa4NYpLn0YJvT_NAzMilwTFkTlprwbXAasOn9s=",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
        name: "Product 4",
        image: "https://media.architecturaldigest.com/photos/5e4ecf2c2e0cf600096c27fa/master/w_1600%2Cc_limit/RH-Outdoor-2020-066x067_T316_OD20OD1_V1.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
        name: "Product 5",
        image: "https://img.staticmb.com/mbcontent/images/crop/uploads/2023/12/minimalistic-kitchen-furniture-and-rattan-chairs_0_1200.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
        name: "Product 6",
        image: "https://cdn.media.amplience.net/i/boconcept/8462066f-32ac-4b7e-9b6c-b1ef0072aaaf?locale=*&w=3020&fmt=auto&upscale=false&sm=c&qlt=75&h=1691&%24auto-poi%24=",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },
    {
        name: "Product 7",
        image: "https://assets.bdiusa.com/BDI-products-1200x1200/OFFICE/LINQ-OFFICE/DESK-6821/WALNUT/_1440x810_crop_center-center_none/linq-modern-executive-office-desk-BDI-furniture-mid-century-modern-office-1440.jpg?v=1725020660",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    },

    {
        name: "Product 8",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        image: "https://www.oakfurnitureland.co.uk/blog/wp-content/uploads/2023/10/Oak-Furnitureland-bedroom-furniture-upholstered-bed-Wren-midnight-blue-800x528.jpg",
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
