import socket
import ipinfo
import geopy.distance
from geopy.geocoders import Nominatim
import urllib.request
import plotly.graph_objects as go

# Geolocator authentication
geolocator = Nominatim(user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36")

# ipinfo authentication
access_token = 'd06fb76a59e1a7'
handler = ipinfo.getHandler(access_token)

# Get local IP
external_ip = urllib.request.urlopen('https://ident.me').read().decode('utf8')
my_details = handler.getDetails(external_ip)
my_loc = geolocator.geocode(my_details.city + ',' + my_details.country_name)
coords_1 = (my_loc.latitude, my_loc.longitude)

first = True

while True:
    domain = input("What is the URL? ")

    ip = socket.gethostbyname(domain)
    print(f'IP address is {ip}')

    details = handler.getDetails(ip)
    print(f'Server location is in {details.city}, {details.region}, {details.country_name}')

    loc = geolocator.geocode(details.city + ',' + details.country_name)
    coords_2 = (loc.latitude, loc.longitude)

    print(f'{2 * round(geopy.distance.distance(coords_1, coords_2).km, 2)} Km')

    # map
    fig = go.Figure(go.Scattermapbox(
        mode="markers+lines",
        lon=[my_loc.longitude, loc.longitude],
        lat=[my_loc.latitude, loc.latitude],
        marker={'size': 10}))

    fig.update_layout(
        margin={'l': 0, 't': 0, 'b': 0, 'r': 0},
        mapbox={
            'center': {'lon': 10, 'lat': 10},
            'style': "stamen-terrain",
            'center': {'lon': -20, 'lat': -20},
            'zoom': 1})
    if first == True:
        fig.show()
    else:
        fig.update()
