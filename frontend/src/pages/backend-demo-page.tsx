import { BackendInfo } from "@/components/backend-info"
import { TodoList } from "@/components/todo-list"

export function BackendDemoPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <title>Demo backend · Docker Testing</title>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-normal tracking-tight">Demo backend</h1>
        <p className="text-muted-foreground">
          Il frontend comunica con il container <code>app</code> tramite le API su <code>/api</code>.
        </p>
      </div>
      <div className="grid items-start gap-4 md:grid-cols-2">
        <BackendInfo />
        <TodoList />
      </div>
    </div>
  )
}
