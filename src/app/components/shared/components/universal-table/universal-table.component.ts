import {
  Component,
  Input,
  ViewChild,
  TemplateRef,
  ContentChild,
  AfterViewInit,
  ContentChildren,
  QueryList,
  signal,
  Signal,
  AfterContentInit
} from '@angular/core';

import { TableTemplateDirective } from './table-template.directive';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface ColumnConfig<T = any> {
  columnDef: keyof T | string;
  header: string;
  cell?: (element: T) => string;
  isAction?: boolean;
  isTemplate?: boolean;
}

@Component({
  selector: 'app-universal-table',
  templateUrl: './universal-table.component.html',
  styleUrls: ['./universal-table.component.scss'],
  standalone: false
})
export class UniversalTableComponent<T extends Record<string, any>>
  implements AfterContentInit, AfterViewInit
{
  private _data: T[] = [];

  @Input() set data(value: T[]) {
    this._data = value;
    this.dataSource.data = value;
  }

  get data(): T[] {
    return this._data;
  }

  @Input() columns: Signal<ColumnConfig<T>[]> = signal([]);

  @ContentChild('actionsTemplate') actionsTemplate?: TemplateRef<any>;

  dataSource = new MatTableDataSource<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  @ContentChildren(TableTemplateDirective)
  templates!: QueryList<TableTemplateDirective>;
  templateMap: Record<string, TemplateRef<any>> = {};

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterContentInit(): void {
    this.templateMap = {};
    this.templates.forEach((tpl) => {
      if (tpl.columnName) {
        this.templateMap[tpl.columnName] = tpl.template;
      }
    });
  }

  displayedColumns() {
    return this.columns().map((c) => c.columnDef);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
