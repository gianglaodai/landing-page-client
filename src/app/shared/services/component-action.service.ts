import { SectionActionService } from './section-action.service';
import { Injectable, Type, Inject, ElementRef, EventEmitter, OnInit } from '@angular/core';
import * as componentType from '../common/component-type';
import { WidgetComponent } from '../interfaces/widget-component';
import { WidgetSection } from '../interfaces/widget-section';
import { Offset } from '../interfaces/offset';
import { Rect } from '../interfaces/rect';
import { Dimension } from '../interfaces/dimension';
import { WidgetSectionComponent } from '../../builder/components/edit-area/widget-section/widget-section.component';
declare var $: any;

@Injectable()
export class ComponentActionService {
  public selectedComponent;
  public lastestRef;
  public componentUpdated;
  public componentContext;
  constructor(private sService: SectionActionService) {
    this.reset();
  }
  reset() {
    this.selectedComponent = null;
    this.lastestRef = null;
    this.componentUpdated = new EventEmitter();
    this.componentContext = new EventEmitter();
  }
  addComponent(type: any, sectionComponent: WidgetSectionComponent): string {
    const component: WidgetComponent = $.extend(true, {}, componentType.COMPONENTS[type]);
    this.sService.reinitId(component);
    if (sectionComponent) {
      this.centerComponent(component, sectionComponent);
      if (!sectionComponent.section.childrens) {
        sectionComponent.section.childrens = new Array();
      }
      sectionComponent.section.childrens.push(component);
      return component.id;
    }
    return null;
  }
  addSpecialComponent(comp: WidgetComponent, sectionComponent: WidgetSectionComponent): string {
    this.sService.reinitId(comp);
    if (sectionComponent) {
      this.centerComponent(comp, sectionComponent);
      sectionComponent.section.childrens.push(comp);
      return comp.id;
    }
    return null;
  }

  updateComponent(newComponent: WidgetComponent) {
    for (const key of Object.keys(this.sService.sections)) {
      if (this.sService.sections[key] != null) {
        const components = this.sService.sections[key].childrens.filter(component => component.id === newComponent.id);
        components[0] = newComponent;
      }
    }
  }

