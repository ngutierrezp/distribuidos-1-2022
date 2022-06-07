import time

from app.core.gateways.kafka import Kafka
from app.dependencies.kafka import get_kafka_instance
from app.enum import EnvironmentVariables
from app.routers import publisher


from dotenv import load_dotenv

from fastapi import Depends, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


app = FastAPI(title='Kafka Publisher Poke API')
origins = [
    "http://10.1.0.5",
    "http://20.197.232.133",
    "http://20.197.232.133:8000",
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

kafka_server = Kafka(
    topic1=EnvironmentVariables.KAFKA_TOPIC_NAME.get_env(),
    topic2=EnvironmentVariables.KAFKA_TOPIC_NAME_2.get_env(),
    port=EnvironmentVariables.KAFKA_PORT.get_env(),
    servers=EnvironmentVariables.KAFKA_SERVER.get_env(),
)


@app.on_event("startup")
async def startup_event():
    await kafka_server.aioproducer.start()


@app.on_event("shutdown")
async def shutdown_event():
    await kafka_server.aioproducer.stop()


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


@app.get('/')
def get_root():
    return {'message': 'API is running...'}


app.include_router(
    publisher.router,
    prefix="/producer",
    tags=["producer"],
    dependencies=[Depends(get_kafka_instance)],
)
