import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Root } from '../models/root';
import { Comment } from '../models/Comment';
import { Vote } from '../models/vote';

@Injectable({
  providedIn: 'root'
})
export class RootServiceService {

  private rootUrl: string = "http://apollopost-prod.us-east-2.elasticbeanstalk.com/api/Post";
  private rootUrl_1: string = "http://apollopost-prod.us-east-2.elasticbeanstalk.com/api/Comment";
  private rootUrl_2: string = "http://apollopost-prod.us-east-2.elasticbeanstalk.com/api/Vote";
  private userUrl: string = "http://apollouser-prod.us-east-2.elasticbeanstalk.com/api/User";

  story: string[]

  constructor(private http: HttpClient) { }

  addRoot(root: Root): Promise<Root> {
    return this.http.post<Root>(this.rootUrl, root).toPromise();
  }
  updateRoot(root: Root): Promise<Root> {
    return this.http.put<Root>(this.rootUrl + "/" + root.id, root).toPromise();
  }
  getAllRoots(): Promise<Root[]> {
    return this.http.get<Root[]>(this.rootUrl).toPromise();
  }
  getRootById(id: number): Promise<Root> {
    return this.http.get<Root>(this.rootUrl + '/' + id).toPromise();
  }

  addComment(comment: Comment): Promise<Comment> {
    return this.http.post<Comment>(this.rootUrl_1, comment).toPromise();
  }
  deleteComment(id: number): Promise<Comment> {
    return this.http.delete<Comment>(this.rootUrl_1 + '/' + id).toPromise();
  }
  getCommentById(id: number): Promise<Comment> {
    return this.http.get<Comment>(this.rootUrl_1 + '/' + id).toPromise();
  }

  getAllVotes(): Promise<Vote[]> {
    return this.http.get<Vote[]>(this.rootUrl_2).toPromise();
  }
  addVote(vote: Vote): Promise<Vote> {
    return this.http.post<Vote>(this.rootUrl_2, vote).toPromise();
  }
  updateVote(vote: Vote): Promise<Vote> {
    return this.http.put<Vote>(this.rootUrl_2 + "/" + vote.id, vote).toPromise();
  }
  deleteVote(id: number): Promise<void> {
    return this.http.delete<void>(this.rootUrl_2 + "/" + id).toPromise();
  }

  RecursiveFunction(chosenComment: Comment): Comment[] {
    if (chosenComment.comments.length > 1) {
      chosenComment.comments.sort((a, b) => (a.totalVote < b.totalVote) ? 1 : -1);
    }
    //sorts by popularity
    let winningComment = chosenComment.comments[0];
    let commentArray: Comment[] = [winningComment];
    //selects most popular
    chosenComment.comments = [winningComment];
    if (winningComment.comments.length > 0) {
      let childrenCommentChain = this.RecursiveFunction(winningComment);
      commentArray = commentArray.concat(childrenCommentChain)
    }
    return commentArray;
  }

}
