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
  const datapie = {
    labels: ['1-Nike Running Shoes', '2-MacBook Pro', '3-Sony PlayStation 5', '4-Rolex Watch', '5-Dell Monitor','6-Xiaomi Smart Watch'],
    datasets: [
      {
        label: 'profit',
        data: [6,4,3,3,3,3],
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'gray'],
      }
    ]
};
  const dataDona = {
    labels: ['Dell XPS 13', 'iPhone 14', 'LG Refrigerator', 'MacBook Pro', 'Samsung 55 TV','Sony TV'],
    datasets: [
      {
        label: 'profit',
        data: [7,4,3,2,2,1],
        backgroundColor: ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'gray'],
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
  data: datapie,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Sold Products'
      }
    }
  },
});
    const chart2 = new Chart('pieChart', {
  type: 'pie',
  data: dataDona,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Most Viewed Products'
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
