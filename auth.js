const supabaseClient = window.supabase.createClient(
  "https://xddxlddpvjphoirwnkrg.supabase.co",
  "sb_publishable_hubeFSd5lasx_XEqe9-xhA_Sj2WI_Ie"
);

// якщо вже залогінений — не показуємо auth.html
async function checkAlreadyLogged() {
  const { data } = await supabaseClient.auth.getUser();

  if (data.user) {
    window.location.href = "index.html";
  }
}

checkAlreadyLogged();

async function login() {
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;

  if (!emailValue || !passwordValue) {
    alert("Введи email і пароль");
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
    }
  }

  window.location.href = "index.html";
}
