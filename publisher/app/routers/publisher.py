import json

from app.core.gateways.kafka import Kafka
from app.core.models.message import Message
from app.dependencies.kafka import get_kafka_instance

from fastapi import APIRouter, Depends

router = APIRouter()


@router.post("")
async def send(data: Message, server: Kafka = Depends(get_kafka_instance)):
    try:
        topic_name1 = server._topic1
        topic_name2 = server._topic2
        await server.aioproducer.send_and_wait(topic_name1, json.dumps(data.dict()).encode("ascii"))
        await server.aioproducer.send_and_wait(topic_name2, json.dumps(data.dict()).encode("ascii"))
    except Exception as e:
        await server.aioproducer.stop()
        raise e
    return 'Message sent successfully'
