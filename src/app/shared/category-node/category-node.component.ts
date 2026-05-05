import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-category-node',
  imports: [CommonModule,RouterModule],
  templateUrl: './category-node.component.html',
  styleUrl: './category-node.component.css'
})
export class CategoryNodeComponent {
  @Input() node?: any;
  @Input() activeSlug!: string;

  @Input() defaultOpen = false; // 🔥 ekledik
  
  open = false;

  ngOnInit() {
    this.open = this.defaultOpen || this.isActiveChild(this.node);
  }


  private isActiveChild(node:any):boolean{
    if(!node) return false;

    if(node.slug === this.activeSlug) return true;

    if(node.children?.length){
      
      return node.children.some((child:any)=>
        this.isActiveChild(child)
    )
    }
    return false;
  }
}
