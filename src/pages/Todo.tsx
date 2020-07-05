/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo, useState, useCallback, useMemo } from 'react';

/** utils */
import Colors from '../utils/colors';

export interface TodoProps {}

const Todo: React.FC<TodoProps> = () => {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  /** submit event handler  */
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();

      if (value) {
        const todo: Todo = {
          index: todos.length,
          description: value,
        };

        setTodos([...todos, todo]);
        setValue('');
      }
    },
    [value, todos],
  );

  /** input change event handler */
  const handleChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void => setValue(value),
    [],
  );

  /** render todo list */
  const todoListRenderer = useMemo((): React.ReactNode => {
    /** remove todo event handler */
    const handleRemoveClick = (index: number) => (e: React.MouseEvent<HTMLButtonElement>) =>
      index !== -1 && setTodos([...todos.slice(0, index), ...todos.slice(index + 1)]);

    return (
      <ul css={TodoList}>
        {todos.map((todo, index) => {
          return (
            <li key={`todo-${index}`}>
              <span>{todo.description}</span>
              <button
                name="removeTodoBtn"
                className="removeTodoBtn"
                onClick={handleRemoveClick(index)}
              >
                -
              </button>
            </li>
          );
        })}
      </ul>
    );
  }, [todos]);

  return (
    <div css={TodoWrapper}>
      <h2>TODO</h2>
      {todos.length > 0 && todoListRenderer}
      <div css={TodoForm}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="inputTodo"
            className="inputTodo"
            placeholder="Add Todo"
            value={value}
            onChange={handleChange}
          />
          <button name="addTodoBtn" className="addTodoBtn">
            +
          </button>
        </form>
      </div>
    </div>
  );
};

/** style */
const TodoWrapper = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
`;
const TodoList = css`
  margin: 0;
  padding: 0;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  list-style: none;
  width: 100%;
  user-select: none;
  border: 1px solid ${Colors.default.accent3};
  li {
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;

    .removeTodoBtn {
      border: none;
      outline: none;
      box-sizing: border-box;
      cursor: pointer;
      color: white;
      background: ${Colors.default.default};

      width: 5rem;

      :hover {
        background: ${Colors.default.accent6};
      }

      :active {
        background: ${Colors.default.accent8};
      }
    }
  }
`;
const TodoForm = css`
  width: 100%;
  form {
    display: flex;
    height: 2rem;
    .inputTodo {
      flex: 5;
    }
    .addTodoBtn {
      border: none;
      outline: none;
      box-sizing: border-box;
      flex: 1;
      cursor: pointer;
      color: white;
      background: ${Colors.default.default};

      :hover {
        background: ${Colors.default.accent6};
      }

      :active {
        background: ${Colors.default.accent8};
      }
    }
  }
`;

/** Types */
type Todo = {
  index: number;
  description: string;
};

export default memo(Todo);
