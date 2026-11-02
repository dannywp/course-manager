import { Link } from 'react-router'
import buttonStyles from './button.module.css'
import messageStyles from './page-message.module.css'

export function NotFoundMessage({ message }: { message: string }) {
  return (
    <div className={messageStyles.message}>
      <p>{message}</p>
      <Link to="/" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
        Back to courses
      </Link>
    </div>
  )
}
