import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TemplatesComponent } from './templates.component';
import { TemplateActionService } from './services/template-action.service';

@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule
  ],
  providers: [TemplateActionService],
  declarations: [TemplatesComponent]
})
export class TemplatesModule { }
