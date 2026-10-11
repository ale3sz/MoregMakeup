# ✨ Guía del Modo Edición - Morena Garnica Make-up

Esta guía explica en detalle cómo funciona el **Modo Edición Exclusivo** para Morena, cómo usarlo desde cualquier dispositivo y cómo conectarlo a la nube gratuita (Supabase).

---

## 🔑 1. Cómo Ingresar al Modo Edición

Hay **dos formas** súper sencillas de entrar:

### Opción A: Botón discreto en la web (ideal para celulares y tablets)
1. Deslizá hasta el pie de página (**Footer**).
2. Abajo a la derecha, al lado de *"Diseñado con dedicación"*, verás un enlace que dice **🔒 Acceso Morena**.
3. Tocalo y se abrirá la ventana para ingresar la contraseña.

### Opción B: Atajo de teclado (ideal para computadora)
* Presioná en cualquier momento: `Ctrl + Shift + E` (o `Cmd + Shift + E` en Mac).

---

## 🔒 Contraseña de Acceso
* **Contraseña predeterminada:** `morena2026`
* *(Podés cambiarla cuando quieras desde la pestaña "Nube & Respaldos" en el Panel Completo).*

---

## 🎨 2. ¿Qué podés hacer dentro del Modo Edición?

Una vez que iniciás sesión, verás una **barra flotante superior** de administración:

### ✏️ Edición Visual en Pantalla (En vivo)
* **Textos:** Vas a ver que al pasar el mouse por encima de los títulos, lemas y párrafos de *"Sobre Mí"*, aparece un lapicito ✏️ y un recuadro. Al hacer clic, podés escribir directamente sobre la página y presionar **"Listo"** o la tecla Enter.
* **Portfolio:** Aparece un botón de **"Gestionar Fotos"** y sobre cada imagen tenés un botón rojo 🗑️ para eliminar fotos que ya no quieras mostrar.

### ⚙️ Panel de Control Completo
Al tocar **"Panel Completo"** en la barra superior se abre una ventana organizada con pestañas:
1. **📸 Fotos & Portfolio:**
   * Subir fotos directamente desde la galería del celular o la computadora (se comprimen automáticamente para no ralentizar la web).
   * Asignar categoría: *Social*, *Novias* o *Eventos*.
   * Agregar título descriptivo.
2. **💄 Servicios & Precios:**
   * Cambiar los precios mostrados (ej: `$35.000`, `Consultar`, etc.).
   * Modificar duración estimada y descripción.
3. **🌸 Textos & Portada:**
   * Modificar título, eslogan, bio y trayectoria.
4. **❓ Preguntas Frecuentes:**
   * Editar respuestas existentes o añadir nuevas preguntas.
5. **📞 Contacto & Redes:**
   * Modificar número de WhatsApp, usuario de Instagram (`@morennagar`), email y ciudad.
6. **☁️ Nube & Respaldos:**
   * Descargar una **copia de seguridad en JSON** en un clic.
   * Restaurar copias previas.
   * Conectar con Supabase.

---

## 💾 3. Guardar los Cambios
Cuando hagas modificaciones, el botón **"Guardar Cambios"** de la barra superior se iluminará en color verde parpadeante:
* Tocá **"Guardar Cambios"** para fijar todas las ediciones.

---

## ☁️ 4. Conectar Supabase (Base de datos en la nube gratuita)

El sistema ya funciona y guarda todo localmente en el navegador. Para que **los cambios que Morena haga se sincronicen en tiempo real para todas las clientas del mundo**, solo necesitás conectar un proyecto gratuito en Supabase:

### Pasos (se hace una sola vez en 2 minutos):
1. Entrá a [https://supabase.com/](https://supabase.com/) y creá una cuenta gratis.
2. Creá un nuevo proyecto (ej: `moreg-makeup`).
3. En el menú izquierdo de Supabase, andá a **SQL Editor**, creá una nueva consulta y pegá este código:

```sql
create table if not exists public.site_content (
  id text primary key,
  content_data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.site_content enable row level security;

create policy "Acceso publico de lectura" on public.site_content
  for select using (true);

create policy "Acceso publico de escritura" on public.site_content
  for all using (true);
```

4. Hacé clic en **Run**.
5. En Supabase andá a **Project Settings > API** y copiá:
   * **Project URL**
   * **anon public Key**
6. En la página web de Morena, abrí el **Panel Completo > Nube & Respaldos**, pegá la URL y la Key, y tocá **"Guardar Credenciales de Supabase"**.

¡Listo! A partir de ese momento, la nube estará conectada y cada cambio se publicará al instante en toda la web.
