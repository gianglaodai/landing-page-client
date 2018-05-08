import { Subject } from 'rxjs/Subject';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Subscribable } from 'rxjs/Observable';
import * as componentType from '../../../../../shared/common/component-type';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import * as requestConstant from '../../../../../shared/services/server-configuration';
import { SectionActionService } from '../../../../../shared/services/section-action.service';
import { ComponentActionService } from '../../../../../shared/services/component-action.service';
import { ImageService } from '../../../../services/image.service';
import { Rect } from '../../../../../shared/interfaces/rect';
import { UserService } from '../../../../../shared/services/user.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.scss'],
})
export class ModalImageComponent implements OnInit {
  private componentType = componentType;
  isDragOver = false;
  images = [];
  dataImages = [];
  selectedImages = [];
  isUploading = false;
  isMultiple;
  search: string;
  component;
  @ViewChild('managerImage') content: any;
  constructor(private imageService: ImageService, private cService: ComponentActionService, private sService: SectionActionService,
    private uService: UserService, private dialogRef: MatDialogRef<ModalImageComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar) {
    this.isMultiple = data.isMultiple;
  }
  ngOnInit() {
    this.reloadImages();
  }

  onDrag(event: any) {
    this.preventDefault(event);
  }

  doSearch() {
    if (this.search) {
      this.images = this.dataImages.filter(image => {
        return image.fileName.toLocaleLowerCase().search(this.search.toLowerCase()) >= 0;
      });
    } else {
      this.images = this.dataImages;
    }
  }

  onDrop(event: any) {
    this.isUploading = true;
    this.preventDefault(event);
    this.upload(event.dataTransfer.files);
  }

  private upload(files: any[]) {
    const formData = new FormData();
    formData.append('action', 'uploadImages');
    let valid = true;
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    Object.keys(files).forEach(key => {
      if (files[key].size > 2097152 || validImageTypes.indexOf(files[key]['type']) < 0) {
        valid = false;
      } else {
        formData.append(`file`, files[key], files[key]['name']);
      }
    });
    if (valid) {
      this.imageService.uploadImages(formData).subscribe(data => {
        this.reloadImages();
      });
    } else {
      this.snackBar.open('Chỉ hỗ trợ ảnh định dạng jpg, jpeg, png, gif và có dung lượng tối đa', 'Đóng', {
        duration: 3500,
        verticalPosition: 'top',
        panelClass: 'warn'
      });
      this.isUploading = false;
    }
    this.isDragOver = false;
  }

  private reloadImages() {
    this.imageService.getImages().subscribe(datas => {
      datas.forEach(data => {
        data.thumbnail = this.uService.serverUrl + data.thumbnail;
        data.url = this.uService.serverUrl + data.url;
      });
      this.selectedImages = [];
      this.dataImages = datas;
      this.doSearch();
      this.isUploading = false;
    });
  }

  deleteImage(image: any) {
    const result = this.imageService.deleteImages([image]).subscribe(data => {
      this.reloadImages();
      this.dataImages.splice(this.dataImages.indexOf(image), 1);
      if (this.selectedImages.indexOf(image) >= 0) {
        this.selectedImages.splice(this.selectedImages.indexOf(image), 1);
      }
    });
  }

  deleteImages() {
    this.imageService.deleteImages(this.selectedImages).subscribe(data => {
      this.reloadImages();
      this.selectedImages = [];
    });
  }

  uploadImagesFromInput(event: any) {
    this.isUploading = true;
    this.preventDefault(event);
    this.upload(event.target.files);
  }

  selectImage(image: any) {
    const index = this.selectedImages.indexOf(image);
    if (index < 0) {
      this.selectedImages.push(image);
      return;
    }
    this.selectedImages.splice(index, 1);
  }

  unSelectedImage(checked) {
    if (!checked) {
      this.selectedImages = new Array();
    }
  }
  useImage(image) {
    this.selectedImages = [image];
    this.addSelectedImage();
  }

  addSelectedImage() {
    this.dialogRef.close(this.selectedImages);
  }

  isSelected(image: any) {
    return this.selectedImages.indexOf(image) >= 0;
  }

  dragStart(event: any) {
    this.preventDefault(event);
  }

  dragOver(event: any) {
    this.preventDefault(event);
    this.isDragOver = true;
  }

  dragEnter(event: any) {
    this.preventDefault(event);
    this.isDragOver = true;
  }

  dragLeave(event: any) {
    this.preventDefault(event);
    this.isDragOver = false;
  }

  dragEnd($event: any) {
    this.preventDefault(event);
    this.isDragOver = false;
  }

  preventDefault(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }
}
