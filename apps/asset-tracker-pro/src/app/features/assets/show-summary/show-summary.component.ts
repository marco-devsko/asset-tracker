import { Component } from '@angular/core';
import { AssetService } from '../asset.service';
import { OnInit } from '@angular/core';
import { inject } from '@angular/core'; 

@Component({
  selector: 'app-show-summary',
  imports: [],
  templateUrl: './show-summary.component.html',
  styleUrl: './show-summary.component.scss',
})
export class ShowSummaryComponent implements OnInit {
  assetService = inject(AssetService)
  data: Record<string, string> = {};

  ngOnInit(): void {
    this.data = this.assetService.getData();
  }

  get objectKeys() {
    return Object.keys(this.data) || {}
  }
}

