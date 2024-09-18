import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

    ngOnInit(): void {
    this.renderChart()
}


  renderChart():void{
const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Income $",
      data: [
        80000, 59000, 69000, 81000, 56000, 55000, 41000, 65000, 59000, 53000, 81000, 56000, 55000, 40000,
        45000, 45000, 58000, 81000, 56000, 55000, 41000, 65000, 59000, 55000, 85000, 56000, 70000, 40000,
        45000, 55000, 30000,
      ],
      fill: true,
      borderColor: "#0d6efd",
      pointStyle: "circle",
      borderWidth: 3,
      radius: 2,
      hoverRadius: 10,
    },
  ],
};

  const chart = new Chart('barChart', {
  type: 'line',
  data: data,
  options: {
  }
    })
}
}
