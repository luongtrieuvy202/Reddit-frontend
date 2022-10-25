import { Component, OnInit } from '@angular/core';
import {SubredditModel} from 'src/app/shared/subreddit-side-bar/subreddit-model';
import {SubredditService} from '../subreddit.service';

@Component({
  selector: 'app-list-subreddits',
  templateUrl: './list-subreddits.component.html',
  styleUrls: ['./list-subreddits.component.css']
})
export class ListSubredditsComponent implements OnInit {

	subreddits:Array<SubredditModel>;


  constructor(private subredditService:SubredditService) { }

  ngOnInit(): void {
	  this.subredditService.getAllSubreddits().subscribe(
		next:(data) => {
			this.subreddits = data;
		},

		error:(err:Error) => { console.error('error')}
	  )
  }

}
