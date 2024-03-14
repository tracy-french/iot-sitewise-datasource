import Box from '@cloudscape-design/components/box';
import React, { useState } from 'react';

import { AssetExplorer } from './assetExplorer';
import { AssetSummary, IoTSiteWiseClient } from '@aws-sdk/client-iotsitewise';
import {
  DescribeAssetRequest,
  DescribeAssetResponse,
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
} from '@aws-sdk/client-iotsitewise';

export interface ModeledDataStreamQueryEditorProps {
  dataSource: {
    listAssets: (params: ListAssetsRequest) => Promise<ListAssetsResponse>;
    listAssociatedAssets: (params: ListAssociatedAssetsRequest) => Promise<ListAssociatedAssetsResponse>;
    describeAsset: (params: DescribeAssetRequest) => Promise<DescribeAssetResponse>;
  };
  onSelect: (asset?: NonNullable<ListAssetsResponse['assetSummaries']>[number]) => void;
}

export function ModeledDataStreamQueryEditor({ dataSource, onSelect }: ModeledDataStreamQueryEditorProps) {
  return (
    <Box padding={{ horizontal: 's' }}>
      <AssetExplorer dataSource={dataSource} onSelect={onSelect} />
    </Box>
  );
}
