# Investigación: número de WhatsApp Business baneado por Meta y migración a la API Oficial

> **Fecha:** 16 de junio de 2026
> **Pregunta:** ¿Un número baneado por Meta en WhatsApp Business (app) se puede migrar/registrar en la API Oficial (WhatsApp Business Platform / Cloud API)? ¿Es Meta más permisivo en la API Cloud que en la app respecto a números bloqueados?
> **Método:** Investigación multi-fuente (5 ángulos, 18 fuentes, 25 afirmaciones verificadas con votación adversarial de 3 votos → 13 confirmadas / 12 refutadas).

## Contexto del caso

- El número estaba conectado vía **Baileys** (cliente de WhatsApp **no oficial**, ingeniería inversa de WhatsApp Web).
- Se corría una **campaña de Meta Ads click-to-WhatsApp** que enviaba tráfico a ese número.
- El mensaje de baneo indica violación de la **Política de Mensajes de WhatsApp Business** y dice explícitamente **"No se puede solicitar una revisión"** (sin botón de apelación).

---

## Respuesta corta

**No.** La "API Oficial" no es más permisiva con números baneados, y no sirve como puerta trasera para revivir un número que Meta bloqueó.

- El baneo de Meta actúa a nivel de **cuenta/número**, no es específico de la app → arrastra el bloqueo a *cualquier* producto de WhatsApp, incluida la Cloud API.
- Como la pantalla dice **"No se puede solicitar una revisión"** (sin botón de apelar), el caso cae en el escenario terminal: **el número es, en la práctica, irrecuperable**.

> La movida correcta no es "pasar el número viejo a la API", sino **registrar un número nuevo y limpio en la API Oficial y dejar de usar Baileys**.

---

## Por qué pasó (causa raíz)

Hay dos cosas, conviene separarlas:

1. **Baileys = causa de fondo.** Usar un cliente no autorizado viola directamente los Términos de Servicio de WhatsApp. Meta detecta estos clientes y banea el número. Esto explica el mensaje duro y el "no se puede solicitar revisión": los baneos por cliente no oficial / política de mensajes son de los menos reversibles.
2. **La campaña Meta Ads click-to-WhatsApp = el detonante.** Mandar tráfico pago a un número operado por un cliente no oficial genera un pico de mensajes automatizados → patrón de spam + posibles reportes/bloqueos de usuarios. Eso acelera el baneo.

> El enforcement de Meta normalmente es **escalonado** (advertencia → límites → bloqueos temporales → account lock → desactivación permanente). Saltar directo al baneo sin revisión sugiere infracción tratada como grave o historial previo, consistente con el uso de un cliente no oficial.
> Fuente: [Meta — Policy Enforcement](https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement)

---

## El punto central: ¿se puede migrar ese número a la Cloud API?

| Pregunta | Hallazgo verificado |
|---|---|
| ¿El ban es solo de la app o también afecta la API? | **A nivel cuenta/número, no es específico de la app.** Un número baneado debe *desbloquearse vía apelación* antes de poder usarse en cualquier producto, incluida la Cloud API. *(confianza: media — consenso de verificadores, sin cita primaria única de Meta)* |
| ¿Es la Cloud API más permisiva con números baneados? | **No hay ninguna evidencia de que lo sea.** Lo que cambia entre app y API **no es la permisividad, es el canal de apelación**. La premisa "en la API Meta es más blando" quedó *sin sustento*. |
| ¿Y si el ban ya es definitivo (sin botón de revisión)? | **Irrecuperable.** *"Once Meta marks a number as permanently disabled, there's no way to recover it, even through official support."* Recomendación: eliminarlo de WhatsApp Manager y **registrar un número nuevo**. |

**Matiz clave sobre la palabra "permanente":**

- **(a)** Baneo permanente que **todavía muestra botón "Request Review / Solicitar revisión"** → a veces *sí* se revierte apelando.
- **(b)** Estado final, **apelación agotada o sin botón** → universalmente irrecuperable.

