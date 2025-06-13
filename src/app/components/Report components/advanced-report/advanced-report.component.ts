import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReportsService } from '../../../core/services/reports.service';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-advanced-report',
  standalone: true,
  imports: [],
  templateUrl: './advanced-report.component.html',
  styleUrl: './advanced-report.component.scss'
})
export class AdvancedReportComponent {


  @ViewChild('dailySalesChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
ordersChart!: Chart;

@ViewChild('wishlistChart') wishlistChartRef!: ElementRef<HTMLCanvasElement>;
wishlistChart!: Chart;

CartToBuyRate!:number
WishlistToBuyRate!:number
ViewToBuyRate!:number

  constructor(private reportsService: ReportsService) {}
  ngAfterViewInit(): void {
    console.log("hi");
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;
    console.log("userId",userId);

    if (userId === null) return;

    forkJoin({
      cart: this.reportsService.GetCartToPurchaseRate(userId),
      wishlist: this.reportsService.GetWishlistToPurchaseRate(userId),
      view: this.reportsService.GetViewToBuyConversion(userId)
    }).subscribe({
      next: (res) => {
        this.CartToBuyRate = res.cart.data[0].CartToBuyRate;
        this.WishlistToBuyRate = res.wishlist.data[0].WishlistToBuyRate;
        this.ViewToBuyRate = res.view.data[0].ViewToBuyRate;

        console.log("All Rates Loaded");
        console.log(this.CartToBuyRate, this.WishlistToBuyRate, this.ViewToBuyRate);

        this.drawChart(); // ✅ استدعاء بعد ما التلاتة يخلصوا
      },
      error: (err) => {
        console.error("Error fetching data:", err);
      }
    });


  }

  drawChart() {
    const ctxRevenue = this.chartRef.nativeElement.getContext('2d');
    const ctxOrders = this.ordersChartRef.nativeElement.getContext('2d');
    const ctxWishlist = this.wishlistChartRef.nativeElement.getContext('2d');

    if (!ctxRevenue || !ctxOrders || !ctxWishlist) return;


    const percentage = +(this.CartToBuyRate * 100).toFixed(2); // مثلاً 35.71%
  const remaining = +(100 - percentage).toFixed(2);

    // 🟦 CartToBuyRate Chart
    this.chart = new Chart(ctxRevenue, {
      type: 'doughnut',
      data: {
        labels: ['Purchased', 'Not Purchased'],
        datasets: [{
          label: 'Cart to Purchase Rate',
          data: [percentage, remaining],
          backgroundColor: ['#2563eb', '#e5e7eb'], // الأزرق و الرمادي
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#333' }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      }
    });

    const percentage2 = +(this.ViewToBuyRate * 100).toFixed(2); // مثلاً 35.71%
  const remaining2 = +(100 - percentage2).toFixed(2);
    // 🟨 ViewToBuyRate Chart
    this.ordersChart = new Chart(ctxOrders, {
      type: 'doughnut',
      data: {
        labels: ['Purchased', 'Not Purchased'],
        datasets: [{
          label: 'Cart to Purchase Rate',
          data: [percentage2, remaining2],
          backgroundColor: ['#2563eb', '#e5e7eb'], // الأزرق و الرمادي
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: { color: '#333' }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return `${context.label}: ${context.parsed}%`;
              }
            }
          }
        }
      }
    });
    const wishlistPercentage = +(this.WishlistToBuyRate * 100).toFixed(2);
    const wishlistRemaining = +(100 - wishlistPercentage).toFixed(2);

    this.wishlistChart = new Chart(ctxWishlist, {
      type: 'doughnut',
      data: {
        labels: ['Purchased', 'Not Purchased'],
        datasets: [{
          label: 'Wishlist to Purchase Rate',
          data: [wishlistPercentage, wishlistRemaining],
          backgroundColor: ['#ec4899', '#e5e7eb'],
          borderWidth: 1
        }]
      },
      options: this.getChartOptions()
    });
  }

  getChartOptions() {
    return {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#333' }
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.label}: ${context.parsed}%`
          }
        }
      }
    };
  }

  }


  interface IOrders {

    Item_ID: string
    Item_Name: string
    CompareCount:number

  }
