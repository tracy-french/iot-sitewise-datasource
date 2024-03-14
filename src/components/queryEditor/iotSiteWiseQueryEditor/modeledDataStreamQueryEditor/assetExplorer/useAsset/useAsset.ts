import { type IoTSiteWiseClient } from '@aws-sdk/client-iotsitewise';
import { useQuery, type QueryFunctionContext } from '@tanstack/react-query';
import invariant from 'tiny-invariant';

import { AssetCacheKeyFactory } from './assetCacheKeyFactory';
import { GetAssetRequest } from './getAssetRequest';
import { DataSource } from 'components/queryEditor/types';

export interface UseAssetOptions {
  assetId?: string;
  dataSource: DataSource;
}

/** Use an AWS IoT SiteWise asset description. */
export function useAsset({ assetId, dataSource }: UseAssetOptions) {
  const cacheKeyFactory = new AssetCacheKeyFactory(assetId);

  const {
    data: asset,
    status,
    isFetching,
  } = useQuery({
    enabled: isEnabled(assetId),
    queryKey: cacheKeyFactory.create(),
    queryFn: createQueryFn(dataSource),
  });

  return { asset, status, isFetching };
}

function isEnabled(assetId: string | undefined): assetId is string {
  return Boolean(assetId);
}

export function createQueryFn(dataSource: DataSource) {
  return async function ({
    queryKey: [{ assetId }],
    signal,
  }: QueryFunctionContext<ReturnType<AssetCacheKeyFactory['create']>>) {
    invariant(isEnabled(assetId), 'Expected assetId to be defined as required by the enabled flag.');

    const response = await dataSource.describeAsset({ assetId });

    return response;
  };
}
