import { Data } from './../../core/Interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import {Chart, registerables} from 'chart.js';
import { ProductsService } from '../../core/services/products.service';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { IProduct } from '../../core/Interfaces/iproduct';
import { ICompare } from '../../core/Interfaces/icompare';
import { ChartsService } from '../../core/services/charts.service';
Chart.register(...registerables)

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent implements OnInit {
    private readonly _ProductsService = inject(ProductsService)
    private readonly _AuthServiceService = inject(AuthServiceService)
    private readonly _ChartsService = inject(ChartsService)



  productList:IProduct[]=[]
  comparList:ICompare[]=[]



   ngOnInit(): void {
     this._ProductsService.GetAllProduct( this._AuthServiceService.userData.nameid).subscribe({
      next:(res)=>{
        if(res.message == "success"){
           console.log(res)
         for (const item of res.products) {
          this.productList.push(item);
        }
        for (const item of this.productList) {
        console.log(item)
        }
        }
        console.log(res)
         for (const item of res) {
          this.productList.push(item);
        }
        for (const item of this.productList) {
        console.log(item)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })

   }

   selectedValues: string[] = [];
    itemOneSalesList: number[] = []
    itemTwoSalesList: number[] = []


  onCheckboxChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value; // بيسيبها string بدون تحويل

    if (input.checked) {
      this.selectedValues.push(value);
    } else {
      this.selectedValues = this.selectedValues.filter(v => v !== value);
    }
  }

  sendSelected() {
    console.log('Selected IDs 1:', this.selectedValues[0]);
    console.log('Selected IDs 2:', this.selectedValues[1]);
    this._ChartsService.GetMonthItemsComp(this.selectedValues[0],this.selectedValues[1]).subscribe({
      next:(res)=>{
        console.log(res)
        this.comparList = res.data
        console.log(this.comparList)
        this.itemOneSalesList = this.comparList.map(item => item.ItemOne_Sales);
        this.itemTwoSalesList = this.comparList.map(item => item.ItemTwo_Sales);

        console.log(this.itemOneSalesList)
        console.log(this.itemTwoSalesList)

        this.renderChart();
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
   renderChart():void{

const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

const labels = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'product1',
      data: this.itemOneSalesList,
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: this.itemTwoSalesList,
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
      data: this.itemOneSalesList,
      borderColor: "#0d6efd",
      backgroundColor: "#0d6efd",
    },
    {
      label: 'product2',
      data: this.itemTwoSalesList,
      borderColor: '#ea1a1a',
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
