import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageActionService } from '../../../../../shared/services/page-action.service';
import { Grid } from '../../../../classes/grid';

@Component({
  selector: 'app-modal-auto-grid',
  templateUrl: './modal-auto-grid.component.html',
  styleUrls: ['./modal-auto-grid.component.scss']
})
export class ModalAutoGridComponent implements OnInit {
  grid: Grid = new Grid(this.pService.grid.total, this.pService.grid.padding);
  constructor(private pService: PageActionService) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.pService.grid = Object.assign({}, this.grid);
      this.pService.isShowGrid = true;
    }
  }
  disableGrid(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.pService.isShowGrid = false;
  }
}
