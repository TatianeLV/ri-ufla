import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { RootModule } from '../../app/root.module';
import { FileSectionComponent } from './app/item-page/simple/field-components/file-section/file-section.component';
import { ItemPageTitleFieldComponent } from './app/item-page/simple/field-components/specific-field/title/item-page-title-field.component';
import { ItemPageComponent } from './app/item-page/simple/item-page.component';
import { MetadataRepresentationListComponent } from './app/item-page/simple/metadata-representation-list/metadata-representation-list.component';
import { MediaViewerComponent } from './app/item-page/media-viewer/media-viewer.component';
import { MediaViewerImageComponent } from './app/item-page/media-viewer/media-viewer-image/media-viewer-image.component';
import { MediaViewerVideoComponent } from './app/item-page/media-viewer/media-viewer-video/media-viewer-video.component';
import { FullFileSectionComponent } from './app/item-page/full/field-components/file-section/full-file-section.component';
import { FullItemPageComponent } from './app/item-page/full/full-item-page.component';
import { ItemStatusComponent } from './app/item-page/edit-item-page/item-status/item-status.component';
import { ItemAlertsComponent } from './app/item-page/alerts/item-alerts.component';


const DECLARATIONS = [
  FileSectionComponent,
  ItemPageTitleFieldComponent,
  ItemPageComponent,
  MetadataRepresentationListComponent,
  MediaViewerComponent,
  MediaViewerImageComponent,
  MediaViewerVideoComponent,
  FullFileSectionComponent,
  FullItemPageComponent,
  ItemStatusComponent,
  ItemAlertsComponent
];

@NgModule({
  imports: [
    RootModule,
    CommonModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule,
    ScrollToModule,
    StoreModule,
    StoreRouterConnectingModule,
    TranslateModule,
    FormsModule,
    ...DECLARATIONS,
  ],
  // declarations: DECLARATIONS,
})

/**
 * This module serves as an index for all the components in this theme.
 * It should import all other modules, so the compiler knows where to find any components referenced
 * from a component in this theme
 * It is purposefully not exported, it should never be imported anywhere else, its only purpose is
 * to give lazily loaded components a context in which they can be compiled successfully
 */
class LazyThemeModule {
}
