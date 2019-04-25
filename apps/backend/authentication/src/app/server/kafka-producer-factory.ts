import {
  ProducerOptions,
  KafkaClient,
  CustomPartitioner,
  Producer
} from 'kafka-node';
import { isNullOrUndefined } from 'util';

export function kafkaProducerFactory(
  client: KafkaClient,
  options?: ProducerOptions,
  customPartitioner?: CustomPartitioner
): Producer {
  if (isNullOrUndefined(client)) {
    throw new Error('kafka-client is either null or undefined');
  }
  const optionsExist = !isNullOrUndefined(options);
  const customPartitionerExists = !isNullOrUndefined(customPartitioner);
  if (optionsExist && customPartitionerExists) {
    return new Producer(client, options, customPartitioner);
  }

  if (optionsExist) {
    return new Producer(client, options);
  }
  if (customPartitionerExists) {
    return new Producer(client, undefined, customPartitioner);
  }
  return new Producer(client);
}
