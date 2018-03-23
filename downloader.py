from pytube import YouTube
import csv
file = '/home/neo/PycharmProjects/asyncio/list_less_then_10.learn html and css.1521751239.998984.txt'

with open(file, 'r') as f:
    cr = csv.reader(f)
    for row in cr:
        print(row[0])
        print('donwloading {}'.format(row[0]))
        out = YouTube('https://www.youtube.com{}'.format(row[0]))\
            .streams\
            .filter(file_extension='mp4').first().download()