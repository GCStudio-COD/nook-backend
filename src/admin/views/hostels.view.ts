import { renderAdminLayout } from '../admin-layout.template';

export function getHostelsViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Action & Navigation Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-bold text-[#2D3748]">Multi-Hostel Campus Directory</h2>
          <p class="text-xs text-[#718096] mt-0.5">Configure campus branches, building floor capacities, common facilities, and campus-wide occupancy.</p>
        </div>
        <button onclick="openAddHostelModal()" class="px-4 py-2.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2 self-start sm:self-auto active:scale-95">
          <i data-lucide="building-2" class="w-4 h-4"></i>
          <span>+ Add New Campus</span>
        </button>
      </div>

      <!-- Hostel Overview Metric Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4" id="hostels-summary-stats">
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Hostels</span>
          <p class="text-2xl font-bold text-[#2D3748] mt-0.5" id="total-hostels-count">0</p>
          <span class="text-[11px] text-[#718096]">Operational Campuses</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Rooms</span>
          <p class="text-2xl font-bold text-[#2D3748] mt-0.5" id="total-hostels-rooms">0</p>
          <span class="text-[11px] text-[#718096]">Across All Campuses</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Bed Capacity</span>
          <p class="text-2xl font-bold text-[#319795] mt-0.5" id="total-hostels-capacity">0</p>
          <span class="text-[11px] text-[#718096]">Resident Beds</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Avg Occupancy</span>
          <p class="text-2xl font-bold text-emerald-600 mt-0.5" id="total-hostels-occupancy">0%</p>
          <span class="text-[11px] text-emerald-600 font-semibold" id="total-hostels-vacant">0 Vacant Beds</span>
        </div>
      </div>

      <!-- Campus Search & Filter Strip -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 purity-card p-4">
        <div class="relative w-full sm:w-72">
          <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input type="text" id="hostel-search-input" oninput="renderHostelsGrid()" placeholder="Search campus name, code, address..." class="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none font-medium">
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-500 font-medium">
          <span id="hostels-count-pill">2 Campuses Active</span>
        </div>
      </div>

      <!-- Hostels Cards Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6" id="hostels-grid">
        <!-- Dynamically populated -->
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: ADD / EDIT HOSTEL CAMPUS                                          -->
    <!-- ========================================================================= -->
    <div id="hostel-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="building-2" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">CAMPUS ARCHITECTURE</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="hostel-modal-title">Hostel Campus Specifications</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('hostel-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="hostel-form" onsubmit="saveHostel(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="h-id">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Campus Name *</label>
                <input type="text" id="h-name" required placeholder="e.g. Saltmere Bay Campus" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Campus Code *</label>
                <input type="text" id="h-code" required placeholder="e.g. SALT-02" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none uppercase">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">City *</label>
                <input type="text" id="h-city" required value="Mumbai" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Total Building Floors *</label>
                <input type="number" id="h-floors" required min="1" max="20" value="3" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-semibold">Complete Campus Address *</label>
              <input type="text" id="h-address" required placeholder="Street address, landmark, pin code..." class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-semibold">Campus Description &amp; Highlights</label>
              <textarea id="h-desc" rows="2" placeholder="Highlights, surrounding security, mess facilities..." class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"></textarea>
            </div>

            <!-- Common Campus Facilities Checkbox Matrix -->
            <div>
              <label class="block text-slate-600 mb-2 font-semibold">Common Campus Facilities &amp; Amenities</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2" id="hostel-facilities-options">
                ${[
                  'Gigabit Wi-Fi 6',
                  'Nutritious Cafeteria & Mess',
                  'Modern Gymnasium',
                  '24/7 Power Backup',
                  'Silent Study Pods & Library',
                  'CCTV & Biometric Facial Security',
                  'Automatic Laundry',
                  'UV + RO Mineral Water',
                  'Indoor Recreation Lounge',
                  'Solar Water Heaters',
                  'Medical Room & First Aid',
                  'Visitor Parking',
                ]
                  .map(
                    (fac) => `
                  <label class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:bg-teal-50/40 hover:border-teal-200 transition-all cursor-pointer text-[11px] font-medium text-slate-700 select-none">
                    <input type="checkbox" name="h-fac" value="${fac}" class="rounded text-teal-600 focus:ring-teal-500">
                    <span class="truncate">${fac}</span>
                  </label>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('hostel-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-save-hostel" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save Campus</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let hostelsList = [];

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const res = await fetch('/api/hostels').then(r => r.json());
          hostelsList = Array.isArray(res) ? res : [];

          renderSummaryStats();
          renderHostelsGrid();
        } catch (err) {
          console.error('Error fetching hostels:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function renderSummaryStats() {
        const total = hostelsList.length;
        const totalRooms = hostelsList.reduce((acc, h) => acc + (h.totalRooms || 0), 0);
        const totalCapacity = hostelsList.reduce((acc, h) => acc + (h.totalCapacity || 0), 0);
        const occupiedBeds = hostelsList.reduce((acc, h) => acc + (h.occupiedBeds || 0), 0);
        const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
        const avgOccupancy = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

        document.getElementById('total-hostels-count').innerText = total;
        document.getElementById('total-hostels-rooms').innerText = totalRooms;
        document.getElementById('total-hostels-capacity').innerText = totalCapacity;
        document.getElementById('total-hostels-occupancy').innerText = avgOccupancy + '%';
        document.getElementById('total-hostels-vacant').innerText = vacantBeds + ' Vacant Beds';

        const countPill = document.getElementById('hostels-count-pill');
        if (countPill) countPill.innerText = \`\${total} Campuses Active (\${totalRooms} Rooms, \${totalCapacity} Beds)\`;
      }

      function renderHostelsGrid() {
        const container = document.getElementById('hostels-grid');
        if (!container) return;

        const q = (document.getElementById('hostel-search-input')?.value || '').trim().toLowerCase();
        const filtered = hostelsList.filter(h => {
          if (q) {
            const nameMatch = (h.name || '').toLowerCase().includes(q);
            const codeMatch = (h.code || '').toLowerCase().includes(q);
            const addrMatch = (h.address || '').toLowerCase().includes(q);
            if (!nameMatch && !codeMatch && !addrMatch) return false;
          }
          return true;
        });

        if (filtered.length === 0) {
          container.innerHTML = '<div class="col-span-2 purity-card p-12 text-center text-[#A0AEC0] italic bg-slate-50/50">No campuses matched your search.</div>';
          return;
        }

        container.innerHTML = filtered.map(h => {
          const facs = h.facilities || [];
          return \`
            <div class="purity-card p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-200 border border-slate-200/80">
              <div>
                <!-- Header with Code & Action menu -->
                <div class="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#4FD1C5]/15 text-[#319795] uppercase tracking-wider">\${h.code}</span>
                      <span class="text-xs text-[#A0AEC0]">\${h.city} &bull; \${h.totalFloors} Floors</span>
                    </div>
                    <h3 class="text-lg font-bold text-[#2D3748] mt-1">\${h.name}</h3>
                    <p class="text-xs text-[#718096] line-clamp-1 mt-0.5">\${h.address}</p>
                  </div>
                  <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="openEditHostelModal('\${h.id}')" title="Edit Campus Specs" class="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200/60">
                      <i data-lucide="edit-3" class="w-4 h-4"></i>
                    </button>
                    <button onclick="deleteHostel('\${h.id}', '\${h.name}')" title="Remove Campus" class="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer border border-rose-100">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>

                <!-- 4 Mini Metric Pills for this Hostel -->
                <div class="grid grid-cols-4 gap-2 p-3 rounded-2xl bg-slate-50/80 border border-slate-100 my-4 text-center">
                  <div>
                    <span class="text-[9px] font-bold text-[#A0AEC0] uppercase block">Rooms</span>
                    <p class="text-sm font-bold text-[#2D3748] mt-0.5">\${h.totalRooms || 0}</p>
                  </div>
                  <div>
                    <span class="text-[9px] font-bold text-[#A0AEC0] uppercase block">Beds</span>
                    <p class="text-sm font-bold text-[#2D3748] mt-0.5">\${h.totalCapacity || 0}</p>
                  </div>
                  <div>
                    <span class="text-[9px] font-bold text-[#A0AEC0] uppercase block">Occupied</span>
                    <p class="text-sm font-bold text-[#319795] mt-0.5">\${h.occupiedBeds || 0}</p>
                  </div>
                  <div>
                    <span class="text-[9px] font-bold text-[#A0AEC0] uppercase block">Vacant</span>
                    <p class="text-sm font-bold text-emerald-600 mt-0.5">\${h.vacantBeds || 0}</p>
                  </div>
                </div>

                <!-- Occupancy Progress Bar -->
                <div class="space-y-1 mb-4">
                  <div class="flex justify-between text-[11px] font-semibold">
                    <span class="text-[#718096]">Campus Occupancy</span>
                    <span class="\${h.occupancyRate >= 80 ? 'text-emerald-600' : 'text-[#319795]'}">\${h.occupancyRate || 0}%</span>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="h-full teal-gradient rounded-full" style="width: \${h.occupancyRate || 0}%"></div>
                  </div>
                </div>

                <!-- Common Hostel Facilities Tags -->
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0]">Common Facilities (\${facs.length})</span>
                    <button onclick="openEditHostelModal('\${h.id}')" class="text-[10px] text-[#319795] font-bold hover:underline cursor-pointer">Configure</button>
                  </div>
                  <div class="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                    \${facs.length === 0 ? '<span class="text-[11px] text-[#A0AEC0] italic">No facilities added yet.</span>' : facs.map(f => \`
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-[#4A5568] text-[10px] font-medium">
                        <i data-lucide="check" class="w-3 h-3 text-[#319795]"></i>
                        <span>\${f}</span>
                      </span>
                    \`).join('')}
                  </div>
                </div>
              </div>

              <!-- Quick Links: 2D Floorplan & Room List -->
              <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <a href="/admin/floorplan?hostelId=\${h.id}" class="flex-1 py-2 px-3 rounded-xl teal-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 transition-opacity text-center no-underline flex items-center justify-center gap-1.5">
                  <i data-lucide="map" class="w-3.5 h-3.5"></i>
                  <span>2D Blueprint</span>
                </a>
                <a href="/admin/rooms?hostelId=\${h.id}" class="py-2 px-4 rounded-xl bg-white border border-slate-200 text-[#2D3748] hover:bg-slate-50 text-xs font-bold transition-colors text-center no-underline flex items-center gap-1.5 shadow-2xs">
                  <i data-lucide="bed-double" class="w-3.5 h-3.5 text-[#718096]"></i>
                  <span>Rooms (\${h.totalRooms || 0})</span>
                </a>
              </div>
            </div>
          \`;
        }).join('');

        lucide.createIcons();
      }

      function openAddHostelModal() {
        document.getElementById('hostel-modal-title').innerText = 'Add New Hostel Campus';
        document.getElementById('h-id').value = '';
        document.getElementById('hostel-form').reset();
        document.querySelectorAll('input[name="h-fac"]').forEach(cb => cb.checked = false);
        openModal('hostel-modal');
        lucide.createIcons();
      }

      function openEditHostelModal(hostelId) {
        const h = hostelsList.find(x => x.id === hostelId);
        if (!h) return;

        document.getElementById('hostel-modal-title').innerText = 'Edit ' + h.name;
        document.getElementById('h-id').value = h.id;
        document.getElementById('h-name').value = h.name;
        document.getElementById('h-code').value = h.code;
        document.getElementById('h-city').value = h.city || 'Mumbai';
        document.getElementById('h-floors').value = h.totalFloors || 3;
        document.getElementById('h-address').value = h.address || '';
        document.getElementById('h-desc').value = h.description || '';

        const currentFacs = h.facilities || [];
        document.querySelectorAll('input[name="h-fac"]').forEach(cb => {
          cb.checked = currentFacs.includes(cb.value);
        });

        openModal('hostel-modal');
        lucide.createIcons();
      }

      async function saveHostel(e) {
        e.preventDefault();
        const id = document.getElementById('h-id').value;
        const selectedFacilities = Array.from(document.querySelectorAll('input[name="h-fac"]:checked')).map(el => el.value);

        const payload = {
          name: document.getElementById('h-name').value,
          code: document.getElementById('h-code').value.toUpperCase(),
          city: document.getElementById('h-city').value,
          totalFloors: Number(document.getElementById('h-floors').value),
          address: document.getElementById('h-address').value,
          description: document.getElementById('h-desc').value,
          facilities: selectedFacilities
        };

        const btn = document.getElementById('btn-save-hostel');
        btn.disabled = true;

        try {
          const url = id ? '/api/hostels/' + id : '/api/hostels';
          const method = id ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Failed to save campus');

          showToast(id ? 'Campus details updated' : 'New campus branch created');
          closeModal('hostel-modal');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      async function deleteHostel(id, name) {
        if (!confirm(\`Are you sure you want to remove "\${name}"? This will delete all rooms and floorplans in this hostel!\`)) return;

        try {
          const res = await fetch('/api/hostels/' + id, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          showToast('Campus removed');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'hostels',
    pageTitle: 'Hostel Campuses & Branches',
    breadcrumb: 'Hostels',
    contentHtml,
    extraScripts,
  });
}
