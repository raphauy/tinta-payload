---
name: "revisar"
description: "Revisa código modificado verificando correctitud, i18n, regresiones y adherencia a los patrones de PayloadCMS + Next.js del proyecto"
---

# Code Review Skill

Revisión exhaustiva del código modificado para garantizar correctitud, consistencia y que no se rompa funcionalidad existente en el sitio Tinta (Next.js 15 + PayloadCMS 3.7).

## Proceso de Revisión

### Paso 1: Identificar cambios

```bash
git diff --name-only          # Archivos modificados (unstaged)
git diff --cached --name-only # Archivos modificados (staged)
git status                    # Incluye archivos nuevos sin trackear (??)
```

Leer cada archivo modificado completo para entender el contexto.

### Paso 2: Revisar correctitud del código

Para cada archivo modificado, verificar:

- **Lógica**: La implementación resuelve correctamente lo que se pide, sin edge cases sin cubrir
- **Tipos TypeScript**: No hay `any` innecesarios, tipos correctos para params/returns. Usar los tipos generados en `src/payload-types.ts` en lugar de redefinir formas de datos a mano
- **Null safety**: Manejo correcto de valores `null | undefined`. En Payload muchas relaciones/uploads pueden venir como `number` (id) o el objeto poblado según el `depth` — verificar el chequeo `typeof x === 'object'` antes de acceder a propiedades
- **Async/await**: No hay promesas sin await, no hay race conditions, errores async propagados correctamente. `getPayload()` y las llamadas al Local API son async

### Paso 3: PayloadCMS — colecciones, globals y tipos

- Si se agregó/modificó/renombró un **campo** en una colección (`src/collections/`) o global (`src/Header/`, `src/Footer/`), hay que regenerar tipos con `pnpm generate:types` y confirmar que `src/payload-types.ts` refleja el cambio
- Cambios en la estructura de campos que ya tienen datos en la DB pueden requerir **migración**; verificar que no rompa documentos existentes (campos `required` nuevos sobre datos viejos, cambios de tipo)
- **Access control**: cada colección/campo expone datos según `src/access/` (`anyone`, `authenticated`, `authenticatedOrPublished`). Confirmar que un cambio no expone contenido en draft/no publicado al público
- **Hooks**: si el cambio toca slugs, fechas de publicación, autores o revalidación, revisar los hooks correspondientes (`formatSlug`, `populatePublishedAt`, `populateAuthors`, `revalidatePost`/`revalidatePage`, `revalidateRedirects`)
- Si se agregó un **block** nuevo, confirmar que está registrado en la colección/página y en `src/blocks/RenderBlocks.tsx`
- Si se agregó un **import map** o config del admin (componentes custom), correr `pnpm generate:importmap`

### Paso 4: Internacionalización (i18n)

- Toda clave de traducción nueva debe existir en **ambos** locales: `src/locales/es.ts` y `src/locales/en.ts`. Las dos estructuras deben quedar simétricas (mismas claves)
- En server components usar `getScopedI18n()` / `getI18n()` de `@/locales/server`; en client components los hooks correspondientes
- Contenido de Posts/Pages se filtra por el campo `language` — verificar que las queries respeten el locale de la ruta `[locale]`
- No hardcodear strings visibles al usuario; deben venir de los archivos de locale

### Paso 5: Análisis de regresión

Verificar que los cambios **no rompen funcionalidad existente**:

- **Contratos de funciones**: Si se cambió la firma de una utilidad/componente, buscar TODOS los call sites con `Grep` y confirmar compatibilidad
- **Queries de Payload**: Si se modificó `depth`, `select`, `where` o `populate` de una consulta, verificar que los consumidores del resultado no acceden a campos/relaciones que ya no vienen poblados
- **Tipos de `payload-types.ts`**: Si un campo cambió de opcional a requerido (o de tipo), buscar dónde se consume ese tipo y confirmar que sigue compilando
- **Props de componentes**: Si se modificaron props, buscar todos los usos y verificar que pasan los props requeridos
- **Rutas y revalidación**: Si se agregó/cambió un `revalidatePath`/`revalidateTag`, confirmar que la ruta/tag es correcta y que el hook se dispara en el evento esperado
- **Route groups**: Cambios en `(frontend)`, `(payload)` o `(sitemaps)` no deben romper el layout ni el admin

