import asyncio
from pyppeteer import launch
import bs4
import re
import time
import csv
import sys


async def main(query):
    print('will launch a browser')
    browser = await launch()
    page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36')
    print('visiting page')
    # query = 'web development tutorials'
    
    await page.goto('https://www.youtube.com/results?search_query={}'.format(query))
    await asyncio.sleep(5.0)
    html = await page.content()

    await browser.close()

    html = bs4.BeautifulSoup(html, 'html.parser')

    # divs = html.select('a')
    #
    reg = re.compile(r'/watch.*')

    def extract(x):
        try:
            return None != reg.match(x['href'])
        except Exception as e:
            return False

    rendrers = html.select('ytd-video-renderer')
    trending_list = []

    for item in rendrers:
        try:
            ahrefs = list(filter(extract, item.select('a')))
            ahrefs = list(map(lambda x: x['href'], ahrefs))
            _t = item.select('.ytd-thumbnail-overlay-time-status-renderer')
            _t = _t[0].get_text()

            hour = '0'
            if len(_t.split(':')) > 2 :
                hour = _t.split(':')[-3]

            min = _t.split(':')[-2]
            sec = _t.split(':')[-1]

            d  = {
                'h': ahrefs[0],
                'hour': hour.strip(),
                'min': min.strip(),
                'sec': sec.strip(),

            }
            trending_list.append(d)
        except Exception as e:
            print(e)
            # print(item)

    # trending_list = list(set(ahrefs))
#    with open('list.{}.txt'.format(time.time()), 'w') as f:
#        csvwriter = csv.writer(f)
#        for item in trending_list:
#            csvwriter.writerow(list(item.values()))


    with open('list.{}.txt'.format(query), 'w') as f:
        csvwriter = csv.writer(f)
        for item in trending_list:
            if int(item['hour']) == 0 and int(item['min']) < 10:
                csvwriter.writerow(list(item.values()))
if (len(sys.argv) > 1): 
    query = sys.argv[1]
    asyncio.get_event_loop().run_until_complete(main(query))

