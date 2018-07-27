import { ClassAttributes, createElement } from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider as StateProvider } from 'unstated';
import Theme from './core/Theme';
import AnkiService from './service/AnkiService';
import Backend from './service/Backend';
import CardCreatingState from './state/CardCreatingState';
import ConfigurationState from './state/ConfigurationState';
import { Provider as AnkiServiceProvider } from './view/context/ankiService';
import { Provider as BackendProvider } from './view/context/backend';
import Page from './view/page/Page';

type Props = ClassAttributes<HTMLElement> & {
  cardCreatingState: CardCreatingState;
  configurationState: ConfigurationState;
  ankiService: AnkiService;
  backend: Backend;
  theme: Theme;
  className?: string;
};

const Root = ({ cardCreatingState, configurationState, ankiService, backend, theme, className }: Props) => (
  <AnkiServiceProvider value={ankiService}>
    <BackendProvider value={backend}>
      <ThemeProvider theme={theme}>
        <StateProvider inject={[configurationState]}>
          <StateProvider inject={[cardCreatingState]}>
            <Page className={className} />
          </StateProvider>
        </StateProvider>
      </ThemeProvider>
    </BackendProvider>
  </AnkiServiceProvider>
);

export default Root;
