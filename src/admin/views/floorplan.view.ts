import { renderAdminLayout } from '../admin-layout.template';

export function getFloorplanViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Control Bar: Hostel Switcher, Floor Tabs & Add Room Action -->
      <div class="purity-card p-5 sm:p-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <!-- Left: Hostel Selector & Title -->
          <div class="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">2D Architectural Layout</span>
              <h2 class="text-base sm:text-lg font-bold text-[#2D3748]">Hostel &amp; Room Floorplan</h2>
            </div>

            <!-- Hostel Dropdown Selector -->
            <div class="relative">
              <select id="fp-hostel-select" onchange="onHostelChange()" class="py-2 pl-3 pr-8 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#2D3748] focus:outline-none focus:ring-1 focus:ring-[#4FD1C5] cursor-pointer">
                <!-- Dynamically populated -->
              </select>
            </div>
          </div>

          <!-- Center/Right: Floor Selector Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0" id="fp-floor-tabs">
            <!-- Floor tabs generated dynamically -->
          </div>

          <!-- Action Button: Add Room -->
          <button onclick="openAddRoomModal()" class="px-4 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-sm hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-1.5 shrink-0 self-start lg:self-auto active:scale-95">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i>
            <span>Add Room to Floor</span>
          </button>
        </div>

        <!-- Filter & Blueprint Legend Bar -->
        <div class="mt-5 pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <!-- Room Type Filter & Status Filter -->
          <div class="flex items-center gap-3 flex-wrap">
            <div class="flex items-center gap-1 text-[11px] font-semibold text-[#718096]">
              <span>Type:</span>
              <select id="fp-type-filter" onchange="renderLayout()" class="p-1.5 rounded-lg border border-gray-200 bg-white text-[11px] cursor-pointer">
                <option value="ALL">All Types</option>
                <option value="SINGLE">Single Studios</option>
                <option value="DORMITORY">Dormitories</option>
                <option value="DELUXE">Deluxe Suites</option>
              </select>
            </div>

            <div class="flex items-center gap-1 text-[11px] font-semibold text-[#718096]">
              <span>Status:</span>
              <select id="fp-status-filter" onchange="renderLayout()" class="p-1.5 rounded-lg border border-gray-200 bg-white text-[11px] cursor-pointer">
                <option value="ALL">All Status</option>
                <option value="AVAILABLE">Available / Vacant</option>
                <option value="FULL">Fully Occupied</option>
                <option value="UNDER_MAINTENANCE">Under Maintenance</option>
              </select>
            </div>
          </div>

          <!-- Interactive Legend -->
          <div class="flex items-center gap-3 flex-wrap text-[11px] font-medium text-[#718096]">
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-md bg-emerald-500 border border-emerald-600"></span>
              <span>Available</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-md bg-amber-400 border border-amber-500"></span>
              <span>Partially Filled</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-md bg-purple-500 border border-purple-600"></span>
              <span>Full</span>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="w-3 h-3 rounded-md bg-gray-300 border border-gray-400"></span>
              <span>Maintenance</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Floor Live Telemetry Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4" id="floor-stats-strip">
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Floor Rooms</span>
          <p class="text-xl font-bold text-[#2D3748] mt-0.5" id="fp-stat-rooms">0</p>
          <span class="text-[11px] text-[#718096]" id="fp-stat-floor-label">Floor 1</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Bed Capacity</span>
          <p class="text-xl font-bold text-[#319795] mt-0.5" id="fp-stat-capacity">0</p>
          <span class="text-[11px] text-[#718096]">Total Beds</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Occupied Beds</span>
          <p class="text-xl font-bold text-emerald-600 mt-0.5" id="fp-stat-occupied">0</p>
          <span class="text-[11px] text-[#718096]">Residents Housed</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Vacant Beds</span>
          <p class="text-xl font-bold text-amber-500 mt-0.5" id="fp-stat-vacant">0</p>
          <span class="text-[11px] text-emerald-600 font-semibold">Ready for Admission</span>
        </div>
      </div>

      <!-- ========================================================================= -->
      <!-- 2D ARCHITECTURAL FLOORPLAN BLUEPRINT CANVAS                                -->
      <!-- ========================================================================= -->
      <div class="purity-card p-6 relative overflow-hidden bg-white">
        <!-- Blueprint Header -->
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <i data-lucide="compass" class="w-4 h-4 text-[#4FD1C5]"></i>
            <span class="text-xs font-bold text-[#2D3748] uppercase tracking-wider" id="blueprint-campus-name">Architectural Blueprint</span>
          </div>
          <span class="text-[11px] text-[#A0AEC0] font-mono">Interactive Bed Grid &bull; Click any room to manage</span>
        </div>

        <!-- Blueprint Grid: West Wing vs East Wing with Central Corridor -->
        <div class="space-y-8" id="blueprint-canvas">
          <!-- WEST WING -->
          <div class="relative p-5 rounded-2xl bg-[#F8F9FA] border border-gray-200/80">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-gray-200 text-[#4A5568]">
                West Wing &bull; Garden &amp; Sunset View
              </span>
              <span class="text-[11px] text-[#A0AEC0] font-medium" id="west-count">0 Rooms</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="west-wing-rooms">
              <!-- Dynamically populated -->
            </div>
          </div>

          <!-- CENTRAL CORRIDOR SPINE -->
          <div class="py-3 px-6 rounded-2xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border border-dashed border-gray-300 flex items-center justify-between select-none">
            <span class="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-2">
              <i data-lucide="arrow-left-right" class="w-3.5 h-3.5"></i>
              <span>MAIN CENTRAL WALKWAY / CORRIDOR &bull; FIRE EXIT &amp; STAIRWELL</span>
            </span>
            <div class="flex items-center gap-3 text-[10px] font-bold text-gray-500">
              <span class="px-2 py-0.5 rounded bg-white shadow-2xs">Elevator</span>
              <span class="px-2 py-0.5 rounded bg-white shadow-2xs">Water Station</span>
            </div>
          </div>

          <!-- EAST WING -->
          <div class="relative p-5 rounded-2xl bg-[#F8F9FA] border border-gray-200/80">
            <div class="flex items-center justify-between mb-4">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white border border-gray-200 text-[#4A5568]">
                East Wing &bull; Sunrise &amp; Courtyard
              </span>
              <span class="text-[11px] text-[#A0AEC0] font-medium" id="east-count">0 Rooms</span>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="east-wing-rooms">
              <!-- Dynamically populated -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal: 2D Room Inspector & Management (Executive Professional UI) -->
    <div id="room-inspector-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-3xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        
        <!-- Modal Fixed Header -->
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shadow-slate-900/10 shrink-0">
              <i data-lucide="bed-double" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ROOM INSPECTOR</span>
                <span id="inspect-status-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Available</span>
              </div>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="inspect-room-title">Room D-101</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('room-inspector-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Modal Form (Clean 2-Column Side-by-Side Layout, Zero UX Complexity) -->
        <form id="inspect-room-form" onsubmit="saveRoomUpdates(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="inspect-room-id">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

              <!-- Left Column: Specs, Financials & Bed Occupants (7 cols) -->
              <div class="md:col-span-7 space-y-4">
                
                <!-- Section 1: Specs -->
                <div>
                  <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
                    <i data-lucide="sliders" class="w-3.5 h-3.5 text-teal-600"></i>
                    <span>Room Identity & Configuration</span>
                  </h5>
                  
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Number <span class="text-rose-500">*</span></label>
                      <input type="text" id="inspect-room-number" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                    </div>
                    <div>
                      <label class="block text-slate-600 text-xs mb-1 font-semibold">Wing Placement</label>
                      <select id="inspect-room-wing" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                        <option value="West">West Wing</option>
                        <option value="East">East Wing</option>
                      </select>
                    </div>
                  </div>
                </div>

                <!-- Row 2: Type, Capacity, Status -->
                <div class="grid grid-cols-3 gap-3">
                  <div>
                    <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Type <span class="text-rose-500">*</span></label>
                    <select id="inspect-room-type" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                      <option value="SINGLE">Single</option>
                      <option value="DORMITORY">Dormitory</option>
                      <option value="DELUXE">Deluxe</option>
                      <option value="DELUXE_AC">Deluxe AC</option>
                      <option value="SUPER_DELUXE_AC">Super Deluxe AC</option>
                      <option value="NORMAL_NON_AC">Normal Non-AC</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-slate-600 text-xs mb-1 font-semibold">Bed Capacity <span class="text-rose-500">*</span></label>
                    <div class="relative">
                      <input type="number" id="inspect-room-capacity" required min="1" max="16" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none pr-9">
                      <span class="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-medium">Beds</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-slate-600 text-xs mb-1 font-semibold">Status <span class="text-rose-500">*</span></label>
                    <select id="inspect-room-status" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                      <option value="AVAILABLE">Available</option>
                      <option value="FULL">Full</option>
                      <option value="UNDER_MAINTENANCE">Maintenance</option>
                    </select>
                  </div>
                </div>

                <!-- Section 2: Pricing -->
                <div class="pt-1">
                  <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-1.5">
                    <i data-lucide="receipt" class="w-3.5 h-3.5 text-teal-600"></i>
                    <span>Pricing & Financial Structure</span>
                  </h5>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-slate-600 text-xs mb-1 font-semibold">Monthly Rent <span class="text-rose-500">*</span></label>
                      <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input type="number" id="inspect-room-rent" required min="500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                      </div>
                    </div>
                    <div>
                      <label class="block text-slate-600 text-xs mb-1 font-semibold">Security Deposit <span class="text-rose-500">*</span></label>
                      <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                        <input type="number" id="inspect-room-deposit" required min="0" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 3: Bed Occupancy Roster -->
                <div class="pt-1">
                  <div class="flex items-center justify-between mb-2">
                    <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <i data-lucide="users" class="w-3.5 h-3.5 text-teal-600"></i>
                      <span>Bed Slot Occupancy</span>
                    </h5>
                    <span class="text-[10px] text-slate-400">Live Roster</span>
                  </div>
                  <div class="space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar pr-1" id="inspect-beds-list">
                    <!-- Populated dynamically -->
                  </div>
                </div>

              </div>

              <!-- Right Column: Room Facilities & Amenities (5 cols) -->
              <div class="md:col-span-5 flex flex-col justify-between space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <div class="flex items-center justify-between mb-2.5">
                    <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
                      <i data-lucide="sparkles" class="w-3.5 h-3.5 text-teal-600"></i>
                      <span>Room Facilities & Perks</span>
                    </h5>
                    <span class="text-[10px] text-teal-600 font-semibold">Essential Amenities</span>
                  </div>
                  
                  <div class="grid grid-cols-2 gap-2" id="inspect-facilities-list">
                    ${[
                      'Air Conditioner',
                      'Attached Bath',
                      'Geyser / Hot Water',
                      'Custom Study Desk',
                      'Personal Locker / Wardrobe',
                      'Smart TV',
                      'Mini Refrigerator',
                      'High-Speed Wi-Fi',
                      'Ceiling Fan',
                    ].map(fac => `
                      <label class="group flex items-center gap-2 p-2 rounded-xl bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 transition-all cursor-pointer select-none">
                        <input type="checkbox" name="inspect-amenity" value="${fac}" class="w-3.5 h-3.5 rounded text-teal-600 focus:ring-0 border-slate-300 cursor-pointer">
                        <span class="truncate text-[11px] font-medium text-slate-700">${fac}</span>
                      </label>
                    `).join('')}
                  </div>
                </div>

                <div class="p-3 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-500 flex items-start gap-2 shadow-2xs">
                  <i data-lucide="info" class="w-4 h-4 text-teal-600 shrink-0 mt-0.5"></i>
                  <span>Selected facilities will immediately reflect in student portal searches and 2D floorplan tags.</span>
                </div>
              </div>

            </div>
          </div>

          <!-- Modal Fixed Footer -->
          <div class="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <button type="button" onclick="deleteCurrentRoom()" class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/70 font-semibold text-xs transition-colors cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              <span>Delete Room</span>
            </button>
            <div class="flex items-center gap-2.5">
              <button type="button" onclick="closeModal('room-inspector-modal')" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white transition-colors cursor-pointer">
                Cancel
              </button>
              <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-xs font-bold shadow-sm shadow-teal-600/30 active:scale-98 transition-all cursor-pointer flex items-center gap-1.5">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal: Add New Room to Floor (Executive Professional UI) -->
    <div id="add-room-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-2xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <!-- Header -->
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shadow-slate-900/10 shrink-0">
              <i data-lucide="plus-circle" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ROOM ARCHITECT</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight">Add Room to Floor</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('add-room-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="add-room-form" onsubmit="submitNewRoom(event)" class="flex flex-col flex-1 overflow-hidden">
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Number <span class="text-rose-500">*</span></label>
                <input type="text" id="nr-number" required placeholder="e.g. DORM-105" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none uppercase">
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Wing Placement <span class="text-rose-500">*</span></label>
                <select id="nr-wing" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="West">West Wing</option>
                  <option value="East">East Wing</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Room Type <span class="text-rose-500">*</span></label>
                <select id="nr-type" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="SINGLE">Single (1 Bed)</option>
                  <option value="DORMITORY">Dormitory (4-8 Beds)</option>
                  <option value="DELUXE">Deluxe Suite</option>
                </select>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Bed Capacity <span class="text-rose-500">*</span></label>
                <input type="number" id="nr-capacity" required min="1" max="16" value="1" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Monthly Rent <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="nr-rent" required min="500" value="8500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Deposit <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="nr-deposit" required min="0" value="10000" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
            </div>

            <div>
              <label class="block text-slate-600 text-xs mb-2 font-semibold">Included Facilities & Amenities</label>
              <div class="grid grid-cols-3 gap-2">
                ${[
                  'Air Conditioner',
                  'Attached Bath',
                  'Study Desk',
                  'Personal Locker',
                  'High-Speed Wi-Fi',
                  'Ceiling Fan',
                ].map(fac => `
                  <label class="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 hover:bg-slate-100 transition-colors cursor-pointer text-[11px]">
                    <input type="checkbox" name="nr-amenity" value="${fac}" checked class="w-3.5 h-3.5 rounded text-teal-600 focus:ring-0 border-slate-300">
                    <span class="truncate font-medium text-slate-700">${fac}</span>
                  </label>
                `).join('')}
              </div>
            </div>
          </div>

          <div class="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('add-room-modal')" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 text-white text-xs font-bold shadow-sm shadow-teal-600/30 active:scale-98 transition-all cursor-pointer flex items-center gap-1.5">
              <i data-lucide="plus" class="w-3.5 h-3.5"></i>
              <span>Add Room</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal: Assign Student From Floorplan -->
    <div id="fp-assign-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-lg w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl teal-gradient text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="user-plus" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">BLUEPRINT BED ALLOCATION</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="fp-alloc-title">Assign Resident to Bed</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('fp-assign-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="fp-assign-form" onsubmit="submitFpAssignment(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="fpa-room-id">
          <input type="hidden" id="fpa-bed-number">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs">
            <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-between">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">Target Placement</span>
                <span class="text-sm font-bold text-slate-900" id="fpa-target-label">Room &bull; Bed</span>
              </div>
              <span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-[10px] font-bold">Vacant Slot</span>
            </div>

            <div>
              <label class="block text-slate-700 font-semibold mb-1">Select Registered Applicant or Walk-In</label>
              <select id="fpa-applicant-select" onchange="onFpaApplicantChange()" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <!-- Loaded dynamically -->
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Resident Name *</label>
                <input type="text" id="fpa-name" required placeholder="Full name..." class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Phone Number *</label>
                <input type="tel" id="fpa-phone" required placeholder="+91 98000 00000" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Monthly Rent *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="fpa-rent" required min="500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Security Deposit *</label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="fpa-deposit" required min="0" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Check-In Date *</label>
                <input type="date" id="fpa-checkin" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Tenure Months</label>
                <select id="fpa-tenure" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6" selected>6 Months</option>
                  <option value="12">12 Months</option>
                </select>
              </div>
            </div>
          </div>

          <div class="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('fp-assign-modal')" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-white transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-fpa" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirm Bed Placement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let currentHostels = [];
      let activeHostelId = null;
      let activeFloorNumber = 1;
      let layoutData = null;

      async function initFloorplan() {
        const urlParams = new URLSearchParams(window.location.search);
        const paramHostelId = urlParams.get('hostelId');

        try {
          // 1. Fetch Hostels list
          const hostelsRes = await fetch('/api/hostels').then(r => r.json());
          currentHostels = Array.isArray(hostelsRes) ? hostelsRes : [];

          if (currentHostels.length === 0) {
            document.getElementById('blueprint-canvas').innerHTML = '<div class="p-12 text-center text-[#A0AEC0] italic">No hostels found. Please create a hostel first.</div>';
            return;
          }

          // Populate hostel select dropdown
          const select = document.getElementById('fp-hostel-select');
          select.innerHTML = currentHostels.map(h => \`
            <option value="\${h.id}" \${paramHostelId === h.id ? 'selected' : ''}>\${h.name} (\${h.code})</option>
          \`).join('');

          activeHostelId = paramHostelId || currentHostels[0].id;
          fetchFloorData();
        } catch (err) {
          console.error('Error initializing floorplan:', err);
        }
      }

      function onHostelChange() {
        activeHostelId = document.getElementById('fp-hostel-select').value;
        activeFloorNumber = 1;
        fetchFloorData();
      }

      function switchFloor(fl) {
        activeFloorNumber = fl;
        fetchFloorData();
      }

      async function fetchFloorData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const res = await fetch('/api/rooms/2d-layout?hostelId=' + activeHostelId + '&floor=' + activeFloorNumber).then(r => r.json());
          layoutData = res;

          renderFloorTabs();
          renderStats();
          renderLayout();
        } catch (err) {
          console.error('Error loading 2d layout:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function renderFloorTabs() {
        if (!layoutData) return;
        const container = document.getElementById('fp-floor-tabs');
        container.innerHTML = layoutData.floors.map(fl => {
          const isActive = fl === activeFloorNumber;
          return \`
            <button onclick="switchFloor(\${fl})" class="px-3.5 py-1.5 rounded-xl font-bold text-xs cursor-pointer transition-all whitespace-nowrap \${
              isActive ? 'teal-gradient text-white shadow-xs' : 'bg-gray-50 border border-gray-200 text-[#718096] hover:bg-gray-100'
            }">
              Floor \${fl}
            </button>
          \`;
        }).join('');
      }

      function renderStats() {
        if (!layoutData) return;
        const st = layoutData.stats;
        document.getElementById('fp-stat-rooms').innerText = st.totalRooms;
        document.getElementById('fp-stat-capacity').innerText = st.totalCapacity;
        document.getElementById('fp-stat-occupied').innerText = st.occupiedBeds;
        document.getElementById('fp-stat-vacant').innerText = st.vacantBeds;
        document.getElementById('fp-stat-floor-label').innerText = 'Floor ' + activeFloorNumber;
        document.getElementById('blueprint-campus-name').innerText = (layoutData.hostel?.name || 'Campus') + ' &bull; Floor ' + activeFloorNumber;
      }

      function renderLayout() {
        if (!layoutData) return;

        const typeFilter = document.getElementById('fp-type-filter').value;
        const statusFilter = document.getElementById('fp-status-filter').value;

        const filteredRooms = (layoutData.rooms || []).filter(r => {
          if (typeFilter !== 'ALL' && r.type !== typeFilter) return false;
          if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
          return true;
        });

        const westRooms = filteredRooms.filter(r => (r.wing || 'West') === 'West');
        const eastRooms = filteredRooms.filter(r => (r.wing || 'East') === 'East');

        document.getElementById('west-count').innerText = westRooms.length + ' Rooms';
        document.getElementById('east-count').innerText = eastRooms.length + ' Rooms';

        document.getElementById('west-wing-rooms').innerHTML = renderRoomsCards(westRooms);
        document.getElementById('east-wing-rooms').innerHTML = renderRoomsCards(eastRooms);

        lucide.createIcons();
      }

      function renderRoomsCards(roomsList) {
        if (roomsList.length === 0) {
          return '<div class="col-span-3 py-6 text-center text-[#A0AEC0] italic text-xs">No rooms assigned in this wing.</div>';
        }

        return roomsList.map(r => {
          const isFull = r.occupiedBeds >= r.capacity;
          const isMaint = r.status === 'UNDER_MAINTENANCE';

          // Border & accent colors
          let borderStyle = 'border-emerald-300 bg-emerald-50/20';
          let statusBadge = '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">Available</span>';

          if (isMaint) {
            borderStyle = 'border-gray-300 bg-gray-50';
            statusBadge = '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gray-200 text-gray-700">Maintenance</span>';
          } else if (isFull) {
            borderStyle = 'border-purple-300 bg-purple-50/20';
            statusBadge = '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-800">Full</span>';
          } else if (r.occupiedBeds > 0) {
            borderStyle = 'border-amber-300 bg-amber-50/20';
            statusBadge = '<span class="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">' + r.vacantBeds + ' Vacant</span>';
          }

          // Type badge styling
          let typeBadge = '<span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200">DELUXE</span>';
          if (r.type === 'SINGLE') {
            typeBadge = '<span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-sky-50 text-sky-800 border border-sky-200">SINGLE</span>';
          } else if (r.type === 'DORMITORY') {
            typeBadge = '<span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">DORM</span>';
          }

          // Beds 2D slots rendering
          const bedsHtml = (r.beds || []).map(b => {
            return \`
              <div class="flex items-center justify-between p-1.5 rounded-lg border \${
                b.isOccupied ? 'border-[#4FD1C5] bg-[#4FD1C5]/15 text-[#2D3748]' : 'border-dashed border-gray-300 bg-white text-[#A0AEC0]'
              }" title="\${b.isOccupied ? 'Bed ' + b.bedNumber + ': ' + (b.occupantName || 'Occupied') : 'Bed ' + b.bedNumber + ': Empty'}">
                <div class="flex items-center gap-1 text-[10px] font-bold">
                  <i data-lucide="\${b.isOccupied ? 'user-check' : 'bed'}" class="w-3 h-3 \${b.isOccupied ? 'text-[#319795]' : 'text-gray-400'}"></i>
                  <span>B\${b.bedNumber}</span>
                </div>
                <span class="text-[9px] font-semibold truncate max-w-[80px]">\${b.isOccupied ? (b.occupantName || 'Occupied') : 'Vacant'}</span>
              </div>
            \`;
          }).join('');

          // Amenities tags
          const amenitiesHtml = (r.amenities || []).slice(0, 3).map(a => \`
            <span class="px-1.5 py-0.5 rounded bg-white text-[9px] text-[#718096] border border-gray-100 truncate">\${a}</span>
          \`).join('');

          return \`
            <div onclick="inspectRoom('\${r.id}')" class="purity-card p-4 border-2 \${borderStyle} hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between">
              <div>
                <!-- Card Header -->
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <span class="text-sm font-bold text-[#2D3748]">\${r.roomNumber}</span>
                      \${typeBadge}
                    </div>
                    <span class="text-[10px] text-[#A0AEC0]">Floor \${r.floor} &bull; ₹\${(r.priceMonthly || 0).toLocaleString('en-IN')}/mo</span>
                  </div>
                  \${statusBadge}
                </div>

                <!-- 2D Bed Slots Visual Layout -->
                <div class="grid grid-cols-2 gap-1.5 my-3">
                  \${bedsHtml}
                </div>
              </div>

              <!-- Facilities & Inspect link -->
              <div class="pt-2.5 border-t border-gray-100/80 flex items-center justify-between">
                <div class="flex items-center gap-1 overflow-hidden">
                  \${amenitiesHtml}
                </div>
                <span class="text-[10px] font-bold text-[#319795] flex items-center gap-0.5 shrink-0">
                  <span>Edit</span>
                  <i data-lucide="chevron-right" class="w-3 h-3"></i>
                </span>
              </div>
            </div>
          \`;
        }).join('');
      }

      function inspectRoom(roomId) {
        if (!layoutData) return;
        const room = layoutData.rooms.find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('inspect-room-id').value = room.id;
        document.getElementById('inspect-room-title').innerText = 'Room ' + room.roomNumber + ' (Floor ' + room.floor + ')';
        document.getElementById('inspect-room-number').value = room.roomNumber;
        document.getElementById('inspect-room-wing').value = room.wing || 'West';
        document.getElementById('inspect-room-type').value = room.type;
        document.getElementById('inspect-room-capacity').value = room.capacity;
        document.getElementById('inspect-room-status').value = room.status;
        document.getElementById('inspect-room-rent').value = room.priceMonthly;
        document.getElementById('inspect-room-deposit').value = room.securityDeposit;

        // Dynamic Header Status Badge
        const statusBadge = document.getElementById('inspect-status-badge');
        if (statusBadge) {
          if (room.status === 'AVAILABLE') {
            statusBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200';
            statusBadge.innerText = 'Available';
          } else if (room.status === 'FULL') {
            statusBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200';
            statusBadge.innerText = 'Full';
          } else {
            statusBadge.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200';
            statusBadge.innerText = 'Maintenance';
          }
        }

        // Check amenities checkboxes
        const currentAmenities = room.amenities || [];
        document.querySelectorAll('input[name="inspect-amenity"]').forEach(cb => {
          cb.checked = currentAmenities.includes(cb.value);
        });

        // Beds allocation detail
        const bedsContainer = document.getElementById('inspect-beds-list');
        bedsContainer.innerHTML = (room.beds && room.beds.length > 0)
          ? room.beds.map(b => \`
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border \${b.isOccupied ? 'border-teal-200 bg-teal-50/20' : 'border-slate-200'} shadow-2xs">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg \${b.isOccupied ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'} flex items-center justify-center text-[10px] font-extrabold shrink-0 shadow-2xs">
                  B\${b.bedNumber}
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-bold text-slate-900">Bed \${b.bedNumber}</span>
                    <span class="text-[9px] font-bold px-1.5 py-0.2 rounded \${b.isOccupied ? 'bg-teal-100 text-teal-800' : 'bg-emerald-100 text-emerald-800'}">
                      \${b.isOccupied ? 'OCCUPIED' : 'VACANT'}
                    </span>
                  </div>
                  <span class="text-[11px] font-medium text-slate-600 block">
                    \${b.isOccupied ? (b.occupantName || 'Occupied Resident') : 'Ready for assignment'}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                \${b.isOccupied ? \`
                  <button type="button" onclick="unassignBedFromFloorplan('\${room.id}', '\${b.bookingId || ''}', '\${b.admissionId || ''}', '\${(b.occupantName || '').replace(/'/g, "\\\\'")}')" class="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 text-[10px] font-bold border border-rose-200/80 active:scale-95 transition-all cursor-pointer flex items-center gap-1">
                    <i data-lucide="user-minus" class="w-3 h-3"></i>
                    <span>Free</span>
                  </button>
                \` : \`
                  <button type="button" onclick="openAssignModalFromFloorplan('\${room.id}', \${b.bedNumber})" class="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1">
                    <i data-lucide="user-plus" class="w-3 h-3"></i>
                    <span>+ Assign</span>
                  </button>
                \`}
              </div>
            </div>
          \`).join('')
          : '<div class="text-xs text-slate-400 italic p-3 text-center bg-white rounded-xl border border-dashed border-slate-200">No beds configured for this room</div>';

        openModal('room-inspector-modal');
        lucide.createIcons();
      }

      async function saveRoomUpdates(e) {
        e.preventDefault();
        const roomId = document.getElementById('inspect-room-id').value;
        const selectedAmenities = Array.from(document.querySelectorAll('input[name="inspect-amenity"]:checked')).map(el => el.value);

        const payload = {
          roomNumber: document.getElementById('inspect-room-number').value,
          wing: document.getElementById('inspect-room-wing').value,
          type: document.getElementById('inspect-room-type').value,
          capacity: Number(document.getElementById('inspect-room-capacity').value),
          status: document.getElementById('inspect-room-status').value,
          priceMonthly: Number(document.getElementById('inspect-room-rent').value),
          securityDeposit: Number(document.getElementById('inspect-room-deposit').value),
          amenities: selectedAmenities
        };

        try {
          const res = await fetch('/api/rooms/' + roomId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error('Failed to update room');

          showToast('Room ' + payload.roomNumber + ' updated successfully!');
          closeModal('room-inspector-modal');
          fetchFloorData();
        } catch (err) {
          showToast('Error: ' + err.message);
        }
      }

      async function deleteCurrentRoom() {
        const roomId = document.getElementById('inspect-room-id').value;
        const roomNumber = document.getElementById('inspect-room-number').value;

        if (!confirm('Are you sure you want to delete room ' + roomNumber + '? This action cannot be undone.')) {
          return;
        }

        try {
          const res = await fetch('/api/rooms/' + roomId, { method: 'DELETE' });
          if (!res.ok) throw new Error('Failed to delete room');

          showToast('Room ' + roomNumber + ' deleted');
          closeModal('room-inspector-modal');
          fetchFloorData();
        } catch (err) {
          showToast('Error deleting room: ' + err.message);
        }
      }

      function openAddRoomModal() {
        document.getElementById('add-room-form').reset();
        openModal('add-room-modal');
      }

      async function submitNewRoom(e) {
        e.preventDefault();
        const selectedAmenities = Array.from(document.querySelectorAll('input[name="nr-amenity"]:checked')).map(el => el.value);

        const payload = {
          hostelId: activeHostelId,
          floor: activeFloorNumber,
          roomNumber: document.getElementById('nr-number').value,
          wing: document.getElementById('nr-wing').value,
          type: document.getElementById('nr-type').value,
          capacity: Number(document.getElementById('nr-capacity').value),
          priceMonthly: Number(document.getElementById('nr-rent').value),
          securityDeposit: Number(document.getElementById('nr-deposit').value),
          amenities: selectedAmenities,
          status: 'AVAILABLE'
        };

        try {
          const res = await fetch('/api/rooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            showToast('Error: ' + (err.message || 'Failed to add room'));
            return;
          }

          showToast('Room ' + payload.roomNumber + ' added to floor ' + activeFloorNumber + '!');
          closeModal('add-room-modal');
          fetchFloorData();
        } catch (err) {
          showToast('Network error adding room');
        }
      }

      // Floorplan Direct Bed Assignment
      async function openAssignModalFromFloorplan(roomId, bedNumber) {
        const room = (layoutData?.rooms || []).find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('fpa-room-id').value = room.id;
        document.getElementById('fpa-bed-number').value = bedNumber;
        document.getElementById('fpa-target-label').innerText = 'Room ' + room.roomNumber + ' &bull; Bed ' + bedNumber;
        document.getElementById('fpa-rent').value = room.priceMonthly || 8500;
        document.getElementById('fpa-deposit').value = room.securityDeposit || 10000;
        document.getElementById('fpa-checkin').value = new Date().toISOString().split('T')[0];

        // Fetch admissions for dropdown
        try {
          const adms = await fetch('/api/admissions').then(r => r.json());
          const unassigned = Array.isArray(adms) ? adms.filter(a => a.status !== 'ADMITTED' || !a.assignedRoomId) : [];
          let opts = '<option value="">-- Direct Walk-in / Fill below --</option>';
          unassigned.forEach(a => {
            opts += \`<option value="\${a.id}" data-name="\${a.fullName}" data-phone="\${a.phone}">\${a.fullName} (\${a.phone})</option>\`;
          });
          document.getElementById('fpa-applicant-select').innerHTML = opts;
        } catch (e) {}

        openModal('fp-assign-modal');
        lucide.createIcons();
      }

      function onFpaApplicantChange() {
        const sel = document.getElementById('fpa-applicant-select');
        const opt = sel.options[sel.selectedIndex];
        if (!opt || !opt.value) return;
        const name = opt.getAttribute('data-name');
        const phone = opt.getAttribute('data-phone');
        if (name) document.getElementById('fpa-name').value = name;
        if (phone) document.getElementById('fpa-phone').value = phone;
      }

      async function submitFpAssignment(e) {
        e.preventDefault();
        const roomId = document.getElementById('fpa-room-id').value;
        const bedNumber = Number(document.getElementById('fpa-bed-number').value);
        const applicantId = document.getElementById('fpa-applicant-select').value;

        const payload = {
          admissionId: applicantId || undefined,
          residentName: document.getElementById('fpa-name').value.trim(),
          residentPhone: document.getElementById('fpa-phone').value.trim(),
          bedNumber: isNaN(bedNumber) ? 1 : bedNumber,
          monthlyRent: Number(document.getElementById('fpa-rent').value),
          securityDeposit: Number(document.getElementById('fpa-deposit').value),
          checkInDate: document.getElementById('fpa-checkin').value,
          tenureMonths: Number(document.getElementById('fpa-tenure').value || 6),
          paymentMethod: 'Admin Direct Allocation'
        };

        const btn = document.getElementById('btn-submit-fpa');
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
          closeModal('fp-assign-modal');
          closeModal('room-inspector-modal');
          fetchFloorData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      async function unassignBedFromFloorplan(roomId, bookingId, admissionId, residentName) {
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
          closeModal('room-inspector-modal');
          fetchFloorData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      window.addEventListener('DOMContentLoaded', initFloorplan);
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'floorplan',
    pageTitle: '2D Floorplan & Map',
    breadcrumb: '2D Blueprint',
    contentHtml,
    extraScripts,
  });
}
