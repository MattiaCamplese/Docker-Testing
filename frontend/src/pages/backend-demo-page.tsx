import { BackendInfo } from "@/components/backend-info"
import { TodoList } from "@/components/todo-list"

export function BackendDemoPage() {
  return (
    <div className="mx-auto flex max-w-[96rem] flex-col gap-12 px-4 py-12">
      <title>Demo backend · Canone UI</title>

      <div className="flex max-w-3xl flex-col gap-4">
        <h1 className="text-4xl font-normal tracking-tight sm:text-5xl">Demo backend</h1>
        <p className="text-lg text-muted-foreground">
          Il frontend comunica con il container <code>app</code> tramite le API su <code>/api</code>: le richieste
          passano dal proxy di Vite e arrivano al server Node nella rete di Docker.
        </p>
      </div>

      <div className="grid max-w-5xl items-start gap-6 md:grid-cols-2">
        <BackendInfo />
        <TodoList />
      </div>
    </div>
  )
}
