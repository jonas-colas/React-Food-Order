import classes from './Header.module.css';
import meals from '../../assets/meals.jpeg';
import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';

const Header = props => {

  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt="meals" />
      </div>
    </Fragment>
  );
};

export default Header;