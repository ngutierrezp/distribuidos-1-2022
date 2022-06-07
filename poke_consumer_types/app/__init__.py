import logging
from json import loads

from app.enum import EnvironmentVariables as EnvVariables

from kafka import KafkaConsumer


def main():
    try:
        # To consume latest messages and auto-commit offsets
        consumer = KafkaConsumer(
            EnvVariables.KAFKA_TOPIC_NAME.get_env(),
            bootstrap_servers=f'{EnvVariables.KAFKA_SERVER.get_env()}:{EnvVariables.KAFKA_PORT.get_env()}',
            value_deserializer=lambda x: loads(x.decode('utf-8')),
            auto_offset_reset='earliest',
            enable_auto_commit=True,
        )
        for message in consumer:
            print("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                                 message.offset, message.key, message.value['id']))
            id = message.value['id']
            pokemon = message.value['pokemon']
            name = pokemon['name']
            # Show pokemon types
            types = [type['type']['name'] for type in pokemon['types']]
            print(f'Pokemon {name} ({id}) has the following types: {types}')

    except Exception as e:
        logging.info('Connection successful', e)
