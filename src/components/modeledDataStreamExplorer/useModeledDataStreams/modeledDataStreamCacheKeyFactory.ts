import { SelectedAsset } from '../../queryEditor/iotSiteWiseQueryEditor/modeledDataStreamQueryEditor/types';

export class ModeledDataStreamCacheKeyFactory {
  public create(selectedAsset: SelectedAsset) {
    const cacheKey = [{ resource: 'modeled data stream', selectedAsset }] as const;

    return cacheKey;
  }
}
