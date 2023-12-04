import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent {
  publicationsList: any = [];
  Admin: any = localStorage.getItem("user")
  constructor(private publicationService: PublicationsService, private activateRouter: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.Admin = JSON.parse(this.Admin)
    this.publicationService.getPublications(this.Admin.id).subscribe((value) => {
      this.publicationsList = value
    });
  }

  getUrl(image: string) {
    return `http://localhost:3001/static/${image}`
  }
}
