// ===== SUPABASE =====
const SUPABASE_URL = "https://xddxlddpvjphoirwnkrg.supabase.co";
const SUPABASE_KEY = "sb_publishable_hubeFSd5lasx_XEqe9-xhA_Sj2WI_Ie";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ===== DATA =====
let orders = [];

async function checkAlreadyLogged() {
  const { data } = await supabaseClient.auth.getUser();

  if (data.user) {
    window.location.href = "index.html";
  }
}

async function login() {
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  if (!emailValue || !passwordValue) {
    alert("Заповніть всі поля");
    return;
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: emailValue,
    password: passwordValue
  });

  if (error) {
    const { error: signUpError } = await supabaseClient.auth.signUp({
      email: emailValue,
      password: passwordValue
    });

    if (signUpError) {
      alert(signUpError.message);
      return;
    } else {
      alert("Користувача створено");
    }
  } else {
    alert("Успішний вхід");
    const email = document.getElementById("email").value = "";
    const password = document.getElementById("password").value = "";
  }
}

async function logout() {
  await supabaseClient.auth.signOut();
  window.location.href = "auth.html";
}

// ===== ORDERS =====
async function createOrder() {
  const order = {
    from_city: document.getElementById("from").value,
    to_city: document.getElementById("to").value,
    desc: document.getElementById("desc").value,
    contact: document.getElementById("contact").value,
    status: "free"
  };

  // ✅ перевірка ПЕРЕД збереженням
  if (!order.from_city || !order.desc || !order.contact) {
    alert("Заповніть обовʼязкові поля");
    return;
  }

  const { error } = await supabaseClient
    .from("orders")
    .insert([order]);

  if (error) {
    alert("Помилка: " + error.message);
  } else {
    alert("Замовлення збережено");
    loadOrders();

    // (опціонально) очистити поля
    document.getElementById("from").value = "";
    document.getElementById("to").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("contact").value = "";
  }
}

async function takeOrder(id) {
  const { error } = await supabaseClient
    .from("orders")
    .update({ status: "taken" })
    .eq("id", id);

  if (error) {
    alert(error.message);
  } else {
    alert("Замовлення взято");
    loadOrders();
  }
}

async function loadOrders() {
  const { data, error } = await supabaseClient
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  const container = document.getElementById("orders");
  container.innerHTML = "";

  data.forEach(order => {
    if (order.status === "free") {
      container.innerHTML += `
        <div class="order">
          <b>${order.from_city} → ${order.to_city}</b><br>
          ${order.desc}<br>
          <small>${order.contact}</small><br>
          <button onclick="takeOrder(${order.id})">Взяти</button>
        </div>
      `;
    }
  });
}

loadOrders();
