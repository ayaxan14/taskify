import { useState } from "react";
import confetti from "canvas-confetti";

var count = 200;
var defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [quote, setQuote] = useState(getRandomQuote());

  function getRandomQuote(prevQuote: string): string {
    const quotes = [
      "The journey of a thousand miles begins with one step.",
      "The difference between success and failure is the ability to take action.",
      "The only place where success comes before work is in the dictionary.",
      "Hard work beats talent when talent doesn't work hard.",
      "What you get by achieving your goals is not as important as what you become by achieving your goals.",
      "Give me six hours to chop down a tree and I will spend the first four sharpening the axe. - Abraham Lincoln",
      "The secret of your future is hidden in your daily routine. - Mike Murdock",
      "You can have it all. Just not all at once. - Oprah Winfrey",
      "The best way to get a project done faster is to start sooner.",
      "A goal without a plan is just a wish.",
      "There are no unrealistic goals, only unrealistic deadlines.",
      "To do two things at once is to do neither.",
      "Management is, above all, a practice where art, science, and craft meet.",
      "The secret to winning is constant, consistent management.",
      "Begin with the end in mind.",
      "Even if you are on the right track, you will get run over if you just sit there.",
      "You cannot escape the responsibility of tomorrow by evading it today.",
      "If you fail to plan, you are planning to fail.",
      "It does not matter how slowly you go, as long as you do not stop.",
      "No great manager or leader ever fell from heaven, it’s learned, not inherited.",
      "Technology and tools are useful and powerful when they are your servant and not your master.",
    ];
    let newQuote = prevQuote;

    while (newQuote === prevQuote) {
      newQuote = quotes[Math.floor(Math.random() * quotes.length)];
    }

    return newQuote;
  }

  function Add() {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
    setQuote(
      getRandomQuote("The journey of a thousand miles begins with one step.")
    );
  }

  function toggleComplete(id: string) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          const isChecking = !todo.completed;
          if (isChecking) {
            // Fire confetti only when checking!
            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, {
              spread: 120,
              startVelocity: 25,
              decay: 0.92,
              scalar: 1.2,
            });
            fire(0.1, { spread: 120, startVelocity: 45 });
          }

          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      Add();
    }
  }

  function Delete(id: string) {
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
  }
  return (
    <>
      <h1 className="text-center text-6xl text-white rubik mt-1">Taskify</h1>
      <div className="flex justify-center">
        <div className="shadow-xl flex flex-col items-center m-6 rounded-lg bg-[#242836] w-auto h-auto  pr-20 pl-20 transform hover:scale-110 transition-all duration-500">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Today's task..."
            className="border-2 hover:scale-110 border-white focus:border-red-300 text-white focus:placeholder-transparent outline-none rounded-sm w-50 text-center caret-red-400 placeholder:text-[#e3a6c1] transition-all duration-500 mt-3"
          />
          <button
            className="border-2 rounded-md p-1 m-3 hover:bg-[#e3a6c1] active:bg-red-300 transition-all duration-300 transform hover:scale-110 text-white "
            onClick={Add}
          >
            Add Task
          </button>
          <ul>
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`text-white montserrat mb-2 items-center hover:bg-[#e3a6c1] transition-all duration-300 hover:scale-110 max-w-70 m-1 border-2 rounded-sm p-1 flex justify-between ${
                  todo.completed ? "hover:bg-transparent" : ""
                }`}
              >
                <input
                  id={`todo=${todo.id}`}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="hidden peer"
                />
                <label
                  htmlFor={`todo=${todo.id}`}
                  className={`bg-white rounded-lg w-4 h-4 hover:bg-[#242836] transition duration-300 ${
                    todo.completed
                      ? "peer-checked:bg-green-300 hover:bg-white"
                      : ""
                  }`}
                />
                <span
                  className={`whitespace-normal break-words ml-2
                  ${todo.completed ? "line-through text-gray-400" : ""}`}
                >
                  {todo.text}
                </span>
                <button
                  className="transform shrink-0 hover:scale-115 transition-all ml-5 duration-120 rounded-sm"
                  onClick={() => Delete(todo.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h1 className="text-center text-2xl text-gray-500 playfair" key={quote}>
        {"~ "}
        <q className="">{quote}</q>
      </h1>
    </>
  );
}

export default Todo;
