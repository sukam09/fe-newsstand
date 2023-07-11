import Headline from './Headline.js';
import { HEADLINE_NUMBERS, HEADLINE_ROLLING_DELAY_DIFF } from '../constants.js';

export default function AutoRollingNews({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('recent-news-container');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { headlineData } = this.state;

    const leftHeadlines = headlineData.slice(0, HEADLINE_NUMBERS);
    const rightHeadlines = headlineData.slice(HEADLINE_NUMBERS, HEADLINE_NUMBERS * 2);

    new Headline({
      $target: $section,
      initialState: {
        headlines: leftHeadlines,
        offset: 0,
      },
    });

    new Headline({
      $target: $section,
      initialState: {
        headlines: rightHeadlines,
        offset: HEADLINE_ROLLING_DELAY_DIFF,
      },
    });
  };

  this.render();
}
