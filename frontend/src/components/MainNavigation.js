import classes from './MainNavigation.module.css';
import { NavLink } from 'react-router-dom';
function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={({isActive})=>isActive ? classes.isActive :undefined}>Home</NavLink>
          </li>
          