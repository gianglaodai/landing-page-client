import { Injectable, Input, ViewContainerRef, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import * as componentType from '../common/component-type';
import { Offset } from '../interfaces/offset';
import { WidgetComponent } from '../interfaces/widget-component';
import { WidgetSection } from '../interfaces/widget-section';
import { ComponentActionService } from './component-action.service';
import * as requestConstant from './server-configuration';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PageActionService } from './page-action.service';
import { WidgetSectionComponent } from '../../builder/components/edit-area/widget-section/widget-section.component';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material';
declare var $: any;

@Injectable()
export class SectionActionService {
  public selectedSection: any;
  public sectionComponents: WidgetSectionComponent[];
  public movedComponent;
  public newComponent;
  constructor(private pService: PageActionService, private http: Http, private uService: UserService, private snackBar: MatSnackBar) {
    this.reset();
  }
  reset() {
    this.selectedSection = null;
    this.sectionComponents = [];
    this.movedComponent = null;
    this.newComponent = null;
  }
  get sections() {
    return this.pService.page ? this.pService.page.sections : [];
  }
  set sections(sections) {
    this.pService.page.sections = sections;
  }
  getCategories(): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/catalog/section`).map(res => res.json());
  }

  getSectionTemplates(categoryId): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/section/getAll/${categoryId}`).map(res => res.json());
  }

  getTemplate(categoryId, templateName): Observable<any> {
    return this.http.get(`${this.uService.serverUrl}/section/load/${categoryId}?fileName=${templateName}`).map(res => res.json());
  }

  // TODO - hadgiang: tên hàm viết theo cách này không sai nhưng nhìn chung với code từ Java chuyển sang không tiện đọc
  // xem xét chuyển thành getMostVisible()
  get mostVisible() {
    // TODO - hadgiang: chuỗi 'popup' được dùng lại -> tạo biến static readonly để dùng giúp tránh được lỗi đánh máy và được nhắc
    // điều kiện nên viết ngược lại: 'popup' === this.selectedSection.section.type để tránh lỗi null
    if (this.selectedSection && this.selectedSection.section.type === 'popup' && this.selectedSection.section.popup.isShow) {
      return this.selectedSection;
    }
    let mostVisibleSection, max = 0;
    const viewportHeight = window.innerHeight;
    for (let i = 0; i < this.sectionComponents.length; i++) {
      const sectionComponent = this.sectionComponents[i];
      // TODO - hadgiang: chuỗi 'popup' được dùng lại -> tạo biến static readonly để dùng giúp tránh được lỗi đánh máy và được nhắc
      // điều kiện nên viết ngược lại: 'popup' === this.selectedSection.section.type để tránh lỗi null
      if (sectionComponent.section && sectionComponent.section.type === 'popup') {
        continue;
      }
      const sectionRef = sectionComponent.elementRef;
      let visiblePx = 0, absTop;
      const rect = sectionRef.nativeElement.getBoundingClientRect(),
        height = rect.height, visible = {
          top: rect.top >= 0 && rect.top < viewportHeight,
          bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        };

      if (visible.top && visible.bottom) {
        // TODO - hadgiang: để bỏ qua comment hãy đặt tên biến cho điều kiện
        // VD: isAllElementVisible = visible.top && visible.bottom;
        // Whole element is visible
        visiblePx = height;
      } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
      } else if (visible.bottom) {
        visiblePx = rect.bottom;
      } else if (height > viewportHeight && rect.top < 0) {
        absTop = Math.abs(rect.top);
        if (absTop < height) {
          // TODO - hadgiang: để bỏ qua comment hãy đặt tên biến cho điều kiện
          // VD: isPartOfElementVisible = absTop < height
          // Part of the element is visible
          visiblePx = height - absTop;
        }
      }

      // TODO - hadgiang: lỗi khó: visiblePx = MIN_NUMBER - 1; VD: min_byte = -255-> visiblePx = -255 - 1 = 254
      // -> visiblePx === MAX_NUMBER -> visiblePx > max
      // case này chưa cần fix nhưng note vào đây phòng trường hợp bị
      if (visiblePx > max) {
        max = visiblePx;
        mostVisibleSection = sectionComponent;
      }
    }
    return mostVisibleSection;
  }
  getCenterSection(sectionComponent) {
    const position: Offset = { 'top': 0, 'left': 0 };
    if (sectionComponent.section && sectionComponent.section.type === 'popup') {
      position.left = sectionComponent.section.rect.dimension.width / 2;
      position.top = sectionComponent.section.rect.dimension.height / 2;
      return position;
    }
    const nativeElement: Element = sectionComponent.elementRef.nativeElement;
    if (nativeElement.getElementsByClassName('widget-container')) {
      const containers = nativeElement.getElementsByClassName('widget-container') as HTMLCollectionOf<HTMLElement>;
      const container = containers[0];
      let visiblePx = 0, absTop = 0;
      const viewportHeight = window.innerHeight;
      const rect = sectionComponent.elementRef.nativeElement.getBoundingClientRect(),
        height = rect.height, visible = {
          top: rect.top >= 0 && rect.top < viewportHeight,
          bottom: rect.bottom > 0 && rect.bottom < viewportHeight
        };
      // TODO - hadgiang: đoạn điều kiện này copy code từ hàm get mostVisible()-> xem xét tách hàm để dùng lại
      if (visible.top && visible.bottom) {
        // TODO - hadgiang: xem comment hàm get mostVisible()
        // Whole element is visible
        visiblePx = height;
      } else if (visible.top) {
        visiblePx = viewportHeight - rect.top;
      } else if (visible.bottom) {
        visiblePx = rect.bottom;
      } else if (height > viewportHeight && rect.top < 0) {
        absTop = Math.abs(rect.top);
        if (absTop < height) {
          // TODO - hadgiang: xem comment hàm get mostVisible()
          // Part of the element is visible
          visiblePx = height - absTop;
        }
      }

      // TODO - hadgiang: có cần kiểm soát giá trị của nó để trả về kiểu số nguyên không?
      // đây là câu hỏi -> chỉ cần trả lời, sau đó a sẽ xóa nếu câu trả lời hợp lý
      position.left = containers[0].offsetWidth / 2;
      position.top = visiblePx / 2;
      return position;
    }
  }

  getSectionById(sectionId: string): WidgetSection {
    // TODO - hadgiang: Xem xét cách viết WidgetSection[] -> Nếu không có ý định override lại Class Array của JS
    const sections: Array<WidgetSection> = this.sections ? this.sections.filter(element => element.id === sectionId) : null;
    return sections ? sections[0] : null;
  }

  addSectionTemplate(categoryId, body): Observable<any> {
    return this.http.post(`${this.uService.serverUrl}/section/save/${categoryId}`, body).map(res => res.json());
  }

  addSection(id: string, newSection: WidgetSection) {
    // TODO - hadgiang: ở đoạn này hoàn toàn có thể tập viết functional programing.
    this.reinitId(newSection);
    if (id) {
      for (const key of Object.keys(this.sections)) {
        const section: WidgetSection = this.sections[key];
        if (section != null && section.id === id) {
          this.sections.splice(parseInt(key, 10) + 1, 0, newSection);
          this.newComponent = newSection;
          return;
        }
      }
    } else {
      this.sections.push(newSection);
    }
  }
  reinitId(comp) {
    comp.id = comp.type.toUpperCase() + (new Date().getTime() + Math.floor((Math.random() * 100000) + 1)).toString();
    if (comp.childrens) {
      comp.childrens.forEach(child => {
        this.reinitId(child);
      });
    }
  }

  cloneSectionByid(id: string) {
    for (const key of Object.keys(this.sections)) {
      const section: WidgetSection = this.sections[key];
      if (section != null && section.id === id) {
        const newSection = $.extend(true, {}, section);
        this.reinitId(newSection);
        this.sections.splice(parseInt(key, 10) + 1, 0, newSection);
        if (section.type === 'popup') {
          section.popup.isShow = false;
          newSection.popup.isShow = true;
          this.newComponent = newSection;
          this.snackBar.open('Nhân bản Popup thành công', 'Đóng', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: 'primary'
          });
        } else {
          this.snackBar.open('Nhân bản Section thành công', 'Đóng', {
            duration: 2000,
            verticalPosition: 'top',
            panelClass: 'primary'
          });
        }
        return;
      }
    }
  }

  moveSectionByid(section: WidgetSection, direction: number) {
    const index = this.sections.indexOf(section);
    if ((index === 0 && direction === -1) || (index === this.sections.length - 1 && direction === 1)) {
      return;
    }
    const newIndex = index + direction;
    const indexes = [index, newIndex].sort();
    this.sections.splice(indexes[0], 2, this.sections[indexes[1]], this.sections[indexes[0]]);
  }
  deleteSection(section) {
    const sectionComponentIndex = this.sectionComponents.indexOf(section);
    if (typeof sectionComponentIndex !== 'undefined') {
      this.sectionComponents.splice(sectionComponentIndex, 1);
    }
    const index = this.sections.indexOf(section.section);
    if (typeof index !== 'undefined') {
      this.sections.splice(index, 1);
    }
    this.selectedSection = null;
  }


  order(parent, parentMobileRect) {
    const orderArr = Object.assign([], parent.childrensElm['_results']);
    orderArr.sort((a, b) => {
      const aTop = a.component.rect.offset.top;
      const bTop = b.component.rect.offset.top;
      if (aTop < bTop) {
        return -1;
      } else if (aTop > bTop) {
        return 1;
      } else {
        return 0;
      }
    });
    let beforeTop = 0, beforeHeight = 0, parentHeight = 0;
    orderArr.forEach((element) => {
      if (element.component.mobileHide) {
        return;
      }
      if (!element.component.mobileStyle) {
        const contentStyle = { 'text-align': 'center' };
        if (element.component.contentStyle) {
          if (element.component.contentStyle['font-size']) {
            contentStyle['font-size'] = element.component.contentStyle['font-size'];
          }
          if (element.component.contentStyle['line-height']) {
            contentStyle['line-height'] = element.component.contentStyle['line-height'];
          }
        }
        element.component.mobileStyle = JSON.parse(JSON.stringify(contentStyle));
      }
      if (!element.component.mobileRect) {
        element.component.mobileRect = JSON.parse(JSON.stringify(element.component.rect));
      } else {
        element.component.mobileRect.offset = JSON.parse(JSON.stringify(element.component.rect.offset));
      }
      if (element.childrensElm['_results'].length) {
        this.order(element, element.component.mobileRect);
        element.component.mobileRect.offset.top = beforeTop + beforeHeight;
      } else {
        element.component.mobileRect.offset.top = beforeTop + beforeHeight + 10;
      }
      const exactWidth = element.component.mobileRect.dimension.width > 300 ? 300 : element.component.mobileRect.dimension.width;
      const parentWidth = (parentMobileRect.dimension.width && parentMobileRect.dimension.width < 300) ?
        parentMobileRect.dimension.width : 300;
      element.component.mobileRect.offset.left = (parentWidth - exactWidth) / 2;
      beforeTop = JSON.parse(JSON.stringify(element.component.mobileRect.offset.top));
      beforeHeight = element.component.mobileRect.dimension.height ? element.component.mobileRect.dimension.height :
        (element.elementRef.nativeElement as HTMLElement).offsetHeight;
    });
    parentHeight = beforeTop + beforeHeight + 10;
    parentMobileRect.dimension.height = parentHeight;
    console.log(parentHeight);
  }
  orderInterface() {
    this.sectionComponents.forEach(sectionComponent => {
      if (sectionComponent.section.mobileHide) {
        return;
      }
      const parent = sectionComponent;
      if (typeof parent.section.mobileRect === 'undefined') {
        parent.section.mobileRect = $.extend(true, {}, parent.section.rect);
      }
      this.order(parent, parent.section.mobileRect);
    });
  }
}
