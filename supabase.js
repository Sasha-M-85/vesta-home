
const SUPABASE_URL = 'https://rincxoalnhfsnwgwxrfb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpbmN4b2Fsbmhmc253Z3d4cmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MjE2MzMsImV4cCI6MjA2OTE5NzYzM30.95JhUW9uRbcHSkFCXyh40acSAAnJIj3nbUICQGqW32Y';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const urlParams = new URLSearchParams(window.location.search);
const clientId = urlParams.get("id");

async function loadClient() {
  if (!clientId) return;
  const { data, error } = await client.from("clients").select("*").eq("id", clientId).single();
  if (error) return console.error(error);

  document.getElementById("name").value = data.name || "";
  document.getElementById("phone").value = data.phone || "";
  document.getElementById("phone2").value = data.phone2 || "";
  document.getElementById("email").value = data.email || "";
  document.getElementById("city").value = data.city || "";
  document.getElementById("street").value = data.street || "";
  document.getElementById("house").value = data.house || "";
  document.getElementById("notes").value = data.notes || "";
  document.getElementById("clientName").textContent = data.name || "Имя клиента";

  loadProjects(clientId);
}

async function loadProjects(clientId) {
  const { data, error } = await client.from("projects").select("*").eq("client_id", clientId);
  if (error) return console.error(error);
  // Вставить в интерфейс если будет список
}

document.getElementById("clientForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    phone2: document.getElementById("phone2").value,
    email: document.getElementById("email").value,
    city: document.getElementById("city").value,
    street: document.getElementById("street").value,
    house: document.getElementById("house").value,
    notes: document.getElementById("notes").value,
  };

  if (clientId) {
    const { error } = await client.from("clients").update(form).eq("id", clientId);
    if (error) return alert("Ошибка сохранения: " + error.message);
  } else {
    const { error } = await client.from("clients").insert([form]);
    if (error) return alert("Ошибка добавления: " + error.message);
  }

  window.location.href = "clients.html";
});

document.getElementById("addProjectBtn")?.addEventListener("click", async () => {
  const title = document.getElementById("projectName").value.trim();
  const dropbox_link = document.getElementById("dropboxLink").value.trim();
  const total_amount = parseFloat(document.getElementById("totalAmount").value) || 0;
  const deposit = parseFloat(document.getElementById("deposit").value) || 0;
  const balance = total_amount - deposit;

  if (!title || !clientId) return alert("Введите название проекта и убедитесь, что есть ID клиента");

  const { error } = await client.from("projects").insert([
    { client_id: clientId, title, dropbox_link, total_amount, deposit, balance },
  ]);

  if (error) return alert("Ошибка проекта: " + error.message);
  alert("Проект добавлен");
});

loadClient();
