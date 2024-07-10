import { Link } from 'react-router-dom'
import { BrandIcon } from '../assets/icons'

const Header = () => {
  
  return (
    <header>
      <div className="px-4 lg:px-6 py-5 bg-gray-800 shadow-xl">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={'/'} className="flex items-center gap-x-1 xxs:gap-x-3">
            <div className="w-6 h-6 sm:h-9 flex items-center">
              <BrandIcon color="white" />
            </div>
            <span className='self-center text-md xxs:text-lg font-semibold whitespace-nowrap dark:text-white'>To Do Shila</span>
          </Link>       
        </div>
      </div>
    </header>
  )
}
export default Header