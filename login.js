const token= localStorage.getItem("token");
if (token ){window.location.href = "index.html";}

const formLogin = document.querySelector("#formLogin");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = formLogin.email.value;
  const password = formLogin.password.value;
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }
    });
});