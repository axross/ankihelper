import { injectGlobal } from 'styled-components';
import Theme from './core/Theme';

const patchGlobalStyle = (_: Theme) => {
  injectGlobal`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html,
    body {
      
    }
  `;
};

export default patchGlobalStyle;
