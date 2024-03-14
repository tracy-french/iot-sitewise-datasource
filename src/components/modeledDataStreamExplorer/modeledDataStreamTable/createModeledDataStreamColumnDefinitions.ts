import { type TableProps } from '@cloudscape-design/components/table';
import type { ModeledDataStream } from '../types';

export function createModeledDataStreamColumnDefinitions(): TableProps<
  ModeledDataStream & {
    latestValue?: number | string | boolean;
    latestValueTime?: number;
  }
>['columnDefinitions'] {
  return [
    {
      id: 'name',
      header: 'Name',
      cell: ({ name }) => name,
      sortingField: 'name',
    },
    {
      id: 'assetName',
      header: 'Asset name',
      cell: ({ assetName }) => assetName,
      sortingField: 'assetName',
    },
    {
      id: 'unit',
      header: 'Unit',
      cell: ({ unit }) => unit,
      sortingField: 'unit',
    },
    {
      id: 'dataType',
      header: 'Data type',
      cell: ({ dataType }) => dataType,
      sortingField: 'dataType',
    },
    {
      id: 'dataTypeSpec',
      header: 'Data type spec',
      cell: ({ dataTypeSpec }) => dataTypeSpec,
      sortingField: 'dataTypeSpec',
    },
  ];
}

export const modeledDataStreamExplorerColumnDefinitions: TableProps<
  ModeledDataStream & {
    latestValue?: number | string | boolean;
    latestValueTime: number;
  }
>['columnDefinitions'] = [];
