// ===== SUPABASE =====
const SUPABASE_URL = "https://xddxlddpvjphoirwnkrg.supabase.co";
const SUPABASE_KEY = "sb_publishable_hubeFSd5lasx_XEqe9-xhA_Sj2WI_Ie";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===== DATA =====
let orders = [];

// ===== AUTH =====
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Введи email і пароль");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    const { error: signUpError } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (signUpError) {
      alert(signUpError.message);
    } else {
      alert("Користувача створено");
    }
  } else {
    alert("Успішний вхід");
  }
}

// ===== ORDERS =====
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
}

function renderOrders() {
  const container = document.getElementById("orders");
  container.innerHTML = "";

  orders.forEach((o, i) => {
    if (o.status === "free") {
      container.innerHTML += `
        <div class="order">
          <b>${o.from} → ${o.to}</b><br>
          ${o.desc}<br>
          <button onclick="takeOrder(${i})">Взяти</button>
        </div>
      `;
    }
  });
}
