import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, Validators, FormGroup, FormControl } 
from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { AssetService } from "../../service/asset.service";
import { SettingService } from "../../service/setting.service";
import { SecurityService } from "../../service/security.service";

import { IAsset, ICategories, IStatuses } from "../../model/asset";
import { IAssetSecurity } from 'src/app/model/security';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit, OnChanges {

  user_id = sessionStorage.getItem('userId');

  @Input()  assetId: number;
  @Input()  isUpdateAsset: boolean;
  @Input()  isUpdate: boolean;
  @Output() cancelCreate = new EventEmitter();

  security:   IAssetSecurity;
  statuses:   IStatuses;
  categories: ICategories;
  asset:      IAsset;

  isAdd: boolean = true;

  assetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private assetService: AssetService,
    private settingService: SettingService,
    private securityService: SecurityService) { 
    this.assetForm = this.fb.group({
      name:         [null, Validators.required],
      unit_number:  [null, Validators.required],
      category:     [null, Validators.required],
      status:       [null, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.assetId) {
      this.isAdd = false;
      this.assetService.getAsset(this.assetId).subscribe((asset: IAsset) => {
        this.asset = asset;
        this.assetForm.setValue({
          name:        this.asset.name,
          unit_number: this.asset.unit_number,
          category:    this.asset.category_id,
          status:      this.asset.status_id
        });
      });
    }
  }

  ngOnInit() {
    this.securityService.getAssetSecurity().subscribe((security: IAssetSecurity) => {
      this.security = security;
    }, error => {
      this.snackBar.open(error, "Error:", {duration: 5000})
    });
    this.settingService.getCategories().subscribe((response: ICategories) => {
      this.categories = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
    this.settingService.getStatuses().subscribe((response: IStatuses) => {
      this.statuses = response;
    }, error => 
      this.snackBar.open(error.error, "Error:", {duration: 5000})
    );
  }

  submit(){
    if (this.isAdd) {
      let obj = this.assetForm.value;
      obj.user_id = this.user_id;
      this.assetService.createAsset(obj).subscribe(response => {
        this.close();
        this.snackBar.open('Asset created.', "Success:", {duration: 5000});
      });
    }
    else {
      let obj = this.assetForm.value;
      obj.id = this.assetId;
      this.assetService.updateAsset(obj).subscribe(response => {
        this.close();
        this.snackBar.open('Asset updated.', "Success:", {duration: 5000});
      });
    }
  }

  close() {
    this.cancelCreate.emit(false);
  }

}
