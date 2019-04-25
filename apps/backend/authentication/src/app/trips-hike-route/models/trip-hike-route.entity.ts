import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn
} from '@iaminfinity/express-cassandra';

@Entity<TripEntity>({
  table_name: 'trip',
  key: ['id'],
  es_index_mapping: {
    discover: '.*'
  }
})
export class TripEntity {
  @Column({
    type: 'uuid',
    default: { $db_function: 'uuid()' }
  })
  id: any;

  @Column({
    type: 'text'
  })
  title: string;

  @Column({
    type: 'date'
  })
  started_at: any;

  @Column({
    type: 'date'
  })
  finished_at: any;

  @Column({
    type: 'text'
  })
  tripType: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @VersionColumn()
  __v1: any;
}
