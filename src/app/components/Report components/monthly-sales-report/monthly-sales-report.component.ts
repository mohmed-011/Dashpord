import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DailySalesReportComponent } from '../daily-sales-report/daily-sales-report.component';
import { ReportsService } from '../../../core/services/reports.service';

@Component({
  selector: 'app-monthly-sales-report',
  standalone: true,
  imports: [],
  templateUrl: './monthly-sales-report.component.html',
  styleUrl: './monthly-sales-report.component.scss'
})
export class MonthlySalesReportComponent {
 @ViewChild('dailySalesChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
  @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
ordersChart!: Chart;

  dailyData: MonthlySalesReport[] = [];

  constructor(private reportsService: ReportsService) {}
  ngAfterViewInit(): void {
    console.log("hi");
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;
    console.log("userId",userId);

    this.reportsService.getmonthlySalesReport(userId).subscribe( {
      next:(res)=>{
        this.dailyData = res.data
        console.log(this.dailyData );
        this.drawChart();
      },
      error:()=>{}

    });


  }

  drawChart() {
    const ctxRevenue = this.chartRef.nativeElement.getContext('2d');
    const ctxOrders = this.ordersChartRef.nativeElement.getContext('2d');
    if (!ctxRevenue || !ctxOrders) return;

    const labels = this.dailyData.map(d =>
      new Date(d.Period).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    );
    const revenueData = this.dailyData.map(d => d.TotalRevenue);
    const orderData = this.dailyData.map(d => d.OrderCount);

    // 🟦 Revenue Chart
    this.chart = new Chart(ctxRevenue, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Daily Revenue (EGP)',
          data: revenueData,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2563eb'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#333' } }
        },
        scales: {
          x: { ticks: { color: '#666' } },
          y: { ticks: { color: '#666' } }
        }
      }
    });

    // 🟨 Orders Chart
    this.ordersChart = new Chart(ctxOrders, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Products',
          data: orderData,
          backgroundColor: '#facc15' // yellow-400
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#333' } }
        },
        scales: {
          x: { ticks: { color: '#666' } },
          y: { ticks: { color: '#666' } }
        }
      }
    });
  }

}
interface MonthlySalesReport {
  Period: string;
  OrderCount: number;
  TotalRevenue: number;
}
