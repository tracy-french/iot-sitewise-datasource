import { type AssetSummary } from '@aws-sdk/client-iotsitewise';
import React from 'react';

import { AssetTable } from './assetTable';
import { useAssets } from './useAssets';
import { useParentAssetId } from './useParentAssetId';
import { DataSource } from 'components/queryEditor/types';

export interface AssetExplorerProps {
  onSelect: (asset?: AssetSummary) => void;
  isWithoutHeader?: boolean;
  dataSource: DataSource;
}

/** User interface element enabling the exploration and selection of assets. */
export function AssetExplorer({ onSelect, isWithoutHeader, dataSource }: AssetExplorerProps) {
  const [parentAssetId, setParentAssetId] = useParentAssetId();
  const {
    assets,
    isFetching,
    fetchNextPage,
    hasNextPage = false,
    isError,
  } = useAssets({
    assetId: parentAssetId,
    dataSource,
  });

  return (
    <AssetTable
      assets={assets}
      parentAssetId={parentAssetId}
      onClickAsset={setParentAssetId}
      onClickNextPage={fetchNextPage}
      onSelectAsset={onSelect}
      isLoading={isFetching}
      isError={isError}
      isWithoutHeader={isWithoutHeader}
      hasNextPage={hasNextPage}
    />
  );
}
