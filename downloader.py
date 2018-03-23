from pytube import YouTube
import csv
import sys
def main(file):

    with open(file, 'r') as f:
        cr = csv.reader(f)
        for row in cr:
            print(row[0])
            print('donwloading {}'.format(row[0]))
            out = YouTube('https://www.youtube.com{}'.format(row[0]))\
                .streams\
                .filter(file_extension='mp4').first().download()

if (len(sys.argv) > 1):
    main(sys.argv[1])
else:
    print('usage: {} file.txt'.format(sys.argv[0]))
