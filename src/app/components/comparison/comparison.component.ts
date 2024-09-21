import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent implements OnInit {
   ngOnInit(): void {
     this.renderChart();
   }

   renderChart():void{

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = ['January','February','March','April','May','June' ,'July']
const data = {
  labels: labels,
  datasets: [
    {
      label: 'product1',
      data: [1000,5000,6000,8000,7000,10000,9000],
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: [2000,4000,6000,8000,8000,6000,3000],
      borderColor: '#ea1a1a',
      backgroundColor: '#ea1a1a',
    }
  ]
};
const data2 = {
  labels: labels,
  datasets: [
    {
      label: 'product1',
      data: [1000,5000,6000,8000,7000,10000,9000],
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: [2000,4000,6000,8000,8000,6000,3000],
      borderColor: '#ea1a1a',
      backgroundColor: '#ea1a1a',
    },
    {
      label: 'product3',
      data: [9000,7000,5000,5000,6000,4000,6000],
      borderColor: '#8a1818',
      backgroundColor: '#ea1a1a',
    }
  ]
};

const chart = new Chart('lineChartComp', {
   type: 'line',
  data: data2,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },

    }
  },

})
const chart2 = new Chart('barChartComp', {
   type: 'bar',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },

    }
  },

})


   }
}
