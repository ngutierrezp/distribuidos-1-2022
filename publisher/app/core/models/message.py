from typing import Optional

from pydantic import BaseModel

# Define the message model
# with the type of the message

# Atributes:
# - id: int
# - description: str (optional)
# - pokemon: object

class Message(BaseModel):
    id: int
    description: Optional[str] = None
    pokemon: object
