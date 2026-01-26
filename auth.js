const supabaseClient = supabase.createClient(
  "https://xddxlddpvjphoirwnkrg.supabase.co",
  "PUBLIC_KEY"
);

async function login() {
  const email = email.value;
  const password = password.value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email, password
  });

  if (error) {
    await supabaseClient.auth.signUp({ email, password });
  }

  location.href = "index.html";
}
