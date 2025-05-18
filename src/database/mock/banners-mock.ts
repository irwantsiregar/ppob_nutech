import { bannersQuery } from '../../queries/banners.query';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const banners = require('../seeder/banners.json');

const bannersMock = async () => {
  try {
    for (const banner of banners) {
      const result = await bannersQuery.addBanner(banner);

      console.log(`Banner ${result.banner_name} created.`);
    }

    console.log('Seeding banners complete..');
  } catch (error) {
    console.error(`Seeding banners failed:`, error);
  } finally {
    console.log('Finally banners process!');
  }
};

export default bannersMock;
