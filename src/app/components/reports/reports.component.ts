import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DailySalesReportComponent } from "../Report components/daily-sales-report/daily-sales-report.component";
import { MonthlySalesReportComponent } from "../Report components/monthly-sales-report/monthly-sales-report.component";
import { AllSellerOrdersComponent } from "../Report components/all-seller-orders/all-seller-orders.component";
import { SellerOrdersByCityComponent } from "../Report components/seller-orders-by-city/seller-orders-by-city.component";
import { TopProfitItemsComponent } from "../Report components/top-profit-items/top-profit-items.component";
import { UnsoldProductReportComponent } from "../Report components/unsold-product-report/unsold-product-report.component";
import { OutOfStokProductReportComponent } from "../Report components/out-of-stok-product-report/out-of-stok-product-report.component";
import { DiscountedProductReportComponent } from "../Report components/discounted-product-report/discounted-product-report.component";
import { MostWishlistProductReportComponent } from "../Report components/most-wishlist-product-report/most-wishlist-product-report.component";
import { MostComparedProductReportComponent } from "../Report components/most-compared-product-report/most-compared-product-report.component";
import { MostSoldProductReportComponent } from "../Report components/most-sold-product-report/most-sold-product-report.component";
import { MostViwedProductReportComponent } from "../Report components/most-viwed-product-report/most-viwed-product-report.component";
import { MostTopViewersReportComponent } from "../Report components/most-top-viewers-report/most-top-viewers-report.component";
import { AdvancedReportComponent } from "../Report components/advanced-report/advanced-report.component";
import { TopRateProductReportComponent } from "../Report components/top-rate-product-report/top-rate-product-report.component";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, DailySalesReportComponent, MonthlySalesReportComponent, AllSellerOrdersComponent, SellerOrdersByCityComponent, TopProfitItemsComponent, UnsoldProductReportComponent, OutOfStokProductReportComponent, DiscountedProductReportComponent, MostWishlistProductReportComponent, MostComparedProductReportComponent, MostSoldProductReportComponent, MostViwedProductReportComponent, MostTopViewersReportComponent, AdvancedReportComponent, TopRateProductReportComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  selectedReport: string | null = null;
  expandedGroups: Set<string> = new Set();

  reportTree = [
    {
      title: 'Orders Reports',
      icon: '📋',
      key: 'sales', // ✅ أضف المفتاح ده
      children: [
        { id: 'daily-sales', label: 'Daily Product in Orders' },
        { id: 'monthly-sales', label: 'Monthily Product in Orders' },
        { id: 'All-order', label: 'All Your Orders' },
        { id: 'order-By-City', label: 'Order By City' },
      ]
    },
    {
      title: 'Product Reports',
      icon: '📦',
      key: 'products',
      children: [
        { id: 'top-profit-items', label: 'Top Profit Product' },
        { id: 'unsold-items', label: 'Unsold Product' },
        { id: 'out-of-stock-items', label: 'out of stock Product' },
        { id: 'discountItems', label: 'discounted Items' },
        { id: 'mostsoldItem', label: 'Most Sold Item' },
        { id: 'witslistItems', label: 'most added to wishlist Items' },
        { id: 'comparedItems', label: 'most added to Comparision Items' },
        { id: 'toprateItems', label: 'Top Rated Items' }





      ]
    },
    {
      title: 'advanced',
      icon: '🧾',
      key: 'advanced',
      children: [
        { id: 'adv', label: 'Wished&Viewes$Compered VS Products' },
      ]
    },
    {
      title: 'Views',
      icon: '⭐',
      key: 'Views',
      children: [
        { id: 'Most-Viewed-Products', label: 'Most Viewed Products' },
        { id: 'Most-Viewers-Products', label: 'Most Viewers' }

      ]
    }
  ];


  toggleGroup(key: string) {
    this.expandedGroups.has(key)
      ? this.expandedGroups.delete(key)
      : this.expandedGroups.add(key);
  }

  isGroupExpanded(key: string): boolean {
    return this.expandedGroups.has(key);
  }

  selectReport(reportId: string) {
    this.selectedReport = reportId;
  }
}
