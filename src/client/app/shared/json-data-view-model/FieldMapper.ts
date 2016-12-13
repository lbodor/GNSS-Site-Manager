import {FieldMaps} from './FieldMap';
export interface FieldMapper {
  /**
   * Build data structure that maps between data and view models.
   *
   * @returns {FieldMaps}
   */
  fieldMapping(): FieldMaps;
}
