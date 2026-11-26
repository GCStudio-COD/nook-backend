export function getAdminDashboardHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purity UI Dashboard | Saltmere Hostel ERP</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    body {
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      background-color: #F8F9FA;
      color: #2D3748;
    }
    .purity-card {
      background: #FFFFFF;
      border-radius: 20px;
      box-shadow: 0 20px 27px 0 rgba(0, 0, 0, 0.05);
      border: 1px solid rgba(226, 232, 240, 0.6);
    }
    .teal-gradient {
      background: linear-gradient(310deg, #319795 0%, #4FD1C5 100%);
    }
    .teal-gradient-card {
      background: linear-gradient(135deg, #4FD1C5 0%, #319795 100%);
    }
    .scrollbar-none::-webkit-scrollbar { display: none; }
  </style>
</head>
<body class="min-h-screen flex text-[#2D3748]">

  <!-- ========================================================================= -->
  <!-- 1. LEFT FLOATING SIDEBAR (Purity UI Style)                                -->
  <!-- ========================================================================= -->
  <aside class="w-64 fixed inset-y-0 left-0 z-50 p-4 hidden lg:flex flex-col justify-between">
    <div class="space-y-6">
      <!-- Brand Logo Header -->
      <div class="flex items-center gap-3 px-3 py-3">
        <div class="w-9 h-9 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md">
          <i data-lucide="building-2" class="w-5 h-5"></i>
        </div>
        <div>
          <h1 class="text-xs font-bold uppercase tracking-wider text-[#2D3748] leading-tight">PURITY UI HOSTEL</h1>
          <p class="text-[10px] text-[#A0AEC0] font-medium">Saltmere ERP Desk</p>
        </div>
      </div>

      <hr class="border-gray-200/80 my-2">

      <!-- Navigation Links -->
      <nav class="space-y-1 text-xs font-semibold">
        <!-- Dashboard (Active) -->
        <button onclick="switchView('dashboard')" id="nav-dashboard" class="nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-white text-[#2D3748] shadow-sm transition-all cursor-pointer">
          <div class="w-8 h-8 rounded-xl teal-gradient flex items-center justify-center text-white shadow-xs">
            <i data-lucide="layout-dashboard" class="w-4 h-4"></i>
          </div>
          <span>Dashboard</span>
        </button>

        <!-- Tables / Admissions -->
        <button onclick="switchView('admissions')" id="nav-admissions" class="nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all cursor-pointer">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="table-2" class="w-4 h-4"></i>
          </div>
          <span>Admissions (Tables)</span>
        </button>

        <!-- Billing / Financials -->
        <button onclick="switchView('financials')" id="nav-financials" class="nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all cursor-pointer">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="credit-card" class="w-4 h-4"></i>
          </div>
          <span>Billing &amp; Ledger</span>
        </button>

        <!-- Rooms & Beds Inventory -->
        <button onclick="switchView('rooms')" id="nav-rooms" class="nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all cursor-pointer">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="bed-double" class="w-4 h-4"></i>
          </div>
          <span>Rooms &amp; Inventory</span>
        </button>

        <!-- Maintenance Services -->
        <button onclick="switchView('services')" id="nav-services" class="nav-item w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all cursor-pointer">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="wrench" class="w-4 h-4"></i>
          </div>
          <span>Maintenance Desk</span>
        </button>

        <!-- Section: Account Pages -->
        <div class="pt-4 pb-2 px-3">
          <span class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0]">External Portals</span>
        </div>

        <a href="http://localhost:3000/student" target="_blank" class="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all no-underline">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="user-check" class="w-4 h-4"></i>
          </div>
          <span>Resident Portal ↗</span>
        </a>

        <a href="http://localhost:3000" target="_blank" class="flex items-center gap-3 px-3.5 py-3 rounded-2xl text-[#A0AEC0] hover:text-[#2D3748] hover:bg-white/60 transition-all no-underline">
          <div class="w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center">
            <i data-lucide="globe" class="w-4 h-4"></i>
          </div>
          <span>Public Website ↗</span>
        </a>
      </nav>
    </div>

    <!-- Bottom Help Card (Exact Purity UI Style) -->
    <div class="teal-gradient-card rounded-2xl p-4 text-white relative overflow-hidden shadow-lg mt-6">
      <div class="w-9 h-9 rounded-xl bg-white text-[#319795] flex items-center justify-center shadow-xs mb-3">
        <i data-lucide="help-circle" class="w-5 h-5"></i>
      </div>
      <h4 class="text-xs font-bold leading-tight">Need help?</h4>
      <p class="text-[10px] text-white/80 mt-0.5">Please check our docs</p>
      <a href="/api/rooms" target="_blank" class="mt-3 block text-center py-2 px-3 bg-white text-[#2D3748] font-bold text-[10px] rounded-xl uppercase tracking-wider shadow-xs hover:bg-gray-50 transition-colors no-underline">
        DOCUMENTATION
      </a>
      <!-- Background subtle decorative wave circle -->
      <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 pointer-events-none"></div>
    </div>
  </aside>

  <!-- ========================================================================= -->
  <!-- 2. MAIN CONTENT AREA                                                      -->
  <!-- ========================================================================= -->
  <div class="flex-1 lg:pl-68 flex flex-col min-w-0">

    <!-- Top Navigation Breadcrumbs & Controls Bar -->
    <header class="sticky top-0 z-40 bg-[#F8F9FA]/90 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-1.5 text-xs text-[#A0AEC0] font-normal">
          <span>Pages</span>
          <span>/</span>
          <span class="text-[#2D3748] font-medium" id="page-breadcrumb">Dashboard</span>
        </div>
        <h2 class="text-sm sm:text-base font-bold text-[#2D3748] mt-0.5" id="page-title">Dashboard</h2>
      </div>

      <!-- Right Controls: Search, Sign In, Settings, Bell, Refresh -->
      <div class="flex items-center gap-3">
        <!-- Search Input -->
        <div class="relative w-44 sm:w-52">
          <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input type="text" id="global-search" oninput="handleSearch(this.value)" placeholder="Type here..." class="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl text-[#2D3748] placeholder-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#4FD1C5]">
        </div>

        <!-- Live Server Status Badge -->
        <div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Port 5000</span>
        </div>

        <!-- Refresh Button -->
        <button onclick="fetchAllData()" title="Sync with database" class="p-2 rounded-xl bg-white border border-gray-200 text-[#718096] hover:text-[#2D3748] transition-colors cursor-pointer shadow-xs active:scale-95">
          <i data-lucide="refresh-cw" class="w-3.5 h-3.5" id="refresh-spin"></i>
        </button>

        <!-- Profile / Sign In -->
        <div class="flex items-center gap-1.5 text-xs font-bold text-[#718096] cursor-pointer hover:text-[#2D3748]">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">Admin</span>
        </div>

        <!-- Settings Icon -->
        <button class="p-1.5 text-[#718096] hover:text-[#2D3748] transition-colors">
          <i data-lucide="settings" class="w-3.5 h-3.5"></i>
        </button>

        <!-- Notification Bell -->
        <button class="relative p-1.5 text-[#718096] hover:text-[#2D3748] transition-colors">
          <i data-lucide="bell" class="w-3.5 h-3.5"></i>
          <span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-red-500"></span>
        </button>
      </div>
    </header>

    <!-- Main Container Body -->
    <main class="flex-1 px-6 py-4 space-y-6 max-w-7xl">

      <!-- ===================================================================== -->
      <!-- SECTION A: DASHBOARD VIEW                                             -->
      <!-- ===================================================================== -->
      <div id="view-dashboard" class="space-y-6">

        <!-- 1. TOP 4 STAT CARDS (Exact Purity UI Layout with Teal Rounded Icon) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Card 1: Today's Money / Revenue -->
          <div class="purity-card p-4 flex items-center justify-between">
            <div>
              <span class="text-[11px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Today's Revenue</span>
              <div class="flex items-baseline gap-1 mt-0.5">
                <span class="text-lg font-bold text-[#2D3748]">₹</span>
                <span class="text-lg font-bold text-[#2D3748]" id="stat-revenue">22,650</span>
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
                <span class="text-lg font-bold text-[#2D3748]" id="stat-occupied-beds">6 / 12</span>
                <span class="text-xs font-bold text-[#48BB78] ml-1.5" id="stat-occupancy-rate">50%</span>
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
                <span class="text-lg font-bold text-[#2D3748]" id="stat-admissions">3</span>
                <span class="text-xs font-bold text-[#E53E3E] ml-1.5" id="stat-pending-admissions">1 Pending</span>
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
                <span class="text-lg font-bold text-[#2D3748]" id="stat-vacant-beds">6 Beds</span>
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
                <span class="text-xs font-bold text-[#A0AEC0]">Built for hostel wardens</span>
                <h3 class="text-base sm:text-lg font-bold text-[#2D3748]">Saltmere ERP Dashboard</h3>
                <p class="text-xs text-[#718096] leading-relaxed pt-1">
                  From real-time room occupancy, biometric gate logs, to instant fee receipts and maintenance SLA resolution.
                </p>
                <div class="pt-4">
                  <a href="javascript:void(0)" onclick="switchView('admissions')" class="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D3748] hover:text-[#319795] transition-colors">
                    <span>Manage Admissions</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </a>
                </div>
              </div>

              <!-- Teal rounded emblem image / illustration container -->
              <div class="w-full sm:w-52 h-40 teal-gradient-card rounded-2xl flex flex-col items-center justify-center text-white shadow-md relative overflow-hidden shrink-0">
                <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-2">
                  <i data-lucide="sparkles" class="w-6 h-6 text-white"></i>
                </div>
                <span class="font-bold text-sm tracking-wide">SALTMERE</span>
                <span class="text-[10px] text-white/80 font-medium">Campus Cloud ERP</span>
              </div>
            </div>
          </div>

          <!-- Right: "Work with the Rockets" style photographic dark overlay card -->
          <div class="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-md flex flex-col justify-between p-6 text-white bg-cover bg-center" style="background-image: linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80');">
            <div>
              <h3 class="text-base sm:text-lg font-bold">Resident Welfare &amp; Facilities</h3>
              <p class="text-xs text-white/80 leading-relaxed mt-2">
                Uninterrupted gigabit Wi-Fi, 4-meal cafeteria nutrition inspection, and instant maintenance dispatch operate 24/7.
              </p>
            </div>
            <div class="pt-6">
              <a href="javascript:void(0)" onclick="switchView('services')" class="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#4FD1C5] transition-colors">
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
              <!-- The Charcoal / Dark Navy Container for Bar Chart -->
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
                <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-total-beds">12</p>
                <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 100%"></div>
                </div>
              </div>

              <div>
                <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
                  <i data-lucide="check-circle" class="w-3 h-3 text-[#4FD1C5]"></i>
                  <span>Filled</span>
                </div>
                <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-occupied-beds">6</p>
                <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 50%"></div>
                </div>
              </div>

              <div>
                <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
                  <i data-lucide="door-open" class="w-3 h-3 text-[#4FD1C5]"></i>
                  <span>Vacant</span>
                </div>
                <p class="text-xs font-bold text-[#2D3748] mt-0.5" id="mini-vacant-beds">6</p>
                <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 50%"></div>
                </div>
              </div>

              <div>
                <div class="flex items-center gap-1 text-[#A0AEC0] text-[10px] font-bold">
                  <i data-lucide="layers" class="w-3 h-3 text-[#4FD1C5]"></i>
                  <span>Rooms</span>
                </div>
                <p class="text-xs font-bold text-[#2D3748] mt-0.5">7</p>
                <div class="w-full bg-gray-100 h-1 rounded-full mt-1.5 overflow-hidden">
                  <div class="bg-[#4FD1C5] h-full rounded-full" style="width: 70%"></div>
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

        <!-- 4. FOURTH ROW: DATA TABLE & ORDERS TIMELINE -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Left: "Projects" style table (~65% width) -->
          <div class="lg:col-span-8 purity-card p-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h4 class="text-sm font-bold text-[#2D3748]">Active Allocations &amp; Admissions</h4>
                <p class="text-xs text-[#718096] flex items-center gap-1 mt-0.5">
                  <i data-lucide="check" class="w-3.5 h-3.5 text-[#48BB78]"></i>
                  <span id="table-subtitle">30 done this month</span>
                </p>
              </div>
              <button class="text-[#A0AEC0] hover:text-[#2D3748]">
                <i data-lucide="more-vertical" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Table -->
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
                  <!-- Injected via JavaScript -->
                </tbody>
              </table>
            </div>
          </div>

          <!-- Right: "Orders overview" style vertical timeline (~35% width) -->
          <div class="lg:col-span-4 purity-card p-5 sm:p-6">
            <div class="mb-5">
              <h4 class="text-sm font-bold text-[#2D3748]">Orders &amp; Activity Overview</h4>
              <p class="text-xs text-[#718096] mt-0.5"><span class="font-bold text-[#48BB78]">+30%</span> this month</p>
            </div>

            <!-- Timeline Items -->
            <div class="space-y-4" id="timeline-feed">
              <!-- Injected via JavaScript -->
            </div>
          </div>
        </div>

      </div>

      <!-- ===================================================================== -->
      <!-- SECTION B: ADMISSIONS / TABLES VIEW                                  -->
      <!-- ===================================================================== -->
      <div id="view-admissions" class="hidden space-y-6">
        <div class="purity-card p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 class="text-base font-bold text-[#2D3748]">Student Admission Tables</h3>
              <p class="text-xs text-[#718096]">Verify identity proofs, guardian contacts, and allocate rooms.</p>
            </div>
            <button onclick="openModal('add-admission-modal')" class="px-4 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity">
              + New Intake
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                  <th class="pb-3 px-3">APPLICANT</th>
                  <th class="pb-3 px-3">CONTACT</th>
                  <th class="pb-3 px-3">ROOM TYPE</th>
                  <th class="pb-3 px-3">VERIFICATION ID</th>
                  <th class="pb-3 px-3">STATUS</th>
                  <th class="pb-3 px-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody id="admissions-full-tbody" class="divide-y divide-gray-100 font-medium"></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- SECTION C: ROOMS INVENTORY VIEW                                       -->
      <!-- ===================================================================== -->
      <div id="view-rooms" class="hidden space-y-6">
        <div class="purity-card p-6">
          <div class="mb-6 pb-4 border-b border-gray-100">
            <h3 class="text-base font-bold text-[#2D3748]">Rooms &amp; Bed Capacity</h3>
            <p class="text-xs text-[#718096]">Live inventory across floors with bed occupancy meters.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="rooms-full-grid"></div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- SECTION D: MAINTENANCE DESK                                           -->
      <!-- ===================================================================== -->
      <div id="view-services" class="hidden space-y-6">
        <div class="purity-card p-6">
          <div class="mb-6 pb-4 border-b border-gray-100">
            <h3 class="text-base font-bold text-[#2D3748]">Facilities Maintenance Work Orders</h3>
            <p class="text-xs text-[#718096]">Assign staff technicians and record maintenance resolutions.</p>
          </div>
          <div class="space-y-3.5" id="services-full-list"></div>
        </div>
      </div>

      <!-- ===================================================================== -->
      <!-- SECTION E: BILLING & FINANCIALS VIEW                                  -->
      <!-- ===================================================================== -->
      <div id="view-financials" class="hidden space-y-6">
        <div class="purity-card p-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
            <div>
              <h3 class="text-base font-bold text-[#2D3748]">Billing Information &amp; Invoices</h3>
              <p class="text-xs text-[#718096]">Reconciled transactions across room rents and deposits.</p>
            </div>
            <button onclick="openModal('record-payment-modal')" class="px-4 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-sm hover:opacity-90 transition-opacity">
              + Record Receipt
            </button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                  <th class="pb-3 px-3">INVOICE NO</th>
                  <th class="pb-3 px-3">PAYER</th>
                  <th class="pb-3 px-3">TXN ID</th>
                  <th class="pb-3 px-3">CATEGORY</th>
                  <th class="pb-3 px-3">METHOD</th>
                  <th class="pb-3 px-3">AMOUNT</th>
                  <th class="pb-3 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody id="financials-full-tbody" class="divide-y divide-gray-100 font-medium"></tbody>
            </table>
          </div>
        </div>
      </div>

    </main>
  </div>

  <!-- Modal: Add Admission -->
  <div id="add-admission-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
    <div class="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
      <button onclick="closeModal('add-admission-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg cursor-pointer">&times;</button>
      <h3 class="text-base font-bold text-[#2D3748] mb-1">Register Student Intake</h3>
      <p class="text-xs text-gray-500 mb-4">Adds application directly into backend PostgreSQL database.</p>
      <form onsubmit="submitNewAdmission(event)" class="space-y-3 text-xs">
        <div class="grid grid-cols-2 gap-3">
          <input type="text" id="adm-name" required placeholder="Full Name" class="p-2.5 rounded-xl border border-gray-200">
          <select id="adm-gender" class="p-2.5 rounded-xl border border-gray-200 cursor-pointer">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <input type="email" id="adm-email" required placeholder="Email Address" class="p-2.5 rounded-xl border border-gray-200">
          <input type="tel" id="adm-phone" required placeholder="Phone Number" class="p-2.5 rounded-xl border border-gray-200">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <select id="adm-room-type" class="p-2.5 rounded-xl border border-gray-200 cursor-pointer">
            <option value="DELUXE_AC">Deluxe AC</option>
            <option value="SUPER_DELUXE_AC">Super Deluxe AC</option>
            <option value="NORMAL_NON_AC">Normal Non-AC</option>
            <option value="STANDARD_NON_AC">Standard Non-AC</option>
          </select>
          <input type="text" id="adm-college" placeholder="College / Work" class="p-2.5 rounded-xl border border-gray-200">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <input type="text" id="adm-guardian-name" required placeholder="Guardian Name" class="p-2.5 rounded-xl border border-gray-200">
          <input type="tel" id="adm-guardian-phone" required placeholder="Guardian Phone" class="p-2.5 rounded-xl border border-gray-200">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <select id="adm-id-type" class="p-2.5 rounded-xl border border-gray-200">
            <option>Aadhaar Card</option><option>Passport</option><option>Student ID</option>
          </select>
          <input type="text" id="adm-id-number" required placeholder="ID Number" class="p-2.5 rounded-xl border border-gray-200">
        </div>
        <input type="text" id="adm-address" required placeholder="Permanent Address" class="w-full p-2.5 rounded-xl border border-gray-200">
        <button type="submit" class="w-full py-3 rounded-xl teal-gradient text-white font-bold cursor-pointer shadow-md mt-2">Submit Intake</button>
      </form>
    </div>
  </div>

  <!-- Modal: Record Payment -->
  <div id="record-payment-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
    <div class="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
      <button onclick="closeModal('record-payment-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg cursor-pointer">&times;</button>
      <h3 class="text-base font-bold text-[#2D3748] mb-1">Record Fee Receipt</h3>
      <p class="text-xs text-gray-500 mb-4">Post directly to backend financial register.</p>
      <form onsubmit="submitNewPayment(event)" class="space-y-3 text-xs">
        <input type="text" id="pay-name" required placeholder="Payer Name" class="w-full p-2.5 rounded-xl border border-gray-200">
        <input type="email" id="pay-email" required placeholder="Payer Email" class="w-full p-2.5 rounded-xl border border-gray-200">
        <div class="grid grid-cols-2 gap-3">
          <input type="number" id="pay-amount" required min="1" value="8500" class="p-2.5 rounded-xl border border-gray-200 font-bold">
          <select id="pay-method" class="p-2.5 rounded-xl border border-gray-200 cursor-pointer">
            <option>UPI (GPay / PhonePe)</option>
            <option>NetBanking HDFC</option>
            <option>Debit Card</option>
            <option>Credit Card</option>
            <option>Cash at Office</option>
          </select>
        </div>
        <select id="pay-type" class="w-full p-2.5 rounded-xl border border-gray-200 cursor-pointer">
          <option value="ROOM_RENT">Room Rent</option>
          <option value="ADMISSION_FEE">Admission Fee</option>
          <option value="SECURITY_DEPOSIT">Security Deposit</option>
          <option value="SERVICE_CHARGE">Service Charge</option>
          <option value="MESS_FEE">Mess Fee</option>
        </select>
        <button type="submit" class="w-full py-3 rounded-xl teal-gradient text-white font-bold cursor-pointer shadow-md mt-2">Generate Receipt</button>
      </form>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast" class="fixed top-5 right-6 z-50 hidden bg-[#2D3748] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold"></div>

  <!-- Client JavaScript -->
  <script>
    let globalData = null;
    let globalRooms = [];
    let globalAdmissions = [];
    let globalServices = [];
    let globalPayments = [];
    let barChartInstance = null;
    let lineChartInstance = null;

    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.remove('hidden');
      setTimeout(() => t.classList.add('hidden'), 3500);
    }

    function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

    function switchView(viewId) {
      document.querySelectorAll('#view-dashboard, #view-admissions, #view-rooms, #view-services, #view-financials').forEach(el => el.classList.add('hidden'));
      document.getElementById('view-' + viewId).classList.remove('hidden');

      // Update sidebar active states
      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-white', 'text-[#2D3748]', 'shadow-sm');
        btn.classList.add('text-[#A0AEC0]');
        const iconDiv = btn.querySelector('div');
        if (iconDiv) {
          iconDiv.className = 'w-8 h-8 rounded-xl bg-white text-[#4FD1C5] shadow-xs border border-gray-100 flex items-center justify-center';
        }
      });

      const activeBtn = document.getElementById('nav-' + viewId);
      if (activeBtn) {
        activeBtn.classList.add('bg-white', 'text-[#2D3748]', 'shadow-sm');
        activeBtn.classList.remove('text-[#A0AEC0]');
        const activeIconDiv = activeBtn.querySelector('div');
        if (activeIconDiv) {
          activeIconDiv.className = 'w-8 h-8 rounded-xl teal-gradient flex items-center justify-center text-white shadow-xs';
        }
      }

      // Title & Breadcrumb
      const names = {
        dashboard: 'Dashboard',
        admissions: 'Admissions Table',
        rooms: 'Rooms Inventory',
        services: 'Maintenance Desk',
        financials: 'Billing & Financials'
      };
      document.getElementById('page-breadcrumb').innerText = names[viewId] || 'Dashboard';
      document.getElementById('page-title').innerText = names[viewId] || 'Dashboard';

      lucide.createIcons();
    }

    async function fetchAllData() {
      const spin = document.getElementById('refresh-spin');
      if (spin) spin.classList.add('animate-spin');

      try {
        const [dashRes, roomsRes, admRes, svcRes, payRes] = await Promise.all([
          fetch('/api/admin/dashboard').then(r => r.json()),
          fetch('/api/rooms').then(r => r.json()),
          fetch('/api/admissions').then(r => r.json()),
          fetch('/api/services').then(r => r.json()),
          fetch('/api/payments').then(r => r.json())
        ]);

        globalData = dashRes;
        globalRooms = roomsRes;
        globalAdmissions = admRes;
        globalServices = svcRes;
        globalPayments = payRes;

        renderTopStats(dashRes.kpi);
        renderCharts(dashRes.kpi);
        renderProjectsTable(dashRes.feeds);
        renderTimelineFeed(dashRes.feeds);

        renderFullAdmissions();
        renderFullRooms();
        renderFullServices();
        renderFullFinancials();
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        if (spin) spin.classList.remove('animate-spin');
        lucide.createIcons();
      }
    }

    function renderTopStats(kpi) {
      if (!kpi) return;
      document.getElementById('stat-revenue').innerText = kpi.financials.totalRevenue.toLocaleString('en-IN');
      document.getElementById('stat-occupied-beds').innerText = kpi.occupancy.occupiedBeds + ' / ' + kpi.occupancy.totalCapacity;
      document.getElementById('stat-occupancy-rate').innerText = kpi.occupancy.occupancyRate + '%';
      document.getElementById('stat-admissions').innerText = kpi.admissions.total;
      document.getElementById('stat-pending-admissions').innerText = kpi.admissions.pending + ' Pending';
      document.getElementById('stat-vacant-beds').innerText = kpi.occupancy.vacantBeds + ' Beds';

      document.getElementById('mini-total-beds').innerText = kpi.occupancy.totalCapacity;
      document.getElementById('mini-occupied-beds').innerText = kpi.occupancy.occupiedBeds;
      document.getElementById('mini-vacant-beds').innerText = kpi.occupancy.vacantBeds;
    }

    function renderCharts(kpi) {
      // 1. Dark Bar Chart (White bars on dark charcoal background)
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

      // 2. Dual Wave Area Chart (Mint-Teal gradient fill + Dark Line)
      const lineCtx = document.getElementById('lineChart')?.getContext('2d');
      if (lineCtx) {
        if (lineChartInstance) lineChartInstance.destroy();

        const tealGradient = lineCtx.createLinearGradient(0, 0, 0, 250);
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

    function renderProjectsTable(feeds) {
      const tbody = document.getElementById('projects-table-body');
      if (!tbody) return;

      const items = (feeds?.recentAdmissions || []).concat(feeds?.recentBookings || []);
      const avatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80'
      ];

      const sampleRows = [
        { name: 'Aarav Sharma', sub: 'Deluxe AC Suite', room: 'D-202 (Floor 2)', budget: '₹19,800', comp: 100 },
        { name: 'Priya Patel', sub: 'Super Deluxe Single', room: 'SD-305 (Floor 3)', budget: '₹18,500', comp: 60 },
        { name: 'Rohan Deshmukh', sub: 'Normal Non-AC Double', room: 'N-108 (Floor 1)', budget: '₹6,800', comp: 25 },
        { name: 'Vikram Mehta', sub: 'Standard Non-AC Triple', room: 'S-302 (Floor 3)', budget: '₹5,200', comp: 100 },
        { name: 'Marcus Vance', sub: 'Deluxe Double AC', room: 'D-204 (Floor 2)', budget: '₹8,500', comp: 80 }
      ];

      tbody.innerHTML = sampleRows.map((row, idx) => \`
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
            <div class="w-32">
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

      const events = [
        { icon: 'bell', color: 'bg-emerald-500', title: '₹19,800 Room rent paid by Aarav S.', time: '01 OCT 10:30 AM' },
        { icon: 'user-check', color: 'bg-teal-500', title: 'New admission approved #4219423', time: '18 OCT 02:15 PM' },
        { icon: 'wrench', color: 'bg-blue-500', title: 'AC Filter Serviced in Room D-202', time: '19 OCT 04:20 PM' },
        { icon: 'credit-card', color: 'bg-amber-500', title: 'New card transaction added for deposit', time: '20 DEC 03:52 PM' },
        { icon: 'key', color: 'bg-purple-500', title: 'Smart keycard paired for Bed B', time: '19 DEC 11:35 PM' },
        { icon: 'alert-circle', color: 'bg-rose-500', title: 'Emergency plumbing ticket logged in D-101', time: 'TODAY 11:00 AM' }
      ];

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

    function renderFullAdmissions() {
      const tbody = document.getElementById('admissions-full-tbody');
      if (!tbody) return;
      tbody.innerHTML = globalAdmissions.map(a => \`
        <tr class="hover:bg-gray-50/50 transition-colors">
          <td class="py-3 px-3">
            <p class="font-bold text-[#2D3748]">\${a.fullName}</p>
            <p class="text-[10px] text-[#A0AEC0]">\${a.email}</p>
          </td>
          <td class="py-3 px-3 text-[#718096]">\${a.phone}</td>
          <td class="py-3 px-3 font-semibold text-[#2D3748]">\${a.roomTypePreference.replace(/_/g, ' ')}</td>
          <td class="py-3 px-3 text-[11px] font-mono">\${a.idProofType} (\${a.idProofNumber})</td>
          <td class="py-3 px-3">
            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase \${a.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : a.status === 'ADMITTED' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}">\${a.status}</span>
          </td>
          <td class="py-3 px-3 text-right">
            \${a.status === 'PENDING' ? \`<button onclick="updateAdmissionStatus('\${a.id}', 'APPROVED')" class="px-3 py-1 bg-[#4FD1C5] hover:bg-[#319795] text-white rounded-lg text-xs font-bold shadow-xs">Approve</button>\` : ''}
            \${a.status === 'APPROVED' ? \`<button onclick="updateAdmissionStatus('\${a.id}', 'ADMITTED')" class="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-xs">Admit</button>\` : ''}
          </td>
        </tr>
      \`).join('');
    }

    function renderFullRooms() {
      const grid = document.getElementById('rooms-full-grid');
      if (!grid) return;
      grid.innerHTML = globalRooms.map(r => {
        const isFull = r.occupiedBeds >= r.capacity;
        return \`
          <div class="purity-card p-5 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold text-[#2D3748]">Room \${r.roomNumber}</span>
                <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase \${isFull ? 'bg-gray-100 text-gray-700' : 'bg-emerald-100 text-emerald-800'}">
                  \${isFull ? 'Full' : (r.capacity - r.occupiedBeds) + ' Vacant'}
                </span>
              </div>
              <p class="text-[11px] text-[#718096] mb-3">Floor \${r.floor} · \${r.type.replace(/_/g, ' ')}</p>
              <div class="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-3">
                <div class="bg-[#4FD1C5] h-full rounded-full" style="width: \${(r.occupiedBeds / r.capacity) * 100}%"></div>
              </div>
            </div>
            <div class="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span class="text-xs font-bold text-[#2D3748]">₹\${r.priceMonthly.toLocaleString('en-IN')} / mo</span>
              <span class="text-[10px] text-[#A0AEC0]">\${r.occupiedBeds} / \${r.capacity} Beds</span>
            </div>
          </div>
        \`;
      }).join('');
    }

    function renderFullServices() {
      const list = document.getElementById('services-full-list');
      if (!list) return;
      list.innerHTML = globalServices.map(s => \`
        <div class="purity-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="font-bold text-xs text-[#2D3748]">Room \${s.roomNumber}</span>
              <span class="text-xs text-[#718096]">· \${s.serviceType.replace(/_/g, ' ')}</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase \${s.urgency === 'EMERGENCY' ? 'bg-rose-100 text-rose-800' : 'bg-gray-100'}">\${s.urgency}</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase \${s.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}">\${s.status}</span>
            </div>
            <p class="text-xs text-[#718096]">\${s.instructions || 'Routine facilities check'}</p>
          </div>
          <div>
            \${s.status !== 'COMPLETED' ? \`<button onclick="updateServiceStatus('\${s.id}', 'COMPLETED')" class="px-3.5 py-1.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-xs">Resolve</button>\` : '<span class="text-xs font-bold text-emerald-600">Resolved ✓</span>'}
          </div>
        </div>
      \`).join('');
    }

    function renderFullFinancials() {
      const tbody = document.getElementById('financials-full-tbody');
      if (!tbody) return;
      tbody.innerHTML = globalPayments.map(p => \`
        <tr class="hover:bg-gray-50/50 transition-colors">
          <td class="py-3 px-3 font-mono font-medium text-[#2D3748]">\${p.invoiceNumber}</td>
          <td class="py-3 px-3">
            <p class="font-bold text-[#2D3748]">\${p.payerName}</p>
            <p class="text-[10px] text-[#A0AEC0]">\${p.payerEmail}</p>
          </td>
          <td class="py-3 px-3 font-mono text-[11px] text-[#718096]">\${p.transactionId}</td>
          <td class="py-3 px-3 text-[#2D3748]">\${p.paymentType.replace(/_/g, ' ')}</td>
          <td class="py-3 px-3 text-[#718096]">\${p.paymentMethod}</td>
          <td class="py-3 px-3 font-bold text-[#2D3748]">₹\${p.amount.toLocaleString('en-IN')}</td>
          <td class="py-3 px-3">
            <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800">\${p.status}</span>
          </td>
        </tr>
      \`).join('');
    }

    async function updateAdmissionStatus(id, status) {
      try {
        const res = await fetch('/api/admissions/' + id + '/status', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Admission updated to ' + status);
        fetchAllData();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    async function updateServiceStatus(id, status) {
      try {
        const res = await fetch('/api/services/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
        if (!res.ok) throw new Error('Update failed');
        showToast('Service ticket resolved');
        fetchAllData();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    async function submitNewAdmission(e) {
      e.preventDefault();
      const body = {
        fullName: document.getElementById('adm-name').value,
        gender: document.getElementById('adm-gender').value,
        email: document.getElementById('adm-email').value,
        phone: document.getElementById('adm-phone').value,
        roomTypePreference: document.getElementById('adm-room-type').value,
        collegeOrWork: document.getElementById('adm-college').value,
        guardianName: document.getElementById('adm-guardian-name').value,
        guardianPhone: document.getElementById('adm-guardian-phone').value,
        idProofType: document.getElementById('adm-id-type').value,
        idProofNumber: document.getElementById('adm-id-number').value,
        address: document.getElementById('adm-address').value
      };

      try {
        const res = await fetch('/api/admissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('Failed to create intake');
        showToast('New admission intake registered');
        closeModal('add-admission-modal');
        fetchAllData();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    async function submitNewPayment(e) {
      e.preventDefault();
      const body = {
        payerName: document.getElementById('pay-name').value,
        payerEmail: document.getElementById('pay-email').value,
        amount: Number(document.getElementById('pay-amount').value),
        paymentMethod: document.getElementById('pay-method').value,
        paymentType: document.getElementById('pay-type').value
      };

      try {
        const res = await fetch('/api/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!res.ok) throw new Error('Failed to record payment');
        showToast('Receipt recorded');
        closeModal('record-payment-modal');
        fetchAllData();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    function handleSearch(val) {
      const q = val.toLowerCase();
      // Simple filter across table rows
      document.querySelectorAll('#projects-table-body tr').forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    // Auto-sync every 15s
    setInterval(fetchAllData, 15000);
    // Initial fetch
    fetchAllData();
  </script>
</body>
</html>`;
}
