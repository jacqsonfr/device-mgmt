import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {    
  
  sub_title: string = '';      
  page_index: number = 0;

  fillerNav = [
    'Home',
    'Category',
    'Device'
  ]    
    
  
    fillerContent = Array.from(
      {length: 5},
      () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    );  
    
  
    constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
      
    }
  
    ngOnInit(): void {
      // this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
    updateContent(index: number): void{
        const menuName = this.fillerNav[index];
        this.page_index = index;
        this.sub_title = index != 0 ? ` -> ${menuName}` : '';        
    }

}
