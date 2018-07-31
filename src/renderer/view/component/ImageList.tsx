import { Toaster, Intent } from '@blueprintjs/core';
import { ClassAttributes, createElement, Fragment } from 'react';
import { Value } from 'react-powerplug';
import { Subscribe } from 'unstated';
import styled from '../../core/styled-components';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as BackendConsumer } from '../context/backend';
import Repromised from './Repromised';
import Threshold from './Threshold';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const PictureList = ({ className }: Props) => (
  <BackendConsumer>
    {backend => (
      <Subscribe to={[CardCreatingState]}>
        {(cardCreatingState: CardCreatingState) => {
          let query = cardCreatingState.state.keyword;

          if (cardCreatingState.state.imageSearchQuery !== '') {
            query = cardCreatingState.state.imageSearchQuery;
          }

          return (
            <Threshold ms={600} value={query}>
              {query => (
                <Value initial={null as string | null} key={query}>
                  {({ value: selectedPictureUrl, set }) => (
                    <Fragment>
                      <Repromised
                        promise={() => backend.getPictures(query)}
                        catch={err =>
                          console.error(err) || Toaster.create().show({ intent: Intent.DANGER, message: err.message })
                        }
                        initial={[]}
                      >
                        {imageUrls => (
                          <Root className={className}>
                            <Inner>
                              {imageUrls.map(imageUrl => (
                                <Item
                                  src={imageUrl}
                                  selected={imageUrl === selectedPictureUrl}
                                  onClick={() => set(imageUrl)}
                                  key={imageUrl}
                                />
                              ))}
                            </Inner>
                          </Root>
                        )}
                      </Repromised>

                      {selectedPictureUrl ? (
                        <Repromised
                          promise={() => backend.getPicture(new URL(selectedPictureUrl))}
                          initial={null}
                          beforeResolve={() => cardCreatingState.beginLoadingPicture()}
                          then={file => {
                            cardCreatingState.setPicture(file!);
                            cardCreatingState.endLoadingPicture();
                          }}
                          key={selectedPictureUrl}
                        />
                      ) : null}
                    </Fragment>
                  )}
                </Value>
              )}
            </Threshold>
          );
        }}
      </Subscribe>
    )}
  </BackendConsumer>
);

const Root = styled.div`
  width: 100%;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: -2px;
  margin-right: -6px;
  margin-left: -2px;
  margin-bottom: -6px;
`;

const Item = styled.img.attrs<{ selected: boolean }>({})`
  flex: auto;
  height: 128px;
  min-width: 96px;
  margin-bottom: ${({ theme }) => theme.spacing.small - 4}px;
  margin-right: ${({ theme }) => theme.spacing.small - 4}px;
  border-radius: 4px;
  border: ${({ selected }) => (selected ? '2px #40a9ff solid' : '2px transparent solid')};
  box-shadow: ${({ selected }) => (selected ? '0 0 0 4px rgba(24, 144, 255, 0.2)' : 'none')};
  transition: all 0.3s;
  overflow: hidden;
  cursor: pointer;
  &: hover {
    border: 2px #40a9ff solid;
  }
`;

export default PictureList;
