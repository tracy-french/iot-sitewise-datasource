import React from 'react';

import { IoTSiteWiseQueryEditor } from './iotSiteWiseQueryEditor';
import {
  DescribeAssetRequest,
  DescribeAssetResponse,
  IoTSiteWiseClient,
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
} from '@aws-sdk/client-iotsitewise';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface ResourceExplorerProps {
  dataSource: {
    listAssets: (params: ListAssetsRequest) => Promise<ListAssetsResponse>;
    listAssociatedAssets: (params: ListAssociatedAssetsRequest) => Promise<ListAssociatedAssetsResponse>;
    describeAsset: (params: DescribeAssetRequest) => Promise<DescribeAssetResponse>;
  };
  onSelect: (asset?: NonNullable<ListAssetsResponse['assetSummaries']>[number]) => void;
}

export function ResourceExplorer({ dataSource, onSelect }: ResourceExplorerProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <IoTSiteWiseQueryEditor onSelect={onSelect} dataSource={dataSource} />
    </QueryClientProvider>
  );
}
