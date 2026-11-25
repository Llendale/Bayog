/* ==========================================================================
   Pharma Care — Pharmacy Inventory Management System Logic (bayog.js)
   ========================================================================== */

const STORAGE_KEY = "pharmacare_inventory_v2";
const INVOICES_KEY = "pharmacare_invoices_v2";
const THEME_KEY = "pharmacare_darkmode";

// Seed Catalog (60 Pharmacy SKUs across categories and storage zones)
const DEFAULT_PRODUCTS = [
  { sku: "PC-1001", name: "Amoxicillin 500mg Capsules", generic: "Amoxicillin Trihydrate", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-101", expiry: "2027-08-15", price: 18.50, stock: 240 },
  { sku: "PC-1002", name: "Paracetamol 500mg Tablets", generic: "Acetaminophen", category: "Pain & Fever", warehouse: "Main Dispensary", batch: "PC-2026-102", expiry: "2028-03-20", price: 6.00, stock: 520 },
  { sku: "PC-1003", name: "Atorvastatin 20mg Tablets", generic: "Atorvastatin Calcium", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-103", expiry: "2027-11-10", price: 32.00, stock: 180 },
  { sku: "PC-1004", name: "Insulin Glargine 100 IU/mL Pen", generic: "Insulin Glargine", category: "Diabetes & Endocrine", warehouse: "Cold Chain Storage", batch: "CC-2026-201", expiry: "2027-01-18", price: 890.00, stock: 18 },
  { sku: "PC-1005", name: "Cefuroxime Axetil 500mg Tablets", generic: "Cefuroxime", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-105", expiry: "2027-06-30", price: 54.00, stock: 95 },
  { sku: "PC-1006", name: "Losartan Potassium 50mg Tablets", generic: "Losartan", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-106", expiry: "2028-01-12", price: 14.50, stock: 310 },
  { sku: "PC-1007", name: "Metformin HCl 500mg Tablets", generic: "Metformin Hydrochloride", category: "Diabetes & Endocrine", warehouse: "Main Dispensary", batch: "PC-2026-107", expiry: "2028-04-05", price: 8.75, stock: 410 },
  { sku: "PC-1008", name: "Salbutamol 100mcg Inhaler", generic: "Albuterol Sulfate", category: "Respiratory & Allergy", warehouse: "Main Dispensary", batch: "PC-2026-108", expiry: "2027-09-22", price: 285.00, stock: 44 },
  { sku: "PC-1009", name: "Omeprazole 20mg Capsules", generic: "Omeprazole", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-109", expiry: "2027-12-01", price: 16.00, stock: 190 },
  { sku: "PC-1010", name: "Ascorbic Acid + Zinc Capsules", generic: "Vitamin C + Zinc", category: "Vitamins & Supplements", warehouse: "Main Dispensary", batch: "PC-2026-110", expiry: "2028-07-19", price: 11.25, stock: 360 },
  { sku: "PC-1011", name: "Azithromycin 500mg Tablets", generic: "Azithromycin Dihydrate", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-111", expiry: "2027-02-14", price: 68.00, stock: 22 },
  { sku: "PC-1012", name: "Ibuprofen 400mg Softgels", generic: "Ibuprofen", category: "Pain & Fever", warehouse: "Main Dispensary", batch: "PC-2026-112", expiry: "2028-02-28", price: 12.00, stock: 275 },
  { sku: "PC-1013", name: "Amlodipine 5mg Tablets", generic: "Amlodipine Besylate", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-113", expiry: "2027-10-15", price: 10.50, stock: 340 },
  { sku: "PC-1014", name: "Cetirizine 10mg Tablets", generic: "Cetirizine Dihydrochloride", category: "Respiratory & Allergy", warehouse: "Main Dispensary", batch: "PC-2026-114", expiry: "2028-05-11", price: 9.50, stock: 290 },
  { sku: "PC-1015", name: "Tetanus Toxoid Vaccine 0.5mL", generic: "Tetanus Vaccine", category: "First Aid & Devices", warehouse: "Cold Chain Storage", batch: "CC-2026-205", expiry: "2027-01-25", price: 320.00, stock: 16 },
  { sku: "PC-1016", name: "Co-Amoxiclav 625mg Tablets", generic: "Amoxicillin + Clavulanate", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-116", expiry: "2027-07-08", price: 48.00, stock: 130 },
  { sku: "PC-1017", name: "Mefenamic Acid 500mg Capsules", generic: "Mefenamic Acid", category: "Pain & Fever", warehouse: "Main Dispensary", batch: "PC-2026-117", expiry: "2027-11-30", price: 11.00, stock: 260 },
  { sku: "PC-1018", name: "Loperamide 2mg Capsules", generic: "Loperamide HCl", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-118", expiry: "2028-06-14", price: 8.50, stock: 210 },
  { sku: "PC-1019", name: "Tobramycin + Dexamethasone Drops", generic: "Tobramycin / Dexamethasone", category: "Dermatology & Eye", warehouse: "Cold Chain Storage", batch: "CC-2026-209", expiry: "2027-03-10", price: 415.00, stock: 24 },
  { sku: "PC-1020", name: "Morphine Sulfate 10mg/mL Ampule", generic: "Morphine Sulfate", category: "Pain & Fever", warehouse: "Central Pharma Vault", batch: "CV-2026-301", expiry: "2027-09-01", price: 245.00, stock: 35 },
  { sku: "PC-1021", name: "Ciprofloxacin 500mg Tablets", generic: "Ciprofloxacin HCl", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-121", expiry: "2027-08-22", price: 24.00, stock: 145 },
  { sku: "PC-1022", name: "Montelukast 10mg Tablets", generic: "Montelukast Sodium", category: "Respiratory & Allergy", warehouse: "Main Dispensary", batch: "PC-2026-122", expiry: "2028-01-30", price: 26.50, stock: 165 },
  { sku: "PC-1023", name: "Clopidogrel 75mg Tablets", generic: "Clopidogrel Bisulfate", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-123", expiry: "2027-12-19", price: 29.00, stock: 150 },
  { sku: "PC-1024", name: "Gliclazide 60mg MR Tablets", generic: "Gliclazide", category: "Diabetes & Endocrine", warehouse: "Main Dispensary", batch: "PC-2026-124", expiry: "2027-10-04", price: 22.00, stock: 175 },
  { sku: "PC-1025", name: "Pantoprazole 40mg Tablets", generic: "Pantoprazole Sodium", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-125", expiry: "2028-03-12", price: 27.50, stock: 140 },
  { sku: "PC-1026", name: "Vitamin B-Complex Tablets", generic: "B1 + B6 + B12", category: "Vitamins & Supplements", warehouse: "Main Dispensary", batch: "PC-2026-126", expiry: "2028-08-09", price: 9.00, stock: 400 },
  { sku: "PC-1027", name: "Hydrocortisone 1% Cream 15g", generic: "Hydrocortisone", category: "Dermatology & Eye", warehouse: "Main Dispensary", batch: "PC-2026-127", expiry: "2027-07-17", price: 165.00, stock: 58 },
  { sku: "PC-1028", name: "Digital Thermometer Flexi-Tip", generic: "Medical Device", category: "First Aid & Devices", warehouse: "Main Dispensary", batch: "PC-2026-128", expiry: "2030-12-31", price: 195.00, stock: 42 },
  { sku: "PC-1029", name: "Diazepam 5mg Tablets", generic: "Diazepam", category: "Central Pharma Vault", warehouse: "Central Pharma Vault", batch: "CV-2026-302", expiry: "2027-05-20", price: 38.00, stock: 60 },
  { sku: "PC-1030", name: "Hepatitis B Vaccine 1mL Vial", generic: "rDNA Hepatitis B", category: "First Aid & Devices", warehouse: "Cold Chain Storage", batch: "CC-2026-212", expiry: "2027-02-05", price: 540.00, stock: 14 },
  { sku: "PC-1031", name: "Doxycycline 100mg Capsules", generic: "Doxycycline Hyclate", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-131", expiry: "2027-09-14", price: 19.00, stock: 120 },
  { sku: "PC-1032", name: "Celecoxib 200mg Capsules", generic: "Celecoxib", category: "Pain & Fever", warehouse: "Main Dispensary", batch: "PC-2026-132", expiry: "2027-11-08", price: 34.00, stock: 115 },
  { sku: "PC-1033", name: "Rosuvastatin 10mg Tablets", generic: "Rosuvastatin Calcium", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-133", expiry: "2028-02-16", price: 31.50, stock: 160 },
  { sku: "PC-1034", name: "Sitagliptin 50mg Tablets", generic: "Sitagliptin Phosphate", category: "Diabetes & Endocrine", warehouse: "Main Dispensary", batch: "PC-2026-134", expiry: "2027-12-27", price: 58.00, stock: 88 },
  { sku: "PC-1035", name: "Loratadine 10mg Tablets", generic: "Loratadine", category: "Respiratory & Allergy", warehouse: "Main Dispensary", batch: "PC-2026-135", expiry: "2028-04-21", price: 13.00, stock: 230 },
  { sku: "PC-1036", name: "Domperidone 10mg Tablets", generic: "Domperidone", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-136", expiry: "2027-08-30", price: 15.00, stock: 170 },
  { sku: "PC-1037", name: "Ferrous Sulfate + Folic Acid", generic: "Iron + Folic Acid", category: "Vitamins & Supplements", warehouse: "Main Dispensary", batch: "PC-2026-137", expiry: "2028-09-10", price: 7.50, stock: 450 },
  { sku: "PC-1038", name: "Mupirocin 2% Ointment 15g", generic: "Mupirocin", category: "Dermatology & Eye", warehouse: "Main Dispensary", batch: "PC-2026-138", expiry: "2027-06-18", price: 295.00, stock: 36 },
  { sku: "PC-1039", name: "Sterile Gauze Pads 4x4 (Box/100)", generic: "Surgical Dressing", category: "First Aid & Devices", warehouse: "Central Pharma Vault", batch: "CV-2026-305", expiry: "2029-11-30", price: 380.00, stock: 48 },
  { sku: "PC-1040", name: "Tramadol 50mg Capsules", generic: "Tramadol HCl", category: "Pain & Fever", warehouse: "Central Pharma Vault", batch: "CV-2026-306", expiry: "2027-07-29", price: 28.00, stock: 75 },
  { sku: "PC-1041", name: "Clindamycin 300mg Capsules", generic: "Clindamycin HCl", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-141", expiry: "2027-10-12", price: 36.00, stock: 105 },
  { sku: "PC-1042", name: "Naproxen Sodium 550mg Tablets", generic: "Naproxen", category: "Pain & Fever", warehouse: "Main Dispensary", batch: "PC-2026-142", expiry: "2028-01-19", price: 23.00, stock: 135 },
  { sku: "PC-1043", name: "Metoprolol 50mg Tablets", generic: "Metoprolol Tartrate", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-143", expiry: "2027-09-25", price: 11.50, stock: 220 },
  { sku: "PC-1044", name: "Levothyroxine 50mcg Tablets", generic: "Levothyroxine Sodium", category: "Diabetes & Endocrine", warehouse: "Main Dispensary", batch: "PC-2026-144", expiry: "2027-04-14", price: 14.00, stock: 195 },
  { sku: "PC-1045", name: "Budesonide 200mcg Nebules", generic: "Budesonide", category: "Respiratory & Allergy", warehouse: "Cold Chain Storage", batch: "CC-2026-218", expiry: "2027-03-28", price: 62.00, stock: 84 },
  { sku: "PC-1046", name: "Oral Rehydration Salts (Sachet)", generic: "ORS WHO Formula", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-146", expiry: "2028-10-01", price: 14.00, stock: 320 },
  { sku: "PC-1047", name: "Calcium Carbonate + Vit D3", generic: "Calcium + Cholecalciferol", category: "Vitamins & Supplements", warehouse: "Main Dispensary", batch: "PC-2026-147", expiry: "2028-06-22", price: 12.50, stock: 280 },
  { sku: "PC-1048", name: "Ketoconazole 2% Cream 15g", generic: "Ketoconazole", category: "Dermatology & Eye", warehouse: "Main Dispensary", batch: "PC-2026-148", expiry: "2027-08-11", price: 185.00, stock: 45 },
  { sku: "PC-1049", name: "Pulse Oximeter Fingertip OLED", generic: "Diagnostic Device", category: "First Aid & Devices", warehouse: "Central Pharma Vault", batch: "CV-2026-309", expiry: "2031-01-01", price: 650.00, stock: 29 },
  { sku: "PC-1050", name: "Erythropoietin 4000 IU Syringe", generic: "Epoetin Alfa", category: "Cardiovascular", warehouse: "Cold Chain Storage", batch: "CC-2026-220", expiry: "2027-01-12", price: 1250.00, stock: 12 },
  { sku: "PC-1051", name: "Metronidazole 500mg Tablets", generic: "Metronidazole", category: "Antibiotics", warehouse: "Main Dispensary", batch: "PC-2026-151", expiry: "2027-11-16", price: 12.00, stock: 205 },
  { sku: "PC-1052", name: "Tramadol + Paracetamol Tablets", generic: "Tramadol / Acetaminophen", category: "Pain & Fever", warehouse: "Central Pharma Vault", batch: "CV-2026-312", expiry: "2027-08-05", price: 35.00, stock: 90 },
  { sku: "PC-1053", name: "Telmisartan 40mg Tablets", generic: "Telmisartan", category: "Cardiovascular", warehouse: "Main Dispensary", batch: "PC-2026-153", expiry: "2028-02-09", price: 28.50, stock: 155 },
  { sku: "PC-1054", name: "Insulin Human Regular 10mL Vial", generic: "Human Insulin", category: "Diabetes & Endocrine", warehouse: "Cold Chain Storage", batch: "CC-2026-225", expiry: "2027-02-20", price: 780.00, stock: 20 },
  { sku: "PC-1055", name: "Carbocisteine 500mg Capsules", generic: "Carbocisteine", category: "Respiratory & Allergy", warehouse: "Main Dispensary", batch: "PC-2026-155", expiry: "2028-05-03", price: 13.50, stock: 250 },
  { sku: "PC-1056", name: "Aluminum + Magnesium Hydroxide", generic: "Antacid Suspension 120mL", category: "Gastrointestinal", warehouse: "Main Dispensary", batch: "PC-2026-156", expiry: "2027-09-18", price: 115.00, stock: 64 },
  { sku: "PC-1057", name: "Multivitamins + Minerals Syrup", generic: "Pediatric Multivitamins", category: "Vitamins & Supplements", warehouse: "Main Dispensary", batch: "PC-2026-157", expiry: "2027-12-14", price: 175.00, stock: 72 },
  { sku: "PC-1058", name: "Artificial Tears Lubricant Drops", generic: "Carboxymethylcellulose", category: "Dermatology & Eye", warehouse: "Main Dispensary", batch: "PC-2026-158", expiry: "2027-10-29", price: 240.00, stock: 51 },
  { sku: "PC-1059", name: "Povidone-Iodine 10% Solution 120mL", generic: "Povidone-Iodine", category: "First Aid & Devices", warehouse: "Main Dispensary", batch: "PC-2026-159", expiry: "2028-11-15", price: 135.00, stock: 88 },
  { sku: "PC-1060", name: "Fentanyl 50mcg/mL IV Ampule", generic: "Fentanyl Citrate", category: "Pain & Fever", warehouse: "Central Pharma Vault", batch: "CV-2026-315", expiry: "2027-06-01", price: 420.00, stock: 19 }
];

const DEFAULT_INVOICES = [
  { date: "2026-11-25", code: "INV-2026-0842", customer: "Elena Reyes (Rx #8812)", item: "Amoxicillin 500mg Capsules (x21)", total: 388.50, balance: 0.00, status: "PAID" },
  { date: "2026-11-24", code: "INV-2026-0841", customer: "Carlos Mendoza (PhilHealth)", item: "Insulin Glargine 100 IU/mL Pen (x2)", total: 1780.00, balance: 1780.00, status: "UNPAID" },
  { date: "2026-11-24", code: "INV-2026-0840", customer: "Sofia Villanueva", item: "Atorvastatin 20mg Tablets (x30)", total: 960.00, balance: 0.00, status: "PAID" },
  { date: "2026-11-23", code: "INV-2026-0839", customer: "Marco Antonio Cruz", item: "Salbutamol 100mcg Inhaler (x1)", total: 285.00, balance: 0.00, status: "PAID" },
  { date: "2026-11-22", code: "INV-2026-0838", customer: "St. Luke Outpatient HMO", item: "Cefuroxime Axetil 500mg Tablets (x14)", total: 756.00, balance: 756.00, status: "UNPAID" }
];

let products = [];
let invoices = [];

// Reference date aligned with portal header (Nov 25, 2026)
const CURRENT_REF_DATE = new Date("2026-11-25T00:00:00");

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTheme();
  initNavigation();
  refreshAll();
});

function loadState() {
  const savedProducts = localStorage.getItem(STORAGE_KEY);
  const savedInvoices = localStorage.getItem(INVOICES_KEY);

  products = savedProducts ? JSON.parse(savedProducts) : structuredClone(DEFAULT_PRODUCTS);
  invoices = savedInvoices ? JSON.parse(savedInvoices) : structuredClone(DEFAULT_INVOICES);
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}

function refreshAll() {
  updateKPIs();
  updateWarehouseCards();
  renderInventory();
  renderInvoices();
  populateModalSelects();
}

// ==========================================================================
// Helpers (Currency, Expiry, Stock Checks)
// ==========================================================================
function formatPHP(amount) {
  return "₱" + Number(amount).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function isExpiringSoon(expiryStr) {
  const expDate = new Date(expiryStr + "T00:00:00");
  const diffDays = (expDate - CURRENT_REF_DATE) / (1000 * 60 * 60 * 24);
  return diffDays <= 100; // Within ~3 months of Nov 2026
}

function isLowStock(qty) {
  return Number(qty) <= 25;
}

function showToast(message) {
  const toast = document.getElementById("toastMsg");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

// ==========================================================================
// KPI & Storage Zone Summaries
// ==========================================================================
function updateKPIs() {
  const totalSkus = products.length;
  const totalUnits = products.reduce((sum, p) => sum + Number(p.stock), 0);
  const totalValue = products.reduce((sum, p) => sum + Number(p.stock) * Number(p.price), 0);
  const alertsCount = products.filter(p => isLowStock(p.stock) || isExpiringSoon(p.expiry)).length;

  const unpaidBalance = invoices
    .filter(inv => inv.status === "UNPAID")
    .reduce((sum, inv) => sum + Number(inv.balance), 0);

  document.getElementById("kpiTotalSkus").textContent = totalSkus;
  document.getElementById("kpiTotalUnits").textContent = totalUnits.toLocaleString();
  document.getElementById("kpiTotalValue").textContent = formatPHP(totalValue);
  document.getElementById("kpiAlertsCount").textContent = alertsCount;
  document.getElementById("alertCountDot").textContent = alertsCount;
  document.getElementById("kpiReceivables").textContent = formatPHP(84520.50 + unpaidBalance - 2536.00);
}

function updateWarehouseCards() {
  const zones = [
    { name: "Main Dispensary", itemsId: "whMainItems", stockId: "whMainStock" },
    { name: "Cold Chain Storage", itemsId: "whColdItems", stockId: "whColdStock" },
    { name: "Central Pharma Vault", itemsId: "whVaultItems", stockId: "whVaultStock" }
  ];

  zones.forEach(z => {
    const matched = products.filter(p => p.warehouse === z.name);
    const units = matched.reduce((sum, p) => sum + Number(p.stock), 0);
    document.getElementById(z.itemsId).textContent = matched.length;
    document.getElementById(z.stockId).textContent = units.toLocaleString();
  });
}

// ==========================================================================
// Inventory Table Rendering & Filtering
// ==========================================================================
function renderInventory() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const catFilter = document.getElementById("categoryFilter").value;
  const whFilter = document.getElementById("warehouseFilter").value;
  const statusFilter = document.getElementById("stockStatusFilter").value;

  const filtered = products.filter(item => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.generic.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.batch.toLowerCase().includes(query);

    const matchesCat = catFilter === "ALL" || item.category === catFilter;
    const matchesWh = whFilter === "ALL" || item.warehouse === whFilter;

    let matchesStatus = true;
    if (statusFilter === "IN_STOCK") matchesStatus = !isLowStock(item.stock) && !isExpiringSoon(item.expiry);
    if (statusFilter === "LOW_STOCK") matchesStatus = isLowStock(item.stock);
    if (statusFilter === "EXPIRING") matchesStatus = isExpiringSoon(item.expiry);

    return matchesSearch && matchesCat && matchesWh && matchesStatus;
  });

  document.getElementById("visibleCount").textContent = filtered.length;
  const tbody = document.getElementById("inventoryTableBody");

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align:center; padding: 28px; color: var(--text-muted);">
          No medications match your active filters.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered
    .map(item => {
      const low = isLowStock(item.stock);
      const exp = isExpiringSoon(item.expiry);

      let badgeHtml = `<span class="status-badge badge-ok">In Stock</span>`;
      if (exp) {
        badgeHtml = `<span class="status-badge badge-exp">Expiring Soon</span>`;
      } else if (low) {
        badgeHtml = `<span class="status-badge badge-low">Low Stock</span>`;
      }

      return `
        <tr>
          <td><span class="sku-tag">${item.sku}</span></td>
          <td><strong>${item.name}</strong></td>
          <td>${item.generic}</td>
          <td>${item.category}</td>
          <td>${item.warehouse}</td>
          <td>
            <div>${item.batch}</div>
            <small style="color: ${exp ? "var(--red)" : "var(--text-muted)"};">Exp: ${item.expiry}</small>
          </td>
          <td><strong>${formatPHP(item.price)}</strong></td>
          <td><strong>${item.stock}</strong></td>
          <td>${badgeHtml}</td>
          <td>
            <div class="quick-act-group">
              <button class="tbl-btn add" title="Restock +10" onclick="quickAdjustStock('${item.sku}', 10)">+10</button>
              <button class="tbl-btn dispense" title="Dispense -1" onclick="quickAdjustStock('${item.sku}', -1)">-1</button>
              <button class="tbl-btn del" title="Remove SKU" onclick="deleteProduct('${item.sku}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    })
    .join("");
}

function filterByWarehouse(zoneName) {
  document.getElementById("warehouseFilter").value = zoneName;
  renderInventory();
  document.getElementById("inventorySection").scrollIntoView({ behavior: "smooth" });
  showToast(`Filtered storage zone: ${zoneName}`);
}

function filterByLowStock() {
  document.getElementById("stockStatusFilter").value = "LOW_STOCK";
  renderInventory();
  document.getElementById("inventorySection").scrollIntoView({ behavior: "smooth" });
  showToast("Showing low stock items (≤ 25 units)");
}

function filterByExpiring() {
  document.getElementById("stockStatusFilter").value = "EXPIRING";
  renderInventory();
  document.getElementById("inventorySection").scrollIntoView({ behavior: "smooth" });
  showToast("Showing medications expiring soon");
}

function resetFilters() {
  document.getElementById("searchInput").value = "";
  document.getElementById("categoryFilter").value = "ALL";
  document.getElementById("warehouseFilter").value = "ALL";
  document.getElementById("stockStatusFilter").value = "ALL";
  renderInventory();
  showToast("All inventory filters cleared");
}

// ==========================================================================
// Quick Stock Actions & CRUD
// ==========================================================================
function quickAdjustStock(sku, delta) {
  const item = products.find(p => p.sku === sku);
  if (!item) return;

  if (item.stock + delta < 0) {
    showToast(`Insufficient stock for ${item.name}`);
    return;
  }

  item.stock += delta;
  saveState();
  refreshAll();
  showToast(`${delta > 0 ? "Added" : "Dispensed"} ${Math.abs(delta)} unit(s) — ${item.name}`);
}

function deleteProduct(sku) {
  const item = products.find(p => p.sku === sku);
  if (!item) return;
  if (!confirm(`Remove "${item.name}" (${sku}) from catalog?`)) return;

  products = products.filter(p => p.sku !== sku);
  saveState();
  refreshAll();
  showToast(`Removed ${item.name} from inventory`);
}

function handleAddProduct(event) {
  event.preventDefault();

  const nextNum = 1001 + products.length + Math.floor(Math.random() * 50);
  const newItem = {
    sku: `PC-${nextNum}`,
    name: document.getElementById("newProdName").value.trim(),
    generic: document.getElementById("newProdGeneric").value.trim(),
    category: document.getElementById("newProdCategory").value,
    warehouse: document.getElementById("newProdWarehouse").value,
    batch: document.getElementById("newProdBatch").value.trim(),
    expiry: document.getElementById("newProdExpiry").value,
    price: parseFloat(document.getElementById("newProdPrice").value),
    stock: parseInt(document.getElementById("newProdStock").value, 10)
  };

  products.unshift(newItem);
  saveState();
  refreshAll();
  event.target.reset();
  closeModal("addProductModal");
  showToast(`Added ${newItem.name} (${newItem.sku}) to catalog`);
}

// ==========================================================================
// Dispensing (Sales) & Restocking (Purchases)
// ==========================================================================
function populateModalSelects() {
  const saleSelect = document.getElementById("saleProductSelect");
  const purchaseSelect = document.getElementById("purchaseProductSelect");

  const optionsHtml = products
    .map(p => `<option value="${p.sku}">${p.name} — ${formatPHP(p.price)} (${p.stock} in stock)</option>`)
    .join("");

  saleSelect.innerHTML = optionsHtml;
  purchaseSelect.innerHTML = optionsHtml;
}

function handleSaleSubmit(event) {
  event.preventDefault();

  const customer = document.getElementById("saleCustomer").value.trim();
  const sku = document.getElementById("saleProductSelect").value;
  const qty = parseInt(document.getElementById("saleQty").value, 10);
  const status = document.getElementById("salePaymentStatus").value;

  const product = products.find(p => p.sku === sku);
  if (!product) return;

  if (qty > product.stock) {
    showToast(`Only ${product.stock} units available for ${product.name}`);
    return;
  }

  product.stock -= qty;
  const grandTotal = product.price * qty;
  const balance = status === "PAID" ? 0 : grandTotal;
  const invCode = `INV-2026-0${Math.floor(843 + Math.random() * 150)}`;

  invoices.unshift({
    date: "2026-11-25",
    code: invCode,
    customer,
    item: `${product.name} (x${qty})`,
    total: grandTotal,
    balance,
    status
  });

  const completedEl = document.getElementById("kpiCompletedSales");
  completedEl.textContent = parseInt(completedEl.textContent, 10) + 1;

  saveState();
  refreshAll();
  event.target.reset();
  closeModal("saleModal");
  showToast(`Dispensed ${qty}x ${product.name} (${invCode})`);
}

function handlePurchaseSubmit(event) {
  event.preventDefault();

  const supplier = document.getElementById("purchaseSupplier").value.trim();
  const sku = document.getElementById("purchaseProductSelect").value;
  const qty = parseInt(document.getElementById("purchaseQty").value, 10);
  const newBatch = document.getElementById("purchaseBatch").value.trim();

  const product = products.find(p => p.sku === sku);
  if (!product) return;

  product.stock += qty;
  if (newBatch) product.batch = newBatch;

  saveState();
  refreshAll();
  closeModal("purchaseModal");
  showToast(`Restocked +${qty} units of ${product.name} from ${supplier}`);
}

function renderInvoices() {
  const tbody = document.getElementById("invoicesTableBody");
  tbody.innerHTML = invoices
    .map(inv => {
      const badgeClass = inv.status === "PAID" ? "badge-ok" : "badge-unpaid";
      return `
        <tr>
          <td>${inv.date}</td>
          <td><span class="sku-tag">${inv.code}</span></td>
          <td><strong>${inv.customer}</strong></td>
          <td>${inv.item}</td>
          <td><strong>${formatPHP(inv.total)}</strong></td>
          <td>${formatPHP(inv.balance)}</td>
          <td><span class="status-badge ${badgeClass}">${inv.status}</span></td>
        </tr>
      `;
    })
    .join("");
}

// ==========================================================================
// CSV Export & Demo Reset
// ==========================================================================
function exportInventoryCSV() {
  const headers = ["SKU", "Product Name", "Generic Ingredient", "Category", "Storage Zone", "Batch", "Expiry Date", "Unit Price (PHP)", "Stock Qty"];
  const rows = products.map(p => [
    p.sku,
    `"${p.name.replace(/"/g, '""')}"`,
    `"${p.generic.replace(/"/g, '""')}"`,
    `"${p.category}"`,
    `"${p.warehouse}"`,
    p.batch,
    p.expiry,
    p.price.toFixed(2),
    p.stock
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "PharmaCare_Inventory_2026.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast("Exported PharmaCare_Inventory_2026.csv");
}

function resetDemoData() {
  if (!confirm("Reset all inventory stock and invoices back to the default 60-item demo catalog?")) return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(INVOICES_KEY);
  loadState();
  refreshAll();
  showToast("Demo stock and invoices restored");
}

// ==========================================================================
// Modals, Sidebar Navigation & Dark Mode
// ==========================================================================
function openModal(modalId) {
  populateModalSelects();
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

window.addEventListener("click", event => {
  if (event.target.classList.contains("modal-backdrop")) {
    event.target.classList.remove("open");
  }
});

function initNavigation() {
  const appLayout = document.getElementById("appLayout");
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("toggleSidebarBtn");
  const mobileBtn = document.getElementById("mobileMenuBtn");

  toggleBtn.addEventListener("click", () => {
    appLayout.classList.toggle("sidebar-collapsed");
  });

  mobileBtn.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-open");
  });

  document.querySelectorAll(".nav-item[data-section]").forEach(link => {
    link.addEventListener("click", e => {
      if (link.hasAttribute("onclick")) return;
      e.preventDefault();

      document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
      link.classList.add("active");
      sidebar.classList.remove("mobile-open");

      const targetId = link.getAttribute("data-section");
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function initTheme() {
  if (localStorage.getItem(THEME_KEY) === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeIcon").className = "fa-regular fa-sun";
  }
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem(THEME_KEY, isDark);
  document.getElementById("darkModeIcon").className = isDark
    ? "fa-regular fa-sun"
    : "fa-regular fa-moon";
}