const supabaseClient = supabase.createClient(
  "https://xddxlddpvjphoirwnkrg.supabase.co",
  "PUBLIC_KEY"
);

async function checkAlreadyLogged() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    // ✅ ВЖЕ ЗАРЕЄСТРОВАНИЙ → НА САЙТ
    window.location.href = "index.html";
  }
}

checkAlreadyLogged();

async function login() {
  const email = email.value;
  const password = password.value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email, password
  });

  if (error) {
    await supabaseClient.auth.signUp({ email, password });
  }

  window.location.href = "index.html";
}
