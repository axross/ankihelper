import { Button, Intent, Position, Toaster } from '@blueprintjs/core';
import { createElement } from 'react';
import { Subscribe } from 'unstated';
import CardCreatingState from '../../state/CardCreatingState';
import { Consumer as AnkiServiceConsumer } from '../context/ankiService';

type Props = {
  className?: string;
};

const CreateButton = ({ className }: Props) => (
  <AnkiServiceConsumer>
    {ankiService => (
      <Subscribe to={[CardCreatingState]}>
        {(cardCreatingState: CardCreatingState) => {
          const {
            keyword,
            keywordPronunciation,
            ipa,
            partOfSpeech,
            definition,
            example,
            examplePronunciation,
            exampleWithBlank,
            picture,
          } = cardCreatingState.state;

          return (
            <Button
              icon="plus"
              intent={Intent.PRIMARY}
              onClick={async () => {
                cardCreatingState.beginCreatingCard();
                cardCreatingState.clearAll();

                try {
                  await ankiService.createCard({
                    keyword,
                    keywordPronunciation: keywordPronunciation!,
                    ipa,
                    partOfSpeech,
                    definition,
                    example,
                    examplePronunciation: examplePronunciation!,
                    exampleWithBlank,
                    picture: picture!,
                  });

                  cardCreatingState.endCreatingCard();

                  Toaster.create({ position: Position.TOP_RIGHT }).show({
                    intent: Intent.SUCCESS,
                    message: 'A note has successfully created!',
                  });
                } catch (err) {
                  Toaster.create({ position: Position.TOP_RIGHT }).show({
                    intent: Intent.DANGER,
                    message: err.message,
                  });
                }
              }}
              disabled={!cardCreatingState.isReadyToCreate()}
              className={className}
            >
              Create
            </Button>
          );
        }}
      </Subscribe>
    )}
  </AnkiServiceConsumer>
);

export default CreateButton;
