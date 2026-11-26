import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';
import { getDashboardViewHtml } from './views/dashboard.view';
import { getHostelsViewHtml } from './views/hostels.view';
import { getFloorplanViewHtml } from './views/floorplan.view';
import { getAdmissionsViewHtml } from './views/admissions.view';
import { getBillingViewHtml } from './views/billing.view';
import { getRoomsViewHtml } from './views/rooms.view';
import { getMaintenanceViewHtml } from './views/maintenance.view';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /**
   * 1. Dashboard View (Exact Purity UI Recreation)
   * GET /admin or GET /admin/ui
   */
  @Get()
  getDashboardPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getDashboardViewHtml());
  }

  @Get('ui')
  getDashboardUi(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getDashboardViewHtml());
  }

  /**
   * 2. Hostels & Campus Management View
   * GET /admin/hostels
   */
  @Get('hostels')
  getHostelsPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getHostelsViewHtml());
  }

  /**
   * 3. 2D Architectural Floorplan & Room Layout View
   * GET /admin/floorplan
   */
  @Get('floorplan')
  getFloorplanPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getFloorplanViewHtml());
  }

  /**
   * 4. Admissions & Student Applications View
   * GET /admin/admissions
   */
  @Get('admissions')
  getAdmissionsPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getAdmissionsViewHtml());
  }

  /**
   * 5. Billing & Accounting Ledger View
   * GET /admin/billing
   */
  @Get('billing')
  getBillingPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getBillingViewHtml());
  }

  /**
   * 6. Rooms & Bed Inventory Management View
   * GET /admin/rooms
   */
  @Get('rooms')
  getRoomsPage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getRoomsViewHtml());
  }

  /**
   * 5. Facilities & Maintenance Queue View
   * GET /admin/maintenance
   */
  @Get('maintenance')
  getMaintenancePage(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/html');
    return res.send(getMaintenanceViewHtml());
  }

  /**
   * REST API: Main ERP Admin Dashboard KPI & Summary Endpoint
   * GET /api/admin/dashboard
   */
  @Get('dashboard')
  async getDashboardSummary() {
    return this.adminService.getDashboardSummary();
  }

  /**
   * REST API: Occupancy distribution by floor and room type
   * GET /api/admin/dashboard/occupancy
   */
  @Get('dashboard/occupancy')
  async getOccupancyBreakdown() {
    return this.adminService.getOccupancyBreakdown();
  }

  /**
   * REST API: Financial analytics and payment methods
   * GET /api/admin/dashboard/financials
   */
  @Get('dashboard/financials')
  async getFinancialAnalytics() {
    return this.adminService.getFinancialAnalytics();
  }
}
