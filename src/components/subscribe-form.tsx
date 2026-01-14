'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Loader, Send } from 'lucide-react'
import { APIResponse, sendContact } from '@/services/planner-services'
import { z } from 'zod'

const schema = z.object({
  email: z
    .string({
      required_error: 'el email es obligatorio.',
      invalid_type_error: 'el email no es válido',
    })
    .email({ message: 'email no válido' }),
})

type ContactFormValues = z.infer<typeof schema>

type Props = {
  clientId: string
}
export function SubscribeForm({ clientId }: Props) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<APIResponse | null>(null)

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true)
    const res = await sendContact(clientId, undefined, data.email)
    setLoading(false)
    setResponse(res)
    if (res.ok) {
      form.reset()
    }
    setTimeout(() => {
      setResponse(null)
    }, 10000)
  }

  return (
    <div className="mx-auto dark:bg-white/5 dark:text-white bg-black/5 text-black w-full max-w-md rounded-xl py-6 px-6 sm:px-8 border border-gray-300 dark:border-gray-700">
      <div className="space-y-1 mb-4">
        <h3 className="text-lg font-semibold text-tinta-verde">Newsletter</h3>
        <p className="text-sm text-muted-foreground">
          Recibe novedades sobre el mundo del vino.
        </p>
      </div>
      {response ? (
        <ResponseBox response={response} />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="rounded-lg bg-background/80 border-border/50"
                        placeholder="tu@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs mt-1" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                variant="outline"
                className="shrink-0 gap-2 bg-background/80 hover:bg-background"
                disabled={loading}
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Suscribirse</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

function ResponseBox({ response }: { response: APIResponse }) {
  return (
    <div className="py-2 px-3 rounded-lg bg-background/80 border border-border/50">
      {response.ok ? (
        <p className="text-sm text-green-600">{response.message}</p>
      ) : (
        <p className="text-sm text-red-600">{response.message}</p>
      )}
    </div>
  )
}
