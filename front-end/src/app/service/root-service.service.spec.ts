import { fakeAsync, TestBed } from '@angular/core/testing';
import { RootServiceService } from './root-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../models/post'
import { Comment } from '../models/Comment'
import { Vote } from '../models/vote'

describe('RootServiceService', () => {
  let service: RootServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RootServiceService);
    httpMock =TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    //httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //Root Tests//
  it('addRoot should add new story', fakeAsync (() => {
    let fakePost: Post = {
      id: 1,
      title: 'Walking the Dog',
      message: 'It was sunday morning when I...',
      dateTime: null,
      userName: 'ToTheMoon1234',
      totalVote: 5,
      comments: []
    }

    spyOn(service, 'addRoot').and.callThrough();
    service.addRoot(fakePost).then((res) => {
      expect(service.addRoot).toHaveBeenCalled();
      expect(res).toEqual(fakePost);
    });
  }));

  it('getAllRoots should return array of stories', fakeAsync (() => {

    let fakeData: Post[] = [
      {
        id: 1,
        title: 'Walking the Dog',
        message: 'It was sunday morning when I...',
        dateTime: null,
        userName: 'ToTheMoon1234',
        totalVote: 5,
        comments: []
      },
      {
        id: 2,
        title: 'Late night TV',
        message: 'I watched cartoons last night ...',
        dateTime: null,
        userName: 'WoWoWubzy456',
        totalVote: 5,
        comments: []
      }
    ];

    spyOn(service, 'getAllRoots').and.callThrough();
    service.getAllRoots().then((res) => {
      expect(service.getAllRoots).toHaveBeenCalled();
      expect(res.length).toEqual(2);
    });
  }));

  it('getRootById should return a specific root', fakeAsync (() => {
    let fakePost = {
      id: 1,
      title: 'Walking the Dog',
      message: 'It was sunday morning when I...',
      dateTime: null,
      userName: 'ToTheMoon1234',
      totalVote: 5,
      comments: []
    }
    spyOn(service, 'getRootById').and.callThrough();
    service.getRootById(1).then((res) => {
      expect(service.getRootById).toHaveBeenCalledWith(1);
      expect(res).toEqual(fakePost);
    })
  }));

  it('updateRoot should update story', fakeAsync (() => {
    let fakePost = {
      id: 1,
      title: 'Walking the Dog',
      message: 'It was sunday morning when I...',
      dateTime: null,
      userName: 'ToTheMoon1234',
      totalVote: 5,
      comments: []
    }

    spyOn(service, 'updateRoot').and.callThrough();
    service.updateRoot(fakePost).then((res) => {
      expect(service.updateRoot).toHaveBeenCalled();
      expect(res).toEqual(fakePost);
    });
  }));
  //comment tests//

  it('addComment should post new comment', fakeAsync (() => {
    let fakeComment = {
      id: 8,
      parentId: -1,
      rootId: 1,
      message: 'My dog ran into the store...',
      totalVote: 12,
      dateTime: null,
      userName: 'ToTheMoon1234',
      votes: [],
      comments: []
    }
    spyOn(service, 'addComment').and.callThrough();
    service.addComment(fakeComment).then((res) => {
      expect(service.addComment).toHaveBeenCalled();
      expect(res).toEqual(fakeComment);
    });
  }));

  it('getCommentById should return specific comment', fakeAsync (() => {
    let fakeComment = {
      id: 8,
      parentId: -1,
      rootId: 1,
      message: 'My dog ran into the store...',
      totalVote: 12,
      dateTime: null,
      userName: 'ToTheMoon1234',
      votes: [],
      comments: []
    }
    spyOn(service, 'getCommentById').and.callThrough();
    service.getCommentById(8).then((res) => {
      expect(service.getCommentById).toHaveBeenCalledWith(8);
      expect(res).toEqual(fakeComment);
    })
  }));

  //need to check for legitimate passing
  it('deleteComment should delete a comment', fakeAsync (() => {
    let fakeComment = {
      id: 8,
      parentId: -1,
      rootId: 1,
      message: 'My dog ran into the store...',
      totalVote: 12,
      dateTime: null,
      userName: 'ToTheMoon1234',
      votes: [],
      comments: []
    }
    spyOn(service, 'deleteComment').and.callThrough();
    service.deleteComment(8).then((res) => {
      expect(service.deleteVote).toHaveBeenCalledWith(8);
      expect(res).toEqual(null);
  })
}));
  //vote tests//

  it('getAllVotes should get all votes', fakeAsync (() => {
    let fakeVotes: Vote[] = [{
      id: 1,
      userName: 'Wowowubzy3456',
      value: 12,
      commentId: 8
    },
    {
      id: 2,
      userName: 'ToTheMoon1234',
      value: 10,
      commentId: 7
    }];
    spyOn(service, 'getAllVotes').and.callThrough();
    service.getAllVotes().then((res) => {
      expect(service.getAllVotes).toHaveBeenCalled();
      expect(res.length).toEqual(2);
    });
  }));

  it('addVote should post new vote', fakeAsync (() => {
    let fakeVote = {
      id: 2,
      userName: 'ToTheMoon1234',
      value: 10,
      commentId: 7
    }
    spyOn(service, 'addVote').and.callThrough();
    service.addVote(fakeVote).then((res) => {
      expect(service.addVote).toHaveBeenCalled();
      expect(res).toEqual(fakeVote);
    });
  }));

  it('updateVote should update vote', fakeAsync (() => {
    let fakeVote = {
      id: 2,
      userName: 'ToTheMoon1234',
      value: 10,
      commentId: 7
    }
    spyOn(service, 'updateVote').and.callThrough();
    service.updateVote(fakeVote).then((res) => {
      expect(service.updateVote).toHaveBeenCalled();
      expect(res).toEqual(fakeVote);
    });
  }));

  it('getCommentById should return specific comment', fakeAsync (() => {
    let fakeVote = {
      id: 2,
      userName: 'ToTheMoon1234',
      value: 10,
      commentId: 7
    }
    spyOn(service, 'deleteVote').and.callThrough();
    service.deleteVote(2).then((res) => {
      expect(service.deleteVote).toHaveBeenCalledWith(2);
      expect(res).toEqual(null);
    })
  }));

})


