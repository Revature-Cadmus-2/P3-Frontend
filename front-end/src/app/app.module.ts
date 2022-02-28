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
import { GroupsComponent } from './groups/groups.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// angular material
import {MatCardModule} from '@angular/material/card';
import { GroupProfileComponent } from './group-profile/group-profile.component';

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
    GroupsComponent,
    CreateGroupComponent,
    GroupProfileComponent,
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
  // angular material
  MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }