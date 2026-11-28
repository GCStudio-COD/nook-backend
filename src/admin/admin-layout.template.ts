export interface AdminLayoutOptions {
  activeRoute: 'dashboard' | 'hostels' | 'floorplan' | 'admissions' | 'billing' | 'rooms' | 'maintenance';
  pageTitle: string;
  breadcrumb: string;
  contentHtml: string;
  extraScripts?: string;
}

function renderSidebarHtml(activeRoute: string, isMobile = false): string {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', href: '/admin', icon: 'layout-dashboard' },
    { id: 'hostels', label: 'Campuses', href: '/admin/hostels', icon: 'building-2' },
    { id: 'floorplan', label: '2D Floorplan', href: '/admin/floorplan', icon: 'map' },
    { id: 'rooms', label: 'Rooms & Beds', href: '/admin/rooms', icon: 'bed-double' },
    { id: 'admissions', label: 'Admissions', href: '/admin/admissions', icon: 'users' },
    { id: 'billing', label: 'Billing & Ledger', href: '/admin/billing', icon: 'credit-card' },
    { id: 'maintenance', label: 'Maintenance', href: '/admin/maintenance', icon: 'wrench' },
  ];

  const externalNav = [
    { id: 'student-portal', label: 'Resident Portal', href: 'http://localhost:3000/student', icon: 'graduation-cap' },
    { id: 'public-site', label: 'Public Website', href: 'http://localhost:3000', icon: 'globe' },
  ];

  return `
    <!-- Brand Header -->
    <div class="h-16 px-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
      <a href="/admin" class="flex items-center gap-3 no-underline group">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/30 group-hover:scale-105 transition-transform shrink-0">
          <i data-lucide="building-2" class="w-5 h-5 text-white"></i>
        </div>
        <div class="min-w-0">
          <h1 class="text-sm font-extrabold text-slate-900 leading-tight tracking-tight truncate">Nook Living</h1>
          <p class="text-[11px] text-slate-400 font-medium leading-none mt-0.5 truncate">Admin Workspace</p>
        </div>
      </a>
      ${isMobile ? `
      <button onclick="toggleMobileSidebar()" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>` : ''}
    </div>

    <!-- Clean Navigation Menu -->
    <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
      <!-- Main Menu -->
      <div>
        <span class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">MENU</span>
        <nav class="space-y-1">
          ${mainNav.map(item => {
            const isActive = activeRoute === item.id;
            if (isActive) {
              return `
                <a href="${item.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-xs shadow-sm shadow-teal-600/25 transition-all no-underline">
                  <i data-lucide="${item.icon}" class="w-4 h-4 text-white shrink-0"></i>
                  <span class="truncate">${item.label}</span>
                </a>
              `;
            } else {
              return `
                <a href="${item.href}" class="group flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 font-medium text-xs transition-colors no-underline">
                  <i data-lucide="${item.icon}" class="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors shrink-0"></i>
                  <span class="truncate">${item.label}</span>
                </a>
              `;
            }
          }).join('')}
        </nav>
      </div>

      <!-- External Links -->
      <div>
        <span class="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-mono">PORTALS</span>
        <nav class="space-y-1">
          ${externalNav.map(item => `
            <a href="${item.href}" target="_blank" class="group flex items-center justify-between px-3 py-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100/70 font-medium text-xs transition-colors no-underline">
              <div class="flex items-center gap-3 min-w-0">
                <i data-lucide="${item.icon}" class="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0"></i>
                <span class="truncate">${item.label}</span>
              </div>
              <i data-lucide="external-link" class="w-3 h-3 text-slate-300 group-hover:text-slate-500 shrink-0"></i>
            </a>
          `).join('')}
        </nav>
      </div>
    </div>

    <!-- Sleek Bottom User Bar -->
    <div class="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0">
      <div class="flex items-center justify-between px-2.5 py-2 rounded-xl bg-white border border-slate-200/70 shadow-2xs">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="relative shrink-0">
            <div class="w-7 h-7 rounded-full bg-slate-800 text-white font-bold text-[11px] flex items-center justify-center">
              AD
            </div>
            <span class="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <div class="min-w-0">
            <p class="text-xs font-bold text-slate-800 truncate leading-tight">Chief Admin</p>
            <p class="text-[10px] text-slate-400 truncate leading-none mt-0.5">Online</p>
          </div>
        </div>
        <a href="http://localhost:3000" target="_blank" title="Exit to Public Web" class="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
          <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>
  `;
}

