import { Injectable } from '@nestjs/common';
import {
  BaseModel,
  InjectModel,
  uuid,
  InjectConnection,
  DataType,
  types
} from '@iaminfinity/express-cassandra';
import { TripEntity } from './models/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { isNullOrUndefined, isNull } from 'util';

export interface SearchModel {
  field: string;
  paginationOptions: {
    skip: number;
    take: number;
  };
  sortingOptions: {
    direction: 'asc' | 'desc';
    field: string;
  };
  query: string;
}

@Injectable()
export class TripsService {
  constructor(
    @InjectConnection()
    private readonly connection: any,
    @InjectModel(TripEntity)
    private readonly tripModel: BaseModel<TripEntity>
  ) {}

  async create(createCatDto: CreateTripDto): Promise<TripEntity> {
    const cat = new this.tripModel(createCatDto);
    cat.started_at = types.LocalDate.fromDate(new Date(cat.started_at));
    cat.finished_at = types.LocalDate.fromDate(new Date(cat.finished_at));

    return await cat.saveAsync();
  }

  async findAll(): Promise<TripEntity[]> {
    return await this.tripModel.findAsync({}, { raw: true });
  }

  async findById(id): Promise<TripEntity> {
    if (typeof id === 'string') {
      id = uuid(id);
    }
    return await this.tripModel.findOneAsync({ id }, { raw: true });
  }
  async findByPredicate(model: SearchModel) {
    let startingPoint;
    if (
      !isNullOrUndefined(model.paginationOptions) &&
      !isNullOrUndefined(model.paginationOptions.skip) &&
      !isNullOrUndefined(model.paginationOptions.take)
    ) {
      startingPoint =
        (model.paginationOptions.skip - 1) * model.paginationOptions.take;
    }

    return await this.tripModel.search({
      from: startingPoint || 0,
      size: model.paginationOptions.take || 20,
      q: model.query
    });
  }
}
