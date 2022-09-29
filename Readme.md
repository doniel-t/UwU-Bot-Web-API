# UwU Bot API
Simple Express API for UwU Bot Services\
Currently Supports following commands:
1. ask\
   needs: ```content``` parameter
2. choose\
   needs: ```chooseArr``` parameter
3. cleverbot\
   needs: ```content``` parameter
4. uwufy\
   needs: ```content``` parameter\
5. textFromImageExtractor\
   needs: ```imageURL``` parameter\
6. translate\
   needs: ```content``` and ```language``` parameter\
   For language refer to https://www.w3schools.com/tags/ref_language_codes.asp for more info
\
An example call can be found below
```
curl --location --request POST 'localhost:6969/cleverbot' \
--header 'Content-Type: application/json' \
--data-raw '{
    "payload": {
        "content": "Hey! Do you know uwubot?"
    }
}'
```
A response could look like this
```
{
    "command": "cleverbot",
    "input": {
        "content": "Hey! Do you know uwubot?"
    },
    "response": "No..."
}
```