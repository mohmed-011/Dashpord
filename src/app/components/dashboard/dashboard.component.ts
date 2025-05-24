import { ITopRated } from './../../core/Interfaces/Top/itop-rated';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { ChartsService } from '../../core/services/charts.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { TopService } from '../../core/services/top.service';
import { IMostselas } from '../../core/Interfaces/Top/imostselas';
import { ISellernumbrs } from '../../core/Interfaces/isellernumbrs';
Chart.register(...registerables)

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
private readonly _ChartsService =inject(ChartsService)
private readonly _TopService = inject(TopService)
topRatedList:ITopRated[]=[]
topSoldList:IMostselas[]=[]
SellerNumber:ISellernumbrs[]=[]




    ngOnInit(): void {
      let userId: number | null = localStorage.getItem('userID') !== null
  ? Number(localStorage.getItem('userID'))
  : null;

      this._ChartsService.GetMonthImports(userId).subscribe({

              next:(res)=>{
                // move to login
                if(res.message  == "success"){
                  console.log(res.Data);
                  this.renderChart(res.Data)
                }
              },
              error:(err:HttpErrorResponse)=>{
                // show error in html to user
                console.log(err);

              }
      })

      this._TopService.GetMostSelas(userId).subscribe({
        next:(res)=>{
          // move to login
            console.log(res);
            this.topSoldList = res;
            console.log(this.topSoldList);
        },
        error:(err:HttpErrorResponse)=>{
          // show error in html to user
          console.log(err);
        }
      })
      this._ChartsService.GetSellerNumbers(userId).subscribe({
        next:(res)=>{
          // move to login
            console.log(res);
            this.SellerNumber = res.data;
            console.log(this.SellerNumber);
        },
        error:(err:HttpErrorResponse)=>{
          // show error in html to user
          console.log(err);
        }

      })
}


  renderChart(dataa:any):void{
   let importData: number[] = [];

for (let index = 0; index < dataa.length; index++) {
  importData.push(dataa[index].Total_Sales);
}
const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const data = {
  labels: labels,
  datasets: [
    {
      label: "Income $",
      data:importData //[
        // 80000, 59000, 69000, 81000, 56000, 55000, 41000, 65000, 59000, 53000, 81000, 56000, 55000, 40000,
        // 45000, 45000, 58000, 81000, 56000, 55000, 41000, 65000, 59000, 55000, 85000, 56000, 70000, 40000,
        // 45000, 55000, 30000,
      //]
      ,
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
