import asyncio

from aiokafka import AIOKafkaProducer


class Kafka:
    instance = None

    def __init__(
        self,
        topic1,
        topic2,
        port,
        servers
    ) -> None:
        self._topic1 = topic1
        self._topic2 = topic2
        self._port = port
        self._servers = servers
        self.aioproducer = self.create_kafka()
        Kafka.instance = self

    def create_kafka(self):
        loop = asyncio.get_event_loop()
        return AIOKafkaProducer(
            loop=loop,
            bootstrap_servers=f'{self._servers}:{self._port}'
        )
