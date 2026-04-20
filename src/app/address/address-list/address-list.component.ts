import { Component,Input,EventEmitter,Output } from '@angular/core';
import { AddressInterface } from '../../interfaces/address-interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-address-list',
  imports: [CommonModule],
  templateUrl: './address-list.component.html',
  styleUrl: './address-list.component.css'
})
export class AddressListComponent {
  @Input() addresses: AddressInterface[] | null = null;
  @Input() loading: boolean = true;
  @Output() edit = new EventEmitter<AddressInterface>();
  @Output() delete = new EventEmitter<number>();
  @Output() makeDefault = new EventEmitter<number>();


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.addresses,this.loading);

  }

}
