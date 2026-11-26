import { renderAdminLayout } from '../admin-layout.template';

export function getAdmissionsViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Action & Navigation Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-bold text-[#2D3748]">Student Admissions &amp; Resident Intake</h2>
          <p class="text-xs text-[#718096] mt-0.5">Review student applications, verify guardian and ID credentials, and allocate designated room beds.</p>
        </div>
        <button onclick="openModal('add-admission-modal')" class="px-4 py-2.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2 self-start sm:self-auto active:scale-95">
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          <span>+ New Student Intake</span>
        </button>
      </div>

      <!-- 4 Summary Metric Indicators -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Applications</span>
          <p class="text-2xl font-bold text-[#2D3748] mt-0.5" id="adm-stat-total">0</p>
          <span class="text-[11px] text-[#718096]">All-time applicant pipeline</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Pending Review</span>
          <p class="text-2xl font-bold text-amber-500 mt-0.5" id="adm-stat-pending">0</p>
          <span class="text-[11px] text-amber-600 font-semibold">Requires verification</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Approved &amp; Ready</span>
          <p class="text-2xl font-bold text-teal-600 mt-0.5" id="adm-stat-approved">0</p>
          <span class="text-[11px] text-teal-600 font-semibold">Awaiting room assignment</span>
        </div>
        <div class="purity-card p-4">
          <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Admitted Residents</span>
          <p class="text-2xl font-bold text-emerald-600 mt-0.5" id="adm-stat-admitted">0</p>
          <span class="text-[11px] text-[#718096]">Active hostel occupants</span>
        </div>
      </div>

      <!-- Main Admissions Table Card -->
      <div class="purity-card p-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-base font-bold text-[#2D3748]">Student Intake Directory</h3>
            <p class="text-xs text-[#718096]">Filter applicants by approval status, room preference, or search by name and credentials.</p>
          </div>

          <!-- Multi-Filter & Search Controls -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Search -->
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="adm-search-input" oninput="applyFilters()" placeholder="Search applicant, phone, ID..." class="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none w-48 sm:w-56 font-medium">
            </div>

            <!-- Room Preference Filter -->
            <select id="pref-filter" onchange="applyFilters()" class="py-1.5 px-3 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] font-medium cursor-pointer focus:outline-none">
              <option value="ALL">All Room Preferences</option>
              <option value="DELUXE_AC">Deluxe AC</option>
              <option value="SUPER_DELUXE_AC">Super Deluxe AC</option>
              <option value="SINGLE">Single</option>
              <option value="DORMITORY">Dormitory</option>
              <option value="NORMAL_NON_AC">Normal Non-AC</option>
            </select>

            <!-- Status Filter Pills -->
            <div class="flex items-center p-0.5 rounded-xl bg-gray-100 border border-gray-200 text-xs">
              <button onclick="setStatusFilter('ALL')" class="adm-filter-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer" data-status="ALL">All</button>
              <button onclick="setStatusFilter('PENDING')" class="adm-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="PENDING">Pending</button>
              <button onclick="setStatusFilter('APPROVED')" class="adm-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="APPROVED">Approved</button>
              <button onclick="setStatusFilter('ADMITTED')" class="adm-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="ADMITTED">Admitted</button>
              <button onclick="setStatusFilter('REJECTED')" class="adm-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-status="REJECTED">Rejected</button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                <th class="pb-3 px-3">APPLICANT</th>
                <th class="pb-3 px-3">CONTACT</th>
                <th class="pb-3 px-3">ROOM PREFERENCE</th>
                <th class="pb-3 px-3">ID VERIFICATION</th>
                <th class="pb-3 px-3">ALLOCATION STATUS</th>
                <th class="pb-3 px-3 text-right">OPERATIONS</th>
              </tr>
            </thead>
            <tbody id="admissions-table-body" class="divide-y divide-gray-100 font-medium">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>

        <!-- Footer Strip -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-[#718096] mt-4">
          <span id="adm-count-indicator">Showing all admissions</span>
          <span class="text-[11px] text-slate-400">Approved students can be allocated directly to any vacant bed slot</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: APPLICANT DOSSIER & VERIFICATION CARD                             -->
    <!-- ========================================================================= -->
    <div id="dossier-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="badge-check" class="w-5 h-5 text-teal-300"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">APPLICANT DOSSIER</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight" id="dossier-name">Applicant File</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('dossier-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4" id="dossier-body">
          <!-- Populated dynamically -->
        </div>

        <div class="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0" id="dossier-footer">
          <!-- Action buttons populated dynamically -->
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: ALLOCATE ROOM & BED FOR APPROVED APPLICANT                        -->
    <!-- ========================================================================= -->
    <div id="allocate-room-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-lg w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[92vh] animate-scale-in">
        <div class="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl teal-gradient text-white flex items-center justify-center shadow-md shrink-0">
              <i data-lucide="bed-double" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">ROOM PLACEMENT</span>
              <h3 class="font-extrabold text-slate-900 text-lg leading-tight">Allocate Room &amp; Bed</h3>
            </div>
          </div>
          <button type="button" onclick="closeModal('allocate-room-modal')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Close">
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <form id="allocate-room-form" onsubmit="submitRoomAllocation(event)" class="flex flex-col flex-1 overflow-hidden">
          <input type="hidden" id="alloc-admission-id">

          <div class="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
            <!-- Student Banner -->
            <div class="p-3.5 rounded-2xl bg-teal-50 border border-teal-100 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl teal-gradient flex items-center justify-center text-white font-bold text-sm shrink-0" id="alloc-avatar">
                ST
              </div>
              <div class="min-w-0">
                <h4 class="text-sm font-bold text-slate-900 truncate" id="alloc-student-name">Student Name</h4>
                <p class="text-xs text-teal-800 font-medium" id="alloc-student-meta">Pref: Deluxe AC • +91 98000 00000</p>
              </div>
            </div>

            <!-- Target Room & Bed Selection -->
            <div>
              <label class="block text-slate-700 text-xs mb-1 font-semibold">Select Available Room <span class="text-rose-500">*</span></label>
              <select id="alloc-room-select" required onchange="onAllocRoomChange()" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <!-- Populated dynamically with vacant rooms -->
              </select>
            </div>

            <div>
              <label class="block text-slate-700 text-xs mb-1 font-semibold">Designated Bed Slot <span class="text-rose-500">*</span></label>
              <select id="alloc-bed-select" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                <!-- Populated dynamically with vacant beds -->
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Monthly Rent <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="alloc-rent" required min="500" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Security Deposit <span class="text-rose-500">*</span></label>
                <div class="relative">
                  <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                  <input type="number" id="alloc-deposit" required min="0" class="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none">
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Check-in Date <span class="text-rose-500">*</span></label>
                <input type="date" id="alloc-checkin" required class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
              </div>
              <div>
                <label class="block text-slate-600 text-xs mb-1 font-semibold">Tenure Months</label>
                <select id="alloc-tenure" class="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all outline-none cursor-pointer">
                  <option value="1">1 Month</option>
                  <option value="3">3 Months (Semester)</option>
                  <option value="6" selected>6 Months</option>
                  <option value="12">12 Months (Full Year)</option>
                </select>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5 shrink-0">
            <button type="button" onclick="closeModal('allocate-room-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer">
              Cancel
            </button>
            <button type="submit" id="btn-submit-alloc" class="px-5 py-2 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95">
              <i data-lucide="check" class="w-4 h-4"></i>
              <span>Confirm Room &amp; Bed Allocation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let currentStatusFilter = 'ALL';
      let admissionsData = [];
      let roomsData = [];

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const [admRes, roomsRes] = await Promise.all([
            fetch('/api/admissions').then(r => r.json()),
            fetch('/api/rooms').then(r => r.json())
          ]);

          admissionsData = Array.isArray(admRes) ? admRes : [];
          roomsData = Array.isArray(roomsRes) ? roomsRes : [];

          renderStats();
          renderTable();
        } catch (err) {
          console.error('Error fetching admissions:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function renderStats() {
        const total = admissionsData.length;
        const pending = admissionsData.filter(a => a.status === 'PENDING').length;
        const approved = admissionsData.filter(a => a.status === 'APPROVED').length;
        const admitted = admissionsData.filter(a => a.status === 'ADMITTED').length;

        document.getElementById('adm-stat-total').innerText = total;
        document.getElementById('adm-stat-pending').innerText = pending;
        document.getElementById('adm-stat-approved').innerText = approved;
        document.getElementById('adm-stat-admitted').innerText = admitted;
      }

      function setStatusFilter(st) {
        currentStatusFilter = st;
        document.querySelectorAll('.adm-filter-btn').forEach(btn => {
          if (btn.getAttribute('data-status') === st) {
            btn.className = 'adm-filter-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer';
          } else {
            btn.className = 'adm-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer';
          }
        });
        renderTable();
      }

      function applyFilters() {
        renderTable();
      }

      function renderTable() {
        const tbody = document.getElementById('admissions-table-body');
        if (!tbody) return;

        const q = (document.getElementById('adm-search-input')?.value || '').trim().toLowerCase();
        const pref = document.getElementById('pref-filter')?.value || 'ALL';

        const filtered = admissionsData.filter(a => {
          if (currentStatusFilter !== 'ALL' && a.status !== currentStatusFilter) return false;
          if (pref !== 'ALL' && a.roomTypePreference !== pref) return false;

          if (q) {
            const nameMatch = (a.fullName || '').toLowerCase().includes(q);
            const phoneMatch = (a.phone || '').toLowerCase().includes(q);
            const emailMatch = (a.email || '').toLowerCase().includes(q);
            const idMatch = (a.idProofNumber || '').toLowerCase().includes(q);
            if (!nameMatch && !phoneMatch && !emailMatch && !idMatch) return false;
          }

          return true;
        });

        document.getElementById('adm-count-indicator').innerText = \`Displaying \${filtered.length} of \${admissionsData.length} applicant records\`;

        if (filtered.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" class="py-12 text-center text-[#A0AEC0] italic bg-slate-50/50">No admission records matched the filter criteria.</td></tr>';
          return;
        }

        tbody.innerHTML = filtered.map(a => {
          const initials = (a.fullName || 'ST').split(' ').map(n=>n[0]).slice(0, 2).join('');
          const prefLabel = (a.roomTypePreference || '').replace(/_/g, ' ');

          // Allocation Badge
          let allocBadge = '';
          if (a.status === 'ADMITTED') {
            const rNum = a.assignedRoom?.roomNumber || 'Room Assigned';
            allocBadge = \`
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 font-bold text-[10px]">
                <i data-lucide="check" class="w-3 h-3 text-teal-600"></i>
                <span>\${rNum}</span>
              </span>
            \`;
          } else if (a.status === 'APPROVED') {
            allocBadge = \`
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                <span>Ready for Bed</span>
              </span>
            \`;
          } else if (a.status === 'REJECTED') {
            allocBadge = \`<span class="text-[10px] text-rose-500 font-semibold">Declined</span>\`;
          } else {
            allocBadge = \`<span class="text-[10px] text-slate-400 font-medium">Pending Review</span>\`;
          }

          // Status Badge
          let statusBadge = '';
          if (a.status === 'APPROVED') {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-teal-100 text-teal-800">Approved</span>';
          } else if (a.status === 'ADMITTED') {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-blue-100 text-blue-800">Admitted</span>';
          } else if (a.status === 'REJECTED') {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-rose-100 text-rose-800">Rejected</span>';
          } else {
            statusBadge = '<span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-amber-100 text-amber-800">Pending</span>';
          }

          return \`
            <tr class="hover:bg-gray-50/60 transition-colors">
              <td class="py-3 px-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-8 h-8 rounded-xl teal-gradient flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-2xs">
                    \${initials}
                  </div>
                  <div>
                    <p class="font-bold text-[#2D3748] hover:text-[#319795] transition-colors cursor-pointer" onclick="openDossierModal('\${a.id}')">\${a.fullName}</p>
                    <p class="text-[10px] text-[#A0AEC0]">\${a.email}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-3 text-[#718096]">
                <div class="font-semibold text-slate-800">\${a.phone}</div>
                <div class="text-[10px] text-slate-400">Guardian: \${a.guardianName || 'N/A'}</div>
              </td>
              <td class="py-3 px-3">
                <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold text-[10px]">\${prefLabel}</span>
              </td>
              <td class="py-3 px-3 font-mono text-[11px] text-slate-600">
                <span class="font-bold text-slate-800">\${a.idProofType}</span>
                <span class="text-slate-400 block text-[10px]">\${a.idProofNumber}</span>
              </td>
              <td class="py-3 px-3">
                <div class="space-y-1">
                  <div>\${statusBadge}</div>
                  <div>\${allocBadge}</div>
                </div>
              </td>
              <td class="py-3 px-3 text-right">
                <div class="flex items-center justify-end gap-1.5">
                  <!-- Action for Pending: Approve -->
                  \${a.status === 'PENDING' ? \`
                    <button type="button" onclick="updateAdmissionStatus('\${a.id}', 'APPROVED')" class="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 text-[11px] font-bold transition-colors cursor-pointer">
                      Approve
                    </button>
                    <button type="button" onclick="updateAdmissionStatus('\${a.id}', 'REJECTED')" class="px-2 py-1 rounded-lg hover:bg-rose-50 text-rose-600 text-[11px] font-bold transition-colors cursor-pointer">
                      Reject
                    </button>
                  \` : ''}

                  <!-- Action for Approved: Allocate Room & Bed -->
                  \${a.status === 'APPROVED' ? \`
                    <button type="button" onclick="openAllocateRoomModal('\${a.id}')" class="px-3 py-1 rounded-lg teal-gradient text-white text-[11px] font-bold shadow-xs hover:opacity-95 transition-all cursor-pointer flex items-center gap-1 active:scale-95">
                      <i data-lucide="bed" class="w-3 h-3"></i>
                      <span>Allocate Room</span>
                    </button>
                  \` : ''}

                  <!-- Inspect Dossier Button -->
                  <button type="button" onclick="openDossierModal('\${a.id}')" class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer" title="View Full Applicant Dossier">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                  </button>

                  <!-- Delete -->
                  <button type="button" onclick="deleteAdmission('\${a.id}', '\${a.fullName}')" class="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer" title="Delete Applicant">
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
      // APPLICANT DOSSIER MODAL
      // =======================================================================
      function openDossierModal(admissionId) {
        const a = admissionsData.find(x => x.id === admissionId);
        if (!a) return;

        document.getElementById('dossier-name').innerText = a.fullName + ' - File';

        const body = document.getElementById('dossier-body');
        body.innerHTML = \`
          <div class="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Contact Phone</span>
              <span class="text-xs font-bold text-slate-800">\${a.phone}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Email Address</span>
              <span class="text-xs font-bold text-slate-800">\${a.email || 'N/A'}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Gender &amp; DOB</span>
              <span class="text-xs font-bold text-slate-800">\${a.gender || 'Not specified'} \${a.dateOfBirth ? ' &bull; ' + a.dateOfBirth : ''}</span>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">College / Workplace</span>
              <span class="text-xs font-bold text-slate-800">\${a.collegeOrWork || 'Student'}</span>
            </div>
          </div>

          <div class="space-y-3 pt-1">
            <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-teal-600"></i>
              <span>Guardian &amp; Emergency Contact</span>
            </h5>
            <div class="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-white border border-slate-200">
              <div>
                <span class="text-[10px] text-slate-400 block">Guardian Name</span>
                <span class="text-xs font-bold text-slate-800">\${a.guardianName}</span>
              </div>
              <div>
                <span class="text-[10px] text-slate-400 block">Emergency Phone</span>
                <span class="text-xs font-bold text-slate-800 font-mono">\${a.guardianPhone}</span>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-1">
            <h5 class="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-teal-600"></i>
              <span>Verification Document &amp; Address</span>
            </h5>
            <div class="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Document Type:</span>
                <span class="font-bold text-slate-900">\${a.idProofType}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Document Number:</span>
                <span class="font-bold text-slate-900 font-mono">\${a.idProofNumber}</span>
              </div>
              <div class="pt-2 border-t border-slate-100">
                <span class="text-[10px] text-slate-400 block">Permanent Address:</span>
                <span class="text-slate-700 font-medium">\${a.address}</span>
              </div>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div>
              <span class="text-[10px] text-slate-400 block">Room Preference</span>
              <span class="font-bold text-slate-800">\${(a.roomTypePreference || '').replace(/_/g, ' ')}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Food Diet</span>
              <span class="font-bold text-slate-800">\${a.foodPreference || 'Standard Mess'}</span>
            </div>
            <div>
              <span class="text-[10px] text-slate-400 block">Submission Date</span>
              <span class="font-bold text-slate-800">\${new Date(a.createdAt).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        \`;

        const footer = document.getElementById('dossier-footer');
        let btns = \`
          <button type="button" onclick="closeModal('dossier-modal')" class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer">
            Close
          </button>
        \`;

        if (a.status === 'PENDING') {
          btns = \`
            <div class="flex items-center gap-2">
              <button type="button" onclick="updateAdmissionStatus('\${a.id}', 'REJECTED'); closeModal('dossier-modal');" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 cursor-pointer">
                Reject
              </button>
              <button type="button" onclick="updateAdmissionStatus('\${a.id}', 'APPROVED'); closeModal('dossier-modal');" class="px-4 py-1.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 cursor-pointer">
                Approve Applicant
              </button>
            </div>
          \`;
        } else if (a.status === 'APPROVED') {
          btns = \`
            <div class="flex items-center gap-2">
              <button type="button" onclick="closeModal('dossier-modal')" class="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer">
                Dismiss
              </button>
              <button type="button" onclick="closeModal('dossier-modal'); openAllocateRoomModal('\${a.id}');" class="px-4 py-1.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-xs hover:opacity-95 cursor-pointer">
                Allocate Room &amp; Bed
              </button>
            </div>
          \`;
        }

        footer.innerHTML = btns;

        openModal('dossier-modal');
        lucide.createIcons();
      }

      // =======================================================================
      // ALLOCATE ROOM & BED MODAL FOR APPLICANT
      // =======================================================================
      function openAllocateRoomModal(admissionId) {
        const a = admissionsData.find(x => x.id === admissionId);
        if (!a) return;

        document.getElementById('alloc-admission-id').value = a.id;
        document.getElementById('alloc-student-name').innerText = a.fullName;
        document.getElementById('alloc-student-meta').innerText = 'Pref: ' + (a.roomTypePreference || '').replace(/_/g, ' ') + ' • Phone: ' + a.phone;
        document.getElementById('alloc-avatar').innerText = (a.fullName || 'ST').split(' ').map(n=>n[0]).slice(0, 2).join('');
        document.getElementById('alloc-checkin').value = new Date().toISOString().split('T')[0];

        // Populate rooms that have vacant beds
        const roomSelect = document.getElementById('alloc-room-select');
        let opts = '';
        const vacantRooms = roomsData.filter(r => (r.capacity - r.occupiedBeds) > 0);

        if (vacantRooms.length === 0) {
          opts = '<option value="">No vacant rooms available across campuses</option>';
        } else {
          vacantRooms.forEach(r => {
            const vacant = Math.max(0, r.capacity - r.occupiedBeds);
            opts += \`<option value="\${r.id}">Room \${r.roomNumber} (\${r.type} - Floor \${r.floor}) - \${vacant} Vacant Bed\${vacant !== 1 ? 's' : ''}</option>\`;
          });
        }
        roomSelect.innerHTML = opts;

        onAllocRoomChange();
        openModal('allocate-room-modal');
        lucide.createIcons();
      }

      function onAllocRoomChange() {
        const roomId = document.getElementById('alloc-room-select').value;
        const bedSelect = document.getElementById('alloc-bed-select');
        if (!roomId || !bedSelect) return;

        const room = roomsData.find(r => r.id === roomId);
        if (!room) return;

        document.getElementById('alloc-rent').value = room.priceMonthly || 8500;
        document.getElementById('alloc-deposit').value = room.securityDeposit || 10000;

        const vacantBeds = (room.beds || []).filter(b => !b.isOccupied);
        let opts = '';
        if (vacantBeds.length === 0) {
          opts = '<option value="">No vacant beds in this room</option>';
        } else {
          vacantBeds.forEach(b => {
            opts += \`<option value="\${b.bedNumber}">Bed \${b.bedNumber} (Vacant)</option>\`;
          });
        }
        bedSelect.innerHTML = opts;
      }

      async function submitRoomAllocation(e) {
        e.preventDefault();
        const admissionId = document.getElementById('alloc-admission-id').value;
        const roomId = document.getElementById('alloc-room-select').value;
        const bedNumber = Number(document.getElementById('alloc-bed-select').value);

        if (!roomId || !admissionId) {
          alert('Please select an available room.');
          return;
        }

        const payload = {
          admissionId,
          bedNumber: isNaN(bedNumber) ? 1 : bedNumber,
          monthlyRent: Number(document.getElementById('alloc-rent').value),
          securityDeposit: Number(document.getElementById('alloc-deposit').value),
          checkInDate: document.getElementById('alloc-checkin').value,
          tenureMonths: Number(document.getElementById('alloc-tenure').value || 6),
          paymentMethod: 'Admin Direct Allocation'
        };

        const btn = document.getElementById('btn-submit-alloc');
        btn.disabled = true;
        btn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i><span>Allocating...</span>';
        lucide.createIcons();

        try {
          const res = await fetch(\`/api/rooms/\${roomId}/assign-student\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
          const result = await res.json();
          if (!res.ok) throw new Error(result.message || 'Allocation failed');

          showToast(result.message || 'Student assigned to room successfully!');
          closeModal('allocate-room-modal');
          await fetchModuleData();
        } catch (err) {
          console.error(err);
          alert('Error: ' + err.message);
        } finally {
          btn.disabled = false;
          btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i><span>Confirm Room &amp; Bed Allocation</span>';
          lucide.createIcons();
        }
      }

      async function updateAdmissionStatus(id, status) {
        try {
          const res = await fetch('/api/admissions/' + id + '/status', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
          });
          if (!res.ok) throw new Error('Status update failed');
          showToast('Admission marked as ' + status);
          fetchModuleData();
        } catch (err) {
          showToast('Error: ' + err.message);
        }
      }

      async function deleteAdmission(id, name) {
        if (!confirm(\`Remove applicant record for "\${name}" permanently?\`)) return;

        try {
          const res = await fetch('/api/admissions/' + id, { method: 'DELETE' });
          if (!res.ok) throw new Error('Delete failed');
          showToast('Applicant record removed');
          fetchModuleData();
        } catch (err) {
          showToast('Error: ' + err.message);
        }
      }

      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'admissions',
    pageTitle: 'Student Admissions & Intake Desk',
    breadcrumb: 'Admissions',
    contentHtml,
    extraScripts,
  });
}