  checkComponentInsideSection(sectionId: string, componentId: string) {
    const section: WidgetSection = this.sService.getSectionById(sectionId);
    if (section != null && section.childrens) {
      return section.childrens.filter(component => component.id === componentId).length;
    }
    return false;
  }
  moveComponentToSection(componentId: string, sectionId: string) {
    let targetSection: WidgetSection;
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        if (sectionId === section.id) {
          targetSection = section;
        }
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === componentId) {
            if (!targetSection) {
              for (const key2 of Object.keys(this.sService.sections)) {
                if (sectionId === this.sService.sections[key2].id) {
                  targetSection = this.sService.sections[key2];
                  break;
                }
              }
            }
            targetSection.childrens.push(component);
            section.childrens.splice(parseInt(key1, 10), 1);
            return;
          }
        }
      }
    }
  }
  getComponentById(id: String): WidgetComponent {
    for (const key of Object.keys(this.sService.sections)) {
      if (this.sService.sections[key] != null) {
        for (const key1 of Object.keys(this.sService.sections[key].childrens)) {
          if (this.sService.sections[key].childrens[key1]['id'] === id) {
            return this.sService.sections[key].childrens[key1];
          }
        }
      }
    }
    return null;
  }
  updateComponentDimention(id: string, dimension: Dimension) {
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === id && dimension !== component.rect.dimension) {
            dimension.width = dimension.width || component.rect.dimension.width;
            dimension.height = dimension.height || component.rect.dimension.height;
            const rect: Rect = {
              'offset': component.rect.offset,
              'dimension': dimension
            };
            component.rect = rect;
            return;
          }
        }
      }
    }
  }
  updateComponentOffset(id: string, offset: Offset) {
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === id) {
            const rect: Rect = {
              'offset': offset,
              'dimension': component.rect.dimension
            };
            component.rect = rect;
          }
        }
      }
    }
  }
  updateComponentRect(id: string, rect: Rect) {
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === id) {
            component.rect = rect;
            return;
          }
        }
      }
    }
  }
  updateComponentContent(id: string, content: string) {
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === id) {
            component.content = content;
            return;
          }
        }
      }
    }
  }

  deleteComponent(componentElm, parent) {
    parent.childrens.splice(parent.childrens.indexOf(componentElm), 1);
    this.selectedComponent = null;
  }

  deleteComponentById(id: string) {
    this.sService.sections.forEach(section => {
      section.childrens.forEach((component, index) => {
        if (component.id === id) {
          section.childrens.splice(index, 1);
          this.selectedComponent = null;
        }
      });
    });
  }

  replaceComponentById(id: string, newComponent) {
    this.sService.sections.forEach(section => {
      section.childrens.forEach((component, index) => {
        if (component.id === id) {
          newComponent.id = componentType.YOUTUBE + new Date().getTime();
          component = JSON.parse(JSON.stringify(newComponent));
        }
      });
    });
  }

  cloneComponent(componentElm, parent) {
    const newComponent = $.extend(true, {}, componentElm.component);
    this.sService.reinitId(newComponent);
    newComponent.rect.offset.top = componentElm.component.rect.offset.top + componentElm.elementRef.nativeElement.offsetHeight + 10;
    const index = parent.childrens.indexOf(componentElm.component);
    parent.childrens.splice(index + 1, 0, newComponent);
  }
  cloneComponentByid(elementRef: ElementRef) {
    for (const key of Object.keys(this.sService.sections)) {
      const section: WidgetSection = this.sService.sections[key];
      if (section != null) {
        for (const key1 of Object.keys(section.childrens)) {
          const component: WidgetComponent = section.childrens[key1];
          if (component.id === elementRef.nativeElement.dataset.id) {
            const newComponent = JSON.parse(JSON.stringify(component));
            newComponent.id = newComponent.type + new Date().getTime();
            newComponent.rect.offset.top = component.rect.offset.top + elementRef.nativeElement.offsetHeight + 10;
            section.childrens.splice(parseInt(key, 10) + 1, 0, newComponent);
            return;
          }
        }
      }
    }
  }

  // cho component ra giữa section
  centerComponent(component: WidgetComponent, section: WidgetSectionComponent) {
    const componentRect: Rect = component.rect;
    const centerSectionPosition: Offset = this.sService.getCenterSection(section);
    const componentDimention: Dimension = componentRect.dimension;
    const componentOffset: Offset = componentRect.offset;
    componentOffset.left = centerSectionPosition.left - componentDimention.width / 2;
    componentOffset.top = centerSectionPosition.top - (componentDimention.height || 0) / 2;
  }
  moveComponentToFirst(component, childrens) {
    const oldIndex = childrens.indexOf(component);
    if (oldIndex === 0) {
      return;
    } else {
      childrens.sort(function (x, y) { return x === component ? -1 : y === component ? 1 : 0; });
    }
  }
  moveComponentToLast(component, childrens) {
    const oldIndex = childrens.indexOf(component);
    if (oldIndex === childrens.length - 1) {
      return;
    } else {
      childrens.sort(function (x, y) { return y === component ? -1 : x === component ? 1 : 0; });
    }
  }
  moveComponentInSection(component: WidgetComponent, section: WidgetSection, direction) {
    const oldIndex = section.childrens.indexOf(component);
    if ((!oldIndex && direction < 0) || (oldIndex === section.childrens.length - 1 && direction > 0)) {
      return;
    } else {
      const temp = section.childrens[oldIndex + direction];
      section.childrens[oldIndex + direction] = section.childrens[oldIndex];
      section.childrens[oldIndex] = temp;
    }
    // if (sections) {
    //   if ((oldIndex === 0 && newIndex <= oldIndex) || (oldIndex === sections[0].childrens.length - 1 && newIndex >= oldIndex)) {
    //     return;
    //   } else {
    //     const temp = sections[0].childrens[newIndex];

    //   }
    // }
  }

  unAttachComponent() {
    const selectedCom = this.selectedComponent;
    if (selectedCom) {
      this.componentUpdated.emit({
        key: 'disableDrag',
        component: selectedCom.component
      });
      this.componentUpdated.emit({
        key: 'disableResize',
        component: selectedCom.component
      });
      if (selectedCom.isAttachEdit) {
        const conentElm = selectedCom.elementRef.nativeElement.querySelector('.widget-content') as HTMLElement;
        conentElm.removeAttribute('contenteditable');
        selectedCom.isAttachEdit = false;
        selectedCom.component.content = conentElm.innerHTML;
      }
      if (selectedCom.component.type === componentType.BUTTON) {
        const beforeHeight = selectedCom.elementRef.nativeElement.offsetHeight;
        selectedCom.elementRef.nativeElement.style.height = 'auto';
        const afterHeight = selectedCom.elementRef.nativeElement.offsetHeight;
        if (afterHeight > beforeHeight) {
          this.updateComponentDimention(selectedCom.component.id, { height: afterHeight });
        } else {
          selectedCom.elementRef.nativeElement.style.height = beforeHeight + 'px';
        }
        (selectedCom.elementRef.nativeElement.querySelector('.widget-content') as HTMLElement).style.removeProperty('min-height');
      }
      this.selectedComponent = null;
    }
  }
}
