# UwU Bot API
An Express based Rest API written in TypeScript
---
This API is the endpoint for an UwU-Bot Discord bot inspired API which will be accessed via a Web Frontend.\
The best way to test this api is via postman or your preffered tool, however normal curl request can be found below\
\
Get all supported commands and their parameters: 
```
curl --location --request GET 'localhost:6969/commands'
```
Response will look like this: 
```
{
   "commandList": {
      "commandName1": {
         "param1": "Description of param1",
         "param2": "Description of param2"
      }
      "commandName2": {
         "param1": "Description of param1"
      }
   }
}
```

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