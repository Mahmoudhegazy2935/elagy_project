import { Component } from '@angular/core';
import { NavebarComponent } from "../navebar/navebar.component";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterModule, NavebarComponent,FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
[x: string]: any;

 // قائمة المحافظات
 governorates: string[] = ['القاهرة', 'الإسكندرية', 'الجيزة', 'الدقهلية', 'قنا'];

 // المتغير الذي سيحمل القيمة المختارة
 selectedGovernorate: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة

 // رسالة تعرض المحافظة المختارة
 get selectedGovernorateMessage(): string {
   return this.selectedGovernorate ? `المحافظة المختارة: ${this.selectedGovernorate}` : 'لم يتم اختيار محافظة';
 }

 m: string[] = ['نجع حمادي', 'قنا', 'دشنا', 'اولاد عمرو', 'الوقف'];

 // المتغير الذي سيحمل القيمة المختارة
 selectedm: string = ''; // يتم تحديثه عندما يختار المستخدم محافظة

 // رسالة تعرض المحافظة المختارة
 get selectedmMessage(): string {
   return this.selectedm ? `المركز المختارة: ${this.selectedm}` : 'لم يتم اختيار مركز';
 }

}