> La captura del caso dice *"No se puede solicitar una revisión"* → **escenario (b)**. No hay palanca que mover sobre ese número.

**Buena noticia concreta:** el miedo de "el número nuevo también se quemará por estar asociado al dispositivo/IP baneado" aplica a la **app de consumidor**, **no a la Cloud API**. La Cloud API es server-side: un número fresco registrado ahí no hereda vetos de dispositivo/IP del cliente Baileys. Se empieza limpio.

---

## Qué hacer ahora (plan práctico)

1. **Confirmar el estado real en Business Manager** (no solo en la pantalla del teléfono). Ir a **Business Support Home / WhatsApp Manager → Account Quality** y verificar si bajo *"Activity Issue → Available to Review"* aparece *algún* botón "Request Review". Si no aparece nada → confirmado irrecuperable, pasar al punto 2. (El flujo de apelación de la API es distinto al de la app y a veces muestra opciones que la app no.)

2. **Asumir el número viejo como perdido.** Conseguir un **número nuevo que NUNCA haya estado en WhatsApp** (ni app, ni Business, ni Baileys). Idealmente uno dedicado solo para esto.

3. **Registrarlo en la API Oficial (Cloud API)** — por el camino legítimo:
   - Directo con Meta (WhatsApp Business Platform sobre el Business Manager), o
   - Vía un **BSP** que simplifica el onboarding (360dialog, Twilio, Wati, respond.io, etc.).
   - *Ojo:* los BSP ayudan a operar y apelar, pero **no pueden revertir un baneo de Meta** — la decisión siempre es de Meta.

4. **Eliminar Baileys del flujo por completo.** Es la causa raíz. Mantenerlo en cualquier número es una bomba de tiempo. Para mandar tráfico pago a WhatsApp, hay que estar en la API oficial.

5. **Configurar bien las campañas click-to-WhatsApp** para no repetir: plantillas aprobadas por Meta, opt-in claro, sin automatización agresiva al arranque, calentar el número de a poco. El **quality rating es por número** (ventana de 7 días, feedback de quienes reciben) e independiente del estado de la cuenta — un número nuevo arranca neutro.

---

## Detalle de hallazgos verificados

- **Enforcement escalonado** (confianza alta): advertencia → bloqueos de 1/3 días (plantillas marketing/utility/auth y agregar números) → 5/7/30 días (cualquier mensaje) → account lock indefinido (solo removible por apelación) → desactivación permanente de la plataforma.
- **Violaciones graves = offboarding inmediato sin advertencia** (confianza alta): explotación infantil, estafas, terrorismo, venta de drogas ilegales. El exceso de feedback negativo de usuarios también puede llevar a limitación/offboarding.
- **Dos tipos de restricción visibles al usuario** (confianza alta): bloqueos temporales (24h, contador regresivo, se levantan solos) y baneos permanentes (mensaje severo "esta cuenta no puede usar WhatsApp").
- **El ban es a nivel cuenta/número, no app-específico** (confianza media): un número baneado debe desbloquearse vía apelación antes de usarse en la API. Se refutaron (0-3) tanto la tesis "ban estrictamente WABA-no-número" como "recuperación fácil vía app+WABA".
- **No hay evidencia de mayor permisividad en la Cloud API** (confianza media): la diferencia entre app y API es el *canal de remediación*, no la permisividad.
- **El proceso de apelación difiere por canal** (confianza alta): en la app se apela desde la pantalla de baneo (botón "Request a Review"); en la API se apela vía Business Support Home / WhatsApp Manager en Business Manager.
- **Flujo de apelación en API** (confianza alta): Business Support Home (o Account Quality Page) → seleccionar la WABA → localizar la violación bajo "Available to Review" en "Activity Issue" → "Request Review".
- **Decisión de la apelación** (confianza alta): se envía vía Business Manager, típicamente 24–48h. Solo dos resultados: *Unchanged* (se mantiene) o *Reversed* (levantada). No todas las violaciones de spam son apelables; la reinstauración no está garantizada.
- **Número permanentemente desactivado = irrecuperable** (confianza media): eliminar de WhatsApp Manager y registrar un número nuevo no vinculado.
- **Quality rating es per-número** (confianza alta): independiente del estado a nivel de cuenta (WABA). Arreglar uno no arregla el otro.

