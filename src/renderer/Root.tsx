import { ThemeProvider } from 'emotion-theming';
import { ClassAttributes, createElement } from 'react';
import { Provider as StateProvider } from 'unstated';
import Dependency from './core/Dependency';
import Theme from './core/Theme';
import { Provider as DependencyProvider } from './view/context/dependency';
import CardCreatingState from './state/CardCreatingState';
import ConfigurationState from './state/ConfigurationState';
import Page from './view/page/Page';

type Props = ClassAttributes<HTMLElement> & {
  cardCreatingState: CardCreatingState;
  configurationState: ConfigurationState;
  dependency: Dependency;
  theme: Theme;
  className?: string;
};

const Root = ({ cardCreatingState, configurationState, dependency, theme, className }: Props) => (
  <DependencyProvider value={dependency}>
    <ThemeProvider theme={theme}>
      <StateProvider inject={[configurationState]}>
        <StateProvider inject={[cardCreatingState]}>
          <Page className={className} />
        </StateProvider>
      </StateProvider>
    </ThemeProvider>
  </DependencyProvider>
);

export default Root;
