import os
import shutil
import zipfile
import cv2
import numpy as np
from PIL import Image

def create_package():
    base_dir = 'Logos_Redes_Sociales'
    folder_png = os.path.join(base_dir, '1_Para_Superponer_en_Fotos_(PNG_Sin_Fondo)')
    folder_pfp = os.path.join(base_dir, '2_Fotos_de_Perfil_y_Avatares_(Instagram_y_WhatsApp)')
    folder_banner = os.path.join(base_dir, '3_Banners_y_Portadas_(Horizontal)')

    os.makedirs(folder_png, exist_ok=True)
    os.makedirs(folder_pfp, exist_ok=True)
    os.makedirs(folder_banner, exist_ok=True)

    print("--- 1. Generating Profile Pictures & Avatars (JPG) ---")
    pfp_sources = [
        ('logos/logo completo fondo verde.jfif', 'Avatar_Verde_Bosque_Logo_Principal.jpg'),
        ('logo/03_sello_badge_circular.jpg', 'Avatar_Verde_Sello_Circular.jpg'),
        ('logo/02_logo_fondo_claro_crema.jpg', 'Avatar_Crema_Lujo_Fondo_Claro.jpg'),
        ('logo/04_isotipo_minimalista_mg.jpg', 'Avatar_Verde_Monograma_Minimalista_MG.jpg'),
        ('logo/05_app_icon_favicon.jpg', 'Avatar_App_Icon_3D_Lujo.jpg'),
        ('logo/06_logo_positivo_negro_sobre_blanco.jpg', 'Avatar_Blanco_Minimalista_Negro_Sobre_Blanco.jpg'),
        ('logo/07_logo_negativo_blanco_sobre_negro.jpg', 'Avatar_Negro_Elegante_Blanco_Sobre_Negro.jpg'),
    ]
    for src, dst_name in pfp_sources:
        if os.path.exists(src):
            img = Image.open(src)
            # Ensure high quality RGB JPG
            img = img.convert('RGB')
            dst_path = os.path.join(folder_pfp, dst_name)
            img.save(dst_path, 'JPEG', quality=98)
            print(f"Saved: {dst_name}")

    print("--- 2. Generating Banners and Mockups (JPG) ---")
    banner_sources = [
        ('logo/01_isologo_horizontal_verde.jpg', 'Banner_Horizontal_Verde_Bosque_HD.jpg'),
        ('logo/08_mockup_papeleria_lujo.jpg', 'Mockup_Presentacion_Tarjetas_y_Packaging.jpg'),
    ]
    for src, dst_name in banner_sources:
        if os.path.exists(src):
            img = Image.open(src).convert('RGB')
            dst_path = os.path.join(folder_banner, dst_name)
            img.save(dst_path, 'JPEG', quality=98)
            print(f"Saved: {dst_name}")

    print("--- 3. Generating Transparent PNGs (Sin Fondo) ---")
    # Load transparent master
    master_path = 'public/assets/logos/logo_master_transparent.png'
    master_cv = cv2.imread(master_path, cv2.IMREAD_UNCHANGED) # BGRA
    h, w = master_cv.shape[:2]
    alpha = master_cv[:, :, 3].astype(np.float32) / 255.0

    # Crop bounding box of visible content
    ys, xs = np.where(master_cv[:, :, 3] > 10)
    y_min, y_max = np.min(ys), np.max(ys)
    x_min, x_max = np.min(xs), np.max(xs)
    
    pad = 60
    y0, y1 = max(0, y_min - pad), min(h, y_max + pad)
    x0, x1 = max(0, x_min - pad), min(w, x_max + pad)
    
    cropped_master = master_cv[y0:y1, x0:x1]
    cropped_alpha = alpha[y0:y1, x0:x1]
    
    # A. Logo Principal Original Sin Fondo
    cv2.imwrite(os.path.join(folder_png, 'Logo_Principal_Original_Sin_Fondo.png'), cropped_master)
    print("Saved: Logo_Principal_Original_Sin_Fondo.png")

    # B. Logo Principal 100% Blanco Sin Fondo
    white_img = np.zeros_like(cropped_master)
    white_img[:, :, :3] = 255
    white_img[:, :, 3] = (cropped_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Logo_Principal_Blanco_Sin_Fondo.png'), white_img)
    print("Saved: Logo_Principal_Blanco_Sin_Fondo.png")

    # C. Logo Principal 100% Negro Sin Fondo
    black_img = np.zeros_like(cropped_master)
    black_img[:, :, :3] = 0
    black_img[:, :, 3] = (cropped_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Logo_Principal_Negro_Sin_Fondo.png'), black_img)
    print("Saved: Logo_Principal_Negro_Sin_Fondo.png")

    # D. Logo Principal Oro Rosa Sin Fondo (#B5917C -> BGR: 124, 145, 181)
    rg_img = np.zeros_like(cropped_master)
    rg_img[:, :, 0] = 124 # B
    rg_img[:, :, 1] = 145 # G
    rg_img[:, :, 2] = 181 # R
    rg_img[:, :, 3] = (cropped_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Logo_Principal_Oro_Rosa_Sin_Fondo.png'), rg_img)
    print("Saved: Logo_Principal_Oro_Rosa_Sin_Fondo.png")

    # E. Marcas de agua discretas (35% y 50%)
    wm_w_35 = np.zeros_like(cropped_master)
    wm_w_35[:, :, :3] = 255
    wm_w_35[:, :, 3] = (cropped_alpha * 255 * 0.35).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Marca_de_Agua_Blanca_Discreta_35pct.png'), wm_w_35)

    wm_k_35 = np.zeros_like(cropped_master)
    wm_k_35[:, :, :3] = 0
    wm_k_35[:, :, 3] = (cropped_alpha * 255 * 0.35).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Marca_de_Agua_Negra_Discreta_35pct.png'), wm_k_35)
    print("Saved: Watermarks 35%")

    # F. Isotipo / Símbolo Solo (Cropped Symbol)
    # y < 1110 in original coordinates
    sym_mask = np.zeros((h, w), dtype=bool)
    sym_mask[620:1105, 680:1370] = True
    sym_cropped_cv = master_cv[620:1105, 680:1370]
    sym_alpha = alpha[620:1105, 680:1370]
    
    cv2.imwrite(os.path.join(folder_png, 'Isotipo_Simbolo_Solo_Original_Sin_Fondo.png'), sym_cropped_cv)
    
    sym_white = np.zeros_like(sym_cropped_cv)
    sym_white[:, :, :3] = 255
    sym_white[:, :, 3] = (sym_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Isotipo_Simbolo_Solo_Blanco_Sin_Fondo.png'), sym_white)

    sym_rg = np.zeros_like(sym_cropped_cv)
    sym_rg[:, :, 0] = 124
    sym_rg[:, :, 1] = 145
    sym_rg[:, :, 2] = 181
    sym_rg[:, :, 3] = (sym_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Isotipo_Simbolo_Solo_Oro_Rosa_Sin_Fondo.png'), sym_rg)

    sym_black = np.zeros_like(sym_cropped_cv)
    sym_black[:, :, :3] = 0
    sym_black[:, :, 3] = (sym_alpha * 255).astype(np.uint8)
    cv2.imwrite(os.path.join(folder_png, 'Isotipo_Simbolo_Solo_Negro_Sin_Fondo.png'), sym_black)
    print("Saved: Isotipos solo símbolo (Original, Blanco, Oro Rosa, Negro)")

    # G. Monograma MG Minimalista Sin Fondo (from minimal render)
    mini_src = 'logo/04_isotipo_minimalista_mg.jpg'
    if os.path.exists(mini_src):
        m_img = cv2.imread(mini_src)
        m_bg = np.array([43, 59, 25], dtype=np.float32)
        m_diff = np.linalg.norm(m_img.astype(np.float32) - m_bg, axis=2)
        m_alpha = np.clip((m_diff - 15.0) / (40.0 - 15.0), 0.0, 1.0)
        
        # Crop tight
        m_ys, m_xs = np.where(m_alpha > 0.05)
        m_y0, m_y1 = max(0, np.min(m_ys) - 40), min(m_img.shape[0], np.max(m_ys) + 40)
        m_x0, m_x1 = max(0, np.min(m_xs) - 40), min(m_img.shape[1], np.max(m_xs) + 40)
        
        m_crop_alpha = m_alpha[m_y0:m_y1, m_x0:m_x1]
        
        m_white = np.zeros((m_y1-m_y0, m_x1-m_x0, 4), dtype=np.uint8)
        m_white[:, :, :3] = 255
        m_white[:, :, 3] = (m_crop_alpha * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(folder_png, 'Monograma_MG_Minimalista_Blanco_Sin_Fondo.png'), m_white)

        m_rg = np.zeros((m_y1-m_y0, m_x1-m_x0, 4), dtype=np.uint8)
        m_rg[:, :, 0] = 124
        m_rg[:, :, 1] = 145
        m_rg[:, :, 2] = 181
        m_rg[:, :, 3] = (m_crop_alpha * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(folder_png, 'Monograma_MG_Minimalista_Oro_Rosa_Sin_Fondo.png'), m_rg)
        print("Saved: Monograma MG Minimalista (Blanco y Oro Rosa)")

    # H. Sello Circular Sticker Sin Fondo
    badge_src = 'logo/03_sello_badge_circular.jpg'
    if os.path.exists(badge_src):
        b_img = cv2.imread(badge_src)
        bh, bw = b_img.shape[:2]
        bcx, bcy = bw // 2, bh // 2
        br = int(min(bh, bw) * 0.465)
        
        b_rgba = cv2.cvtColor(b_img, cv2.COLOR_BGR2BGRA)
        Y, X = np.ogrid[:bh, :bw]
        dist_c = np.sqrt((X - bcx)**2 + (Y - bcy)**2)
        b_rgba[dist_c > br, 3] = 0
        
        # Feather border
        feather = np.clip((br - dist_c) / 2.0, 0.0, 1.0)
        b_rgba[:, :, 3] = (b_rgba[:, :, 3].astype(np.float32) * feather).astype(np.uint8)
        
        # Crop tight circle
        b_crop = b_rgba[bcy - br - 10 : bcy + br + 10, bcx - br - 10 : bcx + br + 10]
        cv2.imwrite(os.path.join(folder_png, 'Sello_Circular_Sticker_Sin_Fondo.png'), b_crop)
        print("Saved: Sello_Circular_Sticker_Sin_Fondo.png")

    # I. Logo Horizontal Transparente (Blanco y Oro Rosa)
    horiz_src = 'logo/01_isologo_horizontal_verde.jpg'
    if os.path.exists(horiz_src):
        h_img = cv2.imread(horiz_src)
        h_bg = np.array([43, 59, 25], dtype=np.float32)
        h_diff = np.linalg.norm(h_img.astype(np.float32) - h_bg, axis=2)
        h_alpha = np.clip((h_diff - 15.0) / (40.0 - 15.0), 0.0, 1.0)
        
        h_ys, h_xs = np.where(h_alpha > 0.05)
        h_y0, h_y1 = max(0, np.min(h_ys) - 30), min(h_img.shape[0], np.max(h_ys) + 30)
        h_x0, h_x1 = max(0, np.min(h_xs) - 40), min(h_img.shape[1], np.max(h_xs) + 40)
        
        h_crop_alpha = h_alpha[h_y0:h_y1, h_x0:h_x1]
        
        # White
        h_white = np.zeros((h_y1-h_y0, h_x1-h_x0, 4), dtype=np.uint8)
        h_white[:, :, :3] = 255
        h_white[:, :, 3] = (h_crop_alpha * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(folder_png, 'Logo_Horizontal_Blanco_Sin_Fondo.png'), h_white)

        # Rose gold
        h_rg = np.zeros((h_y1-h_y0, h_x1-h_x0, 4), dtype=np.uint8)
        h_rg[:, :, 0] = 124
        h_rg[:, :, 1] = 145
        h_rg[:, :, 2] = 181
        h_rg[:, :, 3] = (h_crop_alpha * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(folder_png, 'Logo_Horizontal_Oro_Rosa_Sin_Fondo.png'), h_rg)

        # Black
        h_black = np.zeros((h_y1-h_y0, h_x1-h_x0, 4), dtype=np.uint8)
        h_black[:, :, :3] = 0
        h_black[:, :, 3] = (h_crop_alpha * 255).astype(np.uint8)
        cv2.imwrite(os.path.join(folder_png, 'Logo_Horizontal_Negro_Sin_Fondo.png'), h_black)
        print("Saved: Logo Horizontal Sin Fondo (Blanco, Oro Rosa, Negro)")

    # 4. Generate user-friendly instructions guide
    guide_text = '''============================================================
✨ GUÍA RÁPIDA DE USO - LOGOS MORENA GARNICA MAKE-UP ARTIST ✨
============================================================

¡Hola More! Tenés acá organizado todo tu pack de identidad visual
en formatos PNG (sin fondo) y JPG (en alta definición) listo para
usar en tu celular, Canva, CapCut, Instagram y WhatsApp.

------------------------------------------------------------
📁 1. CARPETA: "1_Para_Superponer_en_Fotos_(PNG_Sin_Fondo)"
------------------------------------------------------------
Son archivos PNG con fondo transparente. Son los que pegás sobre
tus fotos o videos de clientas/maquillajes.

• "Logo_Principal_Blanco_Sin_Fondo.png":
  👉 El más recomendado para fotos con fondos oscuros, pelo negro
     o fotos de noche en el salón/evento. Resalta perfecto.

• "Logo_Principal_Negro_Sin_Fondo.png":
  👉 Para fotos muy iluminadas, fondos blancos o muy claros.

• "Logo_Principal_Oro_Rosa_Sin_Fondo.png":
  👉 Acento de lujo en color cobre/oro rosa cálido de tu marca.

• "Logo_Horizontal_Blanco_Sin_Fondo.png":
  👉 Ideal para poner en una esquina inferior o superior de un Reel,
     video de TikTok o historia horizontal/panorámica.

• "Sello_Circular_Sticker_Sin_Fondo.png":
  👉 Es un sticker circular redondo con fondo transparente afuera.
     Queda hermoso en una esquina de tus fotos como un "sello de garantía".

• "Marca_de_Agua_Blanca_Discreta_35pct.png":
  👉 Es semi-transparente (35% de visibilidad). Ideal si querés
     proteger tu trabajo sin que el logo tape los detalles del maquillaje.

• "Monograma_MG_Minimalista_Blanco_Sin_Fondo.png":
  👉 Iniciales MG solas, súper sutiles y delicadas para reels rápidos.

------------------------------------------------------------
📁 2. CARPETA: "2_Fotos_de_Perfil_y_Avatares_(Instagram_y_WhatsApp)"
------------------------------------------------------------
Son imágenes cuadradas en ultra alta resolución (2048 x 2048 px),
diseñadas para que al ponerlas de foto de perfil queden perfectas y
centradas dentro del círculo de Instagram y WhatsApp:

• "Avatar_Verde_Bosque_Logo_Principal.jpg":
  👉 El perfil oficial de la marca: verde bosque profundo con tu logo completo.

• "Avatar_Verde_Sello_Circular.jpg":
  👉 Tu sello redondo en dorado y crema. Queda impecable como avatar.

• "Avatar_Crema_Lujo_Fondo_Claro.jpg":
  👉 Si preferís un perfil con fondo claro, marfil y súper luminoso.

• "Avatar_Verde_Monograma_Minimalista_MG.jpg":
  👉 Versión moderna y limpia con solo las letras MG.

• "Avatar_App_Icon_3D_Lujo.jpg":
  👉 Ícono con bordes redondeados y relieve estético de maquillaje.

------------------------------------------------------------
📁 3. CARPETA: "3_Banners_y_Portadas_(Horizontal)"
------------------------------------------------------------
• "Banner_Horizontal_Verde_Bosque_HD.jpg":
  👉 Formato 16:9 de alta definición para portada de Facebook, YouTube,
     encabezado de tu web o historias destacadas.

• "Mockup_Presentacion_Tarjetas_y_Packaging.jpg":
  👉 Foto de presentación de lujo mostrando tarjetas en verde y packaging
     en crema con el sello dorado. ¡Queda genial para postear en tu feed!

------------------------------------------------------------
💡 TIP PARA USARLOS DESDE EL CELULAR (iPhone o Android):
1. Podés guardarte los PNG transparentes en los favoritos de tu galería.
2. Al subir una historia a Instagram, tocás el ícono de "Stickers" ->
   "Pegar foto" (+) y elegís el PNG sin fondo para ponerlo encima de tu foto.
3. O abrí Canva / CapCut y agregalos como "Superposición" / "Capa".
============================================================
'''
    guide_path = os.path.join(base_dir, 'GUIA_RAPIDA_DE_USO.txt')
    with open(guide_path, 'w', encoding='utf-8') as f:
        f.write(guide_text)
    print("Saved: GUIA_RAPIDA_DE_USO.txt")

    # 5. Create a ZIP file for easy one-click download/sharing
    zip_filename = 'Logos_Morena_Garnica_Redes.zip'
    with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, dirs, files in os.walk(base_dir):
            for file in files:
                full_p = os.path.join(root, file)
                rel_p = os.path.relpath(full_p, '.')
                z.write(full_p, rel_p)
    print(f"Created ZIP package: {zip_filename}")
    print("All tasks completed successfully!")

if __name__ == '__main__':
    create_package()
