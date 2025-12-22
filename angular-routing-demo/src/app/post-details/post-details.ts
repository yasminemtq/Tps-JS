import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  standalone: true,
  templateUrl: './post-details.html',
  styleUrls: ['./post-details.css']
})
export class PostDetailsComponent {
  postId!: string | null;

  constructor(private route: ActivatedRoute) {
    this.postId = this.route.snapshot.paramMap.get('id');
  }
}
