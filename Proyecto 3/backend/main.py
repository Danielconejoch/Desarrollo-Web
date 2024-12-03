from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import tensorflow as tf
import pickle

app = FastAPI()

# Configuración de CORS para permitir solicitudes del frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Carga del modelo
model = tf.keras.models.load_model('taylor_swift.keras')
model.compile()

# Carga de los diccionarios char2idx y idx2char
with open('char2idx.pkl', 'rb') as f:
    char2idx = pickle.load(f)

with open('idx2char.pkl', 'rb') as f:
    idx2char = pickle.load(f)


# Definición de los modelos de datos para las solicitudes y respuestas
class Message(BaseModel):
    start_string: str

class RequestData(BaseModel):
    model: str
    messages: List[Message]
    temperature: float = 1.0


class ResponseData(BaseModel):
    response: str


# Función para generar texto a partir del modelo
def generate_text(model, start_string, temperature=1.0):
    num_generate = 300

    # Vectorización del texto de entrada
    input_eval = [char2idx.get(s, 0) for s in start_string]
    input_eval = tf.expand_dims(input_eval, 0)

    text_generated = []

    # Generar texto carácter por carácter
    for _ in range(num_generate):
        predictions = model(input_eval)
        predictions = tf.squeeze(predictions, 0)

        # Aplicar la temperatura para ajustar la aleatoriedad
        predictions = predictions / temperature
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1, 0].numpy()

        # Actualizar el input_eval con el carácter predicho
        input_eval = tf.expand_dims([predicted_id], 0)
        text_generated.append(idx2char[predicted_id])

    # Devuelve el texto generado
    return start_string + ''.join(text_generated)


@app.post("/generate_text", response_model=ResponseData)
async def generate_text_endpoint(request_data: RequestData):
    start_string = request_data.messages[0].start_string
    temperature = request_data.temperature

    # Genera el texto utilizando la función
    response_text = generate_text(model, start_string, temperature)

    return {"response": response_text}
