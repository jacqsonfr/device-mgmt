import {Component} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {    
  
  sub_title: string = '';      
  page_index: number = 0;
  opened: boolean = true;

  fillerNav = [
    'Home',
    'Category',
    'Device'
  ]  

    updateContent(index: number): void{
        const menuName = this.fillerNav[index];
        this.page_index = index;
        this.sub_title = index != 0 ? ` -> ${menuName}` : '';   
        this.opened = false;     
    }

}
