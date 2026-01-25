let orders = [];

// 🔐 Supabase
const SUPABASE_URL = "https://xddxlddpvjphoirwnkrg.supabase.co";
const SUPABASE_KEY = "sb_publishable_hubeFSd5lasx_XEqe9-xhA_Sj2WI_Ie";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// 🔑 ЛОГІН / РЕЄСТРАЦІЯ
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    await supabase.auth.signUp({ email, password });
    alert("Зареєстровано і увійшли");
  } else {
    alert("Вхід виконано");
  }
}

// 📦 ЗАМОВЛЕННЯ (ПОКИ ЛОКАЛЬНО)
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
