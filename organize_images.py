import cv2
import numpy as np
import os

def extract_and_save(img_path, prefix, min_area=40000):
    img = cv2.imread(img_path)
    if img is None: return 0
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    count = 0
    for cnt in sorted(contours, key=cv2.contourArea, reverse=True):
        x, y, w, h = cv2.boundingRect(cnt)
        if w * h > min_area and w < img.shape[1] * 0.95:
            roi = img[y:y+h, x:x+w]
            cv2.imwrite(f'public/assets/{prefix}_{count}.jpg', roi)
            count += 1
    return count

print("Extracting diplomas from page_8...")
extract_and_save('public/assets/page_8.png', 'real_diploma')

print("Extracting models from page_9...")
extract_and_save('public/assets/page_9.png', 'model_9')

print("Extracting models from page_10...")
extract_and_save('public/assets/page_10.png', 'model_10')

print("Extracting models from page_11...")
extract_and_save('public/assets/page_11.png', 'model_11')

print("Extracting working photos from page_5 and page_6...")
extract_and_save('public/assets/page_5.png', 'working_5')
extract_and_save('public/assets/page_6.png', 'working_6')
