const profiles = {
  protic: {
    title: "UKM Protic",
    type: "UKM",
    category: "TEKNOLOGI",
    symbol: "⌘",
    desc: "Komunitas mahasiswa yang berminat pada teknologi informasi, pemrograman, dan pengembangan digital.",
    fields: ["Pemrograman", "Pengembangan web", "Teknologi informasi"],
    programs: [
      ["Belajar bersama", "Berbagi pengetahuan dan keterampilan pemrograman."],
      ["Workshop teknologi", "Mengenal tools dan perkembangan teknologi."],
      ["Proyek kolaboratif", "Mengerjakan proyek bersama."]
    ],
    contact: "Tambahkan kontak resmi UKM"
  },
  bem: {
    title: "Badan Eksekutif Mahasiswa",
    type: "Organisasi",
    category: "ORGANISASI MAHASISWA",
    symbol: "✦",
    desc: "Wadah aspirasi, koordinasi kegiatan, dan pengembangan kepemimpinan mahasiswa.",
    fields: ["Kepemimpinan", "Aspirasi mahasiswa", "Kegiatan kampus"],
    programs: [
      ["Forum aspirasi", "Menampung aspirasi mahasiswa."],
      ["Program kerja", "Mengadakan kegiatan mahasiswa."],
      ["Kolaborasi kampus", "Bekerja sama dengan organisasi lain."]
    ],
    contact: "Tambahkan kontak resmi BEM"
  },
  musik: {
    title: "UKM Musik",
    type: "UKM",
    category: "SENI & BUDAYA",
    symbol: "♫",
    desc: "Komunitas untuk mengembangkan minat bermusik dan berpartisipasi dalam pertunjukan seni.",
    fields: ["Musik", "Pertunjukan", "Kolaborasi seni"],
    programs: [
      ["Latihan rutin", "Mengembangkan kemampuan musik."],
      ["Pentas musik", "Menampilkan karya dalam acara kampus."],
      ["Workshop musik", "Berbagi pengalaman bermusik."]
    ],
    contact: "Tambahkan kontak resmi UKM"
  },
  olahraga: {
    title: "UKM Olahraga",
    type: "UKM",
    category: "OLAHRAGA",
    symbol: "◉",
    desc: "Wadah untuk mengembangkan minat olahraga, kebugaran, dan kerja sama tim.",
    fields: ["Olahraga", "Kebugaran", "Kompetisi"],
    programs: [
      ["Latihan bersama", "Melatih kemampuan tim."],
      ["Pertandingan", "Mengikuti kegiatan olahraga."],
      ["Turnamen", "Berpartisipasi dalam kompetisi."]
    ],
    contact: "Tambahkan kontak resmi UKM"
  },
  relawan: {
    title: "UKM Relawan",
    type: "UKM",
    category: "SOSIAL",
    symbol: "♡",
    desc: "Komunitas mahasiswa yang berfokus pada kepedulian sosial dan pengabdian masyarakat.",
    fields: ["Sosial", "Relawan", "Pengabdian"],
    programs: [
      ["Aksi sosial", "Berpartisipasi dalam kegiatan sosial."],
      ["Edukasi masyarakat", "Berbagi pengetahuan."],
      ["Aksi lingkungan", "Kegiatan peduli lingkungan."]
    ],
    contact: "Tambahkan kontak resmi UKM"
  },
  tari: {
    title: "UKM Tari",
    type: "UKM",
    category: "SENI & BUDAYA",
    symbol: "✳",
    desc: "Komunitas untuk mempelajari dan menampilkan seni tari serta mengenalkan budaya.",
    fields: ["Seni tari", "Budaya", "Pertunjukan"],
    programs: [
      ["Latihan tari", "Melatih teknik dan kekompakan."],
      ["Pentas budaya", "Menampilkan tarian."],
      ["Pengenalan budaya", "Mempelajari latar budaya tarian."]
    ],
    contact: "Tambahkan kontak resmi UKM"
  }
};

