import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-colorpicker',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss']
})
export class ColorpickerComponent implements OnInit {
  @Input('color') color;
  @Input('label') label;
  @Output() changeColor = new EventEmitter();
  attachColorPicker = false;
  presetColors = [
    'rgba(233,30,99,1)', 'rgba(156,39,176,1)', 'rgba(103,58,183,1)',
    'rgba(63,81,181,1)', 'rgba(33,150,243,1)', 'rgba(3,169,244,1)', 'rgba(0,188,212,1)', 'rgba(0,150,136,1)', 'rgba(76,175,80,1)',
    'rgba(139,195,74,1)', 'rgba(205,220,57,1)', 'rgba(255,235,59,1)'
  ];
  constructor() { }

  ngOnInit() {
  }
  colorPickerChange(color) {
      this.changeColor.emit(color);
  }
  closePicker() {
    this.attachColorPicker = false;
  }
}
