import { useGroupContext } from './GroupContext';

export default function SearchInput(props: {
  className?: string,
  placeholderText?: string
}) {
  const {
    className = 'text-sm bg-white h-9 w-full outline-none p-2 mb-2 rounded-md border border-gray-300 focus:border-blue-600',
    placeholderText = 'Search here...'
  } = props
  const { searchValue, setSearchValue } = useGroupContext();  

  return (
    <input
      className={className} 
      type='text' 
      placeholder={placeholderText} 
      value={searchValue} 
      onChange={e => setSearchValue(e.target.value)}
    />
  )
}