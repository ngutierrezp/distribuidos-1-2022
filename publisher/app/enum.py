import os
from enum import Enum


class EnvironmentVariables(str, Enum):
    KAFKA_TOPIC_NAME = 'KAFKA_TOPIC_NAME'
    KAFKA_TOPIC_NAME_2 = 'KAFKA_TOPIC_NAME_2'
    KAFKA_SERVER = 'KAFKA_SERVER'
    KAFKA_PORT = 'KAFKA_PORT'

    def get_env(self, variable=None):
        return os.environ.get(self, variable)
