from pydantic import BaseModel
from typing import Optional

class userUpdate(BaseModel):
  name: Optional[str] = None