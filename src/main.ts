import './styles.css';
import { config } from './config';
import { renderBoard } from './ui/render';

const root = document.getElementById('board');
if (!root) {
  throw new Error('#board root element not found');
}
renderBoard(root, config);
