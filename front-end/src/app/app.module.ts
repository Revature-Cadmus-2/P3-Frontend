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
import { SettingsButtonComponent } from './profile/settings-button/settings-button.component';
import { SettingsPageComponent } from './profile/settings-page/settings-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from "@angular/material/card";
import { UsersFollowerListComponent } from './profile/users-follower-list/users-follower-list.component';
import { NotificationListComponent } from './profile/notification-list/notification-list.component';
import { ToastrModule } from 'ngx-toastr';
import { BookMarkComponent } from './profile/book-mark/book-mark.component';
import { BookMarkButtonComponent } from './profile/book-mark-button/book-mark-button.component';
import { ProfilePicComponent } from './profile/profile-pic/profile-pic.component';
import { CommonModule } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
// angular material
import { GroupProfileComponent } from './group-profile/group-profile.component';
import { GroupViewAllComponent } from './group-view-all/group-view-all.component';
import { CreateGroupPostComponent } from './create-group-post/create-group-post.component';

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
    UsersFollowerListComponent,
    NotificationListComponent,
    SettingsButtonComponent,
    SettingsPageComponent,
    BookMarkComponent,
    BookMarkButtonComponent,
    ProfilePicComponent,
    GroupsComponent,
    CreateGroupComponent,
    GroupProfileComponent,
    GroupViewAllComponent,
    CreateGroupPostComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot([]),
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ //For the Notifications
      timeOut: 1000, //time is in milliseconds
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
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
    CommonModule,
    NgToastModule,
    MatGridListModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }