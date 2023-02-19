import { FC, memo, FormEvent } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { setEditedTask, selectTask } from '../slices/todoSlice'
import { useQueryTags } from '../hooks/useQueryTags'
import { useMutateTasks } from '../hooks/useMutateTasks'

const TaskEdit: FC = () => {
  const editedTask = useAppSelector(selectTask)
  const dispatch = useAppDispatch()
  const { status, data } = useQueryTags()
  const { createTaskMutation, updateTaskMutation } = useMutateTasks()
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (editedTask.id === 0) createTaskMutation.mutate(editedTask)
    else {
      updateTaskMutation.mutate(editedTask)
    }
  }
  const tagOption = data?.map((tag) => (
    <option key={tag.id} value={tag.id}>
      {tag.name}
    </option>
  ))
  console.log('rendered TaskEdit')
  if (status === 'loading') return <div>{'Loading...'}</div>
  if (status === 'error') return <div>{'error...'}</div>
  if (updateTaskMutation.isLoading) {
    return <span>Updating...</span>
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="mb-3 px-3 py-2 border border-gray-300"
          placeholder="new task??"
          onChange={(e) => {
            dispatch(setEditedTask({ ...editedTask, title: e.target.value }))
          }}
          value={editedTask.title}
        />
        <button
          type="submit"
          className="disabled:opacity-40 my-3 mx-3 py-2 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded"
          disabled={!editedTask.title || !editedTask.tag}
        >
          {editedTask.id === 0 ? 'Create' : 'Update'}
        </button>
      </form>
      <select
        className="mb-3 px-3 py-2 border border-gray-300"
        value={editedTask.tag}
        onChange={(e) => {
          dispatch(
            setEditedTask({ ...editedTask, tag: parseInt(e.target.value) })
          )
        }}
      >
        <option value={0}>Tag</option>
        {tagOption}
      </select>
    </div>
  )
}

export const TaskEditMemo = memo(TaskEdit)
