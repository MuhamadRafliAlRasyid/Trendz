import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Mengimpor ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.page.html',
  styleUrls: ['./address-form.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule  // Pastikan ReactiveFormsModule sudah diimpor
  ]
})
export class AddressFormPage implements OnInit {
  addressForm!: FormGroup;
  provinces: any[] = [];
  cities: any[] = [];
  districts: any[] = [];
  villages: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.addressForm = this.fb.group({
      receiver_name: ['', Validators.required],
      phone: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      village: [''],
      postal_code: ['', Validators.required],
      detail: ['', Validators.required],
    });

    this.loadProvinces();
  }

  loadProvinces() {
    this.http.get<any[]>('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .subscribe(data => this.provinces = data);
  }

  onProvinceChange(provinceName: string) {
    const selected = this.provinces.find(p => p.name === provinceName);
    this.http.get<any[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selected.id}.json`)
      .subscribe(data => {
        this.cities = data;
        this.districts = [];
        this.villages = [];
        this.addressForm.patchValue({ city: '', district: '', village: '' });
      });
  }

  onCityChange(cityName: string) {
    const selected = this.cities.find(c => c.name === cityName);
    this.http.get<any[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selected.id}.json`)
      .subscribe(data => {
        this.districts = data;
        this.villages = [];
        this.addressForm.patchValue({ district: '', village: '' });
      });
  }

  onDistrictChange(districtName: string) {
    const selected = this.districts.find(d => d.name === districtName);
    this.http.get<any[]>(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selected.id}.json`)
      .subscribe(data => {
        this.villages = data;
        this.addressForm.patchValue({ village: '' });
      });
  }

  submitForm() {
  if (this.addressForm.valid) {
    const token = localStorage.getItem('token');
    this.http.post('http://localhost:8000/api/addresses', this.addressForm.value, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (res) => {
        console.log('Address saved:', res);
        this.router.navigate(['/address-selection']);
      },
      error: (err) => {
        console.error('Error saving address:', err);
      }
    });
  }
}

}
