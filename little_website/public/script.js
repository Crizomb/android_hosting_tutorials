async function loadBattery() {
  const res = await fetch('/api/battery');
  const data = await res.json();
  console.log(data);
  const battery_json = JSON.parse(data.battery);
  const health = battery_json.health;
  const status = battery_json.status;
  const percentage = battery_json.percentage;
  const voltage = battery_json.voltage;
  const current = battery_json.current;
  const temperature = battery_json.temperature;
  let power = parseInt(voltage) * parseInt(current) / 1000000000;
  power = String(power).substring(0, 5);
  document.getElementById("battery-status").innerText = `Battery infos 🔋\n\nstatus : ${status}\nLevel : ${percentage}%\nPower : ${power}W (${current}µA x ${voltage}mV)\nTemperature : ${temperature}°C\nHealth : ${health}`;
}

async function loadMessages() {
  const res = await fetch('/api/messages');
  const data = await res.json();
  const list = document.getElementById("messages");
  list.innerHTML = "";
  data.forEach(msg => {
    const li = document.createElement("li");
    li.textContent = `[${new Date(msg.time).toLocaleTimeString()}] ${msg.message}`;
    list.appendChild(li);
  });
}

document.getElementById("msgForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = document.getElementById("message").value.trim().substring(0, 1000);
  const captcha = {};
  const captchaAnswer = {};
  const res = await fetch("/api/message", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, captchaAnswer, captcha })
  });

  const result = await res.json();
  if (result.success) {
    alert("Message sent!");
    document.getElementById("message").value = "";
    loadMessages();
  } else {
    alert(result);
  }

});

loadMessages();
loadBattery();
setInterval(loadBattery, 30000);
