import axios from 'axios'
import { useAppDispatch } from '../app/hooks'
import { resetEditedTask } from '../slices/todoSlice'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { Task, EditTask } from '../types/types'

export const useMutateTask = () => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const createTaskMutation = useMutation(
    (task: Omit<EditTask, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_REST_API}/tasks/`, task),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>('tasks', [
            ...previousTodos,
            res.data,
          ])
        }
        dispatch(resetEditedTask())
      },
    }
  )
  const updateTaskMutation = useMutation(
    (task: EditTask) =>
      axios.put<Task>(
        `${process.env.REACT_APP_REST_API}/tasks/${task.id}`,
        task
      ),
    {
      onSuccess: (res, variables) => {
        const previousTodos = queryClient.getQueriesData<Task[]>('tasks')
        if (previousTodos) {
          queryClient.setQueryData<Task[]>(
            'tasks',
            previousTodos.map((task) =>
              task.id === variables.id ? res.data : task
            )
          )
        }
        dispatch(resetEditedTask())
      },
    }
  )
}
