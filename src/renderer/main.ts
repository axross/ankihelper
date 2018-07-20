import { FocusStyleManager } from '@blueprintjs/core';
import { ipcRenderer } from 'electron';
import { createElement } from 'react';
import { render as reactDomRender } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import CardCreatingState from './state/CardCreatingState';
import ConfigurationState from './state/ConfigurationState';
import Backend from './service/Backend';
import AnkiService from './service/AnkiService';
import Root from './Root';
import theme from './theme';
import patchGlobalStyle from './patchGlobalStyle';

window.addEventListener('DOMContentLoaded', () => {
  const dependency = {
    ankiService: new AnkiService(),
    backend: new Backend(ipcRenderer),
  };

  const cardCreatingState = new CardCreatingState('');
  const configurationState = new ConfigurationState();

  cardCreatingState.subscribe(() => console.info(cardCreatingState.state));

  patchGlobalStyle(theme);

  FocusStyleManager.onlyShowFocusOnTabs();

  const render = () => {
    reactDomRender(
      createElement(
        AppContainer,
        {},
        createElement(Root, { cardCreatingState, configurationState, dependency, theme })
      ),
      document.getElementById('app')
    );
  };

  render();

  if ((module as any).hot) {
    (module as any).hot.accept(render);
  }
});
