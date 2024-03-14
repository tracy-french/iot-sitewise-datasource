import React, { useEffect, useRef } from 'react';
import { isFunction } from 'lodash';
import { type IoTSiteWiseClient } from '@aws-sdk/client-iotsitewise';
import { useCollection } from '@cloudscape-design/collection-hooks';
import Table from '@cloudscape-design/components/table';

import { useExplorerPreferences } from '../../queryEditor/iotSiteWiseQueryEditor/useExplorerPreferences';
import { ModeledDataStreamTableEmptyState } from './modeledDataStreamTableEmptyState';
import { createModeledDataStreamColumnDefinitions } from './createModeledDataStreamColumnDefinitions';
import {
  ModeledDataStreamTablePropertyFilter,
  MODELED_DATA_STREAM_TABLE_FILTERING_PROPERTIES,
} from './modeledDataStreamTablePropertyFilter';
import { ModeledDataStreamTablePreferences } from './modeledDataStreamTablePreferences';
import { ModeledDataStreamTablePagination } from './modeledDataStreamTablePagination';
import { ModeledDataStreamTableHeader } from './modeledDataStreamTableHeader';
import type { ModeledDataStream } from '../types';
import { SelectedAsset } from '../../queryEditor/iotSiteWiseQueryEditor/modeledDataStreamQueryEditor/types';

export interface ModeledDataStreamTableProps {
  selectedAsset?: SelectedAsset;
  modeledDataStreams: ModeledDataStream[];
  isLoading: boolean;
  isError: boolean;
}

export function ModeledDataStreamTable({
  selectedAsset,
  modeledDataStreams,
  isLoading,
  isError,
}: ModeledDataStreamTableProps) {
  const [preferences, setPreferences] = useExplorerPreferences({
    defaultVisibleContent: ['name', 'latestValue'],
    resourceName: 'modeled data stream',
  });

  const { items, collectionProps, paginationProps, propertyFilterProps, actions } = useCollection(modeledDataStreams, {
    propertyFiltering: {
      filteringProperties: MODELED_DATA_STREAM_TABLE_FILTERING_PROPERTIES,
    },
    pagination: { pageSize: preferences.pageSize },
    selection: { keepSelection: true, trackBy: 'name' },
    sorting: {},
  });

  /**
   * Remove selected items if the properties are
   * not able to be displayed on widget
   */

  const paginationPropsWithAriaLabels = {
    ...paginationProps,
    openEnd: false,
    ariaLabels: {
      nextPageLabel: 'Next page',
      paginationLabel: 'Modeled DataStream Table pagination',
      previousPageLabel: 'Previous page',
      pageLabel: (pageNumber: number) => `Page ${pageNumber}`,
    },
  };

  if (isError) {
    return null;
  }

  return (
    <Table
      {...collectionProps}
      items={items}
      columnDefinitions={createModeledDataStreamColumnDefinitions()}
      trackBy={(item) => `${item.assetId}---${item.propertyId}`}
      variant="embedded"
      loading={isLoading}
      loadingText="Loading modeled data streams..."
      selectionType="multi"
      resizableColumns
      visibleColumns={preferences.visibleContent}
      stripedRows={preferences.stripedRows}
      wrapLines={preferences.wrapLines}
      stickyColumns={preferences.stickyColumns}
      empty={<ModeledDataStreamTableEmptyState isAssetSelected={selectedAsset != null} />}
      filter={modeledDataStreams.length > 0 && <ModeledDataStreamTablePropertyFilter {...propertyFilterProps} />}
      header={
        <ModeledDataStreamTableHeader
          selectedItemCount={collectionProps.selectedItems?.length}
          totalItemCount={collectionProps.totalItemsCount ?? 0}
        />
      }
      pagination={<ModeledDataStreamTablePagination {...paginationPropsWithAriaLabels} />}
      preferences={<ModeledDataStreamTablePreferences preferences={preferences} updatePreferences={setPreferences} />}
    />
  );
}
