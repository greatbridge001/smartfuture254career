// ===== UNIVERSITIES DATA =====
const UNIVERSITIES = [
 // PUBLIC
 { name: "University of Nairobi", county: "Nairobi", type: "public" },
 { name: "Kenyatta University", county: "Kiambu", type: "public" },
 { name: "Moi University", county: "Uasin Gishu", type: "public" },
 { name: "Egerton University", county: "Nakuru", type: "public" },
 { name: "Jomo Kenyatta University of Agriculture and Technology", county: "Kiambu", type: "public" },
 { name: "Maseno University", county: "Kisumu", type: "public" },
 { name: "Masinde Muliro University of Science and Technology", county: "Kakamega", type: "public" },
 { name: "Technical University of Kenya", county: "Nairobi", type: "public" },
 { name: "Technical University of Mombasa", county: "Mombasa", type: "public" },
 { name: "Pwani University", county: "Kilifi", type: "public" },
 { name: "Chuka University", county: "Tharaka-Nithi", type: "public" },
 { name: "Laikipia University", county: "Laikipia", type: "public" },
 { name: "South Eastern Kenya University", county: "Kitui", type: "public" },
 { name: "Meru University of Science and Technology", county: "Meru", type: "public" },
 { name: "Multimedia University of Kenya", county: "Nairobi", type: "public" },
 { name: "Dedan Kimathi University of Technology", county: "Nyeri", type: "public" },
 { name: "Kisii University", county: "Kisii", type: "public" },
 { name: "University of Eldoret", county: "Uasin Gishu", type: "public" },
 // PRIVATE
 { name: "Strathmore University", county: "Nairobi", type: "private" },
 { name: "United States International University Africa (USIU)", county: "Nairobi", type: "private" },
 { name: "Daystar University", county: "Machakos", type: "private" },
 { name: "Mount Kenya University", county: "Kiambu", type: "private" },
 { name: "Catholic University of Eastern Africa (CUEA)", county: "Nairobi", type: "private" },
 { name: "Africa Nazarene University", county: "Kajiado", type: "private" },
 { name: "Kenya Methodist University (KeMU)", county: "Meru", type: "private" },
 { name: "Kabarak University", county: "Nakuru", type: "private" },
 { name: "Zetech University", county: "Kiambu", type: "private" },
 { name: "Riara University", county: "Nairobi", type: "private" },
];

// ===== RENDER UNIVERSITIES =====
function renderUniversities(filter = { type: "all", search: "", county: "all" }) {
 const container = document.getElementById('uniList');
 if (!container) return;

 let filtered = UNIVERSITIES.filter(u => {
 const matchType = filter.type === "all" || u.type === filter.type;
 const matchSearch = !filter.search || u.name.toLowerCase().includes(filter.search.toLowerCase()) || u.county.toLowerCase().includes(filter.search.toLowerCase());
 const matchCounty = filter.county === "all" || u.county === filter.county;
 return matchType && matchSearch && matchCounty;
 });

 if (filtered.length === 0) {
 container.innerHTML = `<div style="padding:32px;text-align:center;color:var(--gray);">No universities found for your search.</div>`;
 return;
 }

 container.innerHTML = filtered.map(u => `
 <div class="uni-card">
 <div class="uni-icon">${u.name.charAt(0)}</div>
 <div style="flex:1">
 <div class="uni-name">${u.name}</div>
 <div class="uni-county">${u.county} County</div>
 </div>
 <span class="uni-type-badge ${u.type === 'public' ? 'badge-public' : 'badge-private'}">
 ${u.type === 'public' ? 'Public' : 'Private'}
 </span>
 </div>
 `).join('');
}

// ===== POPULATE COUNTY FILTER =====
function populateCountyFilter() {
 const select = document.getElementById('countyFilter');
 if (!select) return;
 const counties = [...new Set(UNIVERSITIES.map(u => u.county))].sort();
 counties.forEach(c => {
 const opt = document.createElement('option');
 opt.value = c;
 opt.textContent = `${c} County`;
 select.appendChild(opt);
 });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
 populateCountyFilter();
 renderUniversities();

 let activeType = "all";

 // Tab clicks
 document.querySelectorAll('.uni-tab').forEach(tab => {
 tab.addEventListener('click', () => {
 document.querySelectorAll('.uni-tab').forEach(t => t.classList.remove('active'));
 tab.classList.add('active');
 activeType = tab.dataset.type;
 applyFilters();
 });
 });

 function applyFilters() {
 renderUniversities({
 type: activeType,
 search: document.getElementById('uniSearch')?.value || '',
 county: document.getElementById('countyFilter')?.value || 'all'
 });
 }

 document.getElementById('uniSearch')?.addEventListener('input', applyFilters);
 document.getElementById('countyFilter')?.addEventListener('change', applyFilters);
});