import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SpotifyService } from './services/spotify.service';

import { AppComponent } from './app.component';
import { PlayerComponent } from './components/player/player.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ArtistComponent } from './components/artist/artist.component';
import { AlbumComponent } from './components/album/album.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { LoadingAnimationComponent } from './components/loading-animation/loading-animation.component';
import { CardComponent } from './components/card/card.component';
import { RouterComponent } from './components/router/router.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DiscComponent } from './components/disc/disc.component';
import { ResultsComponent } from './components/results/results.component';
import { HelpComponent } from './components/help/help.component';

const appRoutes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    MainComponent,
    FavoritesComponent,
    ArtistComponent,
    AlbumComponent,
    SearchbarComponent,
    LoadingAnimationComponent,
    CardComponent,
    RouterComponent,
    NavbarComponent,
    DiscComponent,
    ResultsComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
