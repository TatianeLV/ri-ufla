import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
} from '@angular/core';

import { Item } from '../../../../../core/shared/item.model';
import { MetadataValuesComponent } from '../../../../field-components/metadata-values/metadata-values.component';
import { ItemPageFieldComponent } from '../item-page-field.component';

@Component({
  selector: 'ds-item-page-abstract-field',
  templateUrl: '../item-page-field.component.html',
  standalone: true,
  imports: [
    MetadataValuesComponent,
    AsyncPipe,
  ],
})
/**
 * This component is used for displaying the abstract (dc.description.abstract) of an item
 */
export class ItemPageAbstractFieldComponent extends ItemPageFieldComponent {

    /**
     * The item to display metadata for
     */
    @Input() item: Item;

    /**
     * Separator string between multiple values of the metadata fields defined
     * @type {string}
     */
    separator: string;

    /**
     * Fields (schema.element.qualifier) used to render their values.
     * In this component, we want to display values for metadata 'dc.description.abstract'
     */
    fields: string[] = [
      'dc.description.abstract',
      // 'dc.description.resumo',
    ];

    /**
     * Label i18n key for the rendered metadata
     */
    label = 'item.page.abstract';

    /**
     * Use the {@link MarkdownDirective} to render dc.description.abstract values
     */
    enableMarkdown = true;
}
