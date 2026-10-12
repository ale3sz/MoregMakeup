import os
import shutil
import cv2
import numpy as np
from PIL import Image

def build_brand():
    src_img_path = 'logos/logo completo fondo verde.jfif'
    if not os.path.exists(src_img_path):
        print(f"Error: {src_img_path} not found")
        return

    out_dir = 'public/assets/logos'
    os.makedirs(out_dir, exist_ok=True)
    
    # Brain directory where AI generations are stored
    brain_dir = r'C:/Users/aleja/.gemini/antigravity/brain/ecf59ed3-302c-4116-8258-c41dc825a0d0'
    
    # 1. Copy Nano Banana AI generations
    nb_copies = [
        ('badge_circular_logo_1791690812614.jpg', 'nanobanana_badge_circular.jpg'),
        ('logo_fondo_claro_1791690861770.jpg', 'nanobanana_logo_fondo_claro.jpg'),
        ('isotipo_minimalista_1791690915273.jpg', 'nanobanana_isotipo_minimalista.jpg'),
        ('app_icon_favicon_1791690967838.jpg', 'nanobanana_app_icon.jpg'),
        ('mockup_papeleria_lujo_1791691022188.jpg', 'nanobanana_mockup_papeleria.jpg'),
        ('isologo_horizontal_test_1791690615335.jpg', 'nanobanana_isologo_original.jpg'),
    ]
    for src_name, dst_name in nb_copies:
        s = os.path.join(brain_dir, src_name)
        if os.path.exists(s):
            shutil.copy2(s, os.path.join(out_dir, dst_name))
            print(f"Copied {dst_name}")

    # 2. Load master image
    img = cv2.imread(src_img_path)
    h, w = img.shape[:2] # 2048, 2048
    bg_bgr = np.array([43, 59, 25], dtype=np.float32) # #193B2B in BGR

    # Alpha matting & mask
    diff = np.linalg.norm(img.astype(np.float32) - bg_bgr, axis=2)
    
    # Soft alpha for high quality rendering
    alpha = np.clip((diff - 12.0) / (38.0 - 12.0), 0.0, 1.0)
    
    # Binary mask for contour tracing
    mask_bin = (diff > 35).astype(np.uint8) * 255
    mask_bin = cv2.GaussianBlur(mask_bin, (3, 3), 0)
    _, mask_thresh = cv2.threshold(mask_bin, 127, 255, cv2.THRESH_BINARY)
    
    contours, hierarchy = cv2.findContours(mask_thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)
    
    sym_cnts = []
    sym_mini_cnts = []
    title_cnts = []
    sub_cnts = []
    
    for cnt in contours:
        ys = cnt[:, :, 1]
        xs = cnt[:, :, 0]
        y_center = (np.min(ys) + np.max(ys)) / 2.0
        x_min, x_max = np.min(xs), np.max(xs)
        area = cv2.contourArea(cnt)
        
        if y_center < 1115:
            sym_cnts.append(cnt)
            # Minimalist monogram: letters M and G with swash (left of silhouette/brush)
            # Parts with x_min < 1135 and not the silhouette (y_min > 750 or swash)
            if x_min < 1135 and not (x_min > 1010 and np.min(ys) < 750):
                if area > 1000:
                    sym_mini_cnts.append(cnt)
        elif y_center < 1330:
            title_cnts.append(cnt)
        else:
            sub_cnts.append(cnt)
            
    # Sort title contours left-to-right
    title_cnts = sorted(title_cnts, key=lambda c: np.min(c[:, :, 0]))
    
    # "More G." contours: "More" is first 6 contours (0..5), "G" is contour 9, dot is period
    # Period dot created next to G
    g_cnt = title_cnts[9]
    g_x_max = np.max(g_cnt[:, :, 0])
    g_y_base = np.max(g_cnt[:, :, 1])
    
    # Create small circular dot for '.'
    dot_radius = 16
    dot_center_x = g_x_max + 45
    dot_center_y = g_y_base - 14
    dot_pts = []
    for deg in range(0, 360, 20):
        rad = np.radians(deg)
        dot_pts.append([[int(dot_center_x + dot_radius * np.cos(rad)), int(dot_center_y + dot_radius * np.sin(rad))]])
    dot_cnt = np.array(dot_pts, dtype=np.int32)
    
    abbrev_cnts = title_cnts[0:6] + [g_cnt, dot_cnt]

    def cnts_to_d(cnt_list, offset_x=0, offset_y=0, scale=1.0, approx_eps=0.4):
        d_parts = []
        for c in cnt_list:
            if len(c) < 3:
                continue
            approx = cv2.approxPolyDP(c, approx_eps, True)
            if len(approx) < 3:
                continue
            pts = approx.reshape(-1, 2)
            transformed = (pts * scale + np.array([offset_x, offset_y])).astype(int)
            d = f"M {transformed[0][0]} {transformed[0][1]} " + " ".join(f"L {p[0]} {p[1]}" for p in transformed[1:]) + " Z"
            d_parts.append(d)
        return " ".join(d_parts)

    # Color definitions
    C_FOREST = "#193B2B"
    C_ROSE_GOLD = "#B5917C"
    C_CREAM = "#EFEBD8"
    C_LIGHT_BG = "#FAF7F2"
    C_WHITE = "#FFFFFF"
    C_BLACK = "#000000"
    C_GRAY = "#666666"

    # SVG helper
    def write_svg(filename, width, height, elements, bg_color=None):
        lines = [
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">'
        ]
        if bg_color:
            lines.append(f'  <rect width="100%" height="100%" fill="{bg_color}"/>')
        for el in elements:
            fill = el.get('fill', '#000000')
            opacity = el.get('opacity', 1.0)
            d = el.get('d', '')
            op_str = f' opacity="{opacity}"' if opacity < 1.0 else ''
            lines.append(f'  <path fill="{fill}" fill-rule="evenodd"{op_str} d="{d}"/>')
        lines.append('</svg>')
        
        path = os.path.join(out_dir, filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines))
        print(f"Generated {filename}")

    # Contours strings in original 2048x2048 coords:
    d_sym = cnts_to_d(sym_cnts)
    d_sym_mini = cnts_to_d(sym_mini_cnts)
    d_title = cnts_to_d(title_cnts)
    d_sub = cnts_to_d(sub_cnts)

    # ==========================================
    # 1. ISOLOGO PRINCIPAL (VERTICAL / STACKED)
    # Bounding box roughly X: 285..1763, Y: 628..1420
    # Center is at X=1024. Height is ~850.
    # We export 2048x2048 square, or cropped viewBox (1600x1000)
    # ==========================================
    variants_vertical = [
        ('isologo_principal_dark.svg', C_FOREST, C_ROSE_GOLD, C_CREAM, C_ROSE_GOLD, 1.0),
        ('isologo_principal_light.svg', C_LIGHT_BG, C_ROSE_GOLD, C_FOREST, C_ROSE_GOLD, 1.0),
        ('isologo_principal_white_bg.svg', C_WHITE, C_ROSE_GOLD, C_FOREST, C_ROSE_GOLD, 1.0),
        ('isologo_principal_transparent_dark.svg', None, C_ROSE_GOLD, C_CREAM, C_ROSE_GOLD, 1.0),
        ('isologo_principal_transparent_light.svg', None, C_ROSE_GOLD, C_FOREST, C_ROSE_GOLD, 1.0),
        ('isologo_principal_positivo_byn.svg', C_WHITE, C_BLACK, C_BLACK, C_BLACK, 1.0),
        ('isologo_principal_positivo_transparent.svg', None, C_BLACK, C_BLACK, C_BLACK, 1.0),
        ('isologo_principal_negativo_nyb.svg', C_BLACK, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_principal_negativo_transparent.svg', None, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_principal_blanco_sobre_verde.svg', C_FOREST, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_principal_monocromatico_oro_rosa.svg', None, C_ROSE_GOLD, C_ROSE_GOLD, C_ROSE_GOLD, 1.0),
        ('isologo_principal_monocromatico_crema.svg', None, C_CREAM, C_CREAM, C_CREAM, 1.0),
        ('isologo_principal_escala_grises.svg', None, C_GRAY, "#222222", C_GRAY, 1.0),
        ('watermark_principal_blanco.svg', None, C_WHITE, C_WHITE, C_WHITE, 0.40),
        ('watermark_principal_negro.svg', None, C_BLACK, C_BLACK, C_BLACK, 0.40),
    ]
    for fn, bg, sym_col, tit_col, sub_col, op in variants_vertical:
        write_svg(fn, 2048, 2048, [
            {'fill': sym_col, 'd': d_sym, 'opacity': op},
            {'fill': tit_col, 'd': d_title, 'opacity': op},
            {'fill': sub_col, 'd': d_sub, 'opacity': op},
        ], bg_color=bg)

    # ==========================================
    # 2. ISOLOGO HORIZONTAL
    # Symbol on Left, Text on Right
    # Symbol center: was at X=1024, Y=860, size: ~680x470
    # Let's scale symbol to height ~400, placed at X=80, Y=100
    # Text "Morena Garnica" (width ~1480, height ~160) scaled to width ~1100, placed at X=650, Y=220
    # Subtitle "MAKE-UP ARTIST" placed underneath at X=650, Y=380
    # ViewBox: 2000 x 600
    # ==========================================
    # Calculate bounding boxes to compute exact transformation
    sym_min_x = min(np.min(c[:, :, 0]) for c in sym_cnts)
    sym_max_x = max(np.max(c[:, :, 0]) for c in sym_cnts)
    sym_min_y = min(np.min(c[:, :, 1]) for c in sym_cnts)
    sym_max_y = max(np.max(c[:, :, 1]) for c in sym_cnts)
    
    # Scale symbol to height 380
    s_scale = 380.0 / (sym_max_y - sym_min_y)
    s_off_x = 70.0 - sym_min_x * s_scale
    s_off_y = 110.0 - sym_min_y * s_scale
    
    # Scale title to height 140
    tit_min_x = min(np.min(c[:, :, 0]) for c in title_cnts)
    tit_max_x = max(np.max(c[:, :, 0]) for c in title_cnts)
    tit_min_y = min(np.min(c[:, :, 1]) for c in title_cnts)
    tit_max_y = max(np.max(c[:, :, 1]) for c in title_cnts)
    
    t_scale = 135.0 / (tit_max_y - tit_min_y)
    t_off_x = 720.0 - tit_min_x * t_scale
    t_off_y = 200.0 - tit_min_y * t_scale
    
    # Subtitle
    sub_min_x = min(np.min(c[:, :, 0]) for c in sub_cnts)
    sub_min_y = min(np.min(c[:, :, 1]) for c in sub_cnts)
    sub_max_y = max(np.max(c[:, :, 1]) for c in sub_cnts)
    sub_scale = 46.0 / (sub_max_y - sub_min_y)
    sub_off_x = 725.0 - sub_min_x * sub_scale
    sub_off_y = 385.0 - sub_min_y * sub_scale

    d_h_sym = cnts_to_d(sym_cnts, offset_x=s_off_x, offset_y=s_off_y, scale=s_scale)
    d_h_tit = cnts_to_d(title_cnts, offset_x=t_off_x, offset_y=t_off_y, scale=t_scale)
    d_h_sub = cnts_to_d(sub_cnts, offset_x=sub_off_x, offset_y=sub_off_y, scale=sub_scale)

    variants_horiz = [
        ('isologo_horizontal_dark.svg', C_FOREST, C_ROSE_GOLD, C_CREAM, C_ROSE_GOLD, 1.0),
        ('isologo_horizontal_light.svg', C_LIGHT_BG, C_ROSE_GOLD, C_FOREST, C_ROSE_GOLD, 1.0),
        ('isologo_horizontal_transparent_dark.svg', None, C_ROSE_GOLD, C_CREAM, C_ROSE_GOLD, 1.0),
        ('isologo_horizontal_transparent_light.svg', None, C_ROSE_GOLD, C_FOREST, C_ROSE_GOLD, 1.0),
        ('isologo_horizontal_positivo_byn.svg', C_WHITE, C_BLACK, C_BLACK, C_BLACK, 1.0),
        ('isologo_horizontal_positivo_transparent.svg', None, C_BLACK, C_BLACK, C_BLACK, 1.0),
        ('isologo_horizontal_negativo_nyb.svg', C_BLACK, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_horizontal_negativo_transparent.svg', None, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_horizontal_blanco_sobre_verde.svg', C_FOREST, C_WHITE, C_WHITE, C_WHITE, 1.0),
        ('isologo_horizontal_oro_rosa.svg', None, C_ROSE_GOLD, C_ROSE_GOLD, C_ROSE_GOLD, 1.0),
        ('watermark_horizontal_blanco.svg', None, C_WHITE, C_WHITE, C_WHITE, 0.40),
    ]
    for fn, bg, sym_col, tit_col, sub_col, op in variants_horiz:
        write_svg(fn, 2150, 600, [
            {'fill': sym_col, 'd': d_h_sym, 'opacity': op},
            {'fill': tit_col, 'd': d_h_tit, 'opacity': op},
            {'fill': sub_col, 'd': d_h_sub, 'opacity': op},
        ], bg_color=bg)

    # ==========================================
    # 3. LOGOTIPO COMPLETO (WORDMARK: Morena Garnica + MAKE-UP ARTIST)
    # Centered in 1800 x 500
    # ==========================================
    w_scale = 1.0
    w_off_x = (1800 - (tit_max_x - tit_min_x)) / 2.0 - tit_min_x
    w_off_y = 120 - tit_min_y
    
    sub_w_off_x = (1800 - (max(np.max(c[:, :, 0]) for c in sub_cnts) - sub_min_x)) / 2.0 - sub_min_x
    sub_w_off_y = 340 - sub_min_y

    d_wm_tit = cnts_to_d(title_cnts, offset_x=w_off_x, offset_y=w_off_y, scale=w_scale)
    d_wm_sub = cnts_to_d(sub_cnts, offset_x=sub_w_off_x, offset_y=sub_w_off_y, scale=w_scale)

    variants_wm = [
        ('logotipo_completo_wordmark_dark.svg', C_FOREST, C_CREAM, C_ROSE_GOLD),
        ('logotipo_completo_wordmark_light.svg', C_LIGHT_BG, C_FOREST, C_ROSE_GOLD),
        ('logotipo_completo_wordmark_transparent.svg', None, C_CREAM, C_ROSE_GOLD),
        ('logotipo_completo_wordmark_transparent_dark.svg', None, C_FOREST, C_ROSE_GOLD),
        ('logotipo_completo_wordmark_positivo.svg', None, C_BLACK, C_BLACK),
        ('logotipo_completo_wordmark_negativo.svg', None, C_WHITE, C_WHITE),
    ]
    for fn, bg, tit_col, sub_col in variants_wm:
        write_svg(fn, 1800, 480, [
            {'fill': tit_col, 'd': d_wm_tit},
            {'fill': sub_col, 'd': d_wm_sub},
        ], bg_color=bg)

    # ==========================================
    # 4. LOGOTIPO SIMPLE (Solo "Morena Garnica")
    # ==========================================
    smp_off_x = (1800 - (tit_max_x - tit_min_x)) / 2.0 - tit_min_x
    smp_off_y = (320 - (tit_max_y - tit_min_y)) / 2.0 - tit_min_y
    d_smp = cnts_to_d(title_cnts, offset_x=smp_off_x, offset_y=smp_off_y, scale=1.0)
    
    variants_smp = [
        ('logotipo_simple_dark.svg', C_FOREST, C_CREAM),
        ('logotipo_simple_light.svg', C_LIGHT_BG, C_FOREST),
        ('logotipo_simple_transparent.svg', None, C_CREAM),
        ('logotipo_simple_transparent_dark.svg', None, C_FOREST),
        ('logotipo_simple_positivo.svg', None, C_BLACK),
        ('logotipo_simple_negativo.svg', None, C_WHITE),
        ('logotipo_simple_oro_rosa.svg', None, C_ROSE_GOLD),
    ]
    for fn, bg, tit_col in variants_smp:
        write_svg(fn, 1800, 320, [{'fill': tit_col, 'd': d_smp}], bg_color=bg)

    # ==========================================
    # 5. LOGOTIPO ABREVIADO ("More G.")
    # ==========================================
    abr_min_x = min(np.min(c[:, :, 0]) for c in abbrev_cnts)
    abr_max_x = max(np.max(c[:, :, 0]) for c in abbrev_cnts)
    abr_min_y = min(np.min(c[:, :, 1]) for c in abbrev_cnts)
    abr_max_y = max(np.max(c[:, :, 1]) for c in abbrev_cnts)
    
    abr_off_x = (900 - (abr_max_x - abr_min_x)) / 2.0 - abr_min_x
    abr_off_y = (300 - (abr_max_y - abr_min_y)) / 2.0 - abr_min_y
    d_abr = cnts_to_d(abbrev_cnts, offset_x=abr_off_x, offset_y=abr_off_y, scale=1.0)
    
    variants_abr = [
        ('logotipo_abreviado_dark.svg', C_FOREST, C_CREAM),
        ('logotipo_abreviado_light.svg', C_LIGHT_BG, C_FOREST),
        ('logotipo_abreviado_transparent.svg', None, C_CREAM),
        ('logotipo_abreviado_transparent_dark.svg', None, C_FOREST),
        ('logotipo_abreviado_positivo.svg', None, C_BLACK),
        ('logotipo_abreviado_negativo.svg', None, C_WHITE),
        ('logotipo_abreviado_oro_rosa.svg', None, C_ROSE_GOLD),
    ]
    for fn, bg, col in variants_abr:
        write_svg(fn, 900, 300, [{'fill': col, 'd': d_abr}], bg_color=bg)

    # ==========================================
    # 6. ISOTIPO / MONOGRAMA COMPLETO (Solo Símbolo)
    # Centered in 1000 x 1000
    # ==========================================
    sym_w = sym_max_x - sym_min_x
    sym_h = sym_max_y - sym_min_y
    iso_scale = 750.0 / max(sym_w, sym_h)
    iso_off_x = (1000 - sym_w * iso_scale) / 2.0 - sym_min_x * iso_scale
    iso_off_y = (1000 - sym_h * iso_scale) / 2.0 - sym_min_y * iso_scale
    d_iso = cnts_to_d(sym_cnts, offset_x=iso_off_x, offset_y=iso_off_y, scale=iso_scale)
    
    variants_iso = [
        ('isotipo_completo_dark.svg', C_FOREST, C_ROSE_GOLD),
        ('isotipo_completo_light.svg', C_LIGHT_BG, C_ROSE_GOLD),
        ('isotipo_completo_white_bg.svg', C_WHITE, C_ROSE_GOLD),
        ('isotipo_completo_transparent_oro_rosa.svg', None, C_ROSE_GOLD),
        ('isotipo_completo_transparent_crema.svg', None, C_CREAM),
        ('isotipo_completo_positivo.svg', None, C_BLACK),
        ('isotipo_completo_negativo.svg', None, C_WHITE),
        ('isotipo_completo_blanco_verde.svg', C_FOREST, C_WHITE),
    ]
    for fn, bg, col in variants_iso:
        write_svg(fn, 1000, 1000, [{'fill': col, 'd': d_iso}], bg_color=bg)

    # ==========================================
    # 7. ISOTIPO MINIMALISTA (Solo MG entrelazadas)
    # ==========================================
    mini_min_x = min(np.min(c[:, :, 0]) for c in sym_mini_cnts)
    mini_max_x = max(np.max(c[:, :, 0]) for c in sym_mini_cnts)
    mini_min_y = min(np.min(c[:, :, 1]) for c in sym_mini_cnts)
    mini_max_y = max(np.max(c[:, :, 1]) for c in sym_mini_cnts)
    mini_w = mini_max_x - mini_min_x
    mini_h = mini_max_y - mini_min_y
    
    m_scale = 650.0 / max(mini_w, mini_h)
    m_off_x = (1000 - mini_w * m_scale) / 2.0 - mini_min_x * m_scale
    m_off_y = (1000 - mini_h * m_scale) / 2.0 - mini_min_y * m_scale
    d_mini = cnts_to_d(sym_mini_cnts, offset_x=m_off_x, offset_y=m_off_y, scale=m_scale)
    
    variants_mini = [
        ('isotipo_minimalista_dark.svg', C_FOREST, C_ROSE_GOLD),
        ('isotipo_minimalista_light.svg', C_LIGHT_BG, C_ROSE_GOLD),
        ('isotipo_minimalista_transparent.svg', None, C_ROSE_GOLD),
        ('isotipo_minimalista_positivo.svg', None, C_BLACK),
        ('isotipo_minimalista_negativo.svg', None, C_WHITE),
    ]
    for fn, bg, col in variants_mini:
        write_svg(fn, 1000, 1000, [{'fill': col, 'd': d_mini}], bg_color=bg)

    # ==========================================
    # 8. SELLO / BADGE CIRCULAR (SVG)
    # Circular badge with ring, text on path, center monogram
    # ==========================================
    # Circular emblem with inner & outer rings
    b_size = 1200
    b_cx, b_cy = 600, 600
    b_r_outer = 560
    b_r_inner = 530
    b_r_core = 380
    
    # Scale monogram for center
    b_m_scale = 420.0 / max(sym_w, sym_h)
    b_m_off_x = (b_size - sym_w * b_m_scale) / 2.0 - sym_min_x * b_m_scale
    b_m_off_y = (b_size - sym_h * b_m_scale) / 2.0 - sym_min_y * b_m_scale
    d_badge_monogram = cnts_to_d(sym_cnts, offset_x=b_m_off_x, offset_y=b_m_off_y, scale=b_m_scale)

    badge_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {b_size} {b_size}" width="{b_size}" height="{b_size}">
  <defs>
    <!-- Paths for circular text -->
    <path id="upperArc" d="M 140 600 A 460 460 0 0 1 1060 600" fill="none" />
    <path id="lowerArc" d="M 1060 600 A 460 460 0 0 1 140 600" fill="none" />
  </defs>
  <!-- Background -->
  <circle cx="{b_cx}" cy="{b_cy}" r="{b_r_outer}" fill="{C_FOREST}"/>
  <!-- Outer metallic border -->
  <circle cx="{b_cx}" cy="{b_cy}" r="{b_r_outer - 15}" fill="none" stroke="{C_ROSE_GOLD}" stroke-width="10"/>
  <circle cx="{b_cx}" cy="{b_cy}" r="{b_r_inner}" fill="none" stroke="{C_ROSE_GOLD}" stroke-width="3" stroke-dasharray="10, 8"/>
  <circle cx="{b_cx}" cy="{b_cy}" r="{b_r_core}" fill="none" stroke="{C_ROSE_GOLD}" stroke-width="4"/>
  
  <!-- Curved Typography -->
  <text font-family="'Cinzel', 'Playfair Display', 'Cormorant Garamond', 'Georgia', serif" font-size="44" font-weight="700" letter-spacing="9" fill="{C_CREAM}">
    <textPath href="#upperArc" startOffset="50%" text-anchor="middle">
      MORENA GARNICA
    </textPath>
  </text>
  <text font-family="'Montserrat', 'Helvetica Neue', Arial, sans-serif" font-size="32" font-weight="600" letter-spacing="14" fill="{C_ROSE_GOLD}">
    <textPath href="#lowerArc" startOffset="50%" text-anchor="middle">
      • MAKE-UP ARTIST •
    </textPath>
  </text>
  
  <!-- Center Monogram -->
  <path fill="{C_ROSE_GOLD}" fill-rule="evenodd" d="{d_badge_monogram}"/>
</svg>'''
    with open(os.path.join(out_dir, 'sello_badge_circular_vector.svg'), 'w', encoding='utf-8') as f:
        f.write(badge_svg)
    print("Generated sello_badge_circular_vector.svg")

    # ==========================================
    # 9. FAVICON / APP ICON SET
    # ==========================================
    # Generate high quality PNG favicons from the master image / mask
    # Squircle App Icon in SVG
    fav_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="tileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E4533"/>
      <stop offset="100%" stop-color="#142F22"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#tileGrad)" stroke="{C_ROSE_GOLD}" stroke-width="3" stroke-opacity="0.4"/>
  <!-- Centered Monogram -->
  <path fill="{C_ROSE_GOLD}" fill-rule="evenodd" d="{cnts_to_d(sym_cnts, offset_x=(512 - sym_w*0.52)/2 - sym_min_x*0.52, offset_y=(512 - sym_h*0.52)/2 - sym_min_y*0.52, scale=0.52)}"/>
</svg>'''
    with open(os.path.join(out_dir, 'favicon_app_icon.svg'), 'w', encoding='utf-8') as f:
        f.write(fav_svg)
    print("Generated favicon_app_icon.svg")

    # ==========================================
    # 10. HIGH RESOLUTION TRANSPARENT PNG RENDERING
    # Render direct raster outputs with alpha matting
    # ==========================================
    print("Rendering high-resolution PNG assets...")
    
    # Crop the symbol, title, and subtitle regions as transparent RGBA
    # Re-color helper using alpha
    def make_colored_png(mask_cnts, out_size, hex_color, bg_hex=None, padding=0.1):
        # Create mask
        w_out, h_out = out_size
        canvas = np.zeros((h_out, w_out, 4), dtype=np.uint8)
        
        # Bounding box of contours
        min_x = min(np.min(c[:, :, 0]) for c in mask_cnts)
        max_x = max(np.max(c[:, :, 0]) for c in mask_cnts)
        min_y = min(np.min(c[:, :, 1]) for c in mask_cnts)
        max_y = max(np.max(c[:, :, 1]) for c in mask_cnts)
        bw, bh = max_x - min_x, max_y - min_y
        
        avail_w = int(w_out * (1.0 - padding * 2))
        avail_h = int(h_out * (1.0 - padding * 2))
        scale = min(avail_w / bw, avail_h / bh)
        
        off_x = int((w_out - bw * scale) / 2.0 - min_x * scale)
        off_y = int((h_out - bh * scale) / 2.0 - min_y * scale)
        
        # Transform contours
        scaled_cnts = []
        for c in mask_cnts:
            sc = (c.astype(np.float32) * scale + np.array([off_x, off_y], dtype=np.float32)).astype(np.int32)
            scaled_cnts.append(sc)
            
        # Draw on mask with supersampling / anti-aliasing
        cv2.drawContours(canvas, scaled_cnts, -1, (255, 255, 255, 255), thickness=cv2.FILLED)
        
        # Parse hex
        r = int(hex_color[1:3], 16)
        g = int(hex_color[3:5], 16)
        b = int(hex_color[5:7], 16)
        
        # Apply color
        is_fill = canvas[:, :, 3] > 0
        canvas[is_fill, 0] = b # BGR for OpenCV
        canvas[is_fill, 1] = g
        canvas[is_fill, 2] = r
        
        # Background if requested
        if bg_hex:
            bg_r = int(bg_hex[1:3], 16)
            bg_g = int(bg_hex[3:5], 16)
            bg_b = int(bg_hex[5:7], 16)
            final_img = np.full((h_out, w_out, 3), [bg_b, bg_g, bg_r], dtype=np.uint8)
            alpha_f = (canvas[:, :, 3] / 255.0)[:, :, np.newaxis]
            final_img = (canvas[:, :, :3] * alpha_f + final_img * (1.0 - alpha_f)).astype(np.uint8)
            return final_img, False
        else:
            return canvas, True

    # 1. High-Res PNG Master of Stacked Logo (Transparent & with Backgrounds)
    # Using the original image's unmultiplied alpha
    # Make master transparent with despill
    fg_b = img[:, :, 0].astype(np.float32)
    fg_g = img[:, :, 1].astype(np.float32)
    fg_r = img[:, :, 2].astype(np.float32)
    
    alpha_3d = alpha[:, :, np.newaxis]
    
    # Despill against green bg
    clean_b = np.clip((fg_b - (1.0 - alpha) * 43) / np.maximum(alpha, 0.05), 0, 255)
    clean_g = np.clip((fg_g - (1.0 - alpha) * 59) / np.maximum(alpha, 0.05), 0, 255)
    clean_r = np.clip((fg_r - (1.0 - alpha) * 25) / np.maximum(alpha, 0.05), 0, 255)
    
    clean_rgba = np.zeros((h, w, 4), dtype=np.uint8)
    clean_rgba[:, :, 0] = clean_b.astype(np.uint8)
    clean_rgba[:, :, 1] = clean_g.astype(np.uint8)
    clean_rgba[:, :, 2] = clean_r.astype(np.uint8)
    clean_rgba[:, :, 3] = (alpha * 255).astype(np.uint8)
    
    # Save High Res 3000x3000px 300 DPI Transparent PNG
    pil_master = Image.fromarray(cv2.cvtColor(clean_rgba, cv2.COLOR_BGRA2RGBA))
    pil_3000 = pil_master.resize((3000, 3000), Image.Resampling.LANCZOS)
    pil_3000.save(os.path.join(out_dir, 'isologo_principal_3000px_transparent.png'), 'PNG', dpi=(300, 300))
    print("Saved isologo_principal_3000px_transparent.png (300 DPI)")
    
    # Dark Background Master (2048x2048)
    Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB)).save(os.path.join(out_dir, 'isologo_principal_dark.jpg'), 'JPEG', quality=98)
    
    # Watermark PNGs (35% opacity)
    # Pure White Watermark
    wm_white = np.zeros((h, w, 4), dtype=np.uint8)
    wm_white[:, :, :3] = 255
    wm_white[:, :, 3] = (alpha * 255 * 0.35).astype(np.uint8)
    Image.fromarray(wm_white).save(os.path.join(out_dir, 'watermark_blanco_35pct.png'), 'PNG')
    
    # Pure Black Watermark
    wm_black = np.zeros((h, w, 4), dtype=np.uint8)
    wm_black[:, :, :3] = 0
    wm_black[:, :, 3] = (alpha * 255 * 0.35).astype(np.uint8)
    Image.fromarray(wm_black).save(os.path.join(out_dir, 'watermark_negro_35pct.png'), 'PNG')
    print("Saved watermark PNGs (white and black)")

    # Favicon Set
    # Crop central emblem from master
    sym_crop = pil_master.crop((sym_min_x - 30, sym_min_y - 30, sym_max_x + 30, sym_max_y + 30))
    
    # Add green background square for favicon
    fav_bg = Image.new('RGBA', (512, 512), (25, 59, 43, 255))
    sym_fitted = sym_crop.copy()
    sym_fitted.thumbnail((420, 420), Image.Resampling.LANCZOS)
    fav_bg.paste(sym_fitted, ((512 - sym_fitted.width) // 2, (512 - sym_fitted.height) // 2), sym_fitted)
    
    fav_bg.save(os.path.join(out_dir, 'favicon-512x512.png'), 'PNG')
    fav_bg.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'favicon-192x192.png'), 'PNG')
    fav_bg.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'favicon-32x32.png'), 'PNG')
    fav_bg.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'favicon-16x16.png'), 'PNG')
    fav_bg.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(out_dir, 'apple-touch-icon.png'), 'PNG')
    
    # Multi-resolution .ico
    fav_bg.save(os.path.join(out_dir, 'favicon.ico'), format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    print("Generated favicon package (.ico, 16, 32, 192, 512, apple-touch-icon)")

    print("Brand system generation completed successfully!")

if __name__ == '__main__':
    build_brand()
