import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { ReportsService } from '../../../core/services/reports.service';

@Component({
  selector: 'app-seller-orders-by-city',
  standalone: true,
  imports: [],
  templateUrl: './seller-orders-by-city.component.html',
  styleUrl: './seller-orders-by-city.component.scss'
})
export class SellerOrdersByCityComponent {

  @ViewChild('dailySalesChart') chartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;
   @ViewChild('ordersChart') ordersChartRef!: ElementRef<HTMLCanvasElement>;
 ordersChart!: Chart;

  dailyData: IorderByCity[] = [];

  constructor(private reportsService: ReportsService) {}
  ngAfterViewInit(): void {
    console.log("hi");
    let userId: number | null = localStorage.getItem('userID') !== null
    ? Number(localStorage.getItem('userID'))
    : null;
    console.log("userId",userId);

    this.reportsService.GetSellerOrdersByCity(userId).subscribe( {
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
    if (!ctxRevenue || !ctxOrders ) return;

    const labels = this.dailyData.map(d => d.City );
    const revenueData = this.dailyData.map(d => d.Total_Amount);
    const orderData = this.dailyData.map(d => d.OrdersCount);

    // 🟦 Revenue Chart
    this.chart = new Chart(ctxRevenue, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Daily Revenue (EGP)',
          data: revenueData,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
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
  type: 'doughnut',
  data: {
    labels: labels,
    datasets: [{
      label: 'Orders Count',
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


 interface IorderByCity {
    City: string
    OrdersCount: number
    Total_Amount: number
  }
