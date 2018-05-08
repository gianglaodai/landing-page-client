import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PAGE_COMPONENT
import { ButtonComponent } from './components/component-tool/button.component';
import { H1Component } from './components/component-tool/h1.component';
import { H2Component } from './components/component-tool/h2.component';
import { H3Component } from './components/component-tool/h3.component';
import { ParagraphComponent } from './components/component-tool/paragraph.component';
import { ULComponent } from './components/component-tool/ul/ul.component';
import { GmapComponent } from './components/component-tool/gmap/gmap.component';
import { CountdownComponent } from './components/component-tool/countdown/countdown.component';
import { ModalPageNameComponent } from './components/modal-page-name/modal-page-name.component';
import { DefaultMenuComponent } from './components/default-menu/default-menu.component';
import { CarouselComponent } from './components/component-tool/carousel/carousel.component';
import { CommentsComponent } from './components/component-tool/comments/comments.component';
const PAGE_COMPONENT = [
  ButtonComponent, H1Component, H2Component, H3Component, ParagraphComponent, ULComponent, GmapComponent, CountdownComponent,
  ModalPageNameComponent, DefaultMenuComponent, CarouselComponent, CommentsComponent
];
// PAGE_COMPONENT

// DIRECTIVES
import { OpenPopupDirective } from './directives/open-popup.directive';
import { EmbedChromeFixDirective } from './directives/embed-chrome-fix.directive';
const DIRECTIVES = [OpenPopupDirective, EmbedChromeFixDirective];
// DIRECTIVES

// PIPES
// import { JoinStylePipe } from './pipes/join-style.pipe';
import { ConvertRectPipe } from './pipes/convert-rect.pipe';
const PIPES = [ConvertRectPipe];
// PIPES

// Material Module
import {
  MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSlideToggleModule, MatDialogModule, MatInputModule, MatTabsModule,
  MatSidenavModule, MatExpansionModule, MatSelectModule, MatButtonToggleModule, MatListModule, MatDividerModule, MatCheckboxModule,
  MatProgressSpinnerModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatCardModule, MatChipsModule,
  MatAutocompleteModule, MatToolbarModule, MatStepperModule, MatRadioModule
} from '@angular/material';
const MATERIAL_MODULE = [
  MatMenuModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSlideToggleModule, MatDialogModule, MatInputModule, MatTabsModule,
  MatSidenavModule, MatExpansionModule, MatInputModule, MatSelectModule, MatButtonToggleModule, MatListModule, MatDividerModule,
  MatCheckboxModule, MatProgressSpinnerModule, MatSnackBarModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatCardModule,
  MatChipsModule, MatAutocompleteModule, MatToolbarModule, MatStepperModule, MatRadioModule
];
// Material Module

import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAnfl_ZYtUiI-3V4RaRPwk0df4nmkhEyWI',
    libraries: ['places'],
    language: 'vi',
    region: 'VN'
  }),
    MATERIAL_MODULE, FormsModule, CommonModule, RouterModule],
  declarations: [DIRECTIVES, PAGE_COMPONENT, PIPES],
  exports: [DIRECTIVES, PAGE_COMPONENT, PIPES, MATERIAL_MODULE, FormsModule],
  entryComponents: [ModalPageNameComponent]
})
export class SharedModule { }
