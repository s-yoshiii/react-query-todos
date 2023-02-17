import { FC, memo, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/todoSlice'
import { useQueryTags } from '../hooks/useQueryTags'
import { useMutateTasks } from '../hooks/useMutateTasks'

const TaskEdit: FC = () => {
  const editTask = useAppSelector(selectTask)
  const { status, data } = useQueryTags()
  const { createTaskMutation, updateTaskMutation } = useMutateTasks()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editTask.id === 0) createTaskMutation.mutate(editTask)
    else {
      updateTaskMutation.mutate(editTask)
    }
  }
  return <div></div>
}

export default TaskEdit
