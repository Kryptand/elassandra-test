import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { TripsService } from './trips.service';
import { TripEntity } from './models/trip.entity';
import { ParseUuidPipe } from './pipes/parse-uuid.pipe';

@Controller('Trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async create(@Body() createTripDto: CreateTripDto) {
    return this.tripsService.create(createTripDto);
  }

  @Get()
  async findAll(): Promise<TripEntity[]> {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUuidPipe()) id) {
    return this.tripsService.findById(id);
  }
}
