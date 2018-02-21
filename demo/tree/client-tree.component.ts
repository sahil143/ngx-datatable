import { Component } from '@angular/core';

@Component({
  selector: 'client-side-tree-demo',
  template: `
    <div>
      <h3>
        Flex Column Width Distribution
        <small>
          <a href="https://github.com/swimlane/ngx-datatable/blob/master/demo/columns/column-flex.component.ts" target="_blank">
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        [rowsDraggable]="true"
        (rowDrop)="onRowDrop($event)"
        [rowDragHandle]="'.handleDrag'"
        class="material"
        [columnMode]="'flex'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
        [treeFromRelation]="'manager'"
        [treeToRelation]="'name'"
        [rows]="rows"
        (treeAction)="onTreeAction($event)">
        <ngx-datatable-column
              [width]="50"
              [resizeable]="false"
              [sortable]="false"
              [cellClass]="'cell-class'"
              [frozenLeft]="false">
              <ng-template let-row="row" let-expanded="expanded" ngx-datatable-cell-template>
                <i class="handleDrag icon datatable-icon-collapse" style="cursor: pointer;"></i>
              </ng-template>
          </ngx-datatable-column>
        <ngx-datatable-column name="Name" [flexGrow]="3" [isTreeColumn]="true">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
          <ng-template ngx-datatable-tree-icon let-tree="treeStatus">
            <i *ngIf="tree==='loading'"
              class="icon datatable-icon-collapse"></i>
            <i *ngIf="tree==='collapsed'"
              class="icon datatable-icon-up"></i>
            <i *ngIf="tree==='expanded'"
              class="icon datatable-icon-down"></i>
            <i *ngIf="tree==='disabled'"
              class="disabled icon datatable-icon-down"></i>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Gender" [flexGrow]="1">
          <ng-template let-row="row" let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Age" [flexGrow]="1">
          <ng-template let-value="value" ngx-datatable-cell-template>
            {{value}}
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>

      <div style="height:200px; width: 300px; border: 1px solid" droppable [dropScope]="'item'">

      </div>
    </div>
  `,
  styles: [
    '.icon {height: 10px; width: 10px; }',
    '.disabled {opacity: 0.5; }'
  ],

})
export class ClientTreeComponent {

  rows = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company_tree.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (this.rows[index].treeStatus === 'collapsed') {
      this.rows[index].treeStatus = 'expanded';
    } else {
      this.rows[index].treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }

  onRowDrop(event) {
    console.log(event);
    let srcelement = this.rows.filter((item) => {
      return item.name === event.src.name;
    });
    this.rows = this.rows.filter((item) => {
      return item.name !== event.src.name;
    });
    let targetindex = this.rows.findIndex((item) => {
      return item.name === event.target.name;
    });
    console.log(srcelement);
    console.log(targetindex);
    console.log("### - a", this.rows);
    this.rows = [...this.rows.slice(0, targetindex+1), ...srcelement, ...this.rows.slice(targetindex+1)];
    console.log("### - c", this.rows);
  }

}
