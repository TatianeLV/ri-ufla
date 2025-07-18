import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  combineLatest as observableCombineLatest,
  Observable,
  of as observableOf,
} from 'rxjs';
import { map } from 'rxjs/operators';

import {
  getBitstreamDownloadRoute,
  getBitstreamRequestACopyRoute,
} from '../../app-routing-paths';
import { DSONameService } from '../../core/breadcrumbs/dso-name.service';
import { AuthorizationDataService } from '../../core/data/feature-authorization/authorization-data.service';
import { FeatureID } from '../../core/data/feature-authorization/feature-id';
import { Bitstream } from '../../core/shared/bitstream.model';
import { Item } from '../../core/shared/item.model';
import {
  hasValue,
  isNotEmpty,
} from '../empty.util';

@Component({
  selector: 'ds-base-file-download-link',
  templateUrl: './file-download-link.component.html',
  styleUrls: ['./file-download-link.component.scss'],
  standalone: true,
  imports: [RouterLink, NgClass, NgIf, NgTemplateOutlet, AsyncPipe, TranslateModule],
})
/**
 * Component displaying a download link
 * When the user is authenticated, a short-lived token retrieved from the REST API is added to the download link,
 * ensuring the user is authorized to download the file.
 */
export class FileDownloadLinkComponent implements OnInit {

  /**
   * Optional bitstream instead of href and file name
   */
  @Input() bitstream: Bitstream;

  @Input() item: Item;

  /**
   * Additional css classes to apply to link
   */
  @Input() cssClasses = '';

  /**
   * A boolean representing if link is shown in same tab or in a new one.
   */
  @Input() isBlank = false;

  @Input() enableRequestACopy = true;

  bitstreamPath$: Observable<{
    routerLink: string,
    queryParams: any,
  }>;

  canDownload$: Observable<boolean>;

  constructor(
    private authorizationService: AuthorizationDataService,
    public dsoNameService: DSONameService,
  ) {
  }

  ngOnInit() {

    if (this.enableRequestACopy) {
      this.canDownload$ = this.authorizationService.isAuthorized(FeatureID.CanDownload, isNotEmpty(this.bitstream) ? this.bitstream.self : undefined);
      const canRequestACopy$ = this.authorizationService.isAuthorized(FeatureID.CanRequestACopy, isNotEmpty(this.bitstream) ? this.bitstream.self : undefined);
      this.bitstreamPath$ = observableCombineLatest([this.canDownload$, canRequestACopy$]).pipe(
        map(([canDownload, canRequestACopy]) => this.getBitstreamPath(canDownload, canRequestACopy)),
      );
    } else {
      this.bitstreamPath$ = observableOf(this.getBitstreamDownloadPath());
      this.canDownload$ = observableOf(true);
    }
  }

  getBitstreamPath(canDownload: boolean, canRequestACopy: boolean) {
    if (!canDownload && canRequestACopy && hasValue(this.item)) {
      return getBitstreamRequestACopyRoute(this.item, this.bitstream);
    }
    return this.getBitstreamDownloadPath();
  }

  getBitstreamDownloadPath() {
    return {
      routerLink: getBitstreamDownloadRoute(this.bitstream),
      queryParams: {},
    };
  }
}
