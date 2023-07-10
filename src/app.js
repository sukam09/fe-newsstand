import Header from './Header.js';
import RecentNewsRolling from './RecentNewsRolling.js';
import NewsPressGridview from './NewsPressGridview.js';

export default function App({ $app }) {
  new Header({ $target: $app });

  new RecentNewsRolling({ $target: $app });

  new NewsPressGridview({
    $target: $app,
    initialState: {
      page: 1,
      newsPressData: [],
    },
  });
}
