import cv2
import numpy as np
import os

in_dir = "public/assets"
out_dir = "public/assets/cropped"

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

count = 1

# Process pages 1 to 10
for i in range(1, 11):
    img_path = os.path.join(in_dir, f"page_{i}.png")
    if not os.path.exists(img_path):
        continue
        
    img = cv2.imread(img_path)
    if img is None:
        continue
        
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # The slides have a white/light background. We can threshold it.
    # Background is mostly white (255)
    _, thresh = cv2.threshold(gray, 240, 255, cv2.THRESH_BINARY_INV)
    
    # Find contours
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    # Sort contours by area, largest first
    contours = sorted(contours, key=cv2.contourArea, reverse=True)
    
    # Save the largest ones that are reasonably sized (e.g., area > 50000)
    for c in contours:
        x, y, w, h = cv2.boundingRect(c)
        area = w * h
        if area > 100000 and w > 200 and h > 200:
            # Crop
            cropped = img[y:y+h, x:x+w]
            out_path = os.path.join(out_dir, f"work_{count}.jpg")
            cv2.imwrite(out_path, cropped)
            count += 1
            print(f"Saved {out_path}")

print("Done cropping.")
