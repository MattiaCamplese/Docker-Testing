import { useEffect, useState, type FormEvent } from "react"
import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { api, type Todo } from "@/lib/api"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api<Todo[]>("/todos")
      .then(setTodos)
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
    <Card>
      <CardHeader>
        <CardTitle>Todo</CardTitle>
        <CardDescription>Salvati in memoria nel backend: si azzerano al riavvio del container</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {error && <p className="text-sm text-destructive">Errore: {error}</p>}
        <form onSubmit={addTodo} className="flex gap-2">
          <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nuovo todo…" />
          <Button type="submit">Aggiungi</Button>
        </form>
        <ul className="flex flex-col gap-2">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 text-sm">
              <Checkbox checked={todo.done} onCheckedChange={(checked) => toggleTodo(todo, checked)} />
              <span className={todo.done ? "flex-1 text-muted-foreground line-through" : "flex-1"}>{todo.text}</span>
              <Button variant="ghost" size="icon" aria-label="Elimina" onClick={() => deleteTodo(todo)}>
                <Trash2Icon />
              </Button>
            </li>
          ))}
          {todos.length === 0 && <li className="text-sm text-muted-foreground">Nessun todo</li>}
        </ul>
      </CardContent>
    </Card>
  )
}
