import { AppDataSource } from '../database/data-source';
import { config } from 'dotenv';
config({ path: '.env.test' });

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});


beforeEach(async () => {
  // Reseta os dados antes de cada teste
  const entities = AppDataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);
    await repository.query(`DELETE FROM "${entity.tableName}";`);
  }

});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});