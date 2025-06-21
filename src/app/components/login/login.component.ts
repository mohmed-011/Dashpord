import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../core/services/auth-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
private readonly _Router =inject(Router)
private readonly _AuthService =inject(AuthServiceService)

  mgerror:string="";
  isLoding:boolean=false;
      constructor(private toastr: ToastrService) {}


loginForm:FormGroup = new FormGroup({


   userEmail: new FormControl(null , [Validators.required ,Validators.email]),

   password: new FormControl(null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),


  })

login():void{
     if(this.loginForm.valid){
      this.isLoding=true;
      this._AuthService.setloginFoem(this.loginForm.value).subscribe({
        next:(res)=>{
            console.log(res);
          if(res.message  == "success"){
            localStorage.setItem('userToken',res.Token) // 1-save token
            this._AuthService.saveUserData()
            localStorage.setItem('userID',this._AuthService.userData.nameid)
            this._Router.navigate(['/dashboard']) // 3-navigate to home
            console.log(res);

          }else{
          this.toastr.error("Email or Password not vaild", 'error');
          }

          console.log(res);


        },
        error:(err:HttpErrorResponse)=>{
          this.toastr.error("Email or Password not vaild", 'Done');

          // show error in html to user
          this.mgerror = err.error.message;
          this.isLoding=false;

          console.log(err);

        }
      })

       console.log(this.loginForm);
       console.log(this.loginForm.value);
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
