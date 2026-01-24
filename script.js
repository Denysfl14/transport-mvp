let orders = [];

function createOrder() {
  const order = {
    from: document.getElementById("from").value,
    to: document.getElementById("to").value,
    desc: document.getElementById("desc").value,
    contact: document.getElementById("contact").value,
    status: "free"
  };

  orders.push(order);
  renderOrders();
  alert("Замовлення створено");
}

function takeOrder(index) {
  orders[index].status = "taken";
  renderOrders();
  alert("Ви взяли замовлення");
}

function renderOrders() {
  const container = document.getElementById("orders");
  container.innerHTML = "";

  orders.forEach((o, i) => {
    if (o.status === "free") {
      container.innerHTML += `
        <div class="order">
          <strong>${o.from} → ${o.to}</strong><br>
          ${o.desc}<br>
          <button onclick="takeOrder(${i})">Взяти</button>
        </div>
      `;
    }
  });
}
