import { NgModule } from '@angular/core';

import { HttpModule } from '@angular/http';

// Other
import { ColorPickerModule } from 'ngx-color-picker';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// Other

// Layout Component
import { BuilderComponent } from './builder.component';
import { MenuComponent } from './components/layout/menu/menu.component';
import { ToolbarComponent } from './components/layout/toolbar/toolbar.component';
import { SettingbarComponent } from './components/layout/settingbar/settingbar.component';
const LAYOUT_COMPONENT = [BuilderComponent, MenuComponent, ToolbarComponent, SettingbarComponent];
// Layout component

// EDIT AREA
// import { ButtonComponent } from './components/edit-area/component-tool/button.component';
// import { H1Component } from './components/edit-area/component-tool/h1.component';
// import { H2Component } from './components/edit-area/component-tool/h2.component';
// import { H3Component } from './components/edit-area/component-tool/h3.component';
// import { ParagraphComponent } from './components/edit-area/component-tool/paragraph.component';
// import { ULComponent } from './components/edit-area/component-tool/ul/ul.component';
// import { GmapComponent } from './components/edit-area/component-tool/gmap/gmap.component';
// import { CountdownComponent } from './components/edit-area/component-tool/countdown/countdown.component';
import { ModalIconComponent } from './components/edit-area/modal/modal-icon/modal-icon.component';
import { ModalImageComponent } from './components/edit-area/modal/modal-image/modal-image.component';
import { WidgetElementComponent } from './components/edit-area/widget-element/widget-element.component';
import { WidgetSectionComponent } from './components/edit-area/widget-section/widget-section.component';
import { WidgetHRulerComponent } from './components/edit-area/widget-hruler/widget-hruler.component';
import { WidgetVRulerComponent } from './components/edit-area/widget-vruler/widget-vruler.component';
import { EditContentComponent } from './components/edit-area/edit-content/edit-content.component';
import { WidgetEditElementComponent } from './components/edit-area/widget-edit-element/widget-edit-element.component';
import { WidgetEditSectionComponent } from './components/edit-area/widget-edit-section/widget-edit-section.component';
import { ModalSectionTemplateComponent } from './components/edit-area/modal/modal-section-template/modal-section-template.component';
import { VSnapLineComponent } from './components/edit-area/widget-vruler/v-snap-line.component';
import { HSnapLineComponent } from './components/edit-area/widget-hruler/h-snap-line.component';
import { ModalAutoGridComponent } from './components/edit-area/modal/modal-auto-grid/modal-auto-grid.component';
import { PanelHeadingComponent } from './components/edit-area/properties-panel/panel-heading/panel-heading.component';
import { PanelCharacterComponent } from './components/edit-area/properties-panel/panel-character/panel-character.component';
import { PanelBoxshadowComponent } from './components/edit-area/properties-panel/panel-boxshadow/panel-boxshadow.component';
import { PanelTextshadowComponent } from './components/edit-area/properties-panel/panel-textshadow/panel-textshadow.component';
import { PanelBorderComponent } from './components/edit-area/properties-panel/panel-border/panel-border.component';
import { ColorpickerComponent } from './components/edit-area/properties-panel/colorpicker/colorpicker.component';
import { PanelBackgroundComponent } from './components/edit-area/properties-panel/panel-background/panel-background.component';
import { PanelIconComponent } from './components/edit-area/properties-panel/panel-icon/panel-icon.component';
import { PanelYoutubeComponent } from './components/edit-area/properties-panel/panel-youtube/panel-youtube.component';
import { PanelGmapComponent } from './components/edit-area/properties-panel/panel-gmap/panel-gmap.component';
import { PanelCountdownComponent } from './components/edit-area/properties-panel/panel-countdown/panel-countdown.component';
import { WidgetEditPopupComponent } from './components/edit-area/widget-edit-popup/widget-edit-popup.component';
import { PanelImageComponent } from './components/edit-area/properties-panel/panel-image/panel-image.component';
import { PanelLinkComponent } from './components/edit-area/properties-panel/panel-link/panel-link.component';
import { ModalPopupTemplateComponent } from './components/edit-area/modal/modal-popup-template/modal-popup-template.component';
import { PanelListComponent } from './components/edit-area/properties-panel/panel-list/panel-list.component';
import { SectionRangeComponent } from './components/edit-area/section-range/section-range.component';
import { ComponentContextMenuComponent } from './components/edit-area/component-context-menu/component-context-menu.component';
import { PanelCssComponent } from './components/edit-area/properties-panel/panel-css/panel-css.component';
import { PanelAnimationComponent } from './components/edit-area/properties-panel/panel-animation/panel-animation.component';
import { PanelEventComponent } from './components/edit-area/properties-panel/panel-event/panel-event.component';
import { PanelStickyComponent } from './components/edit-area/properties-panel/panel-sticky/panel-sticky.component';
import { ModalPageConfigComponent } from './components/edit-area/modal/modal-page-config/modal-page-config.component';
import { ModalTrackingComponent } from './components/edit-area/modal/modal-tracking/modal-tracking.component';
import { ModalChangeHtmlComponent } from './components/edit-area/modal/modal-change-html/modal-change-html.component';
import { PanelCarouselComponent } from './components/edit-area/properties-panel/panel-carousel/panel-carousel.component';
import { PanelCommentsComponent } from './components/edit-area/properties-panel/panel-comments/panel-comments.component';
import { PanelFormComponent } from './components/edit-area/properties-panel/panel-form/panel-form.component';
import { PanelFormControlComponent } from './components/edit-area/properties-panel/panel-form-control/panel-form-control.component';
import { ModalFormControlsComponent } from './components/edit-area/modal/modal-form-controls/modal-form-controls.component';
import { ModalFormSelectComponent } from './components/edit-area/modal/modal-form-select/modal-form-select.component';
import { ModalFormActionComponent } from './components/edit-area/modal/modal-form-action/modal-form-action.component';
import { ModalProductComponent } from './components/edit-area/modal/modal-product/modal-product.component';
const EDIT_AREA = [
  ModalIconComponent,
  WidgetEditElementComponent, ModalImageComponent, WidgetElementComponent, WidgetSectionComponent, WidgetHRulerComponent,
  WidgetVRulerComponent, EditContentComponent, WidgetEditSectionComponent, ModalSectionTemplateComponent, VSnapLineComponent,
  HSnapLineComponent, PanelHeadingComponent, ModalAutoGridComponent, PanelCharacterComponent, PanelBoxshadowComponent,
  PanelTextshadowComponent, PanelBorderComponent, ColorpickerComponent, PanelBackgroundComponent, PanelIconComponent,
  PanelYoutubeComponent, PanelGmapComponent, PanelCountdownComponent, SectionRangeComponent, ComponentContextMenuComponent,
  WidgetEditPopupComponent, PanelImageComponent, PanelLinkComponent, ModalPopupTemplateComponent, PanelListComponent,
  PanelCssComponent, PanelAnimationComponent, PanelEventComponent, PanelStickyComponent, ModalPageConfigComponent, ModalTrackingComponent,
  ModalChangeHtmlComponent, PanelCarouselComponent, PanelCommentsComponent, PanelFormComponent, PanelFormControlComponent,
  ModalFormControlsComponent, ModalFormSelectComponent, ModalFormActionComponent, ModalProductComponent
];
// EDIT AREA

