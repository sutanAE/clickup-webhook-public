'''
Clickup WebHook SDK

create a "./config.json" with these schema
{
    "apiKey" : "string",
    "teamId" : "number",
    "spaceId" : "number",
    "endpoint" : "string",
    "secret": "string" // this is where the WebHook secret is stored. Optional.
}
'''



import requests
import json

with open("./config.json", "r") as f:
    config = json.load(f)
    apiKey = config['apiKey']
    teamId = config['teamId']
    spaceId = config['spaceId']
    endpoint = config['endpoint']


def obtainWebhook(teamId):
    url = f"https://api.clickup.com/api/v2/team/{teamId}/webhook"

    headers = {"Authorization": apiKey}

    response = requests.get(url, headers=headers)

    data = response.json()
    return data

def createWebhook(teamId, payload):
    url = f"https://api.clickup.com/api/v2/team/{teamId}/webhook"
    headers = {
        "Content-Type": "application/json",
        "Authorization": apiKey
    }
    response = requests.post(url, json=payload, headers=headers)
    data = response.json()

    return data

def deleteWebhook(teamId, id):
    url = "https://api.clickup.com/api/v2/webhook/" + id 
    headers = {"Authorization": apiKey}
    response = requests.delete(url, headers=headers)
    data = response.json()
    return data

def main():
    print(apiKey)
    data = obtainWebhook(teamId)
    # data = createWebhook(teamId, payload = {"endpoint": endpoint,"events": ["taskStatusUpdated"],"space_id": spaceId})
    # data = deleteWebhook(teamId, "92b81933-70bf-4ea7-a28c-eaea4a5e312c")
    print(data)

    return 0 

if __name__ =='__main__':
    main()