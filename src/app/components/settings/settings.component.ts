import { Component, inject, OnInit } from '@angular/core';
import { SettingService } from '../../core/services/setting.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  private readonly _SettingService = inject(SettingService)

  profileList!:IsellerProfile
   GuserId: number | null =0
  ngOnInit(): void {
    let userId: number | null = localStorage.getItem('userID') !== null
            ? Number(localStorage.getItem('userID'))
            : null;
    this.GuserId =userId
    this._SettingService.GetSellerProfile(userId).subscribe({
      next:(res)=>{
        this.profileList=res.UserProfile;
        console.log(this.profileList);

      },
      error:()=>{}
    })


  }

SettingForm:FormGroup = new FormGroup({

  seller_ID: new FormControl(this.GuserId , [Validators.required ]),
  seller_Name: new FormControl(null , [Validators.required ]),
  phone: new FormControl(null , [Validators.required ]),
  location: new FormControl(null , [Validators.required]),
  })

  UudateSettingForm():void{
     if(this.SettingForm.valid){
      console.log("hi");
      console.log(this.SettingForm);
      this._SettingService.UpdateSellerProfile(this.SettingForm.value).subscribe({
        next:(res)=>{

            console.log(res);
          if(res.message  == "success"){

            console.log(res);

          }

          console.log(res);


        },
        error:()=>{

        }
      })
    }
    else{
      this.SettingForm.markAllAsTouched();
    }
  }

}
interface IsellerProfile {
  Seller_ID: number
  Email: string
  package: string
  phone: string
  Seller_Image: string
  seller_Name: string
  Location: string
}
