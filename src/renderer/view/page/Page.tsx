import { ClassAttributes, createElement } from 'react';
import styled from '../../core/styled-components';
import ConfigurationDialog from '../component/ConfigurationDialog';
import DefinitionEditor from '../component/DefinitionEditor';
import ExampleEditor from '../component/ExampleEditor';
import _ExamplePronunciation from '../component/ExamplePronunciation';
import ExampleWithBlankEditor from '../component/ExampleWithBlankEditor';
import _FootBar from '../component/FootBar';
import ImageList from '../component/ImageList';
import ImageSearchQuerySelector from '../component/ImageSearchQuerySelector';
import _Ipa from '../component/Ipa';
import _KeepExample from '../component/KeepExample';
import KeywordInput from '../component/KeywordInput';
import PartOfSpeechSelect from '../component/PartOfSpeechSelect';
import _KeywordPronunciation from '../component/KeywordPronunciation';
import Text from '../component/Text';

type Props = ClassAttributes<HTMLElement> & {
  className?: string;
};

const Page = ({ className }: Props) => (
  <Root className={className}>
    <Inner>
      <KeywordHeadline variant="headline">Keyword</KeywordHeadline>

      <Keyword />

      <IpaHeadline variant="headline">IPA</IpaHeadline>

      <Ipa />

      <KeywordPronunciationHeadline variant="headline">Pronunciation</KeywordPronunciationHeadline>

      <KeywordPronunciation />

      <PartOfSpeechHeadline variant="headline">Part of speech</PartOfSpeechHeadline>

      <PartOfSpeech />

      <DefinitionHeadline variant="headline">Definition</DefinitionHeadline>

      <Definition />

      <ExampleHeadlineContainer>
        <ExampleHeadline variant="headline">Example</ExampleHeadline>

        <KeepExample />
      </ExampleHeadlineContainer>

      <Example />

      <ExamplePronunciation />

      <ExampleWithBlankHeadline variant="headline">Example (with blank)</ExampleWithBlankHeadline>

      <ExampleWithBlank />

      <ImagesHeadline variant="headline">Images</ImagesHeadline>

      <ImagesSearchQuery />

      <Images />
    </Inner>

    <FootBar />

    <ConfigurationDialog />
  </Root>
);

const Root = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: #f5f5f4;
`;

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas:
    'keywordHeadline keywordHeadline keywordHeadline'
    'keyword keyword keyword'
    'ipaHeadline keywordPronunciationHeadline keywordPronunciationHeadline'
    'ipa keywordPronunciation keywordPronunciation'
    'partOfSpeechHeadline definitionHeadline definitionHeadline'
    'partOfSpeech definition definition'
    'exampleHeadline exampleHeadline exampleHeadline'
    'example example examplePronunciation'
    'exampleWithBlankHeadline exampleWithBlankHeadline exampleWithBlankHeadline'
    'exampleWithBlank exampleWithBlank exampleWithBlank'
    'imagesHeadline imagesHeadline imagesHeadline'
    'imagesSearchQuery imagesSearchQuery imagesSearchQuery'
    'images images images';
  justify-items: stretch;
  padding: ${({ theme }) => `${theme.spacing.large}px ${theme.spacing.large}px 65px`};
  overflow-y: scroll;
`;

const KeywordHeadline = styled(Text)`
  grid-area: keywordHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const Keyword = styled(KeywordInput)`
  grid-area: keyword;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
`;

const IpaHeadline = styled(Text)`
  grid-area: ipaHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const Ipa = styled(_Ipa)`
  grid-area: ipa;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
  padding-right: ${({ theme }) => theme.spacing.regular}px;
`;

const KeywordPronunciationHeadline = styled(Text)`
  grid-area: keywordPronunciationHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const KeywordPronunciation = styled(_KeywordPronunciation)`
  grid-area: keywordPronunciation;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
  justify-self: flex-start;
`;

const PartOfSpeechHeadline = styled(Text)`
  grid-area: partOfSpeechHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const PartOfSpeech = styled(PartOfSpeechSelect)`
  grid-area: partOfSpeech;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
  padding-right: ${({ theme }) => theme.spacing.regular}px;
`;

const DefinitionHeadline = styled(Text)`
  grid-area: definitionHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const Definition = styled(DefinitionEditor)`
  grid-area: definition;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
`;

const ExampleHeadlineContainer = styled('div')`
  grid-area: exampleHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const ExampleHeadline = styled(Text)`
  display: inline-block;
`;

const KeepExample = styled(_KeepExample)`
  display: inline-block;
  margin-left: ${({ theme }) => theme.spacing.regular}px;
`;

const Example = styled(ExampleEditor)`
  grid-area: example;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
  padding-right: ${({ theme }) => theme.spacing.regular}px;
`;

const ExamplePronunciation = styled(_ExamplePronunciation)`
  grid-area: examplePronunciation;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
  justify-self: flex-start;
`;

const ExampleWithBlankHeadline = styled(Text)`
  grid-area: exampleWithBlankHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const ExampleWithBlank = styled(ExampleWithBlankEditor)`
  grid-area: exampleWithBlank;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
`;

const ImagesHeadline = styled(Text)`
  grid-area: imagesHeadline;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
`;

const ImagesSearchQuery = styled(ImageSearchQuerySelector)`
  grid-area: imagesSearchQuery;
  marginbottom: ${({ theme }) => theme.spacing.small}px;
`;

const Images = styled(ImageList)`
  grid-area: images;
  margin-bottom: ${({ theme }) => theme.spacing.large}px;
`;

const FootBar = styled(_FootBar)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: linear-gradient(to bottom, #e8e6e8 0, #d1cfd1 100%);
  border-top: 1px solid #c2c0c2;
`;

export default Page;
