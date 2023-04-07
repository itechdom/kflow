# from src import app
# app.run()
from src import getMostUniqueWords
import json

mat = getMostUniqueWords()
f = open("wiki-res.json", "w")
f.write(json.dumps(mat))
f.close()
