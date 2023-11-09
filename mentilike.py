import requests
import time

id = input("enter menti code: ").replace(" ", "")
voteKey = requests.get(f"http://localhost:3000/menti/{id}").json()["voteKey"]

color = int(input("enter color code: "))

run = True
print("starting spamming!!1")
while(run):
    try:
        url = f"https://www.menti.com/core/audience/reactions/{voteKey}/publish"

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/119.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        }

        data = {
            "emoji": "thumbsup",
            "color": f"theme-fill-color-{color}",
            "vote_key": voteKey,
            "amount": 10
        }

        response = requests.post(url, headers=headers, json=data)
        if(response.status_code >= 400):
            raise RuntimeError(response)
        
        time.sleep(1)
    except KeyboardInterrupt:
        run = False
    except Exception as e:
        print("ono something got fucked up")
        print(e)

print("tankx fur using emoji spamer 3000!!1")
