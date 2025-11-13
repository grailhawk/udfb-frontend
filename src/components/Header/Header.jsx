import 'components/Header/styling.css';
import { Divider } from 'semantic-ui-react';

import logo from 'assets/logo30.png';

// Note this is a very simple header but my experience has been that its a very reusable component in different applications
function Header({
  branded,
  center,
  children,
  controls,
  description,
  divider,
  title,
}) {
  let brand = null;
  if (branded != null) {
    brand = (
      <div className="header-branding">
        <img className="header-logo" src={logo} />
      </div>
    );
  }

  let desc = null;
  if (description != null) {
    desc = (
      <>
        <br />
        <p>{description}</p>
      </>
    );
  }

  let content = null;
  if (title != null) {
    let sideControlsStyling = 'header-right-side-controls';
    if (controls == 'bottom') {
      sideControlsStyling += ' side-controls-bottom';
    }

    let titleStyling = 'header-title';
    let containerStyling = 'header-container';
    if (center) {
      titleStyling += ' center-title';
      containerStyling += ' center-title-container';
    }
    content = (
      <div>
        <div className={containerStyling}>
          <div className={titleStyling}>
            <h2>{title}</h2>
            {desc}
          </div>
          <div className={sideControlsStyling}>{children}</div>
        </div>
        {divider != null ? <Divider /> : null}
      </div>
    );
  }
  return (
    <div>
      {brand}
      {content}
    </div>
  );
}

export default Header;