// ENTRY COMPONENTS
const ENTRY_COMPONENTS = [ModalImageComponent, ModalSectionTemplateComponent, ModalAutoGridComponent, ModalIconComponent,
  ModalPopupTemplateComponent, ModalPageConfigComponent, ModalTrackingComponent, ModalChangeHtmlComponent, ModalFormControlsComponent,
  ModalFormSelectComponent, ModalFormActionComponent, ModalProductComponent];
//

// DIRECTIVES
import { AddComponentDirective } from './directives/add-component.directive';
import { OpenModalImageDirective } from './directives/open-modal-image.directive';
import { OpenModalTemplateDirective } from './directives/open-modal-template.directive';
import { OpenModalIconDirective } from './directives/open-modal-icon.directive';
// import { EmbedChromeFixDirective } from './directives/embed-chrome-fix.directive';
import { ComponentResizeableDirective } from './directives/component-resizeable.directive';
import { ComponentDragableDirective } from './directives/component-dragable.directive';
import { SectionResizeableDirective } from './directives/section-resizeable.directive';
import { PopupResizeableDirective } from './directives/popup-resizeable.directive';
// import { OpenPopupDirective } from './directives/open-popup.directive';
import { OpenModalPopupDirective } from './directives/open-modal-popup.directive';
import { ComponentContextMenuDirective } from './directives/component-context-menu.directive';
import { SectionRangeDirective } from './directives/section-range.directive';
import { OpenModalProductDirective } from './directives/open-modal-product.directive';
const DIRECTIVES = [AddComponentDirective, OpenModalImageDirective, OpenModalTemplateDirective,
  OpenModalIconDirective, ComponentResizeableDirective, ComponentDragableDirective, SectionResizeableDirective,
  PopupResizeableDirective, OpenModalPopupDirective, ComponentContextMenuDirective, SectionRangeDirective, OpenModalProductDirective];
// DIRECTIVES


// PROVIDERS
import { UploadFileService } from './services/upload-file.service';
import { ComponentActionService } from '../shared/services/component-action.service';
import { SectionActionService } from '../shared/services/section-action.service';
import { FontActionService } from './services/font-action.service';
import { PageActionService } from '../shared/services/page-action.service';
import { ImageService } from './services/image.service';
import { DatePipe, CommonModule } from '@angular/common';
import { SectionRangeService } from './services/section-range.service';
import { PageConfigActionService } from '../shared/services/page-config-action.service';
import { TrackingActionService } from '../shared/services/tracking-action.service';
import { ConvertRectPipe } from '../shared/pipes/convert-rect.pipe';
import { PopupActionService } from './services/popup-action.service';
import { ProductService } from './services/product.service';
const PROVIDERS = [SectionActionService, ComponentActionService, UploadFileService, FontActionService, PageActionService, ImageService,
  DatePipe, SectionRangeService, PageConfigActionService, TrackingActionService, ConvertRectPipe, FormBuilder, PopupActionService,
  ProductService];
// PROVIDERS

@NgModule({
  declarations: [
    LAYOUT_COMPONENT, EDIT_AREA, DIRECTIVES
  ],
  exports: [LAYOUT_COMPONENT, EDIT_AREA, DIRECTIVES],
  imports: [
    CommonModule, MalihuScrollbarModule.forRoot(), ColorPickerModule, SharedModule, RouterModule, ReactiveFormsModule
  ],
  entryComponents: ENTRY_COMPONENTS,
  providers: [PROVIDERS]
})
export class BuilderModule { }
