import { useEffect, useState, type FormEvent } from "react"
import { Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"

type Info = {
  message: string
  hostname: string
  node: string
  uptime: number
}

type Todo = {
  id: number
  text: string
  done: boolean
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return (res.status === 204 ? undefined : await res.json()) as T
}

export function App() {
  const [info, setInfo] = useState<Info | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([api<Info>("/info"), api<Todo[]>("/todos")])
      .then(([info, todos]) => {
        setInfo(info)
        setTodos(todos)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  async function addTodo(e: FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const todo = await api<Todo>("/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
      })
      setTodos((prev) => [...prev, todo])
      setText("")
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function toggleTodo(todo: Todo, done: boolean) {
    try {
      const updated = await api<Todo>(`/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ done }),
      })
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  async function deleteTodo(todo: Todo) {
    try {
      await api<void>(`/todos/${todo.id}`, { method: "DELETE" })
      setTodos((prev) => prev.filter((t) => t.id !== todo.id))
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <div className="flex min-h-svh justify-center p-6">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Backend</CardTitle>
            <CardDescription>
              Dati da <code>/api/info</code>, serviti dal container{" "}
              <code>app</code>
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            {error && <p className="text-destructive">Errore: {error}</p>}
            {!error && !info && (
              <p className="text-muted-foreground">Caricamento…</p>
            )}
            {info && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                <dt className="text-muted-foreground">Messaggio</dt>
                <dd>{info.message}</dd>
                <dt className="text-muted-foreground">Container</dt>
                <dd className="font-mono">{info.hostname}</dd>
                <dt className="text-muted-foreground">Node</dt>
                <dd className="font-mono">{info.node}</dd>
                <dt className="text-muted-foreground">Uptime</dt>
                <dd>{info.uptime}s</dd>
              </dl>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Todo</CardTitle>
            <CardDescription>
              Salvati in memoria nel backend: si azzerano al riavvio del
              container
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Nuovo todo…"
              />
              <Button type="submit">Aggiungi</Button>
            </form>
            <ul className="flex flex-col gap-2">
              {todos.map((todo) => (
                <li key={todo.id} className="flex items-center gap-3 text-sm">
                  <Checkbox
                    checked={todo.done}
                    onCheckedChange={(checked) => toggleTodo(todo, checked)}
                  />
                  <span
                    className={
                      todo.done ? "flex-1 text-muted-foreground line-through" : "flex-1"
                    }
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Elimina"
                    onClick={() => deleteTodo(todo)}
                  >
                    <Trash2Icon />
                  </Button>
                </li>
              ))}
              {todos.length === 0 && (
                <li className="text-sm text-muted-foreground">Nessun todo</li>
              )}
            </ul>
          </CardContent>
        </Card>

        <p className="text-center font-mono text-xs text-muted-foreground">
          (Premi <kbd>d</kbd> per il tema scuro)
        </p>
      </div>
    </div>
  )
}

export default App
