import {
  DescribeAssetRequest,
  DescribeAssetResponse,
  ListAssetsRequest,
  ListAssetsResponse,
  ListAssociatedAssetsRequest,
  ListAssociatedAssetsResponse,
} from '@aws-sdk/client-iotsitewise';

export interface DataSource {
  listAssets: (params: ListAssetsRequest) => Promise<ListAssetsResponse>;
  listAssociatedAssets: (params: ListAssociatedAssetsRequest) => Promise<ListAssociatedAssetsResponse>;
  describeAsset: (params: DescribeAssetRequest) => Promise<DescribeAssetResponse>;
}
