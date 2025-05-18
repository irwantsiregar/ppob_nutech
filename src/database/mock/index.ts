import servicesMock from './services-mock';
import bannersMock from './banners-mock';

(async () => {
  await servicesMock();
  await bannersMock();
})();
