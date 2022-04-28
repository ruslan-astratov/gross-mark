import logo_icon from './../../assets/icons/logo_icon.svg'

const HeaderLogo = () => {
    return (
        <a href=" " className="header-link d-flex">
            <img className="logo" alt="Логотип" src={logo_icon} />
            <p className="heading">гросс маркет</p>
        </a>
    )
}

export default HeaderLogo
