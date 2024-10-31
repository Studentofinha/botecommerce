const { Telegraf } = require("telegraf");
// const fetch = require('node-fetch');
require("dotenv").config();
const bot = new Telegraf(process.env.TOKEN); // Replace with your actual bot token

// Sample in-memory cart
let cart = [];

bot.start((ctx) => {
  ctx.reply(`Welcome to our e-commerce bot! Use /browse to see our products.`);
});

// Mock product list
const products = [
  { id: 1, name: "Product A", price: 50 },
  { id: 2, name: "Product B", price: 100 },
  { id: 3, name: "Product C", price: 150 },
];

bot.command("browse", (ctx) => {
  let productList = "Available Products:\n";
  products.forEach((product) => {
    productList += `\n${product.name} - $${product.price}\nUse /add_${product.id} to add to cart.`;
  });
  ctx.reply(productList);
});

// Add to cart
products.forEach((product) => {
  bot.command(`add_${product.id}`, (ctx) => {
    cart.push(product);
    ctx.reply(`${product.name} has been added to your cart.`);
  });
});

// View cart
bot.command("cart", (ctx) => {
  if (cart.length === 0) {
    ctx.reply("Your cart is empty.");
    return;
  }
  let cartSummary = "Your Cart:\n";
  let total = 0;
  cart.forEach((item) => {
    cartSummary += `\n${item.name} - $${item.price}`;
    total += item.price;
  });
  cartSummary += `\n\nTotal: $${total}\nUse /checkout to place your order.`;
  ctx.reply(cartSummary);
});

bot.command("checkout", (ctx) => {
  if (cart.length === 0) {
    ctx.reply("Your cart is empty. Use /browse to add items.");
    return;
  }

  let orderSummary = "Order Summary:\n";
  let total = 0;
  cart.forEach((item) => {
    orderSummary += `\n${item.name} - $${item.price}`;
    total += item.price;
  });
  orderSummary += `\n\nTotal: $${total}\n\nType /confirm to place your order.`;
  ctx.reply(orderSummary);
});

bot.command("confirm", (ctx) => {
  if (cart.length === 0) {
    ctx.reply("Your cart is empty. Please add items to checkout.");
    return;
  }
  ctx.reply(
    "Thank you for your order! Your order has been confirmed.\nTracking number: XYZ123"
  );
  cart = []; // Clear the cart
});

bot.launch();
console.log("E-commerce bot is running...");
