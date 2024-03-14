import { IoTSiteWiseClient, type AssetSummary } from '@aws-sdk/client-iotsitewise';
import { useQueries, type QueryFunctionContext } from '@tanstack/react-query';
import invariant from 'tiny-invariant';

import { ChildAssetCacheKeyFactory } from './childAssetCacheKeyFactory';
import { ListChildAssetsRequest } from './listChildAssetsRequest';
import { useAsset } from '../../useAsset/useAsset';
import { DataSource } from 'components/queryEditor/types';

export interface UseChildAssetsOptions {
  assetId?: string;
  dataSource: DataSource;
}

/** Use the list of child assets for an asset with a given asset ID. */
export function useChildAssets({ assetId, dataSource }: UseChildAssetsOptions) {
  const { asset: { assetHierarchies = [] } = {} } = useAsset({
    assetId,
    dataSource,
  });
  const hierarchyIds = selectHierarchyIds(assetHierarchies);
  const cacheKeyFactory = new ChildAssetCacheKeyFactory(assetId);

  const queries =
    useQueries({
      queries: hierarchyIds.map((hierarchyId) => ({
        // we need assetId and hierarchyId to make a successful request
        enabled: isEnabled(assetId, hierarchyId),
        queryKey: cacheKeyFactory.create(hierarchyId),
        queryFn: createQueryFn(dataSource),
      })),
    }) ?? [];

  const childAssets: AssetSummary[] = queries.flatMap(({ data = [] }) => data);
  const isError = queries.some(({ isError }) => isError);
  const isFetching = queries.some(({ isFetching }) => isFetching);
  const isLoading = queries.some(({ isLoading }) => isLoading);
  const isSuccess = queries.every(({ isSuccess }) => isSuccess);

  return { childAssets, isError, isFetching, isLoading, isSuccess };
}

function isEnabled(assetId: string | undefined, hierarchyId: string | undefined) {
  return isAssetId(assetId) && isHierarchyId(hierarchyId);
}

function isAssetId(assetId: string | undefined): assetId is string {
  return Boolean(assetId);
}

function isHierarchyId(hierarchyId: string | undefined): hierarchyId is string {
  return Boolean(hierarchyId);
}

/** List all of the IDs across hierarchies. */
function selectHierarchyIds(hierarchies: { id?: string }[]): string[] {
  const hierarchiesWithIds: { id: string }[] = hierarchies.filter((h): h is { id: string } => Boolean(h?.id));
  const hierarchyIds: string[] = hierarchiesWithIds.map(({ id }) => id);

  return hierarchyIds;
}

function createQueryFn(dataSource: DataSource) {
  return async function ({
    queryKey: [{ assetId, hierarchyId }],
    signal,
  }: QueryFunctionContext<ReturnType<ChildAssetCacheKeyFactory['create']>>) {
    invariant(isAssetId(assetId), 'Expected asset ID to be defined as required by the enabled flag.');
    invariant(isHierarchyId(hierarchyId), 'Expected hierarchy ID to be defined as required by the enabled flag.');

    const { assetSummaries } = await dataSource.listAssociatedAssets({
      assetId,
      hierarchyId,
    });

    return assetSummaries;
  };
}
