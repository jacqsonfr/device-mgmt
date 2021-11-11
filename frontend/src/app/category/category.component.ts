import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export interface CatItem {
  categoryId: number,
  name: string  
}

// const urlBase = 'http://localhost:3333';
const urlBase = 'https://murmuring-bayou-13244.herokuapp.com';

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
  loadingData: boolean = true;

  catForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(128)])
    })

  getCatList(): void{
    this.httpClient.get<CatItem[]>(`${urlBase}/category`)
    .subscribe(dados => {      
      this.catList = dados;
      this.loadingData = false;
    })
  }

  addCat(){            
    const newCat = this.catForm.value;
    this.httpClient.post<number>(`${urlBase}/category`, newCat)
    .subscribe(newCatId => {          
      if(!isNaN(newCatId)){   
        alert(`Category "${newCat.name}" criated successfully!`)                
          this.getCatList();
      }      
    })
  }

  delCat(categoria: CatItem){                 
      this.httpClient.delete(`${urlBase}/category/${categoria.categoryId}`,)
      .subscribe( () => { 
        alert(`Category "${categoria.name}" deleted successfully!`)       
        this.getCatList();    
      },error =>{        
        alert(error.error.message)
      })     
  }
}
