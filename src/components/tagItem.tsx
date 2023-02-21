import { FC, memo } from 'react'
import { useAppDispatch } from '../app/hooks'
import { setEditedTag } from '../slices/todoSlice'
import { PencilAltIcon, TagIcon, TrashIcon } from '@heroicons/react/solid'
import { useMutateTags } from '../hooks/useMutateTags'
import { Tag } from '../types/types'
interface Props {
  tag: Tag
}

const TagItem: FC<Props> = ({ tag }) => {
  const dispatch = useAppDispatch()
  const { deleteTagMutation } = useMutateTags()
  console.log('renedered TagItem')
  if (deleteTagMutation.isLoading) {
    return <p>Deleting...</p>
  }
  return (
    <li className="my-3">
      <span className="font-bold">{tag.name}</span>
      <div className="flex float-right ml-20">
        <PencilAltIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            dispatch(setEditedTag({ id: tag.id, name: tag.name }))
          }}
        />
        <TrashIcon
          className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
          onClick={() => {
            deleteTagMutation.mutate(tag.id)
          }}
        />
      </div>
    </li>
  )
}

export const TagItemMemo = memo(TagItem)
