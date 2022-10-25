import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {faComments} from '@fortawesome/free-solid-svg-icons';
import {PostModel} from '../post-model';
import {PostService} from '../post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

	posts$ : Array<PostModel>;
	faComments = faComments;
  constructor(private postService:PostService,private router:Router) {
	this.postService.getAllPosts().subscribe({
		next:(posts) => { this.posts$ = posts}
	})
  }

  ngOnInit(): void {
  }



  goToPost(id:number):void {
	this.router.navigateByUrl('/view-post/'+id);
  }

}