export function renderAdminLayout(options: AdminLayoutOptions): string {
  const { activeRoute, pageTitle, breadcrumb, contentHtml, extraScripts = '' } = options;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pageTitle} | Nook Living ERP</title>
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
      border: 1px solid rgba(226, 232, 240, 0.7);
    }
    .teal-gradient {
      background: linear-gradient(310deg, #319795 0%, #4FD1C5 100%);
    }
    .teal-gradient-card {
      background: linear-gradient(135deg, #4FD1C5 0%, #319795 100%);
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #E2E8F0;
      border-radius: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #CBD5E1;
    }
  </style>
</head>
<body class="bg-[#F8F9FA] text-[#2D3748] min-h-screen antialiased flex">

  <!-- ========================================================================= -->
  <!-- 1. LEFT SIDEBAR (Desktop Sticky Panel - Clean Zero Overlap Flex Sibling)   -->
  <!-- ========================================================================= -->
  <aside class="w-64 shrink-0 hidden lg:flex flex-col justify-between sticky top-0 h-screen bg-white border-r border-slate-200/80 shadow-xs z-30 select-none">
    ${renderSidebarHtml(activeRoute, false)}
  </aside>

  <!-- Mobile Drawer Backdrop & Sidebar -->
  <div id="mobile-sidebar-backdrop" onclick="toggleMobileSidebar()" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 hidden lg:hidden transition-opacity"></div>
  <aside id="mobile-sidebar" class="fixed inset-y-0 left-0 w-64 bg-white z-50 flex flex-col justify-between border-r border-slate-200 shadow-2xl -translate-x-full lg:hidden transition-transform duration-200 ease-in-out select-none">
    ${renderSidebarHtml(activeRoute, true)}
  </aside>

  <!-- ========================================================================= -->
  <!-- 2. MAIN CONTENT AREA (Clean Flex Child - Guaranteed Zero Overlap)           -->
  <!-- ========================================================================= -->
  <div class="flex-1 min-w-0 flex flex-col p-4 sm:p-6 lg:p-8 space-y-6">

    <!-- Top Navigation Header -->
    <header class="bg-[#F8F9FA]/90 backdrop-blur-md pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Hamburger Button -->
        <button onclick="toggleMobileSidebar()" class="lg:hidden p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer active:scale-95" title="Toggle navigation menu">
          <i data-lucide="menu" class="w-4 h-4"></i>
        </button>
        <div>
          <div class="flex items-center gap-1.5 text-xs text-[#A0AEC0] font-normal">
            <span>Pages</span>
            <span>/</span>
            <span class="text-[#2D3748] font-medium">${breadcrumb}</span>
          </div>
          <h2 class="text-sm sm:text-base font-bold text-[#2D3748] mt-0.5">${pageTitle}</h2>
        </div>
      </div>

      <!-- Right Controls -->
      <div class="flex items-center gap-3">
        <div class="relative w-44 sm:w-56">
          <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
          <input type="text" id="module-search" oninput="if(typeof handleSearch === 'function') handleSearch(this.value)" placeholder="Type here..." class="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-gray-200 rounded-xl text-[#2D3748] placeholder-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#4FD1C5]">
        </div>

        <div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Port 5000</span>
        </div>

        <button onclick="if(typeof fetchModuleData === 'function') fetchModuleData()" title="Sync with database" class="p-2 rounded-xl bg-white border border-gray-200 text-[#718096] hover:text-[#2D3748] transition-colors cursor-pointer shadow-xs active:scale-95">
          <i data-lucide="refresh-cw" class="w-3.5 h-3.5" id="refresh-spin"></i>
        </button>

        <div class="flex items-center gap-1.5 text-xs font-bold text-[#718096]">
          <i data-lucide="user" class="w-3.5 h-3.5"></i>
          <span class="hidden sm:inline">Admin</span>
        </div>

        <button class="p-1.5 text-[#718096] hover:text-[#2D3748]">
          <i data-lucide="settings" class="w-3.5 h-3.5"></i>
        </button>

        <!-- Notification Bell Trigger & Interactive Dropdown -->
        <div class="relative" id="admin-notif-container">
          <button id="admin-notif-btn" type="button" onclick="toggleAdminNotifications()" class="relative p-2 rounded-xl bg-white border border-gray-200 text-[#718096] hover:text-[#2D3748] transition-colors cursor-pointer shadow-xs active:scale-95" title="Notifications">
            <i data-lucide="bell" class="w-4 h-4"></i>
            <span id="notif-badge" class="hidden absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">0</span>
          </button>

          <!-- Notification Center Dropdown Flyout -->
          <div id="admin-notif-dropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden text-left transition-all">
            <!-- Header -->
            <div class="p-3.5 px-4 bg-slate-50/90 border-b border-slate-100 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs shrink-0">
                  <i data-lucide="bell-ring" class="w-3.5 h-3.5"></i>
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <h4 class="text-xs font-bold text-slate-800 leading-tight">Admin Alerts</h4>
                    <span id="notif-unread-pill" class="hidden px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 text-[9px] font-extrabold">0 new</span>
                  </div>
                  <span id="notif-status-sub" class="text-[10px] text-slate-400 font-medium">Real-time telemetry alerts</span>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <button type="button" onclick="markAllNotificationsRead()" title="Mark all read" class="p-1 rounded-md text-slate-400 hover:text-teal-700 hover:bg-slate-200/60 transition-colors text-[10px] font-semibold flex items-center gap-1 cursor-pointer">
                  <i data-lucide="check-check" class="w-3.5 h-3.5"></i>
                  <span class="hidden sm:inline">Mark read</span>
                </button>
                <button type="button" onclick="openModal('broadcast-notif-modal')" title="Post admin notice" class="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer">
                  <i data-lucide="plus" class="w-3.5 h-3.5"></i>
                </button>
                <button type="button" onclick="toggleAdminNotifications(false)" class="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer">
                  <i data-lucide="x" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>

            <!-- Categories Tabs -->
            <div class="px-3 py-1.5 bg-white border-b border-slate-100 flex items-center gap-1 overflow-x-auto text-[11px] font-bold">
              <button type="button" onclick="filterNotifs('ALL', this)" class="notif-tab-btn px-2.5 py-1 rounded-lg text-teal-800 bg-teal-50 transition-colors cursor-pointer" data-cat="ALL">All</button>
              <button type="button" onclick="filterNotifs('ADMISSION', this)" class="notif-tab-btn px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" data-cat="ADMISSION">Admissions</button>
              <button type="button" onclick="filterNotifs('MAINTENANCE', this)" class="notif-tab-btn px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" data-cat="MAINTENANCE">Maintenance</button>
              <button type="button" onclick="filterNotifs('PAYMENT', this)" class="notif-tab-btn px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer" data-cat="PAYMENT">Finance</button>
            </div>

            <!-- Notification Items List -->
            <div id="notif-items-list" class="max-h-[360px] overflow-y-auto custom-scrollbar divide-y divide-slate-100">
              <div class="p-6 text-center text-xs text-slate-400">Loading live alerts...</div>
            </div>

            <!-- Footer -->
            <div class="p-2 px-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px]">
              <span class="text-slate-400 font-medium">PostgreSQL Live Sync</span>
              <button type="button" onclick="loadAdminNotifications()" class="text-teal-700 hover:text-teal-800 font-bold flex items-center gap-1 hover:underline cursor-pointer">
                <i data-lucide="refresh-cw" class="w-2.5 h-2.5"></i>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Injected Module Content -->
    ${contentHtml}

  </div>

  <!-- Shared Modal: Add Admission -->
  <div id="add-admission-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
    <div class="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
      <button onclick="closeModal('add-admission-modal')" class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg cursor-pointer">&times;</button>
      <h3 class="text-base font-bold text-[#2D3748] mb-1">Register Resident Intake</h3>
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

  <!-- Shared Modal: Record Payment -->
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

  <!-- Shared Modal: Broadcast Notice / Operational Alert -->
  <div id="broadcast-notif-modal" class="fixed inset-0 z-50 hidden flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
    <div class="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 animate-scale-in">
      <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <i data-lucide="megaphone" class="w-4 h-4"></i>
          </div>
          <div>
            <h3 class="text-sm font-bold text-slate-900 leading-tight">Broadcast Admin Notice</h3>
            <p class="text-[10px] text-slate-400">Post an operational alert to all admins</p>
          </div>
        </div>
        <button type="button" onclick="closeModal('broadcast-notif-modal')" class="text-slate-400 hover:text-slate-700 text-lg cursor-pointer">&times;</button>
      </div>

      <form id="broadcast-notif-form" onsubmit="submitBroadcastNotice(event)" class="space-y-3 text-xs">
        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Notice Title *</label>
          <input type="text" id="bn-title" required placeholder="e.g. Campus Fire Drill Tomorrow 10 AM" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500">
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Category</label>
            <select id="bn-category" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer">
              <option value="SYSTEM">System Notice</option>
              <option value="MAINTENANCE">Maintenance</option>
              <option value="ADMISSION">Admissions</option>
              <option value="PAYMENT">Finance</option>
              <option value="OCCUPANCY">Occupancy</option>
            </select>
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Urgency</label>
            <select id="bn-urgency" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white cursor-pointer">
              <option value="NORMAL">Normal</option>
              <option value="HIGH">High</option>
              <option value="EMERGENCY">Emergency (Triggers Toast)</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Message Description *</label>
          <textarea id="bn-message" required rows="3" placeholder="Provide full details or instructions for this notice..." class="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Target Action Link</label>
            <input type="text" id="bn-url" placeholder="/admin/maintenance" value="/admin" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs">
          </div>
          <div>
            <label class="block text-[10px] font-bold uppercase text-slate-500 mb-1">Action Button Text</label>
            <input type="text" id="bn-label" placeholder="View Details" value="View Details" class="w-full p-2.5 rounded-xl border border-slate-200 text-xs">
          </div>
        </div>

        <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button type="button" onclick="closeModal('broadcast-notif-modal')" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 cursor-pointer">
            Cancel
          </button>
          <button type="submit" class="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs cursor-pointer active:scale-98 transition-all">
            Broadcast Notice
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- Real-time Emergency Toast Notification Container -->
  <div id="notif-toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"></div>

  <!-- Toast Notification -->
  <div id="toast" class="fixed top-5 right-6 z-50 hidden bg-[#2D3748] text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-semibold"></div>

  <!-- Shared Utility Scripts -->
  <script>
    function showToast(msg) {
      const t = document.getElementById('toast');
      t.innerText = msg;
      t.classList.remove('hidden');
      setTimeout(() => t.classList.add('hidden'), 3500);
    }

    function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
    function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

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
        if (typeof fetchModuleData === 'function') fetchModuleData();
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
        if (typeof fetchModuleData === 'function') fetchModuleData();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    function toggleMobileSidebar() {
      const backdrop = document.getElementById('mobile-sidebar-backdrop');
      const sidebar = document.getElementById('mobile-sidebar');
      if (!backdrop || !sidebar) return;
      const isClosed = sidebar.classList.contains('-translate-x-full');
      if (isClosed) {
        sidebar.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
      } else {
        sidebar.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
      }
    }

    /* ========================================================================= */
    /* ADMIN LIVE NOTIFICATION SYSTEM ENGINE                                      */
    /* ========================================================================= */
    let notificationsCache = [];
    let currentNotifFilter = 'ALL';
    let alertedEmergencyIds = new Set();

    function toggleAdminNotifications(force) {
      const dd = document.getElementById('admin-notif-dropdown');
      if (!dd) return;
      const isHidden = dd.classList.contains('hidden');
      const nextState = force !== undefined ? !force : isHidden;
      if (nextState) {
        dd.classList.remove('hidden');
        renderNotificationsList();
        lucide.createIcons();
      } else {
        dd.classList.add('hidden');
      }
    }

    // Close notifications dropdown when clicking outside
    document.addEventListener('click', function(e) {
      const container = document.getElementById('admin-notif-container');
      const dropdown = document.getElementById('admin-notif-dropdown');
      if (container && dropdown && !container.contains(e.target)) {
        dropdown.classList.add('hidden');
      }
    });

    async function loadAdminNotifications() {
      try {
        const res = await fetch('/api/notifications');
        if (!res.ok) return;
        const data = await res.json();
        notificationsCache = data.notifications || [];
        updateNotifBadge(data.unreadCount || 0);
        renderNotificationsList();

        // Check for new Emergency alert to trigger toast popup
        notificationsCache.forEach(n => {
          if (n.urgency === 'EMERGENCY' && !n.isRead && !alertedEmergencyIds.has(n.id)) {
            alertedEmergencyIds.add(n.id);
            showNotificationToast(n);
          }
        });
      } catch (err) {
        console.warn('Silent notice: notification sync error', err);
      }
    }

    function updateNotifBadge(unreadCount) {
      const badge = document.getElementById('notif-badge');
      const pill = document.getElementById('notif-unread-pill');
      const sub = document.getElementById('notif-status-sub');

      if (badge) {
        if (unreadCount > 0) {
          badge.innerText = unreadCount > 9 ? '9+' : unreadCount;
          badge.classList.remove('hidden');
        } else {
          badge.classList.add('hidden');
        }
      }

      if (pill) {
        if (unreadCount > 0) {
          pill.innerText = unreadCount + ' new';
          pill.classList.remove('hidden');
        } else {
          pill.classList.add('hidden');
        }
      }

      if (sub) {
        sub.innerText = unreadCount > 0 ? unreadCount + ' unread operational alerts' : 'All alerts caught up';
      }
    }

    function filterNotifs(cat, btnEl) {
      currentNotifFilter = cat;
      document.querySelectorAll('.notif-tab-btn').forEach(btn => {
        btn.classList.remove('text-teal-800', 'bg-teal-50');
        btn.classList.add('text-slate-500');
      });
      if (btnEl) {
        btnEl.classList.remove('text-slate-500');
        btnEl.classList.add('text-teal-800', 'bg-teal-50');
      }
      renderNotificationsList();
      lucide.createIcons();
    }

    function getRelativeTime(iso) {
      if (!iso) return 'Just now';
      const diffSec = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
      if (diffSec < 60) return 'Just now';
      if (diffSec < 3600) return Math.floor(diffSec / 60) + 'm ago';
      if (diffSec < 86400) return Math.floor(diffSec / 3600) + 'h ago';
      return Math.floor(diffSec / 86400) + 'd ago';
    }

    function renderNotificationsList() {
      const container = document.getElementById('notif-items-list');
      if (!container) return;

      const filtered = notificationsCache.filter(n => {
        if (currentNotifFilter === 'ALL') return true;
        return n.category === currentNotifFilter;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div class="p-8 text-center">' +
          '<div class="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-2">' +
            '<i data-lucide="check" class="w-5 h-5"></i>' +
          '</div>' +
          '<p class="text-xs font-bold text-slate-800">You are all caught up</p>' +
          '<p class="text-[11px] text-slate-400 mt-0.5">No operational alerts in this category</p>' +
        '</div>';
        return;
      }

      container.innerHTML = filtered.map(n => {
        let iconName = 'bell';
        let iconColors = 'bg-slate-100 text-slate-600';

        if (n.category === 'ADMISSION') {
          iconName = 'user-plus';
          iconColors = 'bg-blue-50 text-blue-700 border border-blue-200/60';
        } else if (n.category === 'MAINTENANCE') {
          if (n.urgency === 'EMERGENCY') {
            iconName = 'alert-triangle';
            iconColors = 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse';
          } else {
            iconName = 'wrench';
            iconColors = 'bg-amber-50 text-amber-700 border border-amber-200/60';
          }
        } else if (n.category === 'PAYMENT') {
          iconName = 'credit-card';
          iconColors = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60';
        } else if (n.category === 'OCCUPANCY') {
          iconName = 'bed-double';
          iconColors = 'bg-purple-50 text-purple-700 border border-purple-200/60';
        }

        const urgencyBadge = n.urgency === 'EMERGENCY'
          ? '<span class="px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 text-[9px] font-extrabold uppercase">Emergency</span>'
          : (n.urgency === 'HIGH'
            ? '<span class="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold uppercase">High</span>'
            : '');

        const safeTitle = (n.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const safeMsg = (n.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const readDot = !n.isRead ? '<span class="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1"></span>' : '';
        const markReadBtn = !n.isRead ? '<button type="button" onclick="markNotificationRead(\'' + n.id + '\')" title="Mark read" class="text-[10px] text-slate-400 hover:text-teal-700 font-semibold cursor-pointer">Mark read</button>' : '';

        return '<div class="p-3 hover:bg-slate-50 transition-colors ' + (!n.isRead ? 'bg-teal-50/25' : '') + ' flex items-start gap-2.5 group">' +
          '<div class="w-8 h-8 rounded-xl ' + iconColors + ' flex items-center justify-center shrink-0 shadow-2xs mt-0.5">' +
            '<i data-lucide="' + iconName + '" class="w-4 h-4"></i>' +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
            '<div class="flex items-start justify-between gap-1">' +
              '<div class="flex items-center gap-1.5 flex-wrap">' +
                '<h5 class="text-xs font-bold text-slate-900 leading-snug truncate max-w-[200px]">' + safeTitle + '</h5>' +
                urgencyBadge +
              '</div>' +
              readDot +
            '</div>' +
            '<p class="text-[11px] text-slate-600 leading-tight mt-0.5 line-clamp-2">' + safeMsg + '</p>' +
            '<div class="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100/80">' +
              '<span class="text-[10px] text-slate-400 font-medium">' + getRelativeTime(n.createdAt) + '</span>' +
              '<div class="flex items-center gap-2">' +
                markReadBtn +
                '<a href="' + (n.actionUrl || '/admin') + '" class="text-[10px] font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-0.5 no-underline">' +
                  '<span>' + (n.actionLabel || 'Action') + '</span>' +
                  '<i data-lucide="chevron-right" class="w-2.5 h-2.5"></i>' +
                '</a>' +
                '<button type="button" onclick="dismissNotification(\'' + n.id + '\')" title="Dismiss" class="text-slate-300 hover:text-rose-500 p-0.5 cursor-pointer">' +
                  '<i data-lucide="x" class="w-3 h-3"></i>' +
                '</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
    }

    async function markNotificationRead(id) {
      try {
        const res = await fetch('/api/notifications/' + id + '/read', { method: 'POST' });
        if (res.ok) {
          const item = notificationsCache.find(n => n.id === id);
          if (item) item.isRead = true;
          const unreadCount = notificationsCache.filter(n => !n.isRead).length;
          updateNotifBadge(unreadCount);
          renderNotificationsList();
          lucide.createIcons();
        }
      } catch (e) {}
    }

    async function markAllNotificationsRead() {
      try {
        const allIds = notificationsCache.map(n => n.id);
        const res = await fetch('/api/notifications/mark-all-read', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: allIds })
        });
        if (res.ok) {
          notificationsCache.forEach(n => n.isRead = true);
          updateNotifBadge(0);
          renderNotificationsList();
          lucide.createIcons();
          showToast('All notifications marked as read');
        }
      } catch (e) {}
    }

    async function dismissNotification(id) {
      try {
        const res = await fetch('/api/notifications/' + id, { method: 'DELETE' });
        if (res.ok) {
          notificationsCache = notificationsCache.filter(n => n.id !== id);
          const unreadCount = notificationsCache.filter(n => !n.isRead).length;
          updateNotifBadge(unreadCount);
          renderNotificationsList();
          lucide.createIcons();
        }
      } catch (e) {}
    }

    async function submitBroadcastNotice(e) {
      e.preventDefault();
      const payload = {
        title: document.getElementById('bn-title').value.trim(),
        message: document.getElementById('bn-message').value.trim(),
        category: document.getElementById('bn-category').value,
        urgency: document.getElementById('bn-urgency').value,
        actionUrl: document.getElementById('bn-url').value.trim() || '/admin',
        actionLabel: document.getElementById('bn-label').value.trim() || 'Check Alert'
      };

      try {
        const res = await fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Failed to post announcement');
        showToast('Admin notice broadcasted');
        closeModal('broadcast-notif-modal');
        document.getElementById('broadcast-notif-form').reset();
        loadAdminNotifications();
      } catch (err) {
        showToast('Error: ' + err.message);
      }
    }

    function showNotificationToast(n) {
      const container = document.getElementById('notif-toast-container');
      if (!container) return;

      const safeTitle = (n.title || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const safeMsg = (n.message || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const toast = document.createElement('div');
      toast.className = 'pointer-events-auto p-4 rounded-2xl bg-white border border-rose-200 shadow-2xl flex items-start gap-3 animate-scale-in transition-all duration-300';
      toast.innerHTML = '<div class="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">' +
        '<i data-lucide="alert-triangle" class="w-4 h-4"></i>' +
      '</div>' +
      '<div class="flex-1 min-w-0 text-left">' +
        '<div class="flex items-center justify-between gap-1">' +
          '<h6 class="text-xs font-bold text-slate-900">' + safeTitle + '</h6>' +
          '<button onclick="this.closest(\'.pointer-events-auto\').remove()" class="text-slate-400 hover:text-slate-600 p-0.5">' +
            '<i data-lucide="x" class="w-3.5 h-3.5"></i>' +
          '</button>' +
        '</div>' +
        '<p class="text-[11px] text-slate-600 mt-0.5 line-clamp-2">' + safeMsg + '</p>' +
        '<div class="mt-2 flex items-center gap-2">' +
          '<a href="' + (n.actionUrl || '/admin') + '" class="px-2 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-bold shadow-2xs hover:bg-rose-700 transition-colors no-underline">' +
            (n.actionLabel || 'Take Action') +
          '</a>' +
          '<button onclick="this.closest(\'.pointer-events-auto\').remove()" class="text-[10px] text-slate-400 hover:text-slate-600 font-semibold">' +
            'Dismiss' +
          '</button>' +
        '</div>' +
      '</div>';

      container.appendChild(toast);
      lucide.createIcons();

      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 8000);
    }

    // Auto-polling every 15 seconds
    setInterval(loadAdminNotifications, 15000);
    window.addEventListener('DOMContentLoaded', loadAdminNotifications);

    lucide.createIcons();
  </script>

  <!-- Module-specific Scripts -->
  ${extraScripts}

</body>
</html>`;
}
