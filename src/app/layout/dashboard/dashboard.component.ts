import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DogsService } from 'src/app/services/dogs.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'origin',
    'lifeSpan',
    'temperament',
    'image',
  ];
  dataSource: any;
  dataLoaded: boolean = false;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private dogService: DogsService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogService.getDogBreeds().subscribe((res: any) => {
      console.log(res);
      let data = res.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          origin: item.origin,
          lifeSpan: item.life_span,
          temperament: item.temperament,
          image: item.image.url,
          height: item.height.metric,
          weight: item.weight.metric,
        };
      });
      this.dataSource = new MatTableDataSource<DogBreedsData>(data);
      this.dataLoaded = true;
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
    });
  }

  clickedRow(row: any) {
    console.log('clicked');

    const dialogRef = this.dialog.open(DogDetailsComponent, {
      width: '550px',
      data: {
        id: row.id,
        name: row.name,
        origin: row.origin,
        lifeSpan: row.lifeSpan,
        temperament: row.temperament,
        image: row.image,
        height: row.height,
        weight: row.weight,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
export interface DogBreedsData {
  id: number;
  name: string;
  origin: number;
  lifeSpan: number;
  temperament: string;
  image: string;
  height: string;
  weight: string;
}

@Component({
  selector: 'dog-details',
  templateUrl: 'dog-details.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DogDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<DogDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DogBreedsData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
