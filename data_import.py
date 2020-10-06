import urllib.request, json 
data = urllib.request.urlopen("https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev").read()
output = json.loads(data)
print (output)
f = open("data.json","wb")
f.write(data)
f.close()