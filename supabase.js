
const supabase = window.supabase.createClient(
  "https://rincxoalnhfsnwgwxrfb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
);

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function loadClient() {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (data) {
    document.getElementById("clientName").textContent = data.name || '';
    document.getElementById("name").value = data.name || '';
    document.getElementById("phone").value = data.phone || '';
    document.getElementById("phone2").value = data.phone2 || '';
    document.getElementById("email").value = data.email || '';
    document.getElementById("address").value = data.address || '';
    document.getElementById("notes").value = data.notes || '';
  }
}

document.getElementById("editBtn").addEventListener("click", () => {
  document.querySelectorAll("input, textarea").forEach(el => el.disabled = false);
  document.getElementById("deleteBtn").style.display = "inline-block";
});

window.onload = loadClient;
