import logging
from json import loads
from app.enum import EnvironmentVariables as EnvVariables

import firebase_admin
from firebase_admin import credentials
from kafka import KafkaConsumer
from firebase_admin import firestore

cred = credentials.Certificate({
  "type": "service_account",
  "project_id": "distribuidos-1-2022",
  "private_key_id": "d463e31d3648ceab3f681bf9a0d0fb9e266f3011",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMyozWD18NuMUf\nDndjkiPI4ZQ/9G6UiS7s/IFjZWhDlsBkTxq9TkjhA3OjkHF/ksVjD0Xnd/g4SbX7\n0s8OtFYOM4qOGBODo6S6C1xslZzh+yoyQ+YTqT8OkdMRLi28clBRMpHr6toJIEkG\nH9wQIqxj2aLWPwqV8d/WVIuzBxoC73Qz5o+w9HGeZTTPn2CoItIA9xIe4tcYsY8Y\nHHQN50eS+kqKmxPk0DOlIbUOH98br7qqp0Lwz5Q2076dm5dlRxZLQJd4683edh/F\nB/5FgCgvx8bDMFIaPqgv/eORUq8JxJ7iHPhOPVV25xXNPCtsh1fd6GMV0OM8BU5d\nv/oQCmnbAgMBAAECggEAFMsgzsf5ZW4/FW2js13U5tPDe0iaAQUGcbN/VpNBDrkX\n6W4HcyMPP3BXkWDWv8feWtmEHQIKc8xrJ2nvRmra9NZRkIKSIJSNfSQKvpzAIrNf\nfDSr/oZgt5b7lyN8rMLYsDf+9jAQNgiB0HjpyFZJTfv0K/P77RZf1T3/s0K0FEUE\n2sa5VgS709W1TZJaXtCiscW477R+DUzF+PynGBR8Y8hSpmV0LtT0MKlGny3h39+/\n8MjTEb03nbMhMuJaPVu1Dl+P5a4PBgW9z11ddT3vzP8+NE+qaYIJTBfpnXPZQxM3\naAMaw7ZfPjFkByBLu6WwYCw81MwtD7ED0f8+abqOjQKBgQDEwVxMheQ8LATWxQw9\nTjndZW0wl0eIJ67MlqvaHHa5bSF0fQtAaTBRhvzJJZjqapyVEZLWMJGHFo0hQfpQ\nsnpUhLdUMwrgNTmgysdBxEemHs1lHMGvfIUUby2cXu0+D2LhvGYNESTl6SzWCS4G\nfM1MFFDnSMQ32PZjyxO/mc5cDwKBgQC3L0QfSwvtnXbwAybdFzBdyX/kIMSLLvv/\n133HhoTuJiVC02BsfTQUEBQy06+DZZ0gBVTE6mBNNE3a/vUQ+vGvkEYaTVn8ohsX\nbJpdy0eMH3iAHzDfNseYe+n4xqr26UHFmJNvbLC/8TpWiH9tW8aL+nzarOjusXaH\nORgeaxU5dQKBgQCQvf58fPMOIQPeS09ZujZvXLIa0O9ahnbdIuqBpfbhKhs2atbg\nJ4HYOAm2n+YCbTOLpkXzM/+a9UgVc0gGHYZIrul/E52omv8t/n7fLtnWp0pKXAFQ\na7Yq9i8DngHBaehAUCxy6G3QhNzrCA3Hz//nO/rYanuO6hk4CKkahrd8mQKBgAZj\nwa6NwZbCPVnV4k8n9envk2RzuCdatjOQYrTI/m4IKpiQIvblzyE8BlhXhfHBY5+w\nT+qmekF3J5gR+J5lAnUrRSa5t//V77f7c879vjsnBd8CN4Qxtvicqeahl2kRbdfk\noI/sbKXlVjGahUddQimzzRMboOxiiE3jMfItrgnZAoGADPaYZxu5BdK5QOprIawH\nrdDp/RIz+fejXI5z5PY5yk6XI9sf4N01A1rPI4VEWGDdfgfeE5NzVtRtdRDElKVP\nTTYDc6z0sxSe5Ib871zMJfWlRHk9Sr1+iVl4SBsznBhoVXKSTdf6rjo1qqc1dQ1h\njt+9EP0gIxRgXX0BwYJMoiE=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-udnhr@distribuidos-1-2022.iam.gserviceaccount.com",
  "client_id": "107175995894386259779",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-udnhr%40distribuidos-1-2022.iam.gserviceaccount.com"
})
firebase_admin.initialize_app(cred)

db = firestore.client()


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
            # Calculate the stats of the pokemon
            mean = sum(stat['base_stat'] for stat in pokemon['stats']) / len(pokemon['stats'])
            maxStat = max(stat['base_stat'] for stat in pokemon['stats'])
            minStat = min(stat['base_stat'] for stat in pokemon['stats'])
            # Print the stats
            db.collection('poke_stats').add({"name": name, "stats": {'mean': mean, 'max': maxStat, 'min': minStat}, "id": id, "key": message.key})
            print(f'Pokemon {name} ({id}) has the following stats: mean: {mean}, max: {maxStat}, min: {minStat}')


    except Exception as e:
        logging.info('Connection successful', e)
