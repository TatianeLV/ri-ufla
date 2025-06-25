import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
  NgFor,
} from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { HomeCoarComponent } from '../../../../app/home-page/home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from '../../../../app/home-page/home-news/themed-home-news.component';
import { HomePageComponent as BaseComponent } from '../../../../app/home-page/home-page.component';
import { RecentItemListComponent } from '../../../../app/home-page/recent-item-list/recent-item-list.component';
import { ThemedTopLevelCommunityListComponent } from '../../../../app/home-page/top-level-community-list/themed-top-level-community-list.component';
import { SuggestionsPopupComponent } from '../../../../app/notifications/suggestions-popup/suggestions-popup.component';
import { ThemedConfigurationSearchPageComponent } from '../../../../app/search-page/themed-configuration-search-page.component';
import { ThemedSearchFormComponent } from '../../../../app/shared/search-form/themed-search-form.component';
import { PageWithSidebarComponent } from '../../../../app/shared/sidebar/page-with-sidebar.component';
import { ViewTrackerComponent } from '../../../../app/statistics/angulartics/dspace/view-tracker.component';

@Component({
  selector: 'ds-themed-home-page',
  // styleUrls: ['./home-page.component.scss'],
  styleUrls: ['../../../../app/home-page/home-page.component.scss'],
  templateUrl: './home-page.component.html',
  // templateUrl: '../../../../app/home-page/home-page.component.html',
  standalone: true,
  imports: [
    ThemedHomeNewsComponent,
    NgTemplateOutlet, 
    NgIf,
    RouterModule,
    NgFor,
    ViewTrackerComponent, ThemedSearchFormComponent, ThemedTopLevelCommunityListComponent, RecentItemListComponent, AsyncPipe, TranslateModule, NgClass, SuggestionsPopupComponent, ThemedConfigurationSearchPageComponent, PageWithSidebarComponent, HomeCoarComponent],
})
export class HomePageComponent extends BaseComponent {
  public collections = [
    {
      link: '/communities/a20a502c-b9aa-49d1-84ab-4414fbe386ff',
      title: 'Programas de Pós-Graduação - Teses e Dissertações',
    },
    {
      link: '/communities/befa5c78-4e73-4dce-88c0-413f1cf484b4',
      title: 'Biblioteca Universitária - BU',
    },
     {
      link: '/communities/6c0dd087-91e9-4223-bad5-b4d12811172d',
      title: 'Editora UFLA',
    },
    {
      link: '/communities/5ba5c097-345b-4c3f-9d98-44523f92e948',
      title: 'Escola de Ciências Agrárias de Lavras - ESAL',
    },
     {
      link: '/communities/63e3b644-5fe1-4008-92b2-ee708c67d028',
      title: 'Escola de Engenharia - EENG',
    },
    {
      link: '/communities/5c020591-0147-4368-9dd9-d07c74a77907',
      title: 'Faculdade de Ciências da Saúde - FCS',
    },
     {
      link: '/communities/93a083cf-0897-4b50-9e2c-52086e0c6532',
      title: 'Faculdade de Ciências Sociais Aplicadas - FCSA',
    },
    {
      link: '/communities/b708708f-aa01-48c3-a670-3c4d16821051',
      title: 'Faculdade de Filosofia, Ciências Humanas, Educação e Letras - FAELCH',
    },
    {
      link: '/communities/9e64a6fa-6483-4436-8001-5dd15bc51718',
      title: 'Faculdade de Zootecnia e Medicina Veterinária - FZMV',
    },
    {
      link: '/communities/84b89731-1a84-4f8f-ac98-64547da88e69',
      title: 'Instituto de Ciências Exatas e Tecnológicas - ICET ',
    },
     {
      link: '/communities/15efe126-235d-4466-81f0-76e9ae74fc5b',
      title: 'Instituto de Ciências Naturais - ICN',
    },
    {
      link: '/communities/c80e6857-40aa-40f5-a673-1edf36e8a9b6',
      title: 'Revistas UFLA',
    }
  ]

}
