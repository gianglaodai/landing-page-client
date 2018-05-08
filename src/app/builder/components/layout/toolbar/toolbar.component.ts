import { Component, OnInit } from '@angular/core';
import * as componentType from '../../../../shared/common/component-type';
import { MatDialog } from '@angular/material';
import { ModalAutoGridComponent } from '../../edit-area/modal/modal-auto-grid/modal-auto-grid.component';
import { WidgetSectionComponent } from '../../edit-area/widget-section/widget-section.component';
import { SectionActionService } from '../../../../shared/services/section-action.service';
import { PageActionService } from '../../../../shared/services/page-action.service';
import { ModalPageConfigComponent } from '../../edit-area/modal/modal-page-config/modal-page-config.component';
import { ModalTrackingComponent } from '../../edit-area/modal/modal-tracking/modal-tracking.component';
import { WidgetComponent } from '../../../../shared/interfaces/widget-component';
import { WidgetSection } from '../../../../shared/interfaces/widget-section';
declare var $: any;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  componentType = componentType;
  hiddenComponents = [];
  constructor(private sService: SectionActionService, private pService: PageActionService, private dialog: MatDialog) { }

  get isShowAddComponent() {
    return this.sService.sections && this.sService.sections.length;
  }

  get isShowRuler() {
    return this.pService.isShowRuler;
  }
  set isShowRuler(isShowRuler) {
    this.pService.isShowRuler = isShowRuler;
  }
  get isShowSettingBar() {
    return this.pService.isShowSettingBar;
  }
  set isShowSettingBar(isShowSettingBar) {
    this.pService.isShowSettingBar = isShowSettingBar;
  }

  get sectionComponents() {
    return this.sService.sectionComponents.filter(sectionComponent => {
      return sectionComponent.section.type === 'section';
    });
  }
  get popupComponents() {
    return this.sService.sectionComponents.filter(sectionComponent => {
      return sectionComponent.section.type === 'popup';
    });
  }
  get isMobile() {
    return this.pService.isMobile;
  }
  get hiddenSections() {
    const sections = this.sService.sections;
    return sections.filter(section => {
      return section.mobileHide;
    });
  }
  get hiddenComps() {
    this.hiddenComponents = [];
    const sections = this.sService.sections;
    sections.forEach(section => {
      if (section.childrens) {
        this.getHiddenComps(section.childrens);
      }
    });
    return this.hiddenComponents;
  }
  getHiddenComps(arr: WidgetComponent[]) {
    arr.forEach(comp => {
      if (comp.mobileHide) {
        this.hiddenComponents.push(comp);
      }
      if (comp.childrens && comp.childrens.length > 0) {
        this.getHiddenComps(comp.childrens);
      }
    });
  }
  ngOnInit() {
    // this.sectionRefs = this.sService.sectionComponents;
  }

  scrollToSection($event: Event, section: WidgetSectionComponent) {
    $event.preventDefault();
    $('#appEditConent').mCustomScrollbar('scrollTo', (section.elementRef.nativeElement as HTMLElement).offsetTop);
  }

  openAutoGridModal() {
    this.dialog.open(ModalAutoGridComponent, {
      width: '500px',
    });
  }
  openPageConfigModal() {
    const dialogRef = this.dialog.open(ModalPageConfigComponent, {
      width: '600px',
      autoFocus: false
    });
  }
  openTrackingModal() {
    const dialogRef = this.dialog.open(ModalTrackingComponent, {
      width: '600px',
      autoFocus: false
    });
  }
}
