import { Consumer as C, createContext } from 'react';
import Backend from '../../service/Backend';

const context = createContext<Backend>(null as any);

export const Provider = context.Provider;
export const Consumer = context.Consumer as C<Backend>;
