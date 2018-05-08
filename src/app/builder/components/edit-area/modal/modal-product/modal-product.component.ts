import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { UserService } from '../../../../../shared/services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {
  isMultiple: boolean;
  private _products = [];
  search: string;
  private _selectedProducts = [];
  constructor(private pService: ProductService, private uService: UserService,
    private dialogRef: MatDialogRef<ModalProductComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.isMultiple = data.isMultiple;
  }

  ngOnInit() {
    this.pService.getAll(this.uService.getCurrentUser(), this.uService.productsUrl).subscribe(res => {
      this._products = res;
    });
  }

  get products() {
    if (typeof this.search !== 'undefined' && this.search !== null && this.search.trim().length > 0) {
      return this._products.filter(product => {
        return product.name.toLocaleLowerCase().search(this.search.toLowerCase()) >= 0;
      });
    } else {
      return this._products;
    }
  }
  selectProduct(product) {
    this._selectedProducts.push(product);
    this.selectProducts();
  }

  selectProducts() {
    this.dialogRef.close(this._selectedProducts);
  }
}
