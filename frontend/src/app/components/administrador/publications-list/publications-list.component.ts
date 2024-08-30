import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environments/environments';
import { PublicationsService } from 'src/app/services/publications.service';

@Component({
  selector: 'app-publications-list',
  templateUrl: './publications-list.component.html',
  styleUrls: ['./publications-list.component.css']
})
export class PublicationsListComponent {
  private myApiUrl: string;
  publicationsList: any = [];
  Admin: any = localStorage.getItem("user")
  constructor(private publicationService: PublicationsService, private activateRouter: ActivatedRoute) {
    this.myApiUrl = environment.endpoint;
  }
  ngOnInit(): void {
    this.Admin = JSON.parse(this.Admin)
    this.publicationService.getPublications(this.Admin.id).subscribe((value) => {
      this.publicationsList = value
    });
  }

  getUrl(image: string) {
    return `${this.myApiUrl}/static/${image}`;
    // return `http://localhost:3001/static/${image}`
  }
}
