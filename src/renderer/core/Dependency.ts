import AnkiService from '../service/AnkiService';
import Backend from '../service/Backend';

type Dependency = {
  ankiService: AnkiService;
  backend: Backend;
};

export default Dependency;
