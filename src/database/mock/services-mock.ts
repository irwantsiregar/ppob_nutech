import { servicesQuery } from '../../queries/services.query';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const services = require('../seeder/services.json');

const servicesMock = async () => {
  try {
    for (const service of services) {
      const result = await servicesQuery.addService(service);

      console.log(`Service ${result.service_name} created.`);
    }

    console.log('Seeding services complete..');
  } catch (error) {
    console.error(`Seeding services failed:`, error);
  } finally {
    console.log('Finally services process!');
  }
};

export default servicesMock;
