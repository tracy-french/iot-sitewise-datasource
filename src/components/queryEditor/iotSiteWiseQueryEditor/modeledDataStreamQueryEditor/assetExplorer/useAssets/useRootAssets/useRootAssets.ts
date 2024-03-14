import { type AssetSummary, type IoTSiteWiseClient } from '@aws-sdk/client-iotsitewise';
import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';

import { ListRootAssetsRequest } from './listRootAssetsRequest';
import { RootAssetCacheKeyFactory } from './rootAssetCacheKeyFactory';
import { DataSource } from 'components/queryEditor/types';

export interface UseRootAssetsOptions {
  dataSource: DataSource;
}

/** Use the paginated list of root assets. */
export function useRootAssets({ dataSource }: UseRootAssetsOptions) {
  const cacheKeyFactory = new RootAssetCacheKeyFactory();

  const {
    data: { pages: rootAssetPages = [] } = {},
    fetchNextPage,
    hasNextPage,
    isFetching,
    isSuccess,
    status,
    isError,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: cacheKeyFactory.create(),
    queryFn: createUseListRootAssetsQueryFn(dataSource),
    getNextPageParam: ({ nextToken }) => nextToken,
  });

  const rootAssets: AssetSummary[] = rootAssetPages.flatMap(({ assetSummaries = [] }) => assetSummaries);

  return {
    rootAssets,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isSuccess,
    status,
    isError,
    isLoading,
    error,
  };
}

function createUseListRootAssetsQueryFn(dataSource: DataSource) {
  return async function ({
    pageParam: nextToken,
    signal,
  }: QueryFunctionContext<ReturnType<RootAssetCacheKeyFactory['create']>>) {
    const response = await dataSource.listAssets({});

    return response;
  };
}
