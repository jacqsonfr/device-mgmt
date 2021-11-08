import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CatItem } from '../category/category.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface DeviceItem {
  deviceId: number,
  category_id:number,
  name:number,
  part_number: string,
  color: string  
}

const urlBase = 'http://localhost:3333';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {  
  
  constructor(private httpClient: HttpClient){}

  ngOnInit(): void{
    this.getCatList(); 
    this.getDeviceList();   
  }

  catList: CatItem[] =[];
  deviceList: DeviceItem[] =[];

  deviceForm = new FormGroup({
    category_id: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required, Validators.maxLength(16), Validators.pattern('[a-zA-Z ]*')]),
    part_number: new FormControl('', [Validators.required, Validators.min(1)])
    })

  getCatList(): void{
    this.httpClient.get<CatItem[]>(`${urlBase}/category`)
    .subscribe(dados => {  
      console.log(dados);          
      this.catList = dados;
    })
  }

  getDeviceList(): void{
    this.httpClient.get<DeviceItem[]>(`${urlBase}/device`)
    .subscribe(dados => {    
      console.log(dados);  
      this.deviceList = dados;
    })
  }

  addDevice():void{
    const newDevice = this.deviceForm.value;
    console.log(newDevice);
    
    this.httpClient.post<number>(`${urlBase}/device`, newDevice)
    .subscribe(newDeviceId => {          
      if(!isNaN(newDeviceId)){ 
        alert(`Dispositivo criado com sucesso!`)                
        this.getCatList(); 
        this.getDeviceList(); 
      }      
    })
  }

  delDevice(device: DeviceItem){ 
    console.log(device);
                    
    this.httpClient.delete(`${urlBase}/device/${device.deviceId}`,)
    .subscribe( () => {   
      alert(`Dispositivo deletado com sucesso!`)        
      this.getDeviceList(); 
    },error =>{        
      alert(error.error.message)
    })     
}
}
