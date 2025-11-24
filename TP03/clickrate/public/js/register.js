const API_URL = "/api";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const form = new FormData(e.target);

  const data = {
    email: form.get("email"),
    password: form.get("password"),
    confirmPassword: form.get("confirmPassword"),
    nickname: form.get("nickname")
  };  

  const res = await fetch(API_URL+`/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();

  document.getElementById("msg").innerText =
    json.error ? "❌ " + json.error : "✅ " + json.message;
});