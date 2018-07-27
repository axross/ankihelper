import { Consumer as C, createContext } from 'react';
import AnkiService from '../../service/AnkiService';

const context = createContext<AnkiService>(null as any);

export const Provider = context.Provider;
export const Consumer = context.Consumer as C<AnkiService>;
