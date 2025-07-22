// jest.config.ts
import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json'

const config: Config = {
 
   clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',


  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    "text-summary",
    "lcov",
  ],


  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>'}),


  preset: 'ts-jest',

  testMatch: [
    "**/*.spec.ts",
  ],
};

export default config;