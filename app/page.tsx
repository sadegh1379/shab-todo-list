import TodosContainer from "@/components/TodosContainer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Todo List</h1>
      <TodosContainer />
    </main>
  );
}
