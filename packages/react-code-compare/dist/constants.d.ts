import { SHORT_PREFIX } from './types.js';
import 'react';
import '@tanstack/react-virtual';
import './styles.js';
import 'create-emotion';
import './compute-lines.js';

declare const LineNumberPrefix: Record<"LEFT" | "RIGHT", SHORT_PREFIX>;

export { LineNumberPrefix };