---

## Honestidad sobre la evidencia (caveats)

- **Lo más sólido** (doc primaria de Meta): enforcement escalonado, offboarding inmediato para violaciones graves, y flujo de apelación vía Business Manager (24–48h típico, resultado *Unchanged* o *Reversed*).
- **Lo más débil:** la pregunta "¿la Cloud API es más permisiva con un número baneado?" se responde **por ausencia de evidencia** — ningún documento de Meta afirma que lo sea, y los proveedores (interesados comercialmente pero muy convergentes entre sí) dicen que primero hay que desbloquear el número. No se halló documentación primaria de Meta sobre *migrar a la Cloud API un número con baneo activo*; es inferencia por consenso.
- Las etiquetas exactas de UI en Business Manager cambian seguido; el flujo sigue siendo válido.
- Sensibilidad temporal: fuentes 2024–2026. Tiempos de 24–48h son típicos pero pueden extenderse a 1–7 días.

## Preguntas abiertas

- ¿Existe documentación primaria de Meta sobre migrar a la Cloud API un número con baneo activo (vs. inferirlo por consenso de BSP)?
- ¿Cómo interactúa **Coexistence** (mismo número en app y API) con un número que tiene restricción/ban activo? (Una afirmación de Coexistence como ruta de recuperación fue refutada 0-3.)
- Un baneo de la app de consumidor que afecta dispositivo/IP, ¿impacta el registro server-side en la Cloud API? (Los verificadores sugieren que son independientes.)
- ¿Cuál es la ventana exacta para apelar (algunas fuentes mencionan 90 días) y qué pasa con el número una vez vencida sin éxito?

---

## Fuentes principales

**Primarias (Meta):**
- [WhatsApp Business Platform — Policy Enforcement](https://developers.facebook.com/documentation/business-messaging/whatsapp/policy-enforcement)
- [WhatsApp FAQ — Apelaciones / Request Review](https://faq.whatsapp.com/1508178557633269)
- [Meta Business Help — Quality Rating del número](https://www.facebook.com/business/help/896873687365001)
- [WhatsApp Help — About account bans](https://faq.whatsapp.com/465883178708358) · [About temporarily banned accounts](https://faq.whatsapp.com/1848531392146538)

**Secundarias / BSP (convergentes, interés comercial):**
- [Sinch — WhatsApp Business account banned](https://sinch.com/blog/whatsapp-business-account-banned/)
- [respond.io — WhatsApp Business banned](https://respond.io/blog/whatsapp-business-banned)
- [YCloud — How to unblock WhatsApp API account](https://www.ycloud.com/blog/how-to-unblock-whatsapp-api-account)
- [Trengo — WhatsApp Business banned](https://trengo.com/blog/whatsapp-business-banned)
- [Chakra — WhatsApp API account restricted or blocked](https://chakrahq.com/article/whatsapp-api-account-restricted-or-blocked-find-out-why-and-how-to-resolve/)
- [Wati — How to appeal a policy-violation ban](https://support.wati.io/en/articles/11463216-how-to-appeal-if-your-account-is-banned-due-to-whatsapp-policy-violation)
- [getkanal — WhatsApp Business Quality Rating explained](https://getkanal.com/blog/whatsapp-business-quality-rating-explained)
- [Bird — WhatsApp account policy violations and enforcement](https://docs.bird.com/connectivity-platform/troubleshooting/whatsapp-account-policy-violations-and-enforcement)

> **Conclusión final:** dado el "no se puede solicitar revisión" + uso de Baileys, no conviene gastar energía intentando rescatar ese número por la API. **Número nuevo + API Oficial + adiós Baileys** es la única ruta que no se vuelve a quemar.
