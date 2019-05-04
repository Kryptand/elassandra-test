import { Module } from '@nestjs/common';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { TripEntity } from './models/trip.entity';
import { TripsController } from './trip.controller';
import { TripsService } from './trips.service';

@Module({
  imports: [ExpressCassandraModule.forFeature([TripEntity])],
  controllers: [TripsController],
  providers: [TripsService]
})
export class TripsModule {}
