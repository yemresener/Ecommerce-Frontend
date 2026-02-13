import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category-node',
  imports: [CommonModule],
  templateUrl: './category-node.component.html',
  styleUrl: './category-node.component.css'
})
export class CategoryNodeComponent {
  @Input() node: any;

  @Input() defaultOpen = false; // 🔥 ekledik

  open = false;

  ngOnInit() {
    this.open = this.defaultOpen;
  }
}
