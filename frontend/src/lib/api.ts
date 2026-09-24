export type Info = {
  message: string
  hostname: string
  node: string
  uptime: number
}

export type Todo = {
  id: number
  text: string
  done: boolean
}

// Le richieste a /api passano dal proxy di Vite verso il container "app"
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return (res.status === 204 ? undefined : await res.json()) as T
}
