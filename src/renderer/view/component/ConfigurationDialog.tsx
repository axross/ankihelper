import { Button, Dialog, FormGroup, InputGroup, Intent, TextArea } from '@blueprintjs/core';
import { ChangeEvent, createElement } from 'react';
import { Value } from 'react-powerplug';
import { Subscribe } from 'unstated';
import Configuration from '../../../common/model/Configuration';
import styled from '../../core/emotion';
import ConfigurationState from '../../state/ConfigurationState';
import { Consumer as DependencyConsumer } from '../context/dependency';
import Repromised from './Repromised';
import Text from './Text';

type Props = {
  className?: string;
};

const INITIAL_CONFIGURATION: Configuration = {
  googleCloud: {
    clientEmail: '',
    privateKey: '',
    projectId: '',
  },
  oxfordDictionaryApi: {
    appId: '',
    appKey: '',
  },
  wordsApi: {
    key: '',
  },
  bingImageSearchApi: {
    apiKey: '',
  },
};

const ConfigurationDialog = ({ className }: Props) => (
  <DependencyConsumer>
    {({ backend }) => (
      <Subscribe to={[ConfigurationState]}>
        {(configurationState: ConfigurationState) => (
          <Repromised promise={() => backend.getConfiguration()} initial={INITIAL_CONFIGURATION}>
            {(configuration, isLoading) => (
              <Value initial={{ configuration, isSaving: false }} key={JSON.stringify(configuration)}>
                {({ value, set }) => (
                  <Dialog
                    title="Configuration"
                    isOpen={configurationState.state.isDialogOpen}
                    onClose={() => configurationState.closeDialog()}
                    className={className}
                  >
                    <Body>
                      <Subtitle variant="subtitle">Google Cloud</Subtitle>

                      <FormGroup label="Client Email" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={value.configuration.googleCloud.clientEmail}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                googleCloud: {
                                  ...value.configuration.googleCloud,
                                  clientEmail: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <FormGroup label="Project ID" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={value.configuration.googleCloud.projectId}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                googleCloud: { ...value.configuration.googleCloud, projectId: e.currentTarget.value },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <FormGroup label="Private Key" labelFor="text-input" labelInfo="(required)">
                        <TextArea
                          defaultValue={value.configuration.googleCloud.privateKey}
                          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                googleCloud: {
                                  ...value.configuration.googleCloud,
                                  privateKey: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          fill
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <Subtitle variant="subtitle">Oxford Dictionary API</Subtitle>

                      <FormGroup label="App ID" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={value.configuration.oxfordDictionaryApi.appId}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                oxfordDictionaryApi: {
                                  ...value.configuration.oxfordDictionaryApi,
                                  appId: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <FormGroup label="App Key" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={configuration.oxfordDictionaryApi.appKey}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                oxfordDictionaryApi: {
                                  ...value.configuration.oxfordDictionaryApi,
                                  appKey: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <Subtitle variant="subtitle">Words API</Subtitle>

                      <FormGroup label="Key" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={configuration.wordsApi.key}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                wordsApi: {
                                  ...value.configuration.wordsApi,
                                  key: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>

                      <Subtitle variant="subtitle">Bing Image Search API</Subtitle>

                      <FormGroup label="API Key" labelFor="text-input" labelInfo="(required)">
                        <InputGroup
                          defaultValue={configuration.bingImageSearchApi.apiKey}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            set({
                              ...value,
                              configuration: {
                                ...value.configuration,
                                bingImageSearchApi: {
                                  ...value.configuration.bingImageSearchApi,
                                  apiKey: e.currentTarget.value,
                                },
                              },
                            })
                          }
                          disabled={isLoading || value.isSaving}
                        />
                      </FormGroup>
                    </Body>

                    <Footer>
                      <Button onClick={() => configurationState.closeDialog()}>Close</Button>

                      <Button
                        intent={Intent.PRIMARY}
                        onClick={async () => {
                          set({ ...value, isSaving: true });

                          await backend.setConfiguration(value.configuration);

                          set({ ...value, isSaving: false });
                          configurationState.closeDialog();
                        }}
                        loading={isLoading}
                      >
                        Apply
                      </Button>
                    </Footer>
                  </Dialog>
                )}
              </Value>
            )}
          </Repromised>
        )}
      </Subscribe>
    )}
  </DependencyConsumer>
);

const Body = styled('div')`
  padding: ${({ theme }) => theme.spacing.large}px;

  & > *:first-child {
    margin-top: 0;
  }

  & > *:last-child {
    margin-bottom: 0;
  }
`;

const Footer = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: ${({ theme }) => `0 ${theme.spacing.large}px`};

  & > * {
    margin-right: ${({ theme }) => theme.spacing.regular}px;
  }

  & > *:last-child {
    margin-right: 0;
  }
`;

const Subtitle = styled(Text)`
  margin-top: ${({ theme }) => theme.spacing.large}px;
  margin-bottom: ${({ theme }) => theme.spacing.regular}px;
`;

export default ConfigurationDialog;
