import { useEffect, useId, useState, type SubmitEvent } from "react"
import { Trash2Icon, XIcon } from "lucide-react"

import { AppButton } from "@/components/app-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { api, type Todo } from "@/lib/api"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const inputId = useId()

  useEffect(() => {
    api<Todo[]>("/todos")
      .then(setTodos)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Esegue una richiesta: in caso di successo l'eventuale errore precedente sparisce
  async function run(request: () => Promise<void>) {
    try {
      await request()
      setError(null)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  function addTodo(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!text.trim()) return
    run(async () => {
      const todo = await api<Todo>("/todos", { method: "POST", body: JSON.stringify({ text }) })
      setTodos((prev) => [...prev, todo])
      setText("")
    })
  }

  function toggleTodo(todo: Todo, done: boolean) {
    run(async () => {
      const updated = await api<Todo>(`/todos/${todo.id}`, { method: "PATCH", body: JSON.stringify({ done }) })
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)))
    })
  }

  function deleteTodo(todo: Todo) {
    run(async () => {
      await api<void>(`/todos/${todo.id}`, { method: "DELETE" })
      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo</CardTitle>
        <CardDescription>Salvati in memoria nel backend: si azzerano al riavvio del container</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {error && (
          <div role="alert" className="flex items-center gap-2 rounded-[8px] bg-destructive/10 py-2 pr-2 pl-4 text-sm">
            <span className="flex-1 text-destructive">Errore: {error}</span>
            <AppButton size="sm" className="w-9 min-w-0 px-0" aria-label="Chiudi errore" onClick={() => setError(null)}>
              <XIcon />
            </AppButton>
          </div>
        )}

        <form onSubmit={addTodo} className="flex gap-2">
          <label htmlFor={inputId} className="sr-only">
            Nuovo todo
          </label>
          <Input
            id={inputId}
            className="h-9"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nuovo todo…"
          />
          {/* Disattivato finché non c'è testo: l'azione non è ancora disponibile */}
          <AppButton type="submit" variant="primary" size="sm" disabled={!text.trim()}>
            Aggiungi
          </AppButton>
        </form>

        {loading ? (
          <div className="flex flex-col gap-2" aria-label="Caricamento dei todo" aria-busy="true">
            <Skeleton className="h-9" />
            <Skeleton className="h-9" />
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2 text-sm">
                <Checkbox
                  checked={todo.done}
                  aria-label={`Completato: ${todo.text}`}
                  onCheckedChange={(checked) => toggleTodo(todo, checked)}
                />
                <span className={todo.done ? "flex-1 text-muted-foreground line-through" : "flex-1"}>{todo.text}</span>
                <AppButton
                  size="sm"
                  className="w-9 min-w-0 px-0 text-muted-foreground"
                  aria-label={`Elimina "${todo.text}"`}
                  onClick={() => deleteTodo(todo)}
                >
                  <Trash2Icon />
                </AppButton>
              </li>
            ))}
            {todos.length === 0 && <li className="text-sm text-muted-foreground">Nessun todo: aggiungine uno</li>}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
