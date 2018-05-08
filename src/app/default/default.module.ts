import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Entry Components
import { ModalNewPageComponent } from './components/modal-new-page/modal-new-page.component';
import { ModalAddTemplateComponent } from './components/modal-add-template/modal-add-template.component';
const ENTRY_COMPONENTS = [ModalNewPageComponent, ModalAddTemplateComponent];
// Layout Component
import { DefaultComponent } from './default.component';
import { ContentComponent } from './components/content/content.component';
const LAYOUT_COMPONENT = [DefaultComponent, ModalNewPageComponent, ContentComponent, ModalAddTemplateComponent];
// Layout component

// DIRECTIVES

import { OpenModalNewPageDirective } from './directives/open-modal-new-page.directive';
const DIRECTIVES = [OpenModalNewPageDirective];
//


import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  imports: [BrowserAnimationsModule, RouterModule, SharedModule],
  exports: [LAYOUT_COMPONENT],
  declarations: [LAYOUT_COMPONENT, DIRECTIVES],
  entryComponents: [ENTRY_COMPONENTS]
})
export class DefaultModule { }