// ---------------------------------------------------------
// Logic untuk Halaman Detail Organisasi
// ---------------------------------------------------------
if (document.getElementById("name")) {
  const key = new URLSearchParams(location.search).get("org") || "protic",
        p = profiles[key] || profiles.protic;

  document.title = p.title + " | RuangKampus";
  document.getElementById("name").textContent = p.title;
  document.getElementById("heading").textContent = p.title + ".";
  document.getElementById("type").textContent = p.type;
  document.getElementById("category").textContent = p.category;
  document.getElementById("symbol").textContent = p.symbol;
  document.getElementById("description").textContent = p.desc;
  document.getElementById("fields").innerHTML = p.fields.map(x => `<span>${x}</span>`).join("");
  document.getElementById("programs").innerHTML = p.programs.map((x, i) => `<div class="program"><strong>0${i + 1} · ${x[0]}</strong><span class="muted">${x[1]}</span></div>`).join("");
  document.getElementById("asideType").textContent = p.type;
  document.getElementById("asideField").textContent = p.fields.join(", ");
  document.getElementById("contact").textContent = p.contact;
}

// ---------------------------------------------------------
// Logic untuk Filter Organisasi
// ---------------------------------------------------------
let orgCat = "Semua";
const orgSearch = document.getElementById("search"),
      orgCards = [...document.querySelectorAll(".org")];

function filterOrgs() {
  const q = (orgSearch?.value || "").toLowerCase();
  let n = 0;
  
  orgCards.forEach(c => {
    const show = (orgCat === "Semua" || c.dataset.cat === orgCat) && 
                 (c.dataset.name + " " + c.innerText).toLowerCase().includes(q);
    c.classList.toggle("hidden", !show);
    if (show) n++;
  });
  
  const count = document.getElementById("count");
  if (count) count.textContent = `Menampilkan ${n} dari ${orgCards.length} contoh organisasi`;
  
  document.getElementById("empty")?.classList.toggle("hidden", n > 0);
}

orgSearch?.addEventListener("input", filterOrgs);

document.querySelectorAll("[data-cat]").forEach(b => {
  if (b.classList.contains("chip")) {
    b.addEventListener("click", () => {
      orgCat = b.dataset.cat;
      document.querySelectorAll(".chip").forEach(x => x.classList.toggle("active", x === b));
      filterOrgs();
    });
  }
});

// Menangani URL parameter untuk kategori organisasi saat dimuat
const param = new URLSearchParams(location.search).get("cat");
if (param && [...document.querySelectorAll(".chip")].some(b => b.dataset.cat === param)) {
  orgCat = param;
  document.querySelectorAll(".chip").forEach(b => b.classList.toggle("active", b.dataset.cat === param));
  filterOrgs();
}

// ---------------------------------------------------------
// Logic untuk Filter Event
// ---------------------------------------------------------
let eventCat = "Semua";
const eventSearch = document.getElementById("eventSearch"),
      eventCards = [...document.querySelectorAll(".event")];

function filterEvents() {
  const q = (eventSearch?.value || "").toLowerCase();
  let n = 0;
  
  eventCards.forEach(c => {
    const show = (eventCat === "Semua" || c.dataset.cat === eventCat) && 
                 (c.dataset.name + " " + c.innerText).toLowerCase().includes(q);
    c.classList.toggle("hidden", !show);
    if (show) n++;
  });
  
  document.getElementById("eventEmpty")?.classList.toggle("hidden", n > 0);
}

eventSearch?.addEventListener("input", filterEvents);

document.querySelectorAll("[data-eventcat]").forEach(b => {
  b.addEventListener("click", () => {
    eventCat = b.dataset.eventcat;
    document.querySelectorAll("[data-eventcat]").forEach(x => x.classList.toggle("active", x === b));
    filterEvents();
  });
});