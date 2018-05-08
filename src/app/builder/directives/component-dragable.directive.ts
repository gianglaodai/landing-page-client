import { Directive, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import * as componentType from '../../shared/common/component-type';
import { WidgetSectionComponent } from '../components/edit-area/widget-section/widget-section.component';
import { ComponentDragable } from '../classes/component-dragable';
import { WidgetElementComponent } from '../components/edit-area/widget-element/widget-element.component';
import { ComponentActionService } from '../../shared/services/component-action.service';
import { SectionActionService } from '../../shared/services/section-action.service';
import { PageActionService } from '../../shared/services/page-action.service';
declare var $: any;

@Directive({
  selector: '[appComponentDragable]'
})
export class ComponentDragableDirective implements OnInit {
  private componentType = componentType;
  @Input('component') component;
  @Input('parent') parent;
  public componentDragable: ComponentDragable;
  public isAttachEdit = false;
  constructor(private cService: ComponentActionService, private sService: SectionActionService, private elementRef: ElementRef,
    private pService: PageActionService) { }

  ngOnInit() {
    const $this = this;
    const cService = this.cService;
    const sService = this.sService;
    const parentElm = this.parent ? this.parent.elementRef.nativeElement : null;
    const elm: HTMLElement = this.elementRef.nativeElement;
    this.componentDragable = new ComponentDragable($(this.elementRef.nativeElement));
    this.componentDragable.compType = this.component.type;
    this.componentDragable.onDragStop = function (position) {
      const offset = { top: elm.offsetTop, left: elm.offsetLeft };
      let elmOffset = {
        top: 0,
        left: 0
      };
      if (parentElm && (offset.top > parentElm.offsetHeight || offset.top < 0)) {
        for (const sectionComponent of sService.sectionComponents) {
          const sectionRef = sectionComponent.elementRef;
          if (offset.top + parentElm.offsetTop < sectionRef.nativeElement.offsetTop + sectionRef.nativeElement.offsetHeight
            && offset.top + parentElm.offsetTop >= sectionRef.nativeElement.offsetTop) {
            elmOffset = {
              top: position.top + parentElm.offsetTop - sectionRef.nativeElement.offsetTop,
              left: position.left
            };
            if ($this.parent.section) {
              const index = $this.parent.section.childrens.indexOf($this.component);
              if (index >= 0) {
                $this.computeRect(elmOffset);
                if (typeof sectionComponent.section.childrens === 'undefined') {
                  sectionComponent.section.childrens = [];
                }
                sectionComponent.section.childrens.push($this.component);
                $this.parent.section.childrens.splice(index, 1);
                sService.movedComponent = $this.component;
              }
            }
            break;
          }
        }
      } else {
        $this.computeRect(position);
      }

    };
    this.componentDragable.initDrag();
    if (sService.movedComponent !== this.component) {
      this.componentDragable.disableDrag();
    } else {
      if (this.component.type === componentType.COMMENTS) {
        if (document.getElementById('reinitFb')) {
          document.getElementById('reinitFb').remove();
        }
        const s = document.createElement('script');
        s.id = 'reinitFb';
        s.type = 'text/javascript';
        // console.log(`FB.XFBML.parse(document.getElementById('${this.component.id}'))`);
        s.innerHTML = `
        $(document).ready(function(){
          FB.XFBML.parse(document.getElementById('${this.component.id}'))
        });`;
        setTimeout(() => {
          document.querySelector('body').appendChild(s);
        }, 200);
      }
      sService.movedComponent = null;
    }
    cService.componentUpdated.subscribe(data => {
      if (data.key === 'disableDrag' && data.component === this.component) {
        this.componentDragable.disableDrag();
      }
      if (data.key === 'enableDrag' && data.component === this.component) {
        this.componentDragable.enableDrag();
      }
    });
  }
  computeRect(position) {
    if (this.pService.isMobile && this.component.mobileRect) {
      this.component.mobileRect.offset = JSON.parse(JSON.stringify(position));
    } else if (this.pService.isMobile && !this.component.mobileRect) {
      this.component.mobileRect = JSON.parse(JSON.stringify(this.component.rect));
      this.component.mobileRect.offset = JSON.parse(JSON.stringify(position));
    } else {
      this.component.rect.offset = JSON.parse(JSON.stringify(position));
    }
  }
}
