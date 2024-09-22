import { Component, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit{
  ngOnInit(): void {
    this.rendercharts();
  }
rendercharts():void{

  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        label: 'profit',
        data: [10,50,90,80,70],
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
      }
    ]
};
  const dataline = {
    labels: ['January','February','March','April','May','June' ,'July'],
    datasets: [
      {
        label: 'profit',
        data: [100,500,900,800,700,800,900],
        backgroundColor: '#0d6efd'
      }
    ]
};
  const databar = {
    labels: ['January','February','March','April','May','June' ,'July'],
    datasets: [
      {
        label: 'profit',
        data: [900,800,600,700,600,500,800],
        backgroundColor:  '#0d6efd',
      }
    ]
};
    const chart = new Chart('DonaChart', {
  type: 'doughnut',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  },
});
    const chart2 = new Chart('pieChart', {
  type: 'pie',
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  },
});
    const chart3 = new Chart('lineChart', {
  type: 'line',
  data: dataline,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  },
});
    const chart4 = new Chart('bar2Chart', {
  type: 'bar',
  data: databar,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Doughnut Chart'
      }
    }
  },
});
}
}
