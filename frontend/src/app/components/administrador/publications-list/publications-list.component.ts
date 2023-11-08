import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent {
  publicationsList:any=[];
  idAdmin:any;
  constructor(private publicationService: PublicationsService, private activateRouter: ActivatedRoute){
  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((param) => {
      this.idAdmin = param
      this.publicationService.getPublications(this.idAdmin).subscribe((value)=>{
      this.publicationsList = value
    });
    })
  }
}
