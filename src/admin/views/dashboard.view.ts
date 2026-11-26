import { renderAdminLayout } from '../admin-layout.template';

export function getDashboardViewHtml(): string {
  const contentHtml = `
    <!-- 1. TOP 4 STAT CARDS (Exact Purity UI Layout with Teal Rounded Icon) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <!-- Card 1: Today's Money / Revenue -->
      <div class="purity-card p-4 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Today's Revenue</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-lg font-bold text-[#2D3748]">₹</span>
            <span class="text-lg font-bold text-[#2D3748]" id="stat-revenue">0</span>
            <span class="text-xs font-bold text-[#48BB78] ml-1.5">+55%</span>
          </div>
        </div>
        <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md">
          <i data-lucide="wallet" class="w-5 h-5"></i>
        </div>
      </div>

      <!-- Card 2: Today's Users / Residents -->
      <div class="purity-card p-4 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Occupied Beds</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-lg font-bold text-[#2D3748]" id="stat-occupied-beds">0 / 0</span>
            <span class="text-xs font-bold text-[#48BB78] ml-1.5" id="stat-occupancy-rate">0%</span>
          </div>
        </div>
        <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md">
          <i data-lucide="globe" class="w-5 h-5"></i>
        </div>
      </div>

      <!-- Card 3: New Clients / Admissions -->
      <div class="purity-card p-4 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Admission Intake</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-lg font-bold text-[#2D3748]" id="stat-admissions">0</span>
            <span class="text-xs font-bold text-[#E53E3E] ml-1.5" id="stat-pending-admissions">0 Pending</span>
          </div>
        </div>
        <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md">
          <i data-lucide="file-text" class="w-5 h-5"></i>
        </div>
      </div>

      <!-- Card 4: Total Sales / Vacancies -->
      <div class="purity-card p-4 flex items-center justify-between">
        <div>
          <span class="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Vacant Beds</span>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-lg font-bold text-[#2D3748]" id="stat-vacant-beds">0 Beds</span>
            <span class="text-xs font-bold text-[#48BB78] ml-1.5">+8%</span>
          </div>
        </div>
        <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md">
          <i data-lucide="shopping-cart" class="w-5 h-5"></i>
        </div>
      </div>
    </div>

    <!-- 2. SECOND ROW: 2 ASYMMETRIC BANNER CARDS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: "Built by developers / Purity UI Dashboard" style card -->
      <div class="lg:col-span-7 purity-card p-6 flex flex-col justify-between">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="space-y-1 max-w-sm">
            <span class="text-xs font-bold text-[#A0AEC0]">Built for hostel operations</span>
            <h3 class="text-base sm:text-lg font-bold text-[#2D3748]">Saltmere ERP Dashboard</h3>
            <p class="text-xs text-[#718096] leading-relaxed pt-1">
              From real-time room occupancy, biometric gate logs, to instant fee receipts and direct student bed allocations.
            </p>
            <div class="pt-4 flex items-center gap-4">
              <a href="/admin/admissions" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D3748] hover:text-[#319795] transition-colors no-underline">
                <span>Manage Admissions</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </a>
              <a href="/admin/rooms" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#319795] hover:underline transition-colors no-underline">
                <span>Rooms Inventory</span>
                <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>

          <!-- Teal rounded emblem container -->
          <div class="w-full sm:w-52 h-40 teal-gradient-card rounded-2xl flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden shrink-0">
            <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
              <i data-lucide="sparkles" class="w-6 h-6 text-white"></i>
            </div>
            <span class="font-bold text-sm tracking-wide">SALTMERE</span>
            <span class="text-[10px] text-white/80 font-medium">Campus Cloud ERP</span>
          </div>
        </div>
      </div>

      <!-- Right: "Work with the Rockets" style photographic card -->
      <div class="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-between p-6 text-white bg-cover bg-center" style="background-image: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80');">
        <div>
          <h3 class="text-base sm:text-lg font-bold">Resident Welfare &amp; Facilities</h3>
          <p class="text-xs text-white/80 leading-relaxed mt-2">
            Uninterrupted gigabit Wi-Fi, 4-meal cafeteria nutrition inspection, and instant maintenance dispatch operate 24/7.
          </p>
        </div>
        <div class="pt-6">
          <a href="/admin/maintenance" class="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#4FD1C5] transition-colors no-underline">
            <span>Inspect Work Orders</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- 3. THIRD ROW: TELEMETRY CHARTS (Dark Bar Chart + Dual Wave Area Chart) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: Dark Bar Chart Card (~40% width) -->
      <div class="lg:col-span-5 purity-card p-4 sm:p-5 flex flex-col justify-between">
        <div>
          <!-- Dark Charcoal Container for Bar Chart -->
          <div class="bg-gradient-to-br from-[#1A202C] to-[#2D3748] rounded-2xl p-4 shadow-md mb-5">
            <canvas id="barChart" height="190"></canvas>
          </div>

          <h4 class="text-sm font-bold text-[#2D3748]">Active Occupancy Telemetry</h4>
          <p class="text-xs text-[#718096] mt-0.5"><span class="font-bold text-[#48BB78]">(+23%)</span> than last week</p>
        </div>

        <!-- 4 Metric Indicators with progress lines -->
        <div class="grid grid-cols-4 gap-2 pt-5 border-t border-gray-100 mt-4">
          <div>
            <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
              <i data-lucide="users" class="w-3 h-3 text-[#4FD1C5]"></i>
              <span>Beds</span>
            </div>
            <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-total-beds">0</p>
            <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 100%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
              <i data-lucide="check-circle" class="w-3 h-3 text-[#4FD1C5]"></i>
              <span>Filled</span>
            </div>
            <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-occupied-beds">0</p>
            <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-[#4FD1C5] h-full rounded-full" id="mini-occupied-bar" style="width: 0%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
              <i data-lucide="door-open" class="w-3 h-3 text-[#4FD1C5]"></i>
              <span>Vacant</span>
            </div>
            <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-vacant-beds">0</p>
            <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-[#4FD1C5] h-full rounded-full" id="mini-vacant-bar" style="width: 100%"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
              <i data-lucide="layers" class="w-3 h-3 text-[#4FD1C5]"></i>
              <span>Rooms</span>
            </div>
            <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-rooms-count">0</p>
            <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
              <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 80%"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Smooth Area Line Chart Card (~60% width) -->
      <div class="lg:col-span-7 purity-card p-5 sm:p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h4 class="text-sm font-bold text-[#2D3748]">Sales &amp; Collections Overview</h4>
              <p class="text-xs text-[#718096] mt-0.5"><span class="font-bold text-[#48BB78]">(+5) more</span> in 2026</p>
            </div>
            <span class="text-xs text-[#A0AEC0] font-medium">Monthly Curve</span>
          </div>
          <div class="h-64 w-full">
            <canvas id="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 4. LIVE ROOM & BED ALLOCATION CENTER (ROOMS, PEOPLE IN ROOM & VACANT BEDS) -->
    <!-- ========================================================================= -->
    <div class="purity-card p-5 sm:p-6 space-y-5">
      <!-- Section Header & Controls -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div class="flex items-center gap-2">
            <div class="w-9 h-9 rounded-xl teal-gradient flex items-center justify-center text-white shadow-xs">
              <i data-lucide="bed-double" class="w-4 h-4"></i>
            </div>
            <div>
              <h3 class="text-base sm:text-lg font-bold text-[#2D3748]">Live Room &amp; Bed Allocation Center</h3>
              <p class="text-xs text-[#718096]">Real-time room occupancy, people currently in rooms, vacant bed slots, and direct resident assignments.</p>
            </div>
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          <!-- Room/Resident Search -->
          <div class="relative">
            <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input type="text" id="dash-room-search" oninput="filterDashboardRooms()" placeholder="Search room or resident..." class="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none w-44 sm:w-48 font-medium">
          </div>

          <!-- Campus / Hostel Selector -->
          <select id="dash-hostel-filter" onchange="filterDashboardRooms()" class="py-1.5 px-3 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] font-medium cursor-pointer focus:outline-none">
            <option value="ALL">All Campuses</option>
          </select>

          <!-- Vacancy Filter Pill Toggle -->
          <div class="flex items-center p-0.5 rounded-xl bg-gray-100 border border-gray-200 text-xs">
            <button type="button" onclick="setDashVacancyFilter('ALL')" id="filter-btn-all" class="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer">
              All (<span id="count-all-rooms">0</span>)
            </button>
            <button type="button" onclick="setDashVacancyFilter('VACANT')" id="filter-btn-vacant" class="px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer">
              Vacant Beds (<span id="count-vacant-rooms">0</span>)
            </button>
            <button type="button" onclick="setDashVacancyFilter('FULL')" id="filter-btn-full" class="px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer">
              Full (<span id="count-full-rooms">0</span>)
            </button>
          </div>

          <!-- Primary Modal Button: Assign Resident to Bed -->
          <button onclick="openAssignStudentModal()" class="px-3.5 py-1.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-sm hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shrink-0">
            <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
            <span>+ Assign Resident to Bed</span>
          </button>
        </div>
      </div>

      <!-- Real-Time Metrics Strip: Summary of Rooms, Beds, Occupancy -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Rooms</span>
            <span class="text-base font-extrabold text-slate-800" id="dash-summary-rooms">0 Rooms</span>
          </div>
          <div class="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <i data-lucide="door-open" class="w-4 h-4"></i>
          </div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">People in Rooms</span>
            <span class="text-base font-extrabold text-slate-800" id="dash-summary-occupants">0 People</span>
          </div>
          <div class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <i data-lucide="users" class="w-4 h-4"></i>
          </div>
        </div>
        <div class="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Vacant Beds Available</span>
            <span class="text-base font-extrabold text-emerald-700" id="dash-summary-vacant-beds">0 Beds</span>
          </div>
          <div class="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
          </div>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Occupancy Rate</span>
            <span class="text-base font-extrabold text-teal-600" id="dash-summary-occupancy-rate">0%</span>
          </div>
          <div class="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <i data-lucide="pie-chart" class="w-4 h-4"></i>
          </div>
        </div>
      </div>

      <!-- Live Room & Bed Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" id="dashboard-rooms-grid">
        <div class="col-span-full py-12 text-center text-[#A0AEC0] italic flex items-center justify-center gap-2">
          <i data-lucide="loader-2" class="w-4 h-4 animate-spin text-[#4FD1C5]"></i>
          <span>Loading live room &amp; bed inventory...</span>
        </div>
      </div>

      <!-- Footer Info Strip -->
      <div class="flex items-center justify-between pt-2 text-xs text-[#718096] border-t border-gray-100">
        <span id="rooms-showing-indicator">Displaying current campus inventory</span>
        <a href="/admin/rooms" class="font-bold text-[#319795] hover:underline flex items-center gap-1 no-underline">
          <span>Manage Full Room Specifications &amp; Amenities</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>

    <!-- 5. FIFTH ROW: DATA TABLE & ORDERS TIMELINE -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Left: "Projects" style table (~65% width) -->
      <div class="lg:col-span-8 purity-card p-5 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h4 class="text-sm font-bold text-[#2D3748]">Active Allocations &amp; Admissions</h4>
            <p class="text-xs text-[#718096] flex items-center gap-1 mt-0.5">
              <i data-lucide="check" class="w-3.5 h-3.5 text-[#48BB78]"></i>
              <span>Live Resident Directory</span>
            </p>
          </div>
          <a href="/admin/admissions" class="text-xs font-bold text-[#319795] hover:underline no-underline">
            View All Admissions →
          </a>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                <th class="pb-3 px-2">RESIDENT</th>
                <th class="pb-3 px-2">ROOM / BED</th>
                <th class="pb-3 px-2">RENT DUES</th>
                <th class="pb-3 px-2">COMPLETION</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 font-medium" id="projects-table-body">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right: "Orders overview" vertical timeline (~35% width) -->
      <div class="lg:col-span-4 purity-card p-5 sm:p-6">
        <div class="mb-5 flex items-center justify-between">
          <div>
            <h4 class="text-sm font-bold text-[#2D3748]">Orders &amp; Activity Overview</h4>
            <p class="text-xs text-[#718096] mt-0.5"><span class="font-bold text-[#48BB78]">+30%</span> this month</p>
          </div>
          <a href="/admin/billing" class="text-xs font-bold text-[#319795] hover:underline no-underline">
            Ledger →
          </a>
        </div>

        <div class="space-y-4" id="timeline-feed">
          <!-- Dynamically populated -->
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- 6. MODAL: ASSIGN STUDENT TO ROOM & BED (DIRECT ADMIN BED ALLOCATION)     -->
    <!-- ========================================================================= -->
    <div id="assign-student-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <!-- Modal Header -->
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shadow-slate-900/10 shrink-0">
              <i data-lucide="user-plus" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">BED SLOT ALLOCATION</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight">Assign Resident to Bed</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('assign-student-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Modal Form -->
        <form id="assign-student-form" onsubmit="submitAssignStudent(event)" class="flex flex-col flex-1 overflow-hidden">
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            
            <!-- Target Room & Bed Selection -->
            <div class="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-3">
              <div class="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <i data-lucide="map-pin" class="w-4 h-4 text-teal-600"></i>
                <span>Step 1: Select Room &amp; Bed Slot</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-700 text-xs mb-1 font-semibold">Target Room <span class="text-rose-500">*</span></label>
                  <select id="assign-room-select" required onchange="onAssignRoomChange()" class="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-800 text-xs font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                    <!-- Populated dynamically with rooms that have vacancies -->
                  </select>
                </div>
                <div>
                  <label class="block text-slate-700 text-xs mb-1 font-semibold">Designated Bed Slot <span class="text-rose-500">*</span></label>
                  <select id="assign-bed-select" required class="w-full px-3 py-2 rounded-xl bg-white border border-teal-200 text-slate-800 text-xs font-semibold focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                    <!-- Populated dynamically based on room's vacant beds -->
                  </select>
                </div>
              </div>
            </div>

            <!-- Resident Intake Source Toggle -->
            <div>
              <label class="block text-slate-700 text-xs mb-1.5 font-semibold">Step 2: Choose Resident Intake Source</label>
              <div class="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                <button type="button" id="src-tab-applicant" onclick="toggleStudentSource('APPLICANT')" class="py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer bg-white text-slate-800 shadow-2xs">
                  Applicant Admissions
                </button>
                <button type="button" id="src-tab-walkin" onclick="toggleStudentSource('WALKIN')" class="py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900">
                  Direct / Walk-In Resident
                </button>
              </div>
            </div>

            <!-- Source A: Select from Admissions Applicants -->
            <div id="source-applicant-panel" class="space-y-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Select Applicant <span class="text-rose-500">*</span></label>
                <select id="assign-applicant-select" onchange="onApplicantSelect()" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <!-- Populated dynamically -->
                </select>
                <span class="text-[10px] text-slate-400 mt-1 block">Lists approved or pending applicants awaiting room placement.</span>
              </div>
            </div>

            <!-- Source B: Direct / Manual Resident Details -->
            <div id="source-walkin-panel" class="hidden space-y-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Full Resident Name <span class="text-rose-500">*</span></label>
                <input type="text" id="assign-walkin-name" placeholder="e.g. Rahul Verma" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Phone Number <span class="text-rose-500">*</span></label>
                  <input type="text" id="assign-walkin-phone" placeholder="+91 98765 00000" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Email Address</label>
                  <input type="email" id="assign-walkin-email" placeholder="rahul@example.com" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
            </div>

            <!-- Step 3: Tenure & Financials -->
            <div class="pt-2 border-t border-slate-100 space-y-3">
              <span class="text-xs font-bold text-slate-800 block">Step 3: Stay &amp; Fee Details</span>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Check-In Date <span class="text-rose-500">*</span></label>
                  <input type="date" id="assign-checkin-date" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                </div>
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Tenure</label>
                  <select id="assign-tenure" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                    <option value="1">1 Month</option>
                    <option value="3">3 Months (Semester)</option>
                    <option value="6" selected>6 Months</option>
                    <option value="12">12 Months (Full Academic Year)</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Monthly Rent <span class="text-rose-500">*</span></label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input type="number" id="assign-rent" required min="500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                  </div>
                </div>
                <div>
                  <label class="block text-slate-600 text-xs mb-1 font-semibold">Security Deposit <span class="text-rose-500">*</span></label>
                  <div class="relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                    <input type="number" id="assign-deposit" required min="0" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                  </div>
                </div>
              </div>

              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Intake Intake Method</label>
                <select id="assign-payment-method" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="Admin Direct Allocation">Admin Direct Allocation (Fee Verified)</option>
                  <option value="Online (UPI/Card)">Online Payment (UPI / Card)</option>
                  <option value="Cash / Desk Deposit">Cash at Front Desk</option>
                  <option value="Bank Wire / NEFT">Bank Wire / NEFT</option>
                </select>
              </div>
            </div>

          </div>

          <!-- Modal Action Bar -->
          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('assign-student-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-assign" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i>
              <span>Confirm Bed Allocation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let barChartInstance = null;
      let lineChartInstance = null;

      let roomsData = [];
      let hostelsData = [];
      let admissionsData = [];
      let currentVacancyFilter = 'ALL';
      let studentSourceMode = 'APPLICANT';

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const [dashRes, roomsRes, hostelsRes, admissionsRes] = await Promise.all([
            fetch('/api/admin/dashboard').then(r => r.json()),
            fetch('/api/rooms').then(r => r.json()),
            fetch('/api/hostels').then(r => r.json()).catch(() => []),
            fetch('/api/admissions').then(r => r.json()).catch(() => [])
          ]);

          roomsData = Array.isArray(roomsRes) ? roomsRes : [];
          hostelsData = Array.isArray(hostelsRes) ? hostelsRes : [];
          admissionsData = Array.isArray(admissionsRes) ? admissionsRes : [];

          renderTopStats(dashRes.kpi);
          renderCharts(dashRes.kpi);
          renderProjectsTable(dashRes.feeds);
          renderTimelineFeed(dashRes.feeds);

          populateHostelFilters();
          renderDashboardRooms();
          populateAssignModalOptions();
        } catch (err) {
          console.error('Error loading dashboard data:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function populateHostelFilters() {
        const hFilter = document.getElementById('dash-hostel-filter');
        if (!hFilter) return;

        const currentVal = hFilter.value;
        let options = '<option value="ALL">All Campuses</option>';
        hostelsData.forEach(h => {
          options += \`<option value="\${h.id}" \${currentVal === h.id ? 'selected' : ''}>\${h.name}</option>\`;
        });
        hFilter.innerHTML = options;
      }

      function renderTopStats(kpi) {
        if (!kpi) return;
        document.getElementById('stat-revenue').innerText = (kpi.financials?.totalRevenue || 0).toLocaleString('en-IN');
        document.getElementById('stat-occupied-beds').innerText = (kpi.occupancy?.occupiedBeds || 0) + ' / ' + (kpi.occupancy?.totalCapacity || 0);
        document.getElementById('stat-occupancy-rate').innerText = (kpi.occupancy?.occupancyRate || 0) + '%';
        document.getElementById('stat-admissions').innerText = kpi.admissions?.total || 0;
        document.getElementById('stat-pending-admissions').innerText = (kpi.admissions?.pending || 0) + ' Pending';
        document.getElementById('stat-vacant-beds').innerText = (kpi.occupancy?.vacantBeds || 0) + ' Beds';

        document.getElementById('mini-total-beds').innerText = kpi.occupancy?.totalCapacity || 0;
        document.getElementById('mini-occupied-beds').innerText = kpi.occupancy?.occupiedBeds || 0;
        document.getElementById('mini-vacant-beds').innerText = kpi.occupancy?.vacantBeds || 0;
        document.getElementById('mini-rooms-count').innerText = kpi.occupancy?.totalRooms || 0;

        const occPct = kpi.occupancy?.totalCapacity > 0 ? Math.round((kpi.occupancy.occupiedBeds / kpi.occupancy.totalCapacity) * 100) : 0;
        const vacPct = Math.max(0, 100 - occPct);
        const occBar = document.getElementById('mini-occupied-bar');
        const vacBar = document.getElementById('mini-vacant-bar');
        if (occBar) occBar.style.width = occPct + '%';
        if (vacBar) vacBar.style.width = vacPct + '%';
      }

      function renderCharts(kpi) {
        // 1. Dark Bar Chart (White vertical bars on dark charcoal background)
        const barCtx = document.getElementById('barChart')?.getContext('2d');
        if (barCtx) {
          if (barChartInstance) barChartInstance.destroy();
          barChartInstance = new Chart(barCtx, {
            type: 'bar',
            data: {
              labels: ['100', '200', '300', '400', '500'],
              datasets: [{
                label: 'Occupancy',
                data: [330, 250, 110, 300, 490, 350, 270, 130, 425],
                backgroundColor: '#FFFFFF',
                borderRadius: 6,
                barThickness: 10,
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } }
                },
                y: {
                  grid: { color: 'rgba(255,255,255,0.1)' },
                  ticks: { color: 'rgba(255,255,255,0.7)', font: { size: 10 } }
                }
              }
            }
          });
        }

        // 2. Dual-Wave Smooth Area Line Chart
        const lineCtx = document.getElementById('lineChart')?.getContext('2d');
        if (lineCtx) {
          if (lineChartInstance) lineChartInstance.destroy();

          const tealGradient = lineCtx.createLinearGradient(0, 0, 0, 240);
          tealGradient.addColorStop(0, 'rgba(79, 209, 197, 0.45)');
          tealGradient.addColorStop(1, 'rgba(79, 209, 197, 0.0)');

          lineChartInstance = new Chart(lineCtx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [
                {
                  label: 'Room Revenue',
                  data: [500, 40, 300, 220, 500, 250, 400, 230, 500, 320, 450, 500],
                  borderColor: '#4FD1C5',
                  borderWidth: 3,
                  backgroundColor: tealGradient,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 0
                },
                {
                  label: 'Intake Velocity',
                  data: [30, 90, 40, 140, 290, 290, 340, 230, 400, 200, 100, 200],
                  borderColor: '#2D3748',
                  borderWidth: 2.5,
                  fill: false,
                  tension: 0.4,
                  pointRadius: 0
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { color: '#A0AEC0', font: { size: 11 } }
                },
                y: {
                  grid: { color: 'rgba(226, 232, 240, 0.6)' },
                  ticks: { color: '#A0AEC0', font: { size: 11 } }
                }
              }
            }
          });
        }
      }

      // =======================================================================
      // LIVE ROOM & BED ALLOCATION CENTER (ROOMS, OCCUPANCY, VACANT BEDS)
      // =======================================================================
      function setDashVacancyFilter(type) {
        currentVacancyFilter = type;
        const btnAll = document.getElementById('filter-btn-all');
        const btnVac = document.getElementById('filter-btn-vacant');
        const btnFull = document.getElementById('filter-btn-full');

        [btnAll, btnVac, btnFull].forEach(b => {
          if (b) {
            b.className = 'px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer';
          }
        });

        if (type === 'ALL' && btnAll) {
          btnAll.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer';
        } else if (type === 'VACANT' && btnVac) {
          btnVac.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-emerald-700 shadow-2xs transition-all cursor-pointer';
        } else if (type === 'FULL' && btnFull) {
          btnFull.className = 'px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-slate-900 shadow-2xs transition-all cursor-pointer';
        }

        renderDashboardRooms();
      }

      function filterDashboardRooms() {
        renderDashboardRooms();
      }

      function renderDashboardRooms() {
        const grid = document.getElementById('dashboard-rooms-grid');
        if (!grid) return;

        const searchVal = (document.getElementById('dash-room-search')?.value || '').trim().toLowerCase();
        const hostelVal = document.getElementById('dash-hostel-filter')?.value || 'ALL';

        // Compute total numbers
        const totalRooms = roomsData.length;
        const vacantRooms = roomsData.filter(r => (r.capacity - r.occupiedBeds) > 0).length;
        const fullRooms = roomsData.filter(r => r.occupiedBeds >= r.capacity).length;
        const totalCapacity = roomsData.reduce((acc, r) => acc + (r.capacity || 0), 0);
        const totalOccupants = roomsData.reduce((acc, r) => acc + (r.occupiedBeds || 0), 0);
        const totalVacantBeds = Math.max(0, totalCapacity - totalOccupants);
        const occRate = totalCapacity > 0 ? Math.round((totalOccupants / totalCapacity) * 100) : 0;

        // Update indicator chips
        const cAll = document.getElementById('count-all-rooms');
        const cVac = document.getElementById('count-vacant-rooms');
        const cFull = document.getElementById('count-full-rooms');
        if (cAll) cAll.innerText = totalRooms;
        if (cVac) cVac.innerText = vacantRooms;
        if (cFull) cFull.innerText = fullRooms;

        document.getElementById('dash-summary-rooms').innerText = totalRooms + ' Rooms';
        document.getElementById('dash-summary-occupants').innerText = totalOccupants + (totalOccupants === 1 ? ' Resident' : ' Residents');
        document.getElementById('dash-summary-vacant-beds').innerText = totalVacantBeds + ' Beds Available';
        document.getElementById('dash-summary-occupancy-rate').innerText = occRate + '%';

        // Filter the rooms list
        const filtered = roomsData.filter(r => {
          if (hostelVal !== 'ALL' && r.hostelId !== hostelVal) return false;
          if (currentVacancyFilter === 'VACANT' && (r.capacity - r.occupiedBeds) <= 0) return false;
          if (currentVacancyFilter === 'FULL' && r.occupiedBeds < r.capacity) return false;

          if (searchVal) {
            const numMatch = (r.roomNumber || '').toLowerCase().includes(searchVal);
            const typeMatch = (r.type || '').toLowerCase().includes(searchVal);
            const residentMatch = (r.beds || []).some(b => (b.occupantName || '').toLowerCase().includes(searchVal));
            if (!numMatch && !typeMatch && !residentMatch) return false;
          }

          return true;
        });

        const showingIndicator = document.getElementById('rooms-showing-indicator');
        if (showingIndicator) {
          showingIndicator.innerText = \`Displaying \${filtered.length} of \${totalRooms} rooms • \${totalVacantBeds} vacant beds available across campus\`;
        }

        if (filtered.length === 0) {
          grid.innerHTML = \`
            <div class="col-span-full py-12 text-center text-[#A0AEC0] italic bg-slate-50/60 rounded-2xl border border-dashed border-slate-200">
              <i data-lucide="info" class="w-6 h-6 mx-auto mb-1 text-slate-400"></i>
              <p class="font-bold text-slate-600">No rooms matched your filter.</p>
              <p class="text-xs text-slate-400 mt-0.5">Try resetting search or selecting "All Rooms".</p>
            </div>
          \`;
          lucide.createIcons();
          return;
        }

        grid.innerHTML = filtered.map(r => {
          const vacantCount = Math.max(0, r.capacity - r.occupiedBeds);
          const isFull = r.occupiedBeds >= r.capacity;
          const isMaint = r.status === 'UNDER_MAINTENANCE';
          const campusName = r.hostel?.name || 'Saltmere Ocean Campus';

          // Status Badge
          let statusBadge = \`
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>\${vacantCount} Vacant Bed\${vacantCount > 1 ? 's' : ''}</span>
            </span>
          \`;
          if (isMaint) {
            statusBadge = \`
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Maintenance
              </span>
            \`;
          } else if (isFull) {
            statusBadge = \`
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                Full (0 Vacant)
              </span>
            \`;
          }

          // Room Type pill
          let typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-800 border border-amber-200">DELUXE</span>';
          if (r.type === 'SINGLE') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-sky-50 text-sky-800 border border-sky-200">SINGLE</span>';
          } else if (r.type === 'DORMITORY') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">DORMITORY</span>';
          } else if (r.type === 'DELUXE_AC' || r.type === 'SUPER_DELUXE_AC') {
            typePill = '<span class="px-2 py-0.5 rounded text-[9px] font-bold bg-teal-50 text-teal-800 border border-teal-200">DELUXE AC</span>';
          }

          // Bed Slots Interactive Grid
          const bedsHtml = (r.beds || []).map(bed => {
            if (bed.isOccupied) {
              return \`
                <div class="p-2.5 rounded-xl bg-white border border-teal-200 shadow-2xs flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      B\${bed.bedNumber}
                    </div>
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-slate-900 truncate" title="\${bed.occupantName}">
                        \${bed.occupantName || 'Resident'}
                      </p>
                      <p class="text-[9px] text-teal-700 font-semibold flex items-center gap-0.5">
                        <span class="w-1 h-1 rounded-full bg-teal-500"></span>
                        <span>Occupied</span>
                      </p>
                    </div>
                  </div>
                  <button type="button" onclick="unassignStudentFromBed('\${r.id}', '\${bed.bookingId || ''}', '\${bed.admissionId || ''}', '\${bed.occupantName || ''}')" class="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-[10px] font-bold transition-colors cursor-pointer shrink-0" title="Check out / Vacate Bed">
                    Free
                  </button>
                </div>
              \`;
            } else {
              return \`
                <div class="p-2.5 rounded-xl bg-emerald-50/50 border border-dashed border-emerald-300 shadow-2xs flex items-center justify-between gap-1.5">
                  <div class="flex items-center gap-2 min-w-0">
                    <div class="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                      B\${bed.bedNumber}
                    </div>
                    <div class="min-w-0">
                      <p class="text-xs font-bold text-emerald-950">Bed \${bed.bedNumber}</p>
                      <p class="text-[9px] text-emerald-600 font-semibold">Vacant Bed</p>
                    </div>
                  </div>
                  <button type="button" onclick="openAssignStudentModal('\${r.id}', \${bed.bedNumber})" class="px-2.5 py-1 rounded-lg teal-gradient text-white text-[10px] font-bold transition-all shadow-2xs cursor-pointer shrink-0 active:scale-95 flex items-center gap-1">
                    <i data-lucide="plus" class="w-3 h-3"></i>
                    <span>Assign</span>
                  </button>
                </div>
              \`;
            }
          }).join('');

          const occPercent = Math.min(100, Math.round(((r.occupiedBeds || 0) / (r.capacity || 1)) * 100));

          return \`
            <div class="purity-card p-4 sm:p-5 flex flex-col justify-between hover:shadow-md transition-all border border-slate-200/80">
              <div>
                <!-- Top Card Header -->
                <div class="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div class="flex items-center gap-1.5">
                      <h4 class="text-base font-bold text-[#2D3748]">Room \${r.roomNumber}</h4>
                      \${typePill}
                    </div>
                    <p class="text-[10px] text-[#A0AEC0] mt-0.5">\${campusName} &bull; Floor \${r.floor} (\${r.wing || 'Wing'})</p>
                  </div>
                  \${statusBadge}
                </div>

                <!-- Room Occupancy & Capacity Bar -->
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100/90 my-2.5">
                  <div class="flex justify-between items-center text-xs mb-1.5 font-bold">
                    <span class="text-slate-600">People in Room: <span class="text-slate-900">\${r.occupiedBeds} / \${r.capacity}</span></span>
                    <span class="\${vacantCount > 0 ? 'text-emerald-600' : 'text-slate-400'}">\${vacantCount} Vacant</span>
                  </div>
                  <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div class="h-full teal-gradient rounded-full transition-all duration-300" style="width: \${occPercent}%"></div>
                  </div>
                </div>

                <!-- Bed Slots Matrix -->
                <div class="space-y-1.5 my-3">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Bed Slot Matrix</span>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    \${bedsHtml}
                  </div>
                </div>
              </div>

              <!-- Card Bottom Strip -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-1">
                <div>
                  <span class="text-[9px] text-[#A0AEC0] uppercase font-bold block">Monthly Rent</span>
                  <span class="text-xs font-bold text-[#2D3748]">₹\${(r.priceMonthly || 0).toLocaleString('en-IN')}/mo</span>
                </div>
                <div class="flex items-center gap-2">
                  \${vacantCount > 0 ? \`
                    <button type="button" onclick="openAssignStudentModal('\${r.id}')" class="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95">
                      <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
                      <span>Assign</span>
                    </button>
                  \` : \`
                    <span class="text-[11px] font-bold text-slate-400 px-2 py-1 bg-slate-100 rounded-lg">Full</span>
                  \`}
                </div>
              </div>
            </div>
          \`;
        }).join('');

        lucide.createIcons();
      }

      // =======================================================================
      // MODAL: ASSIGN STUDENT TO BED
      // =======================================================================
      function openAssignStudentModal(preselectedRoomId, preselectedBedNumber) {
        populateAssignModalOptions(preselectedRoomId, preselectedBedNumber);
        
        // Default check-in date to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('assign-checkin-date').value = today;

        openModal('assign-student-modal');
        lucide.createIcons();
      }

      function populateAssignModalOptions(preselectedRoomId, preselectedBedNumber) {
        const roomSelect = document.getElementById('assign-room-select');
        const applicantSelect = document.getElementById('assign-applicant-select');
        if (!roomSelect || !applicantSelect) return;

        // Populate Rooms (only rooms with capacity > 0)
        let roomOpts = '';
        roomsData.forEach(r => {
          const vacant = Math.max(0, r.capacity - r.occupiedBeds);
          const isSelected = preselectedRoomId ? r.id === preselectedRoomId : (vacant > 0 && !preselectedRoomId);
          roomOpts += \`<option value="\${r.id}" \${isSelected ? 'selected' : ''}>\${r.roomNumber} (\${r.type} - Floor \${r.floor}) - \${vacant} Vacant Bed\${vacant !== 1 ? 's' : ''}</option>\`;
        });
        roomSelect.innerHTML = roomOpts || '<option value="">No rooms available</option>';

        // Update bed numbers for current room
        onAssignRoomChange(preselectedBedNumber);

        // Populate unassigned or pending applicants
        const unassigned = admissionsData.filter(a => a.status !== 'ADMITTED' || !a.assignedRoomId);
        let appOpts = '<option value="">-- Choose an applicant from intake list --</option>';
        unassigned.forEach(a => {
          appOpts += \`<option value="\${a.id}" data-name="\${a.fullName}" data-phone="\${a.phone}" data-email="\${a.email}">\${a.fullName} (\${a.phone}) - Pref: \${(a.roomTypePreference || '').replace(/_/g, ' ')}</option>\`;
        });
        applicantSelect.innerHTML = appOpts;
      }

      function onAssignRoomChange(preselectedBedNumber) {
        const roomId = document.getElementById('assign-room-select').value;
        const bedSelect = document.getElementById('assign-bed-select');
        if (!roomId || !bedSelect) return;

        const room = roomsData.find(r => r.id === roomId);
        if (!room) return;

        // Auto-update rent and deposit
        document.getElementById('assign-rent').value = room.priceMonthly || 8500;
        document.getElementById('assign-deposit').value = room.securityDeposit || 10000;

        // Populate vacant beds
        const vacantBeds = (room.beds || []).filter(b => !b.isOccupied);
        let bedOpts = '';
        if (vacantBeds.length === 0) {
          bedOpts = '<option value="">Room is full (0 vacant beds)</option>';
        } else {
          vacantBeds.forEach(b => {
            const isSelected = preselectedBedNumber ? b.bedNumber === Number(preselectedBedNumber) : false;
            bedOpts += \`<option value="\${b.bedNumber}" \${isSelected ? 'selected' : ''}>Bed \${b.bedNumber} (Vacant Slot)</option>\`;
          });
        }
        bedSelect.innerHTML = bedOpts;
      }

      function toggleStudentSource(mode) {
        studentSourceMode = mode;
        const tabApplicant = document.getElementById('src-tab-applicant');
        const tabWalkin = document.getElementById('src-tab-walkin');
        const panelApplicant = document.getElementById('source-applicant-panel');
        const panelWalkin = document.getElementById('source-walkin-panel');

        if (mode === 'APPLICANT') {
          tabApplicant.className = 'py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer bg-white text-slate-800 shadow-2xs';
          tabWalkin.className = 'py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900';
          panelApplicant.classList.remove('hidden');
          panelWalkin.classList.add('hidden');
        } else {
          tabWalkin.className = 'py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer bg-white text-slate-800 shadow-2xs';
          tabApplicant.className = 'py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-600 hover:text-slate-900';
          panelWalkin.classList.remove('hidden');
          panelApplicant.classList.add('hidden');
        }
      }

      function onApplicantSelect() {
        const sel = document.getElementById('assign-applicant-select');
        const opt = sel.options[sel.selectedIndex];
        if (!opt || !opt.value) return;

        // Auto-fill walk-in fields as well for backup
        const name = opt.getAttribute('data-name');
        const phone = opt.getAttribute('data-phone');
        const email = opt.getAttribute('data-email');
        if (name) document.getElementById('assign-walkin-name').value = name;
        if (phone) document.getElementById('assign-walkin-phone').value = phone;
        if (email) document.getElementById('assign-walkin-email').value = email;
      }

      async function submitAssignStudent(e) {
        e.preventDefault();
        const roomId = document.getElementById('assign-room-select').value;
        const bedNumber = Number(document.getElementById('assign-bed-select').value);

        if (!roomId) {
          alert('Please select a room.');
          return;
        }

        let payload = {
          bedNumber: isNaN(bedNumber) ? 1 : bedNumber,
          checkInDate: document.getElementById('assign-checkin-date').value,
          tenureMonths: Number(document.getElementById('assign-tenure').value || 1),
          monthlyRent: Number(document.getElementById('assign-rent').value),
          securityDeposit: Number(document.getElementById('assign-deposit').value),
          paymentMethod: document.getElementById('assign-payment-method').value,
        };

        if (studentSourceMode === 'APPLICANT') {
          const applicantId = document.getElementById('assign-applicant-select').value;
          if (!applicantId) {
            alert('Please select an applicant or switch to Direct Walk-In.');
            return;
          }
          payload.admissionId = applicantId;
        } else {
          const name = document.getElementById('assign-walkin-name').value.trim();
          const phone = document.getElementById('assign-walkin-phone').value.trim();
          const email = document.getElementById('assign-walkin-email').value.trim();
          if (!name || !phone) {
            alert('Please enter resident name and phone number.');
            return;
          }
          payload.residentName = name;
          payload.residentPhone = phone;
          payload.residentEmail = email;
        }

        const submitBtn = document.getElementById('btn-submit-assign');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Allocating...</span>';
          lucide.createIcons();
        }

        try {
          const res = await fetch(\`/api/rooms/\${roomId}/assign-student\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Failed to allocate bed');

          showToast(result.message || 'Bed allocated successfully!');
          closeModal('assign-student-modal');
          document.getElementById('assign-student-form').reset();
          await fetchModuleData();
        } catch (err) {
          console.error(err);
          alert('Allocation Error: ' + err.message);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i data-lucide="check-circle-2" class="w-4 h-4"></i><span>Confirm Bed Allocation</span>';
            lucide.createIcons();
          }
        }
      }

      async function unassignStudentFromBed(roomId, bookingId, admissionId, residentName) {
        const confirmMsg = residentName
          ? \`Free up bed occupied by "\${residentName}" in this room?\`
          : 'Free up this occupied bed slot?';

        if (!confirm(confirmMsg)) return;

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
          if (!res.ok) throw new Error(result.message || 'Failed to vacate bed slot');

          showToast(result.message || 'Bed slot vacated successfully!');
          await fetchModuleData();
        } catch (err) {
          console.error(err);
          alert('Checkout Error: ' + err.message);
        }
      }

      // =======================================================================
      // ADMISSIONS / PROJECTS DIRECTORY & TIMELINE FEEDS
      // =======================================================================
      function renderProjectsTable(feeds) {
        const tbody = document.getElementById('projects-table-body');
        if (!tbody) return;

        let rows = [];
        if (feeds && feeds.recentAdmissions && feeds.recentAdmissions.length > 0) {
          rows = feeds.recentAdmissions.map(adm => ({
            name: adm.fullName,
            sub: (adm.roomTypePreference || '').replace(/_/g, ' '),
            room: adm.assignedRoomId ? 'Allocated' : 'Pending Allocation',
            budget: adm.status === 'APPROVED' ? 'Verified' : 'In Review',
            comp: adm.status === 'ADMITTED' ? 100 : adm.status === 'APPROVED' ? 80 : 35
          }));
        } else {
          rows = [
            { name: 'Aarav Sharma', sub: 'Deluxe AC Suite', room: 'D-202 (Floor 2)', budget: '₹19,800', comp: 100 },
            { name: 'Priya Patel', sub: 'Super Deluxe Single', room: 'SD-305 (Floor 3)', budget: '₹18,500', comp: 60 },
            { name: 'Rohan Deshmukh', sub: 'Normal Non-AC Double', room: 'N-108 (Floor 1)', budget: '₹6,800', comp: 25 },
            { name: 'Vikram Mehta', sub: 'Standard Non-AC Triple', room: 'S-302 (Floor 3)', budget: '₹5,200', comp: 100 },
            { name: 'Marcus Vance', sub: 'Deluxe Double AC', room: 'D-204 (Floor 2)', budget: '₹8,500', comp: 80 }
          ];
        }

        tbody.innerHTML = rows.map(row => \`
          <tr class="hover:bg-gray-50/50 transition-colors">
            <td class="py-3 px-2">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-xl teal-gradient flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
                  \${row.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div>
                  <p class="font-bold text-[#2D3748]">\${row.name}</p>
                  <p class="text-[10px] text-[#A0AEC0]">\${row.sub}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-2 text-[#718096]">
              <span class="px-2.5 py-1 rounded-lg bg-gray-100 text-[#2D3748] font-bold text-[10px]">\${row.room}</span>
            </td>
            <td class="py-3 px-2 font-bold text-[#2D3748]">\${row.budget}</td>
            <td class="py-3 px-2">
              <div class="w-28 sm:w-32">
                <div class="flex justify-between text-[10px] font-bold text-[#4FD1C5] mb-1">
                  <span>\${row.comp}%</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-[#4FD1C5] h-full rounded-full" style="width: \${row.comp}%"></div>
                </div>
              </div>
            </td>
          </tr>
        \`).join('');
      }

      function renderTimelineFeed(feeds) {
        const container = document.getElementById('timeline-feed');
        if (!container) return;

        let events = [];
        if (feeds) {
          if (feeds.recentPayments && feeds.recentPayments.length > 0) {
            feeds.recentPayments.slice(0, 3).forEach(p => {
              events.push({
                icon: 'credit-card',
                color: 'bg-emerald-500',
                title: '₹' + (p.amount || 0).toLocaleString('en-IN') + ' ' + (p.paymentType || '').replace(/_/g, ' ') + ' paid by ' + (p.payerName || 'Resident'),
                time: p.paidAt ? new Date(p.paidAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'
              });
            });
          }
          if (feeds.recentServices && feeds.recentServices.length > 0) {
            feeds.recentServices.slice(0, 3).forEach(s => {
              events.push({
                icon: 'wrench',
                color: s.urgency === 'EMERGENCY' ? 'bg-rose-500' : 'bg-blue-500',
                title: 'Room ' + (s.roomNumber || '') + ': ' + (s.serviceType || '').replace(/_/g, ' ') + ' (' + (s.status || '') + ')',
                time: s.createdAt ? new Date(s.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'
              });
            });
          }
        }

        if (events.length === 0) {
          events = [
            { icon: 'bell', color: 'bg-emerald-500', title: '₹19,800 Room rent paid by Aarav S.', time: '01 OCT 10:30 AM' },
            { icon: 'user-check', color: 'bg-teal-500', title: 'New admission approved #4219423', time: '18 OCT 02:15 PM' },
            { icon: 'wrench', color: 'bg-blue-500', title: 'AC Filter Serviced in Room D-202', time: '19 OCT 04:20 PM' },
            { icon: 'credit-card', color: 'bg-amber-500', title: 'New card transaction added for deposit', time: '20 DEC 03:52 PM' },
            { icon: 'key', color: 'bg-purple-500', title: 'Smart keycard paired for Bed B', time: '19 DEC 11:35 PM' },
            { icon: 'alert-circle', color: 'bg-rose-500', title: 'Emergency plumbing ticket logged in D-101', time: 'TODAY 11:00 AM' }
          ];
        }

        container.innerHTML = events.map(e => \`
          <div class="flex items-start gap-3">
            <div class="w-6 h-6 rounded-full \${e.color} text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <i data-lucide="\${e.icon}" class="w-3 h-3"></i>
            </div>
            <div>
              <p class="text-xs font-bold text-[#2D3748] leading-tight">\${e.title}</p>
              <p class="text-[10px] text-[#A0AEC0] mt-0.5">\${e.time}</p>
            </div>
          </div>
        \`).join('');
      }

      function handleSearch(val) {
        const q = val.toLowerCase();
        document.querySelectorAll('#projects-table-body tr').forEach(row => {
          row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
        });
      }

      setInterval(fetchModuleData, 15000);
      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'dashboard',
    pageTitle: 'Dashboard',
    breadcrumb: 'Dashboard',
    contentHtml,
    extraScripts,
  });
}
