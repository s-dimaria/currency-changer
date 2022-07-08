import {ReactComponent as Logo} from '../logo2.svg';

function Header() {

    return (
        <header className="App-header">
        <Logo className="App-logo" fill='gold'/>
        <p>
          Welcome to the <b>Currency Exchange Online.</b>
        </p>
      </header>
    );
}

export default Header;