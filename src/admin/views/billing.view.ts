import { renderAdminLayout } from '../admin-layout.template';

export function getBillingViewHtml(): string {
  const contentHtml = `
    <div class="space-y-6">
      <!-- Top Action & Navigation Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg sm:text-xl font-bold text-[#2D3748]">Billing, Revenue &amp; Accounting Ledger</h2>
          <p class="text-xs text-[#718096] mt-0.5">Track real-time resident rent transactions, security deposits, payment methods, and generate tax receipts.</p>
        </div>
        <button onclick="openModal('record-payment-modal')" class="px-4 py-2.5 rounded-xl teal-gradient text-white text-xs font-bold shadow-md hover:opacity-95 transition-opacity cursor-pointer flex items-center gap-2 self-start sm:self-auto active:scale-95">
          <i data-lucide="plus-circle" class="w-4 h-4"></i>
          <span>+ Record Offline Receipt</span>
        </button>
      </div>

      <!-- 4 Summary Financial Metrics Cards -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Total Collections</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg sm:text-xl font-extrabold text-[#2D3748]">₹</span>
              <span class="text-lg sm:text-xl font-extrabold text-[#2D3748]" id="bill-total-revenue">0</span>
            </div>
            <span class="text-[11px] text-emerald-600 font-bold mt-1 block">+100% Reconciled</span>
          </div>
          <div class="w-11 h-11 rounded-xl teal-gradient flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="wallet" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Room Rent Collections</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg sm:text-xl font-extrabold text-teal-600">₹</span>
              <span class="text-lg sm:text-xl font-extrabold text-teal-600" id="bill-rent-share">0</span>
            </div>
            <span class="text-[11px] text-[#718096] mt-1 block">Primary revenue share</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="bed-double" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Deposits In-Hand</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg sm:text-xl font-extrabold text-blue-600">₹</span>
              <span class="text-lg sm:text-xl font-extrabold text-blue-600" id="bill-deposit-share">0</span>
            </div>
            <span class="text-[11px] text-[#718096] mt-1 block">Refundable escrow</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="shield-check" class="w-5 h-5"></i>
          </div>
        </div>

        <div class="purity-card p-4 flex items-center justify-between">
          <div>
            <span class="text-[10px] font-bold text-[#A0AEC0] uppercase tracking-wider block">Verified Transactions</span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-lg sm:text-xl font-extrabold text-[#2D3748]" id="bill-tx-count">0</span>
              <span class="text-xs text-emerald-600 font-bold ml-1.5">Invoices</span>
            </div>
            <span class="text-[11px] text-emerald-600 font-semibold mt-1 block">Digital audit trail</span>
          </div>
          <div class="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shrink-0">
            <i data-lucide="check-check" class="w-5 h-5"></i>
          </div>
        </div>
      </div>

      <!-- Main Ledger Card -->
      <div class="purity-card p-6">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h3 class="text-base font-bold text-[#2D3748]">Financial Ledger &amp; Invoices</h3>
            <p class="text-xs text-[#718096]">Reconciled audit trail of all resident dues, security deposits, and maintenance receipts.</p>
          </div>

          <!-- Multi-Level Filter Controls -->
          <div class="flex flex-wrap items-center gap-2">
            <!-- Search -->
            <div class="relative">
              <i data-lucide="search" class="w-3.5 h-3.5 text-[#A0AEC0] absolute left-3 top-1/2 -translate-y-1/2"></i>
              <input type="text" id="bill-search-input" oninput="applyFilters()" placeholder="Search invoice, payer, TXN..." class="pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] placeholder-[#A0AEC0] focus:border-[#4FD1C5] focus:outline-none w-48 sm:w-56 font-medium">
            </div>

            <!-- Payment Method selector -->
            <select id="method-filter" onchange="applyFilters()" class="py-1.5 px-3 rounded-xl border border-gray-200 text-xs bg-white text-[#2D3748] font-medium cursor-pointer focus:outline-none">
              <option value="ALL">All Payment Methods</option>
              <option value="UPI">UPI / Online</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Cash">Cash at Desk</option>
              <option value="Admin">Admin Direct Allocation</option>
            </select>

            <!-- Category Pills -->
            <div class="flex items-center p-0.5 rounded-xl bg-gray-100 border border-gray-200 text-xs overflow-x-auto">
              <button onclick="setCategoryFilter('ALL')" class="pay-filter-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer" data-cat="ALL">All</button>
              <button onclick="setCategoryFilter('ROOM_RENT')" class="pay-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-cat="ROOM_RENT">Rent</button>
              <button onclick="setCategoryFilter('SECURITY_DEPOSIT')" class="pay-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-cat="SECURITY_DEPOSIT">Deposit</button>
              <button onclick="setCategoryFilter('ADMISSION_FEE')" class="pay-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-cat="ADMISSION_FEE">Intake Fee</button>
              <button onclick="setCategoryFilter('SERVICE_CHARGE')" class="pay-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer" data-cat="SERVICE_CHARGE">Service</button>
            </div>
          </div>
        </div>

        <!-- Ledger Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="text-[10px] font-bold uppercase tracking-wider text-[#A0AEC0] border-b border-gray-100">
                <th class="pb-3 px-3">INVOICE NO</th>
                <th class="pb-3 px-3">RESIDENT / PAYER</th>
                <th class="pb-3 px-3">TRANSACTION ID</th>
                <th class="pb-3 px-3">FEE CATEGORY</th>
                <th class="pb-3 px-3">METHOD</th>
                <th class="pb-3 px-3">AMOUNT</th>
                <th class="pb-3 px-3">STATUS</th>
                <th class="pb-3 px-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody id="billing-table-body" class="divide-y divide-gray-100 font-medium">
              <!-- Dynamically populated -->
            </tbody>
          </table>
        </div>

        <!-- Footer Strip -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-100 text-xs text-[#718096] mt-4">
          <span id="bill-count-indicator">Showing all receipts</span>
          <span class="text-[11px] text-slate-400">Click on any invoice row to view or print the official Tax Receipt</span>
        </div>
      </div>
    </div>

    <!-- ========================================================================= -->
    <!-- MODAL: OFFICIAL TAX INVOICE & RECEIPT VIEW / PRINT                        -->
    <!-- ========================================================================= -->
    <div id="invoice-modal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div class="purity-card max-w-2xl w-full p-0 overflow-hidden shadow-2xl border border-slate-200/90 flex flex-col my-auto max-h-[95vh] animate-scale-in">
        <!-- Modal Toolbar -->
        <div class="px-6 py-3.5 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <i data-lucide="receipt" class="w-4 h-4 text-teal-400"></i>
            <span class="text-xs font-bold font-mono tracking-wider">OFFICIAL ERP INVOICE RECEIPT</span>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" onclick="window.print()" class="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i>
              <span>Print Invoice</span>
            </button>
            <button type="button" onclick="closeModal('invoice-modal')" class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer" title="Close">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Printable Invoice Canvas -->
        <div class="p-6 sm:p-8 bg-white overflow-y-auto custom-scrollbar flex-1 space-y-6" id="invoice-printable-content">
          <!-- Populated dynamically -->
        </div>

        <!-- Modal Footer -->
        <div class="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Digital GST Compliance Receipt • Verified by Aura Hostels Pro</span>
          <button type="button" onclick="closeModal('invoice-modal')" class="px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer">
            Dismiss
          </button>
        </div>
      </div>
    </div>
  `;

  const extraScripts = `
    <script>
      let currentCategoryFilter = 'ALL';
      let paymentsData = [];

      async function fetchModuleData() {
        const spin = document.getElementById('refresh-spin');
        if (spin) spin.classList.add('animate-spin');

        try {
          const [payRes, statsRes] = await Promise.all([
            fetch('/api/payments').then(r => r.json()),
            fetch('/api/payments/stats').then(r => r.json())
          ]);

          paymentsData = Array.isArray(payRes) ? payRes : [];

          // Financial stats
          document.getElementById('bill-total-revenue').innerText = (statsRes?.totalCollected || 0).toLocaleString('en-IN');
          document.getElementById('bill-rent-share').innerText = ((statsRes?.byType && statsRes.byType['ROOM_RENT']) || 0).toLocaleString('en-IN');
          document.getElementById('bill-deposit-share').innerText = ((statsRes?.byType && statsRes.byType['SECURITY_DEPOSIT']) || 0).toLocaleString('en-IN');
          document.getElementById('bill-tx-count').innerText = statsRes?.totalTransactions || paymentsData.length;

          renderTable();
        } catch (err) {
          console.error('Error fetching billing data:', err);
        } finally {
          if (spin) spin.classList.remove('animate-spin');
          lucide.createIcons();
        }
      }

      function setCategoryFilter(cat) {
        currentCategoryFilter = cat;
        document.querySelectorAll('.pay-filter-btn').forEach(btn => {
          if (btn.getAttribute('data-cat') === cat) {
            btn.className = 'pay-filter-btn px-2.5 py-1 rounded-lg font-bold text-[11px] bg-white text-[#2D3748] shadow-2xs transition-all cursor-pointer';
          } else {
            btn.className = 'pay-filter-btn px-2.5 py-1 rounded-lg font-semibold text-[11px] text-[#718096] hover:text-[#2D3748] transition-all cursor-pointer';
          }
        });
        renderTable();
      }

      function applyFilters() {
        renderTable();
      }

      function renderTable() {
        const tbody = document.getElementById('billing-table-body');
        if (!tbody) return;

        const q = (document.getElementById('bill-search-input')?.value || '').trim().toLowerCase();
        const method = document.getElementById('method-filter')?.value || 'ALL';

        const filtered = paymentsData.filter(p => {
          if (currentCategoryFilter !== 'ALL' && p.paymentType !== currentCategoryFilter) return false;
          if (method !== 'ALL' && !(p.paymentMethod || '').toLowerCase().includes(method.toLowerCase())) return false;

          if (q) {
            const invMatch = (p.invoiceNumber || '').toLowerCase().includes(q);
            const txnMatch = (p.transactionId || '').toLowerCase().includes(q);
            const payerMatch = (p.payerName || '').toLowerCase().includes(q);
            const emailMatch = (p.payerEmail || '').toLowerCase().includes(q);
            if (!invMatch && !txnMatch && !payerMatch && !emailMatch) return false;
          }

          return true;
        });

        document.getElementById('bill-count-indicator').innerText = \`Displaying \${filtered.length} of \${paymentsData.length} recorded invoices\`;

        if (filtered.length === 0) {
          tbody.innerHTML = '<tr><td colspan="8" class="py-12 text-center text-[#A0AEC0] italic bg-slate-50/50">No payment receipts matched the filter criteria.</td></tr>';
          return;
        }

        tbody.innerHTML = filtered.map(p => {
          const initials = (p.payerName || 'PR').split(' ').map(n=>n[0]).slice(0, 2).join('');
          
          let catPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">ROOM RENT</span>';
          if (p.paymentType === 'SECURITY_DEPOSIT') {
            catPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">DEPOSIT</span>';
          } else if (p.paymentType === 'ADMISSION_FEE') {
            catPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">INTAKE FEE</span>';
          } else if (p.paymentType === 'SERVICE_CHARGE') {
            catPill = '<span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">SERVICE</span>';
          }

          return \`
            <tr class="hover:bg-gray-50/60 transition-colors">
              <td class="py-3 px-3">
                <div class="flex items-center gap-1.5 font-mono font-bold text-slate-800 cursor-pointer hover:text-teal-600" onclick="openInvoiceModal('\${p.id}')">
                  <i data-lucide="receipt" class="w-3.5 h-3.5 text-teal-600 shrink-0"></i>
                  <span>\${p.invoiceNumber}</span>
                </div>
                <span class="text-[10px] text-slate-400 font-sans block">\${new Date(p.paidAt || p.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </td>
              <td class="py-3 px-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-lg teal-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                    \${initials}
                  </div>
                  <div>
                    <p class="font-bold text-slate-900">\${p.payerName}</p>
                    <p class="text-[10px] text-slate-400">\${p.payerEmail}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-3 font-mono text-[11px] text-slate-600">
                <div class="flex items-center gap-1">
                  <span>\${p.transactionId}</span>
                  <button type="button" onclick="navigator.clipboard.writeText('\${p.transactionId}'); showToast('TXN ID copied!');" class="p-1 hover:bg-slate-200/60 rounded text-slate-400 hover:text-slate-700" title="Copy TXN ID">
                    <i data-lucide="copy" class="w-3 h-3"></i>
                  </button>
                </div>
              </td>
              <td class="py-3 px-3">\${catPill}</td>
              <td class="py-3 px-3 text-slate-700 font-medium">
                <div class="flex items-center gap-1">
                  <i data-lucide="credit-card" class="w-3 h-3 text-slate-400"></i>
                  <span>\${p.paymentMethod || 'Online'}</span>
                </div>
              </td>
              <td class="py-3 px-3 font-bold text-emerald-600 text-sm">
                ₹\${Number(p.amount || 0).toLocaleString('en-IN')}
              </td>
              <td class="py-3 px-3">
                <span class="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
                  \${p.status}
                </span>
              </td>
              <td class="py-3 px-3 text-right">
                <button type="button" onclick="openInvoiceModal('\${p.id}')" class="px-3 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ml-auto">
                  <i data-lucide="eye" class="w-3 h-3"></i>
                  <span>Invoice</span>
                </button>
              </td>
            </tr>
          \`;
        }).join('');

        lucide.createIcons();
      }

      // =======================================================================
      // MODAL: TAX INVOICE RECEIPT GENERATOR
      // =======================================================================
      function openInvoiceModal(paymentId) {
        const p = paymentsData.find(x => x.id === paymentId);
        if (!p) return;

        const content = document.getElementById('invoice-printable-content');
        const formattedDate = new Date(p.paidAt || p.createdAt).toLocaleDateString('en-IN', {
          day: '2-digit', month: 'long', year: 'numeric'
        });

        const amount = Number(p.amount || 0);
        const subtotal = amount;

        content.innerHTML = \`
          <!-- Letterhead -->
          <div class="flex justify-between items-start pb-6 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  AH
                </div>
                <h3 class="text-base font-extrabold text-slate-900 uppercase tracking-wide">AURA HOSTELS PRO</h3>
              </div>
              <p class="text-xs text-slate-500 font-medium leading-relaxed">
                Campus Student Housing &amp; Resident Services<br>
                14 Bayview Promenade, North Coast Campus<br>
                Mumbai, MH 400001 &bull; GSTIN: 27AABCA9918K1ZM
              </p>
            </div>
            <div class="text-right">
              <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                Payment Completed
              </span>
              <h4 class="text-lg font-mono font-bold text-slate-900 mt-2">\${p.invoiceNumber}</h4>
              <p class="text-xs text-slate-400">Date: \${formattedDate}</p>
            </div>
          </div>

          <!-- Billed to & Payment Info -->
          <div class="grid grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Billed To (Resident):</span>
              <p class="text-sm font-bold text-slate-900">\${p.payerName}</p>
              <p class="text-slate-600 mt-0.5">\${p.payerEmail}</p>
              <p class="text-slate-500 mt-0.5">Booking Ref: \${p.bookingId ? p.bookingId.slice(0, 8).toUpperCase() : 'DIRECT-INTAKE'}</p>
            </div>
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Transaction Details:</span>
              <p class="text-slate-700"><span class="font-semibold text-slate-900">Payment Gateway:</span> \${p.paymentMethod}</p>
              <p class="text-slate-700 font-mono"><span class="font-semibold text-slate-900 font-sans">TXN Ref:</span> \${p.transactionId}</p>
              <p class="text-slate-700"><span class="font-semibold text-slate-900">Category:</span> \${(p.paymentType || '').replace(/_/g, ' ')}</p>
            </div>
          </div>

          <!-- Itemized Breakdown Table -->
          <div>
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  <th class="py-2.5">DESCRIPTION &amp; PERIOD</th>
                  <th class="py-2.5 text-center">QTY</th>
                  <th class="py-2.5 text-right">UNIT CHARGE</th>
                  <th class="py-2.5 text-right">TOTAL</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-800 font-medium">
                <tr>
                  <td class="py-3">
                    <p class="font-bold text-slate-900">\${(p.paymentType || '').replace(/_/g, ' ')}</p>
                    <p class="text-[11px] text-slate-500">Student hostel residential accommodation dues &amp; common facilities</p>
                  </td>
                  <td class="py-3 text-center">1</td>
                  <td class="py-3 text-right">₹\${subtotal.toLocaleString('en-IN')}</td>
                  <td class="py-3 text-right font-bold text-slate-900">₹\${subtotal.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="border-t border-slate-200">
                  <td colspan="3" class="pt-3 text-right font-semibold text-slate-600">Subtotal:</td>
                  <td class="pt-3 text-right font-bold text-slate-900">₹\${subtotal.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td colspan="3" class="py-1 text-right text-slate-500">Hostel Student Exemption (GST @ 0%):</td>
                  <td class="py-1 text-right text-slate-500">₹0.00</td>
                </tr>
                <tr class="border-t border-slate-300">
                  <td colspan="3" class="pt-2 text-right text-sm font-extrabold text-slate-900">Total Paid:</td>
                  <td class="pt-2 text-right text-base font-extrabold text-teal-600">₹\${amount.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <!-- Official Stamp & Notes -->
          <div class="pt-6 border-t border-slate-200 flex justify-between items-end">
            <div class="max-w-xs text-[10px] text-slate-400 leading-relaxed">
              This is an authorized system-generated computer invoice issued by Aura Hostels Pro ERP. No physical signature is required. All security deposits are subject to hostel terms.
            </div>
            <div class="text-center p-3 rounded-xl border border-teal-200 bg-teal-50/40">
              <span class="text-[9px] font-bold uppercase tracking-wider text-teal-800 block">Digitally Verified</span>
              <span class="text-xs font-mono font-bold text-teal-900">CAMPUS BURSAR DESK</span>
            </div>
          </div>
        \`;

        openModal('invoice-modal');
        lucide.createIcons();
      }

      fetchModuleData();
    </script>
  `;

  return renderAdminLayout({
    activeRoute: 'billing',
    pageTitle: 'Accounting Ledger & Invoicing Desk',
    breadcrumb: 'Billing',
    contentHtml,
    extraScripts,
  });
}
