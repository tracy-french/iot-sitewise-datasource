import React from 'react';
import {
  DescribeAssetRequest,
  DescribeAssetResponse,
  IoTSiteWiseClient,
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
} from '@aws-sdk/client-iotsitewise';

import { ModeledDataStreamQueryEditor } from './modeledDataStreamQueryEditor';

interface ResourceExplorerProps {
  dataSource: {
    listAssets: (params: ListAssetsRequest) => Promise<ListAssetsResponse>;
    listAssociatedAssets: (params: ListAssociatedAssetsRequest) => Promise<ListAssociatedAssetsResponse>;
    describeAsset: (params: DescribeAssetRequest) => Promise<DescribeAssetResponse>;
  };
  onSelect: (asset?: NonNullable<ListAssetsResponse['assetSummaries']>[number]) => void;
}

export function IoTSiteWiseQueryEditor({ dataSource, onSelect }: ResourceExplorerProps) {
  return <ModeledDataStreamQueryEditor onSelect={onSelect} dataSource={dataSource} />;
}
