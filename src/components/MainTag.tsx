import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDoubleLeftIcon } from '@heroicons/react/solid'

const MainTag: FC = () => {
  const navigate = useNavigate()
  console.log('rendered MainTag')
  return (
    <>
      <p className="mb-10 text-xl font-bold">Tags</p>
      <ChevronDoubleLeftIcon
        onClick={() => navigate('/')}
        className="h-5 w-5 mt-2 text-blue-500 cursor-pointer"
      />
      <p>Taskpage</p>
    </>
  )
}

export default MainTag
