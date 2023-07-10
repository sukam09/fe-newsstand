import Header from './Header.js';
import RecentNewsRollingView from './RecentNewsRollingView.js';
import NewsPressGridview from './NewsPressGridview.js';

export default function App({ $app }) {
  new Header({ $target: $app });

  new RecentNewsRollingView({ $target: $app });

  new NewsPressGridview({
    $target: $app,
    initialState: {
      page: 1,
      newsPressData: [],
    },
  });
}
