import React from 'react';

import { useModeledDataStreams } from './useModeledDataStreams';
import { ModeledDataStreamTable } from './modeledDataStreamTable';
import { SelectedAsset } from '../queryEditor/iotSiteWiseQueryEditor/modeledDataStreamQueryEditor/types';

export interface ModeledDataStreamExplorerProps {
  selectedAsset?: SelectedAsset;
}

export function ModeledDataStreamExplorer({ selectedAsset }: ModeledDataStreamExplorerProps) {
  const {
    assetProperties,
    isFetching: isFetchingAssetProperties,
    isError: isAssetPropertiesError,
  } = useModeledDataStreams({
    assetProps: selectedAsset ? [selectedAsset] : [],
  });

  return (
    <ModeledDataStreamTable
      modeledDataStreams={assetProperties}
      selectedAsset={selectedAsset}
      isLoading={isFetchingAssetProperties}
      isError={isAssetPropertiesError}
    />
  );
}
