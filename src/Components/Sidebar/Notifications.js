import { NotificationsLogo } from '../../assets/constants';

const Notifications = () => {
  return (
    <div className='sbi'>
    <a href='#' className='nav-link text-white fs-5' aria-current="page">
      <NotificationsLogo />
      <span className='ms-3 d-none d-md-inline'>Notifications</span>
    </a>
  </div>
  )
}

export default Notifications
