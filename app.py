import eel.browsers
from selenium.common.exceptions import InvalidSessionIdException, WebDriverException
from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import random
import eel
import threading
from sys import exit
from urllib3.exceptions import MaxRetryError

url = 'https://www.nytimes.com/games/connections'

# open browser and start playing the game
driver = webdriver.Chrome()
driver.get(url)
time.sleep(0.5)
#remove the ad banner from the page
ad_box = driver.find_element(by=By.CLASS_NAME, value='pz-ad-box')
driver.execute_script("arguments[0].remove()", ad_box)

driver.find_element(by=By.CSS_SELECTOR, value='[data-testid="moment-btn-play"]').click()
words = list(map(lambda x: x.get_attribute('data-flip-id'), driver.find_elements(by=By.CSS_SELECTOR, value='[data-testid="card-label"]')))

running = True

@eel.expose
def get_words():
    random.shuffle(words)
    return words

def close_callback(a, b):
    driver.quit()
    exit()

def start_eel():
    eel.init('ui')
    eel.browsers.set_path('chromium', '/usr/bin/ungoogled-chromium')
    eel.start('app.html', size=(678, 665), mode='chromium', cmdline_args=['--kiosk', '--force-app-mode'], close_callback=close_callback)

eel_thread = threading.Thread(target=start_eel)
eel_thread.start()

print('eel started')
while running:
    try:
        _ = driver.window_handles
    except InvalidSessionIdException as e:
        eel.close_window()
        break
    except WebDriverException as e:
        eel.close_window()
        break
    except MaxRetryError as e:
        eel.close_window()
        break

eel_thread.join()
exit()