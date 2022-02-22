import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePostComponent } from './create-post/create-post.component';
import { RootComponent } from './root/root.component';
import { CommentComponent } from './comment/comment.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { LoginComponent } from './login/login.component';
import { FollowButtonComponent } from './profile/follow-button/follow-button.component';
import { BufferComponent } from './buffer/buffer.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NestedComponent } from './nested/nested.component';
import { ReadRootComponent } from './read-root/read-root.component';

const routes: Routes = [
  { path: 'root', component: RootComponent, canActivate: [AuthGuard] },
  { path: 'follow', component: FollowButtonComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard] },
  { path: 'comment/:id', component: CommentComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'buffer', component: BufferComponent, canActivate: [AuthGuard] },
  { path: 'nest/:id', component: NestedComponent, canActivate: [AuthGuard] },
  { path: 'read-root/:id', component: ReadRootComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
