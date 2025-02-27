import { Banner } from "../Components/Page/Common";
import { MenuItemList } from "../Components/Page/MenuItem";
function Home() {
  return (
    <div>
      <Banner />
      <div className="container p-2">
        <MenuItemList />
      </div>
    </div>
  );
}

export default Home;
