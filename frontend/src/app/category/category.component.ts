import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


export interface CatItem {
  id: number,
  name: string  
}

const urlBase = 'http://localhost:3333';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {  

constructor(private httpClient: HttpClient){}

ngOnInit(): void{
  this.httpClient.get<CatItem[]>(`${urlBase}/category`)
  .subscribe(dados => {
    console.log(dados);
    this.catList = dados;
  })
}


  counter: number = 3
  newCat: string = '';

  catList: CatItem[] =[]

  catForm = new FormGroup({
    name: new FormControl('')
    })



  addCat(){        
    console.log(this.catForm.value.name);
    this.catList.push({
      id:this.counter++,
      name:this.catForm.value.name      
    });
  }

  delCat(index: number){    
    this.catList.splice(index,1);
  }
}
