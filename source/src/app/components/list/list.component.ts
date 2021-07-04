import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Resource } from '../../models/resource';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],

})
export class ListComponent implements OnInit, OnDestroy {


  resources: Resource[] = []
  filteredResources: Resource[] = []

  dataSubscription: Subscription

  displayedColumns: string[] = ['licencePlate', 'model', 'x', 'y']
  dataSource: MatTableDataSource<Resource>

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private data: DataService) {
    this.getResources()
    this.dataSource = new MatTableDataSource(this.filteredResources)
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

  getResources() {
    this.dataSubscription = this.data.getResources().subscribe(
      res => {
        console.log(res)
        this.resources = res
        this.filteredResources = res
        this.fillDateTable()
      },
      error => console.log(error),
      () => {
        console.log(`${this.resources.length} recursos cargados`)
      }
    )
  }

  private fillDateTable() {
    this.dataSource = new MatTableDataSource(this.filteredResources);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }
}


