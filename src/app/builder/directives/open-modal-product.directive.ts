import { Directive, HostListener, Input } from '@angular/core';
import { ModalProductComponent } from '../components/edit-area/modal/modal-product/modal-product.component';
import { MatDialog } from '@angular/material';
import * as componentType from '../../shared/common/component-type';
import { WidgetComponent } from '../../shared/interfaces/widget-component';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { SectionActionService } from '../../shared/services/section-action.service';
declare var $: any;

@Directive({
  selector: '[appOpenModalProduct]'
})
export class OpenModalProductDirective {
  @Input('isMultiple') isMultiple;
  constructor(private dialog: MatDialog, private cService: ComponentActionService, private sService: SectionActionService) { }
  @HostListener('click') onClick() {
    const dialogRef = this.dialog.open(ModalProductComponent, {
      height: '90%',
      width: '90%',
      autoFocus: false,
      data: { isMultiple: false }
    });
    dialogRef.afterClosed().subscribe(products => {
      products.forEach(product => {
        const newProduct: WidgetComponent = $.extend(true, {}, componentType.PRODUCT_COMPONENT);
        const productImg = newProduct.childrens[0];
        productImg.contentStyle['background-image'] = `url('${product.img}')`;
        const productName = newProduct.childrens[1];
        productName.content = product.name;
        const productPrice = newProduct.childrens[2];
        productPrice.content = product.price;
        const mostVisible = this.sService.mostVisible;
        this.cService.addSpecialComponent(newProduct, mostVisible);
      });
    });
  }

}
