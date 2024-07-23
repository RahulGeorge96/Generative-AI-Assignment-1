// public/script.js
async function generateShayari() {
  const prompt = document.getElementById("prompt").value;
  const response = await fetch("/generate-shayari", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();
  const shayariDiv = document.getElementById("shayari");
  shayariDiv.textContent = data.shayari;
}
