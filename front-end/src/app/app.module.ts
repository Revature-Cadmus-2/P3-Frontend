import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { AuthModule } from '@auth0/auth0-angular';
import { RecentActivityComponent } from './profile/recent-activity/recent-activity.component';
import { ListOfFollowersComponent } from './profile/list-of-followers/list-of-followers.component';
import { FollowedPostsComponent } from './profile/followed-posts/followed-posts.component';
import { FollowButtonComponent } from './profile/follow-button/follow-button.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RootComponent } from './root/root.component';
import { BufferComponent } from './buffer/buffer.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './comment/comment.component';
import { SearchComponent } from './search/search.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginButtonsComponent } from './login-buttons/login-buttons.component';
import { RegisterButtonComponent } from './register-button/register-button.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { NestedComponent } from './nested/nested.component';
import { ReadRootComponent } from './read-root/read-root.component';
import { FollowButtonRootComponent } from './follow-button-root/follow-button-root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
<<<<<<< HEAD
import { MatIconModule } from "@angular/material/icon";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { DialogComponent } from './dialog/dialog.component';
import { MatCardModule } from "@angular/material/card";
=======
import { DialogComponent } from './dialog/dialog.component';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { UsersFollowerListComponent } from './profile/users-follower-list/users-follower-list.component';
>>>>>>> efb845a34793f011fa7a7229b45cc9145887fa01


@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    CreatePostComponent,
    LoginComponent,
    RecentActivityComponent,
    ListOfFollowersComponent,
    FollowedPostsComponent,
    FollowButtonComponent,
    FollowButtonRootComponent,
    ProfilePageComponent,
    NavBarComponent,
    BufferComponent,
    CommentComponent,
    SearchComponent,
    LoginButtonsComponent,
    RegisterButtonComponent,
    DateAgoPipe,
    NestedComponent,
    ReadRootComponent,
    DialogComponent,
<<<<<<< HEAD
=======
    UsersFollowerListComponent,
>>>>>>> efb845a34793f011fa7a7229b45cc9145887fa01
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([]),
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-b0fxq42a.us.auth0.com',
      clientId: 'Hp374kDB7mqFHtv2tYvbE0g2IS6zQwum'
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }