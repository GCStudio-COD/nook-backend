import { renderAdminLayout } from '../admin-layout.template';

export function getMaintenanceViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Action & Navigation Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-bold text-[#2D3748]">Maintenance &amp; Facilities Helpdesk</h2>
          <p class="text-xs text-[#718096] mt-0.5">Manage resident service tickets, appliance repairs, housekeeping dispatches, and emergency SLAs.</p>
        </div>
        <button onclick="openModal('new-ticket-modal')" class="px-4 py-2.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2 self-start sm:self-auto active:scale-95">
          <i data-lucide="wrench" class="w-4 h-4"></i>
          <span>+ Log Maintenance Request</span>
        </button>
      </div>

      <!-- 4 Top Metric Cards (Purity Soft Aesthetic) -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Open Work Orders</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-xl font-extrabold text-[#2D3748]" id="maint-open-count">0</span>
              <span class="text-xs font-bold text-amber-500 ml-1.5">Active</span>
            </div>
            <span class="text-[11px] text-[#718096] mt-1 block">Pending resolution</span>
          </div>
          <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="wrench" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Emergency SLA</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-xl font-extrabold text-rose-600" id="maint-critical-count">0</span>
              <span class="text-xs font-bold text-rose-500 ml-1.5">Critical</span>
            </div>
            <span class="text-[11px] text-rose-600 font-semibold mt-1 block">&lt; 1 hr response SLA</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="alert-triangle" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">In Progress</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-xl font-extrabold text-blue-600" id="maint-inprogress-count">0</span>
              <span class="text-xs font-bold text-blue-500 ml-1.5">Dispatched</span>
            </div>
            <span class="text-[11px] text-[#718096] mt-1 block">Technician assigned</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Resolved Tickets</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-xl font-extrabold text-emerald-600" id="maint-resolved-count">0</span>
              <span class="text-xs font-bold text-emerald-600 ml-1.5">100%</span>
            </div>
            <span class="text-[11px] text-emerald-600 font-semibold mt-1 block">Completed work</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="check-circle-2" class="w-5 h-5"></i>
          </div>
        </div>
      </div>

      <!-- Main Work Orders Card -->
      <div class="purity-card p-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-base font-bold text-[#2D3748]">Work Order Management Queue</h3>
            <p class="text-xs text-[#718096]">Assign maintenance staff, review emergency issues, update status, and close work orders.</p>
          </div>

          <!-- Multi-Level Filter Controls -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Search -->
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="maint-search-input" oninput="applyFilters()" placeholder="Search room, resident, issue..." class="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none w-44 sm:w-52 font-medium">
            </div>

            <!-- Urgency Filter -->
            <select id="urgency-filter" onchange="applyFilters()" class="py-1.5 px-3 rounded-xl border border-gray-200 text-xs text-[#2D3748] bg-white font-medium cursor-pointer focus:outline-none">
              <option value="ALL">All Urgencies</option>
              <option value="EMERGENCY">Emergency (Immediate)</option>
              <option value="HIGH">High Priority</option>
              <option value="NORMAL">Normal</option>
            </select>

            <!-- Service Category Filter -->
            <select id="service-type-filter" onchange="applyFilters()" class="py-1.5 px-3 rounded-xl border border-gray-200 text-xs text-[#2D3748] bg-white font-medium cursor-pointer focus:outline-none">
              <option value="ALL">All Categories</option>
              <option value="AC_MAINTENANCE">AC Maintenance</option>
              <option value="PLUMBING">Plumbing</option>
              <option value="ELECTRICAL">Electrical</option>
              <option value="ROOM_CLEANING">Room Cleaning</option>
              <option value="DEEP_CLEANING">Deep Cleaning</option>
              <option value="LAUNDRY">Laundry</option>
              <option value="PEST_CONTROL">Pest Control</option>
            </select>

            <!-- Status Pills -->
            <div class="flex items-center p-0.5 rounded-xl bg-gray-100 border border-gray-200 text-xs">
              <button onclick="setStatusFilter('ALL')" class="maint-status-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer" data-status="ALL">All</button>
              <button onclick="setStatusFilter('REQUESTED')" class="maint-status-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="REQUESTED">Requested</button>
              <button onclick="setStatusFilter('IN_PROGRESS')" class="maint-status-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="IN_PROGRESS">In Progress</button>
              <button onclick="setStatusFilter('COMPLETED')" class="maint-status-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="COMPLETED">Completed</button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                <th class="pb-3 px-3">TICKET &amp; ROOM</th>
                <th class="pb-3 px-3">RESIDENT</th>
                <th class="pb-3 px-3">SERVICE CATEGORY</th>
                <th class="pb-3 px-3">URGENCY SLA</th>
                <th class="pb-3 px-3">SCHEDULED SLOT</th>
                <th class="pb-3 px-3">STATUS</th>
                <th class="pb-3 px-3">ASSIGNED STAFF</th>
                <th class="pb-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody id="tickets-table-body" class="divide-y divide-gray-100 font-medium">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>

        <!-- Footer Strip -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-[#718096] mt-4">
          <span id="maint-count-indicator">Showing all work orders</span>
          <span class="text-[11px] text-slate-400">Emergency tickets trigger real-time on-call technician alert</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: DISPATCH & RESOLVE WORK ORDER                                     -->
    <!-- ========================================================================= -->
    <div id="dispatch-ticket-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-lg w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl teal-gradient text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="wrench" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">STAFF DISPATCH &amp; SLA</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="dispatch-title">Work Order Update</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('dispatch-ticket-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="dispatch-form" onsubmit="submitDispatch(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="disp-id">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 text-xs">
            <!-- Ticket Info Header Banner -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-bold text-slate-900 text-sm" id="disp-room-label">Room D-202</span>
                <span id="disp-urgency-badge" class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">NORMAL</span>
              </div>
              <p class="text-slate-600" id="disp-resident-label">Resident: Aarav Sharma (+91 98765 43210)</p>
              <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-medium text-[11px]" id="disp-instructions-label">
                No special instructions provided.
              </div>
            </div>

            <!-- Form fields -->
            <div>
              <label class="block text-slate-700 mb-1 font-semibold">Assign Technician / Staff Member *</label>
              <select id="disp-staff" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <option value="Manoj Kumar (HVAC Lead)">Manoj Kumar (HVAC &amp; AC Specialist)</option>
                <option value="Ramesh Patil (Senior Plumber)">Ramesh Patil (Plumbing &amp; Sanitary)</option>
                <option value="Vikram Joshi (Electrician)">Vikram Joshi (Electrical &amp; Power)</option>
                <option value="Sunil Verma (Housekeeping Lead)">Sunil Verma (Housekeeping &amp; Deep Clean)</option>
                <option value="Campus Duty Manager">Campus Duty Manager (General)</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-700 mb-1 font-semibold">Ticket Status *</label>
              <select id="disp-status" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <option value="IN_PROGRESS">In Progress (Staff Dispatched)</option>
                <option value="COMPLETED">Completed (Work Verified)</option>
                <option value="REQUESTED">Requested (Waiting for Parts/Slot)</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-700 mb-1 font-semibold">Resolution Notes &amp; Findings</label>
              <textarea id="disp-notes" rows="3" placeholder="Parts replaced, filter cleaned, inspection result..." class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"></textarea>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('dispatch-ticket-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-disp" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Save &amp; Update Work Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: LOG NEW MAINTENANCE WORK ORDER                                    -->
    <!-- ========================================================================= -->
    <div id="new-ticket-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-lg w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="plus-circle" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">NEW WORK ORDER</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight">Log Maintenance Request</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('new-ticket-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="new-ticket-form" onsubmit="submitNewTicket(event)" class="flex flex-col flex-1 overflow-hidden">
          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-3.5 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Resident Name *</label>
                <input type="text" id="t-resident-name" required placeholder="e.g. Aarav Sharma" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Resident Phone *</label>
                <input type="tel" id="t-resident-phone" required placeholder="+91 98765 00000" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Room Number *</label>
                <input type="text" id="t-room-number" required placeholder="e.g. D-202" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none uppercase">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Service Category *</label>
                <select id="t-service-type" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="AC_MAINTENANCE">AC Maintenance &amp; Cooling</option>
                  <option value="PLUMBING">Plumbing &amp; Geyser</option>
                  <option value="ELECTRICAL">Electrical &amp; Lighting</option>
                  <option value="ROOM_CLEANING">Room Cleaning</option>
                  <option value="DEEP_CLEANING">Deep Cleaning</option>
                  <option value="PEST_CONTROL">Pest Control</option>
                  <option value="LAUNDRY">Laundry Service</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Preferred Date *</label>
                <input type="date" id="t-date" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
              </div>
              <div>
                <label class="block text-slate-600 mb-1 font-semibold">Urgency SLA *</label>
                <select id="t-urgency" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="NORMAL">Normal (Within 24 hrs)</option>
                  <option value="HIGH">High Priority (Within 6 hrs)</option>
                  <option value="EMERGENCY">Emergency (Within 1 hr)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-semibold">Time Slot</label>
              <select id="t-slot" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                <option value="Immediate / Emergency">Immediate / Emergency</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-600 mb-1 font-semibold">Problem Description &amp; Instructions</label>
              <textarea id="t-instructions" rows="2" placeholder="e.g. AC unit leaking water on desk, geyser trip indicator active..." class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none"></textarea>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('new-ticket-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-ticket" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="plus" class="w-4 h-4"></i>
              <span>Submit Work Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let currentStatusFilter = 'ALL';
      let ticketsData = [];

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const res = await fetch('/api/services').then(r => r.json());
          ticketsData = Array.isArray(res) ? res : [];

          // Compute KPI counters
          const openCount = ticketsData.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELLED').length;
          const critCount = ticketsData.filter(t => t.urgency === 'EMERGENCY' && t.status !== 'COMPLETED').length;
          const inProgress = ticketsData.filter(t => t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED').length;
          const resolved = ticketsData.filter(t => t.status === 'COMPLETED').length;

          document.getElementById('maint-open-count').innerText = openCount;
          document.getElementById('maint-critical-count').innerText = critCount;
          document.getElementById('maint-inprogress-count').innerText = inProgress;
          document.getElementById('maint-resolved-count').innerText = resolved;

          renderTable();
        } catch (err) {
          console.error('Error fetching services:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function setStatusFilter(st) {
        currentStatusFilter = st;
        document.querySelectorAll('.maint-status-btn').forEach(btn => {
          if (btn.getAttribute('data-status') === st) {
            btn.className = 'maint-status-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer';
          } else {
            btn.className = 'maint-status-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer';
          }
        });
        renderTable();
      }

      function applyFilters() {
        renderTable();
      }

      function renderTable() {
        const tbody = document.getElementById('tickets-table-body');
        if (!tbody) return;

        const q = (document.getElementById('maint-search-input')?.value || '').trim().toLowerCase();
        const urg = document.getElementById('urgency-filter')?.value || 'ALL';
        const stype = document.getElementById('service-type-filter')?.value || 'ALL';

        const filtered = ticketsData.filter(t => {
          if (currentStatusFilter !== 'ALL' && t.status !== currentStatusFilter) return false;
          if (urg !== 'ALL' && t.urgency !== urg) return false;
          if (stype !== 'ALL' && t.serviceType !== stype) return false;

          if (q) {
            const rMatch = (t.roomNumber || '').toLowerCase().includes(q);
            const nameMatch = (t.residentName || '').toLowerCase().includes(q);
            const insMatch = (t.instructions || '').toLowerCase().includes(q);
            const staffMatch = (t.assignedStaff || '').toLowerCase().includes(q);
            if (!rMatch && !nameMatch && !insMatch && !staffMatch) return false;
          }

          return true;
        });

        document.getElementById('maint-count-indicator').innerText = \`Displaying \${filtered.length} of \${ticketsData.length} work orders\`;

        if (filtered.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="py-12 text-center text-[#A0AEC0] italic bg-slate-50/50">No maintenance tickets matched the filter criteria.</td></tr>';
          return;
        }

        tbody.innerHTML = filtered.map(t => {
          // Category icon & label
          let catIcon = 'wrench';
          if (t.serviceType === 'ELECTRICAL') catIcon = 'zap';
          else if (t.serviceType === 'AC_MAINTENANCE') catIcon = 'wind';
          else if (t.serviceType === 'ROOM_CLEANING' || t.serviceType === 'DEEP_CLEANING') catIcon = 'sparkles';
          else if (t.serviceType === 'PLUMBING') catIcon = 'droplets';

          // Urgency badge
          let urgBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">Normal</span>';
          if (t.urgency === 'EMERGENCY') {
            urgBadge = \`
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1 w-max">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                <span>Emergency</span>
              </span>
            \`;
          } else if (t.urgency === 'HIGH') {
            urgBadge = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">High Priority</span>';
          }

          // Status badge
          let statBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-100 text-amber-800">Requested</span>';
          if (t.status === 'IN_PROGRESS' || t.status === 'ASSIGNED') {
            statBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-100 text-blue-800">In Progress</span>';
          } else if (t.status === 'COMPLETED') {
            statBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800">Completed</span>';
          } else if (t.status === 'CANCELLED') {
            statBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-slate-100 text-slate-600">Cancelled</span>';
          }

          const ticketCode = 'TKT-' + (t.id ? t.id.slice(0, 5).toUpperCase() : '101');

          return \`
            <tr class="hover:bg-gray-50/60 transition-colors">
              <td class="py-3 px-3">
                <div class="flex items-center gap-1.5 font-bold text-slate-900">
                  <span class="font-mono text-[10px] text-teal-700 font-bold">\${ticketCode}</span>
                  <span class="px-2 py-0.5 rounded-lg bg-teal-50 text-teal-900 font-bold text-xs border border-teal-200/80">Room \${t.roomNumber}</span>
                </div>
                <span class="text-[10px] text-slate-400 block mt-0.5 line-clamp-1 max-w-xs" title="\${t.instructions || ''}">\${t.instructions || 'No details provided'}</span>
              </td>
              <td class="py-3 px-3">
                <p class="font-bold text-slate-900">\${t.residentName}</p>
                <p class="text-[10px] text-slate-400 font-mono">\${t.residentPhone}</p>
              </td>
              <td class="py-3 px-3">
                <div class="flex items-center gap-1.5 text-slate-800 font-medium">
                  <i data-lucide="\${catIcon}" class="w-3.5 h-3.5 text-teal-600"></i>
                  <span>\${(t.serviceType || '').replace(/_/g, ' ')}</span>
                </div>
              </td>
              <td class="py-3 px-3">\${urgBadge}</td>
              <td class="py-3 px-3 text-slate-600">
                <span class="font-semibold text-slate-800 block text-[11px]">\${t.timeSlot || 'Morning Slot'}</span>
                <span class="text-[10px] text-slate-400">\${new Date(t.preferredDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
              </td>
              <td class="py-3 px-3">\${statBadge}</td>
              <td class="py-3 px-3 text-slate-700">
                \${t.assignedStaff ? \`
                  <span class="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-800">
                    <i data-lucide="user" class="w-3 h-3 text-teal-600"></i>
                    <span>\${t.assignedStaff}</span>
                  </span>
                \` : \`
                  <span class="text-[10px] text-slate-400 italic">Unassigned</span>
                \`}
              </td>
              <td class="py-3 px-3 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <button type="button" onclick="openDispatchModal('\${t.id}')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition-colors cursor-pointer flex items-center gap-1">
                    <i data-lucide="wrench" class="w-3 h-3"></i>
                    <span>Manage</span>
                  </button>
                  \${t.status !== 'COMPLETED' ? \`
                    <button type="button" onclick="quickCompleteTicket('\${t.id}')" class="p-1 rounded-lg hover:bg-emerald-50 text-emerald-600 transition-colors cursor-pointer" title="Quick Mark Completed">
                      <i data-lucide="check" class="w-3.5 h-3.5"></i>
                    </button>
                  \` : ''}
                  <button type="button" onclick="deleteTicket('\${t.id}')" class="p-1 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer" title="Delete Ticket">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </td>
            </tr>
          \`;
        }).join('');

        lucide.createIcons();
      }

      // =======================================================================
      // DISPATCH & UPDATE TICKET MODAL
      // =======================================================================
      function openDispatchModal(ticketId) {
        const t = ticketsData.find(x => x.id === ticketId);
        if (!t) return;

        document.getElementById('disp-id').value = t.id;
        document.getElementById('disp-title').innerText = 'Ticket: Room ' + t.roomNumber + ' (' + (t.serviceType || '').replace(/_/g, ' ') + ')';
        document.getElementById('disp-room-label').innerText = 'Room ' + t.roomNumber + ' &bull; ' + (t.serviceType || '').replace(/_/g, ' ');
        document.getElementById('disp-resident-label').innerText = 'Resident: ' + t.residentName + ' (' + t.residentPhone + ')';
        document.getElementById('disp-instructions-label').innerText = t.instructions || 'No special instructions logged.';

        const urgBadge = document.getElementById('disp-urgency-badge');
        urgBadge.innerText = t.urgency;
        urgBadge.className = t.urgency === 'EMERGENCY'
          ? 'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-rose-100 text-rose-800'
          : 'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-100 text-slate-700';

        if (t.assignedStaff) document.getElementById('disp-staff').value = t.assignedStaff;
        document.getElementById('disp-status').value = t.status || 'IN_PROGRESS';
        document.getElementById('disp-notes').value = t.resolutionNotes || '';

        openModal('dispatch-ticket-modal');
        lucide.createIcons();
      }

      async function submitDispatch(e) {
        e.preventDefault();
        const id = document.getElementById('disp-id').value;
        const payload = {
          assignedStaff: document.getElementById('disp-staff').value,
          status: document.getElementById('disp-status').value,
          resolutionNotes: document.getElementById('disp-notes').value
        };

        const btn = document.getElementById('btn-submit-disp');
        btn.disabled = true;

        try {
          const res = await fetch('/api/services/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('Update failed');
          showToast('Work order updated successfully');
          closeModal('dispatch-ticket-modal');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      async function quickCompleteTicket(id) {
        try {
          const res = await fetch('/api/services/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'COMPLETED', resolutionNotes: 'Resolved on-site by maintenance staff' })
          });
          if (!res.ok) throw new Error('Status update failed');
          showToast('Ticket marked as completed');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      async function deleteTicket(id) {
        if (!confirm('Remove this maintenance ticket permanently?')) return;
        try {
          const res = await fetch('/api/services/' + id, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          showToast('Ticket removed');
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        }
      }

      // =======================================================================
      // LOG NEW TICKET
      // =======================================================================
      async function submitNewTicket(e) {
        e.preventDefault();
        const payload = {
          residentName: document.getElementById('t-resident-name').value,
          residentPhone: document.getElementById('t-resident-phone').value,
          roomNumber: document.getElementById('t-room-number').value.toUpperCase(),
          serviceType: document.getElementById('t-service-type').value,
          preferredDate: document.getElementById('t-date').value,
          timeSlot: document.getElementById('t-slot').value,
          urgency: document.getElementById('t-urgency').value,
          instructions: document.getElementById('t-instructions').value
        };

        const btn = document.getElementById('btn-submit-ticket');
        btn.disabled = true;

        try {
          const res = await fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          if (!res.ok) throw new Error('Failed to create ticket');
          showToast('New work order logged');
          closeModal('new-ticket-modal');
          document.getElementById('new-ticket-form').reset();
          await fetchModuleData();
        } catch (err) {
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
        }
      }

      // Default date to today
      const today = new Date().toISOString().split('T')[0];
      const dtInput = document.getElementById('t-date');
      if (dtInput) dtInput.value = today;

      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'maintenance',
    pageTitle: 'Maintenance & Facilities Queue',
    breadcrumb: 'Maintenance',
    contentHtml,
    extraScripts,
  });
}
