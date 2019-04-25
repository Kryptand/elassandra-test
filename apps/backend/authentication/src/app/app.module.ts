import { Module } from '@nestjs/common';
import { TripsModule } from './trips/trips.module';
import {
  ExpressCassandraModule,
  ExpressCassandraModuleOptions,
  auth
} from '@iaminfinity/express-cassandra';
0;
const cassandraOptions: ExpressCassandraModuleOptions = {
  clientOptions: {
    contactPoints: ['localhost'],
    keyspace: 'kryptand',
    protocolOptions: {
      port: 9042
    },
    elasticsearch: {
      host: 'localhost:9200',
      sniffOnStart: false
    }
  },
  ormOptions: {
    createKeyspace: true,
    defaultReplicationStrategy: {
      class: 'NetworkTopologyStrategy',
      DC1: 1
    },
    migration: 'alter',
    manageESIndex: true
  }
};
@Module({
  imports: [TripsModule, ExpressCassandraModule.forRoot(cassandraOptions)],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor() {}
}
