import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => console.log('Data source has been initialized'))
  .catch((error) => console.error('Error during data source initialization', error));

export { dataSource };