```bash
# Ejemplo: buscar todos los usos de un componente/utilidad modificada
grep -rn "nombreFuncion" src/ --include="*.ts" --include="*.tsx"
```

### Paso 6: Adherencia a patrones del proyecto

Verificar las reglas del proyecto (CLAUDE.md):

| Regla | Verificación |
|-------|-------------|
| RSC por defecto | `"use client"` solo si hay interactividad real (estado, efectos, handlers) |
| Datos vía Local API | Acceso a datos con `getPayload({ config })`, no fetch manual a la REST API interna |
| Access control explícito | Colecciones usan políticas de `src/access/`; contenido público vía `authenticatedOrPublished` |
| i18n dual | Claves nuevas en `es.ts` **y** `en.ts`; sin strings hardcodeados |
| Tipos generados | Se usan los tipos de `payload-types.ts`, se regeneran tras cambiar campos |
| Media optimizada | Imágenes vía componente `Media`/`next/image`, no `<img>` crudo |
| Path aliases | Imports con `@/*` y `@payload-config`, no rutas relativas largas |
| Revalidación | Cambios de contenido disparan los hooks `revalidate*` correctos |

### Paso 7: Superficies UI actualizadas

Si el cambio agrega/modifica un campo o comportamiento, verificar que se actualicen **todas** las superficies afectadas:

- Configuración del campo en la colección/global (admin)
- Componente/hero/block que lo renderiza en el frontend
- Ambos locales (es/en) si es texto visible
- Vistas relacionadas: listados, cards, archivos (`ArchiveBlock`, `CollectionArchive`), SEO/metadata
- Sitemap si afecta rutas indexables

### Paso 8: Calidad general

- Strings en español con acentos correctos (á, é, í, ó, ú, ñ) donde corresponda
- No hay `console.log` de debug olvidados
- No hay código comentado sin justificación
- Imports no usados eliminados (ESLint los marca)
- Nombres siguen convenciones: `kebab-case`/`PascalCase` en archivos según lo existente en cada carpeta, `camelCase` funciones, `PascalCase` componentes

### Paso 9: Verificación automática

**Los comandos son obligatorios antes de emitir veredicto.** No alcanza con typecheck: el build detecta errores de RSC, imports rotos, configuración de Payload inválida y problemas que `tsc` no ve.

```bash
pnpm generate:types      # Solo si se tocaron campos de colecciones/globals — regenera payload-types.ts
pnpm typecheck           # Errores de tipos (tsc --noEmit)
pnpm lint                # ESLint (next lint)
pnpm build               # Build completo - detecta errores de RSC, imports rotos, config de Payload, etc.
```

Orden: si se modificaron campos, primero `generate:types`. Si `typecheck`/`lint` fallan, corregí los errores antes de correr `build`. Si `build` falla, el veredicto no puede ser **SAFE**: debe ser **NEEDS_FIXES** listando el error reportado por Next.js/Payload.

Incluí en el reporte una sección **Verificación automática** indicando el resultado de cada comando ejecutado (✅ pasa / ❌ falla con el error).

## Veredicto Final

Emitir uno de:

| Veredicto | Significado |
|-----------|-------------|
| **SAFE** | Sin problemas. Listo para commit/deploy |
| **NEEDS_FIXES** | Hay problemas que deben corregirse antes de avanzar. Listar cada uno con archivo y línea |
| **RISKY** | Cambios que podrían causar regresiones en producción (datos existentes, contenido público, revalidación). Explicar el riesgo específico y las áreas afectadas |

### Formato de reporte

```
## Code Review

### Archivos revisados
- `archivo1.ts` - breve descripción del cambio
- `archivo2.tsx` - breve descripción del cambio

### Hallazgos
1. [CRITICAL/WARNING/INFO] Descripción del hallazgo (`archivo:línea`)

### Regresiones potenciales
- Descripción del riesgo y componentes/datos afectados (o "Ninguna identificada")

### Verificación automática
- `pnpm generate:types`: ✅ pasa | ❌ falla | n/a (no se tocaron campos)
- `pnpm typecheck`: ✅ pasa | ❌ falla (resumen del error)
- `pnpm lint`: ✅ pasa | ❌ falla (resumen del error)
- `pnpm build`: ✅ pasa | ❌ falla (resumen del error)

### Veredicto: SAFE | NEEDS_FIXES | RISKY
Justificación breve.
```
