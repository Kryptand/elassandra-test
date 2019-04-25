import { Consumer, KafkaClient, ConsumerOptions } from 'kafka-node';
import { isNullOrUndefined } from 'util';

export function kafkaConsumerFactory(
  client: KafkaClient,
  topics: any,
  consumerOptions: ConsumerOptions
): Consumer {
  if (isNullOrUndefined(client)) {
    throw new Error('kafka-client is null or undefined');
  }
  if (isNullOrUndefined(topics)) {
    throw new Error('topics is either null or undefined');
  }
  if (isNullOrUndefined(consumerOptions)) {
    throw new Error('consumerOptions is either null or undefined');
  }
  return new Consumer(client, topics, consumerOptions);
}
