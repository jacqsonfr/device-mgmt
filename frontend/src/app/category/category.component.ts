import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface CatItem {
  categoryId: number,
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
  this.getCatList();   
}

  catList: CatItem[] =[]

  catForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(128)])
    })

  getCatList(): void{
    this.httpClient.get<CatItem[]>(`${urlBase}/category`)
    .subscribe(dados => {      
      this.catList = dados;
    })
  }

  addCat(){            
    const newCat = this.catForm.value;
    this.httpClient.post<number>(`${urlBase}/category`, newCat)
    .subscribe(newCatId => {          
      if(!isNaN(newCatId)){                
          this.getCatList();
      }      
    })
  }

  delCat(categoria: CatItem){                 
      this.httpClient.delete(`${urlBase}/category/${categoria.categoryId}`,)
      .subscribe( () => {        
        this.getCatList();    
      },error =>{        
        alert(error.error.message)
      })     
  }
}
