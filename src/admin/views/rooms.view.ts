import { renderAdminLayout } from '../admin-layout.template';

export function getRoomsViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Action & Navigation Strip -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-bold text-[#2D3748]">Rooms &amp; Inventory Management</h2>
          <p class="text-xs text-[#718096] mt-0.5">Control room types, bed capacities, individual room facilities, and campus allocations.</p>
        </div>
        <div class="flex items-center gap-2 self-start sm:self-auto">
          <a href="/admin/floorplan" class="px-4 py-2 rounded-xl bg-white border border-gray-200 text-[#2D3748] hover:bg-gray-50 text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5 no-underline">
            <i data-lucide="map" class="w-4 h-4 text-[#319795]"></i>
            <span>2D Blueprint</span>
          </a>
          <button onclick="openAssignModalFromRooms()" class="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs hover:bg-teal-100 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
            <i data-lucide="user-plus" class="w-4 h-4"></i>
            <span>Assign Resident</span>
          </button>
          <button onclick="openAddRoomModal()" class="px-4 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-1.5 active:scale-95">
            <i data-lucide="plus" class="w-4 h-4"></i>
            <span>Add Room</span>
          </button>
        </div>
      </div>

      <!-- Top 4 Inventory Indicators -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Rooms</span>
          <p class="text-2xl font-bold text-[#2D3748] mt-0.5" id="room-stat-total">0</p>
          <span class="text-[11px] text-[#718096]">Hostel capacity</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Occupancy Rate</span>
          <p class="text-2xl font-bold text-emerald-600 mt-0.5" id="room-stat-rate">0%</p>
          <span class="text-[11px] text-[#718096]" id="room-stat-occupied">0 / 0 beds</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Vacant Beds</span>
          <p class="text-2xl font-bold text-[#4FD1C5] mt-0.5" id="room-stat-vacant">0 Beds</p>
          <span class="text-[11px] text-emerald-600 font-semibold">Available now</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Under Maintenance</span>
          <p class="text-2xl font-bold text-amber-500 mt-0.5" id="room-stat-maint">0 Rooms</p>
          <span class="text-[11px] text-[#718096]">Service in progress</span>
        </div>
      </div>

      <!-- Main Room Grid Card -->
      <div class="purity-card p-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-base font-bold text-[#2D3748]">Room Directory &amp; Bed Allocations</h3>
            <p class="text-xs text-[#718096]">Search, filter, and modify room amenities, rates, and occupancy.</p>
          </div>

          <!-- Multi-Level Filter Controls -->
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Search -->
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="rooms-search-input" oninput="renderRooms()" placeholder="Search room, resident..." class="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none w-44 font-medium">
            </div>

            <!-- Hostel Filter -->
            <select id="hostel-filter" onchange="fetchModuleData()" class="p-2 rounded-xl border border-gray-200 text-xs bg-white font-medium cursor-pointer">
              <option value="ALL">All Hostels</option>
            </select>

            <!-- Floor selector -->
            <select id="floor-filter" onchange="renderRooms()" class="p-2 rounded-xl border border-gray-200 text-xs bg-white font-medium cursor-pointer">
              <option value="ALL">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
              <option value="4">Floor 4</option>
            </select>

            <!-- Room type selector -->
            <select id="type-filter" onchange="renderRooms()" class="p-2 rounded-xl border border-gray-200 text-xs bg-white font-medium cursor-pointer">
              <option value="ALL">All Room Types</option>
              <option value="SINGLE">Single</option>
              <option value="DORMITORY">Dormitory</option>
              <option value="DELUXE">Deluxe</option>
              <option value="DELUXE_AC">Deluxe AC</option>
              <option value="SUPER_DELUXE_AC">Super Deluxe AC</option>
              <option value="NORMAL_NON_AC">Normal Non-AC</option>
            </select>

            <!-- Vacant only checkbox -->
            <label class="flex items-center gap-1.5 p-2 rounded-xl border border-gray-200 text-xs text-[#718096] bg-white cursor-pointer select-none">
              <input type="checkbox" id="vacant-only" onchange="renderRooms()" class="rounded text-[#4FD1C5]">
              <span>Vacant Only</span>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="rooms-grid">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: ADD / EDIT ROOM                                                    -->
    <!-- ========================================================================= -->
    <div id="room-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-2xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shadow-slate-900/10 shrink-0">
              <i data-lucide="bed-double" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">INVENTORY CONTROL</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="room-modal-title">Room Specifications</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('room-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="room-form" onsubmit="saveRoom(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="rm-id">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Campus Hostel <span class="text-rose-500">*</span></label>
                <select id="rm-hostel-id" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <!-- Hostels loaded dynamically -->
                </select>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Number <span class="text-rose-500">*</span></label>
                <input type="text" id="rm-number" required placeholder="e.g. S-204" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none uppercase">
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Floor <span class="text-rose-500">*</span></label>
                <input type="number" id="rm-floor" required min="1" max="20" value="1" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Wing</label>
                <select id="rm-wing" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="East">East Wing</option>
                  <option value="West">West Wing</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Type <span class="text-rose-500">*</span></label>
                <select id="rm-type" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="SINGLE">Single</option>
                  <option value="DORMITORY">Dormitory</option>
                  <option value="DELUXE">Deluxe</option>
                  <option value="DELUXE_AC">Deluxe AC</option>
                  <option value="SUPER_DELUXE_AC">Super Deluxe AC</option>
                  <option value="NORMAL_NON_AC">Normal Non-AC</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Bed Capacity <span class="text-rose-500">*</span></label>
                <input type="number" id="rm-capacity" required min="1" max="16" value="1" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Monthly Rent <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="rm-rent" required min="500" value="8500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Status <span class="text-rose-500">*</span></label>
                <select id="rm-status" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="AVAILABLE">Available</option>
                  <option value="FULL">Full</option>
                  <option value="UNDER_MAINTENANCE">Maintenance</option>
                </select>
              </div>
            </div>

            <!-- Room Facilities Checkboxes -->
            <div>
              <label class="block text-slate-600 text-xs mb-2 font-semibold">Room Amenities &amp; Facilities</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
                ${[
                  'Air Conditioner',
                  'Attached Bath',
                  'Geyser / Hot Water',
                  'Custom Study Desk',
                  'Personal Locker / Wardrobe',
                  'High-Speed Wi-Fi',
                  'Smart TV',
                  'Mini Refrigerator',
                  'Ceiling Fan',
                  'Daily Housekeeping',
                ]
                  .map(
                    (am) => `
                  <label class="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:bg-teal-50/40 hover:border-teal-200 transition-all cursor-pointer text-[11px] font-medium text-slate-700 select-none">
                    <input type="checkbox" name="rm-amenity" value="${am}" class="rounded text-teal-600 focus:ring-teal-500">
                    <span class="truncate">${am}</span>
                  </label>
                `,
                  )
                  .join('')}
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('room-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-save-room" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save Room</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: ASSIGN STUDENT TO BED (ACCESSIBLE DIRECTLY FROM ROOMS PAGE)       -->
    <!-- ========================================================================= -->
    <div id="rooms-assign-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl teal-gradient text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="user-plus" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">BED ALLOCATION</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight">Assign Resident to Bed</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('rooms-assign-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="rooms-assign-form" onsubmit="submitBedAssignment(event)" class="flex flex-col flex-1 overflow-hidden">
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs">
            <!-- Room & Bed Selection -->
            <div class="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 space-y-3">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Target Room *</label>
                  <select id="ra-room-select" required onchange="onRaRoomChange()" class="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-800 text-xs font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                    <!-- Populated dynamically -->
                  </select>
                </div>
                <div>
                  <label class="block text-slate-700 font-semibold mb-1">Designated Bed Slot *</label>
                  <select id="ra-bed-select" required class="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-800 text-xs font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                    <!-- Populated dynamically -->
                  </select>
                </div>
              </div>
            </div>

            <!-- Student Selection Options -->
            <div>
              <label class="block text-slate-700 font-semibold mb-1">Select Registered Applicant or Walk-In</label>
              <select id="ra-applicant-select" onchange="onRaApplicantChange()" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <!-- Populated dynamically -->
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Resident Full Name *</label>
                <input type="text" id="ra-name" required placeholder="e.g. Aarav Sharma" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Contact Phone *</label>
                <input type="tel" id="ra-phone" required placeholder="+91 98765 00000" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Monthly Rent *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="ra-rent" required min="500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Security Deposit *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="ra-deposit" required min="0" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Check-In Date *</label>
                <input type="date" id="ra-checkin" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Tenure</label>
                <select id="ra-tenure" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6" selected>6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('rooms-assign-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-ra" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirm Bed Allocation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let roomsData = [];
      let hostelsList = [];
      let admissionsList = [];

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const selectedHostel = document.getElementById('hostel-filter').value;
          const [roomsRes, statsRes, hostelsRes, admRes] = await Promise.all([
            fetch('/api/rooms' + (selectedHostel !== 'ALL' ? '?hostelId=' + selectedHostel : '')).then(r => r.json()),
            fetch('/api/rooms/stats' + (selectedHostel !== 'ALL' ? '?hostelId=' + selectedHostel : '')).then(r => r.json()),
            fetch('/api/hostels').then(r => r.json()),
            fetch('/api/admissions').then(r => r.json()).catch(() => [])
          ]);

          roomsData = Array.isArray(roomsRes) ? roomsRes : [];
          hostelsList = Array.isArray(hostelsRes) ? hostelsRes : [];
          admissionsList = Array.isArray(admRes) ? admRes : [];

          // Populate hostel filter dropdown
          const hFilter = document.getElementById('hostel-filter');
          const currentVal = hFilter.value;
          let hOptions = '<option value="ALL">All Hostels</option>';
          hostelsList.forEach(h => {
            hOptions += \`<option value="\${h.id}" \${currentVal === h.id ? 'selected' : ''}>\${h.name}</option>\`;
          });
          hFilter.innerHTML = hOptions;

          // Populate modal hostel select
          const mHostel = document.getElementById('rm-hostel-id');
          mHostel.innerHTML = hostelsList.map(h => \`
            <option value="\${h.id}">\${h.name} (\${h.code})</option>
          \`).join('');

          document.getElementById('room-stat-total').innerText = statsRes.totalRooms || roomsData.length;
          document.getElementById('room-stat-rate').innerText = (statsRes.occupancyRate || 0) + '%';
          document.getElementById('room-stat-occupied').innerText = (statsRes.occupiedBeds || 0) + ' / ' + (statsRes.totalCapacity || 0) + ' beds';
          document.getElementById('room-stat-vacant').innerText = (statsRes.vacantBeds || 0) + ' Beds';

          const maintCount = roomsData.filter(r => r.status === 'UNDER_MAINTENANCE').length;
          document.getElementById('room-stat-maint').innerText = maintCount + ' Rooms';

          renderRooms();
        } catch (err) {
          console.error('Error fetching rooms:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function renderRooms() {
        const grid = document.getElementById('rooms-grid');
        if (!grid) return;

        const fl = document.getElementById('floor-filter').value;
        const tp = document.getElementById('type-filter').value;
        const voc = document.getElementById('vacant-only').checked;
        const q = (document.getElementById('rooms-search-input')?.value || '').trim().toLowerCase();

        const filtered = roomsData.filter(r => {
          const matchesFloor = fl === 'ALL' || String(r.floor) === fl;
          const matchesType = tp === 'ALL' || r.type === tp;
          const matchesVacant = !voc || r.occupiedBeds < r.capacity;

          if (q) {
            const numMatch = (r.roomNumber || '').toLowerCase().includes(q);
            const typeMatch = (r.type || '').toLowerCase().includes(q);
            const residentMatch = (r.beds || []).some(b => (b.occupantName || '').toLowerCase().includes(q));
            if (!numMatch && !typeMatch && !residentMatch) return false;
          }

          return matchesFloor && matchesType && matchesVacant;
        });

        if (filtered.length === 0) {
          grid.innerHTML = '<div class="col-span-3 py-12 text-center text-[#A0AEC0] italic bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">No rooms matched the filter criteria.</div>';
          return;
        }

        grid.innerHTML = filtered.map(r => {
          const vacantCount = Math.max(0, r.capacity - r.occupiedBeds);
          const isFull = r.occupiedBeds >= r.capacity;
          const isMaint = r.status === 'UNDER_MAINTENANCE';

          let statusBadge = \`
            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800">
              \${vacantCount} Vacant Bed\${vacantCount > 1 ? 's' : ''}
            </span>
          \`;
          if (isMaint) {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-100 text-amber-800">Maintenance</span>';
          } else if (isFull) {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-gray-100 text-gray-700">Full</span>';
          }

          let typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200">DELUXE</span>';
          if (r.type === 'SINGLE') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-800 border border-sky-200">SINGLE</span>';
          } else if (r.type === 'DORMITORY') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">DORMITORY</span>';
          } else if (r.type === 'DELUXE_AC' || r.type === 'SUPER_DELUXE_AC') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-800 border border-teal-200">DELUXE AC</span>';
          }

          const campusName = r.hostel?.name || 'Saltmere Campus';

          // Bed Slots Interactive Grid
          const bedsHtml = (r.beds || []).map(bed => {
            if (bed.isOccupied) {
              return \`
                <div class="p-2 rounded-xl bg-white border border-teal-200 shadow-2xs flex items-center justify-between gap-1 text-xs">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <div class="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      B\${bed.bedNumber}
                    </div>
                    <span class="font-bold text-slate-800 truncate text-[11px]" title="\${bed.occupantName}">
                      \${bed.occupantName || 'Resident'}
                    </span>
                  </div>
                  <button type="button" onclick="unassignStudent('\${r.id}', '\${bed.bookingId || ''}', '\${bed.admissionId || ''}', '\${bed.occupantName || ''}')" class="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold cursor-pointer transition-colors shrink-0" title="Free Bed">
                    Free
                  </button>
                </div>
              \`;
            } else {
              return \`
                <div class="p-2 rounded-xl bg-emerald-50/50 border border-dashed border-emerald-300 shadow-2xs flex items-center justify-between gap-1 text-xs">
                  <div class="flex items-center gap-1.5 min-w-0">
                    <div class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                      B\${bed.bedNumber}
                    </div>
                    <span class="font-semibold text-emerald-900 text-[11px]">Vacant Bed</span>
                  </div>
                  <button type="button" onclick="openAssignModalFromRooms('\${r.id}', \${bed.bedNumber})" class="px-2 py-0.5 rounded-md teal-gradient text-white text-[10px] font-bold cursor-pointer transition-all shrink-0 flex items-center gap-0.5 active:scale-95">
                    <i data-lucide="plus" class="w-3 h-3"></i>
                    <span>Assign</span>
                  </button>
                </div>
              \`;
            }
          }).join('');

          return \`
            <div class="purity-card p-5 flex flex-col justify-between hover:shadow-md transition-shadow border border-slate-200/80">
              <div>
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="text-base font-bold text-[#2D3748]">Room \${r.roomNumber}</h4>
                      \${typePill}
                    </div>
                    <p class="text-[10px] text-[#A0AEC0]">\${campusName} &bull; Floor \${r.floor} (\${r.wing || 'Wing'})</p>
                  </div>
                  \${statusBadge}
                </div>

                <!-- Bed Occupancy Bar -->
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 my-2.5 text-xs">
                  <div class="flex justify-between mb-1.5 font-bold text-[11px]">
                    <span class="text-slate-600">People in Room: <span class="text-slate-900">\${r.occupiedBeds} / \${r.capacity}</span></span>
                    <span class="\${vacantCount > 0 ? 'text-emerald-600' : 'text-slate-400'}">\${vacantCount} Vacant</span>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="h-full teal-gradient rounded-full" style="width: \${(r.occupiedBeds / r.capacity) * 100}%"></div>
                  </div>
                </div>

                <!-- Bed Slot Matrix -->
                <div class="space-y-1.5 my-2.5">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bed Slots</span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    \${bedsHtml}
                  </div>
                </div>

                <!-- Room Facilities -->
                <div class="flex flex-wrap gap-1 mb-3 pt-1">
                  \${(r.amenities || []).slice(0, 4).map(a => \`
                    <span class="px-2 py-0.5 rounded bg-gray-100 text-[#718096] text-[10px] font-medium">\${a}</span>
                  \`).join('')}
                </div>
              </div>

              <!-- Price & Actions -->
              <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span class="text-[9px] text-[#A0AEC0] uppercase font-bold block">Monthly Rent</span>
                  <span class="text-xs font-bold text-[#2D3748]">₹\${Number(r.priceMonthly || 0).toLocaleString('en-IN')}/mo</span>
                </div>
                <div class="flex items-center gap-1.5">
                  \${vacantCount > 0 ? \`
                    <button type="button" onclick="openAssignModalFromRooms('\${r.id}')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1">
                      <i data-lucide="user-plus" class="w-3 h-3"></i>
                      <span>Assign</span>
                    </button>
                  \` : ''}
                  <button type="button" onclick="editRoom('\${r.id}')" class="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-[#718096] hover:text-[#2D3748] text-[11px] font-bold cursor-pointer transition-colors">
                    Edit
                  </button>
                  <button type="button" onclick="deleteRoom('\${r.id}', '\${r.roomNumber}')" class="p-1 rounded-lg hover:bg-rose-50 text-rose-500 cursor-pointer transition-colors" title="Delete">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            </div>
          \`;
        }).join('');

        lucide.createIcons();
      }

      function openAddRoomModal() {
        document.getElementById('room-modal-title').innerText = 'Add New Room';
        document.getElementById('rm-id').value = '';
        document.getElementById('room-form').reset();
        document.querySelectorAll('input[name="rm-amenity"]').forEach(cb => cb.checked = false);
        openModal('room-modal');
        lucide.createIcons();
      }

      function editRoom(roomId) {
        const room = roomsData.find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('room-modal-title').innerText = 'Edit Room ' + room.roomNumber;
        document.getElementById('rm-id').value = room.id;
        document.getElementById('rm-hostel-id').value = room.hostelId || (hostelsList[0] ? hostelsList[0].id : '');
        document.getElementById('rm-number').value = room.roomNumber;
        document.getElementById('rm-floor').value = room.floor;
        document.getElementById('rm-wing').value = room.wing || 'East';
        document.getElementById('rm-type').value = room.type;
        document.getElementById('rm-capacity').value = room.capacity;
        document.getElementById('rm-rent').value = room.priceMonthly;
        document.getElementById('rm-status').value = room.status;

        const currentAmenities = room.amenities || [];
        document.querySelectorAll('input[name="rm-amenity"]').forEach(cb => {
          cb.checked = currentAmenities.includes(cb.value);
        });

        openModal('room-modal');
        lucide.createIcons();
      }

      async function saveRoom(e) {
        e.preventDefault();
        const roomId = document.getElementById('rm-id').value;
        const selectedAmenities = Array.from(document.querySelectorAll('input[name="rm-amenity"]:checked')).map(el => el.value);

        const payload = {
          hostelId: document.getElementById('rm-hostel-id').value,
          roomNumber: document.getElementById('rm-number').value,
          floor: Number(document.getElementById('rm-floor').value),
          wing: document.getElementById('rm-wing').value,
          type: document.getElementById('rm-type').value,
          capacity: Number(document.getElementById('rm-capacity').value),
          priceMonthly: Number(document.getElementById('rm-rent').value),
          status: document.getElementById('rm-status').value,
          amenities: selectedAmenities
        };

        const btn = document.getElementById('btn-save-room');
        btn.disabled = true;

        try {
          const url = roomId ? '/api/rooms/' + roomId : '/api/rooms';
          const method = roomId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Failed to save room');

          showToast(roomId ? 'Room updated' : 'New room added');
          closeModal('room-modal');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      async function deleteRoom(id, roomNumber) {
        if (!confirm(\`Delete Room "\${roomNumber}" permanently?\`)) return;

        try {
          const res = await fetch('/api/rooms/' + id, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          showToast('Room ' + roomNumber + ' deleted');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      // =======================================================================
      // ASSIGN STUDENT MODAL ON ROOMS PAGE
      // =======================================================================
      function openAssignModalFromRooms(preselectedRoomId, preselectedBedNumber) {
        const roomSelect = document.getElementById('ra-room-select');
        let opts = '';
        roomsData.filter(r => (r.capacity - r.occupiedBeds) > 0).forEach(r => {
          const isSelected = preselectedRoomId ? r.id === preselectedRoomId : false;
          opts += \`<option value="\${r.id}" \${isSelected ? 'selected' : ''}>Room \${r.roomNumber} (\${r.type} - Floor \${r.floor})</option>\`;
        });
        roomSelect.innerHTML = opts || '<option value="">No vacant rooms</option>';

        onRaRoomChange(preselectedBedNumber);

        // Populate applicants
        const appSelect = document.getElementById('ra-applicant-select');
        let appOpts = '<option value="">-- Direct Walk-in / Fill below --</option>';
        admissionsList.filter(a => a.status !== 'ADMITTED' || !a.assignedRoomId).forEach(a => {
          appOpts += \`<option value="\${a.id}" data-name="\${a.fullName}" data-phone="\${a.phone}">\${a.fullName} (\${a.phone})</option>\`;
        });
        appSelect.innerHTML = appOpts;

        document.getElementById('ra-checkin').value = new Date().toISOString().split('T')[0];

        openModal('rooms-assign-modal');
        lucide.createIcons();
      }

      function onRaRoomChange(preselectedBedNumber) {
        const roomId = document.getElementById('ra-room-select').value;
        const bedSelect = document.getElementById('ra-bed-select');
        if (!roomId || !bedSelect) return;

        const room = roomsData.find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('ra-rent').value = room.priceMonthly || 8500;
        document.getElementById('ra-deposit').value = room.securityDeposit || 10000;

        const vacantBeds = (room.beds || []).filter(b => !b.isOccupied);
        let opts = '';
        if (vacantBeds.length === 0) {
          opts = '<option value="">No vacant beds</option>';
        } else {
          vacantBeds.forEach(b => {
            const isSelected = preselectedBedNumber ? b.bedNumber === Number(preselectedBedNumber) : false;
            opts += \`<option value="\${b.bedNumber}" \${isSelected ? 'selected' : ''}>Bed \${b.bedNumber} (Vacant)</option>\`;
          });
        }
        bedSelect.innerHTML = opts;
      }

      function onRaApplicantChange() {
        const sel = document.getElementById('ra-applicant-select');
        const opt = sel.options[sel.selectedIndex];
        if (!opt || !opt.value) return;
        const name = opt.getAttribute('data-name');
        const phone = opt.getAttribute('data-phone');
        if (name) document.getElementById('ra-name').value = name;
        if (phone) document.getElementById('ra-phone').value = phone;
      }

      async function submitBedAssignment(e) {
        e.preventDefault();
        const roomId = document.getElementById('ra-room-select').value;
        const bedNumber = Number(document.getElementById('ra-bed-select').value);
        const applicantId = document.getElementById('ra-applicant-select').value;

        const payload = {
          admissionId: applicantId || undefined,
          residentName: document.getElementById('ra-name').value.trim(),
          residentPhone: document.getElementById('ra-phone').value.trim(),
          bedNumber: isNaN(bedNumber) ? 1 : bedNumber,
          monthlyRent: Number(document.getElementById('ra-rent').value),
          securityDeposit: Number(document.getElementById('ra-deposit').value),
          checkInDate: document.getElementById('ra-checkin').value,
          tenureMonths: Number(document.getElementById('ra-tenure').value || 6),
          paymentMethod: 'Admin Direct Allocation'
        };

        const btn = document.getElementById('btn-submit-ra');
        btn.disabled = true;

        try {
          const res = await fetch(\`/api/rooms/\${roomId}/assign-student\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Allocation failed');

          showToast(result.message || 'Bed allocated successfully!');
          closeModal('rooms-assign-modal');
          document.getElementById('rooms-assign-form').reset();
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      async function unassignStudent(roomId, bookingId, admissionId, residentName) {
        if (!confirm(\`Free up bed occupied by "\${residentName || 'resident'}" in this room?\`)) return;

        try {
          const res = await fetch(\`/api/rooms/\${roomId}/unassign-student\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: bookingId || undefined,
              admissionId: admissionId || undefined,
              residentName: residentName || undefined,
            })
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Failed to vacate bed');

          showToast(result.message || 'Bed vacated');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'rooms',
    pageTitle: 'Rooms & Bed Inventory',
    breadcrumb: 'Rooms',
    contentHtml,
    extraScripts,
  });
}
