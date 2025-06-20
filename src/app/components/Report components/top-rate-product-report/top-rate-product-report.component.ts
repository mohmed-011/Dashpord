import { Component } from '@angular/core';
import { ReportsService } from '../../../core/services/reports.service';

@Component({
  selector: 'app-top-rate-product-report',
  standalone: true,
  imports: [],
  templateUrl: './top-rate-product-report.component.html',
  styleUrl: './top-rate-product-report.component.scss'
})
export class TopRateProductReportComponent {
//   @ViewChild('dailySalesChart') chartRef!: ElementRef<HTMLCanvasElement>;
//   chart!: Chart;
//   @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
// ordersChart!: Chart;

  dailyData: ITopProfit[] = [];

  constructor(private reportsService: ReportsService) {}
  ngAfterViewInit(): void {
    console.log("hi");
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;
    console.log("userId",userId);

    this.reportsService.GetTopRatedBySeller(userId).subscribe( {
      next:(res)=>{
        this.dailyData = res
        console.log(this.dailyData );
        // this.drawChart();
      },
      error:()=>{}

    });


  }

  // drawChart() {
  //   const ctxRevenue = this.chartRef.nativeElement.getContext('2d');
  //   const ctxOrders = this.ordersChartRef.nativeElement.getContext('2d');
  //   if (!ctxRevenue || !ctxOrders) return;

  //   const labels = this.dailyData.map(d => d.Item_Name );
  //   const revenueData = this.dailyData.map(d => d.TotalProfit);
  //   // const orderData = this.dailyData.map(d => d.OrderCount);

  //   // 🟦 Revenue Chart
  //   this.chart = new Chart(ctxRevenue, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Total Daily Revenue (EGP)',
  //         data: revenueData,
  //         borderColor: '#2563eb',
  //         backgroundColor: 'rgba(37, 99, 235, 0.2)',
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: { labels: { color: '#333' } }
  //       },
  //       scales: {
  //         x: { ticks: { color: '#666' } },
  //         y: { ticks: { color: '#666' } }
  //       }
  //     }
  //   });

  //   // 🟨 Orders Chart
  //   this.ordersChart = new Chart(ctxOrders, {
  //     type: 'doughnut',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Products',
  //         data: revenueData,
  //         backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'gray'],
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Top Sold Products'
  //         }
  //       }
  //     },
  //   });
  // }

  }


  interface ITopProfit {
    Item_ID: string
    Item_Name: string
    AvgRating: number
  }
